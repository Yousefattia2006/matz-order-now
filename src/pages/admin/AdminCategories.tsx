import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name_ar: string;
  name_en: string | null;
  emoji: string;
  slug: string;
  color: string;
  sort_order: number;
}

export default function AdminCategories() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const { data: categoryList = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("categories").delete().eq("id", id);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (e) { console.error("Delete failed:", e); }
  };

  const handleSave = async (cat: Category, isEdit: boolean) => {
    try {
      if (isEdit) {
        await supabase.from("categories").update({
          name_ar: cat.name_ar,
          name_en: cat.name_en,
          emoji: cat.emoji,
          color: cat.color,
        }).eq("id", cat.id);
      } else {
        await supabase.from("categories").insert(cat);
      }
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setDialogOpen(false);
      setEditing(null);
    } catch (e) { console.error("Save failed:", e); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryList.map((cat) => (
          <div key={cat.id} className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.emoji}</span>
              <div>
                <p className="font-bold text-foreground">{cat.name_ar}</p>
                <p className="text-sm text-muted-foreground">{cat.name_en} · {cat.slug}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => { setEditing(cat); setDialogOpen(true); }}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CategoryFormDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editing} onSave={handleSave} />
    </div>
  );
}

function CategoryFormDialog({
  open, onOpenChange, category, onSave,
}: {
  open: boolean; onOpenChange: (v: boolean) => void; category: Category | null; onSave: (c: Category, isEdit: boolean) => void;
}) {
  const isEdit = !!category;

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [emoji, setEmoji] = useState("📦");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("bg-gray-100");

  useEffect(() => {
    if (open) {
      setNameAr(category?.name_ar ?? "");
      setNameEn(category?.name_en ?? "");
      setEmoji(category?.emoji ?? "📦");
      setSlug(category?.slug ?? "");
      setColor(category?.color ?? "bg-gray-100");
    }
  }, [open, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = isEdit && category ? category.id : slug.toLowerCase().replace(/\s+/g, "-");
    const cat: Category = {
      id,
      name_ar: nameAr,
      name_en: nameEn || null,
      emoji,
      slug: id,
      color,
      sort_order: category?.sort_order ?? 0,
    };
    onSave(cat, isEdit);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="ltr">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name (Arabic) *</label>
            <Input value={nameAr} onChange={(e) => setNameAr(e.target.value)} required dir="rtl" />
          </div>
          <div>
            <label className="text-sm font-medium">Name (English)</label>
            <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Emoji</label>
              <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Slug *</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required disabled={isEdit} />
            </div>
            <div>
              <label className="text-sm font-medium">Color Class</label>
              <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="bg-green-100" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
