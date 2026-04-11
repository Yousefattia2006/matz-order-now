import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { contentType: file.type, upsert: true });

      if (uploadError) {
        console.error("Upload failed:", uploadError);
        // Fallback to base64 if upload fails
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPreview(result);
          onChange(result);
        };
        reader.readAsDataURL(file);
        return;
      }

      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setPreview(urlData.publicUrl);
      onChange(urlData.publicUrl);
    } catch (e) {
      console.error("Upload error:", e);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {preview ? (
        <div className="relative">
          <img src={preview} alt="" className="w-full h-32 object-cover rounded-xl border border-border" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur rounded-full p-1 hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-32 border-dashed flex flex-col gap-2"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
          ) : (
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground">
            {uploading ? "Uploading..." : "Upload Image"}
          </span>
          <span className="text-xs text-muted-foreground/70">Recommended: 400×400px</span>
        </Button>
      )}
    </div>
  );
}
