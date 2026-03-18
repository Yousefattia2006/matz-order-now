import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Product = Tables<"products">;

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (p: Product) => { setEditing(p); setDialogOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Name (AR)</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Active</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-secondary/50">
                  <td className="px-4 py-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <span className="text-2xl">{p.emoji}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name_ar}</td>
                  <td className="px-4 py-3">{p.price} ج</td>
                  <td className="px-4 py-3">{p.unit}</td>
                  <td className="px-4 py-3">
                    {categories.find((c) => c.id === p.category_id)?.name_ar ?? p.category_id}
                  </td>
                  <td className="px-4 py-3">{p.is_active ? "✅" : "❌"}</td>
                  <td className="px-4 py-3">{p.is_featured ? "⭐" : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editing}
        categories={categories}
      />
    </div>
  );
}

function ProductFormDialog({
  open,
  onOpenChange,
  product,
  categories,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product | null;
  categories: Tables<"categories">[];
}) {
  const queryClient = useQueryClient();
  const isEdit = !!product;

  const [nameAr, setNameAr] = useState(product?.name_ar ?? "");
  const [emoji, setEmoji] = useState(product?.emoji ?? "📦");
  const [price, setPrice] = useState(product?.price?.toString() ?? "0");
  const [unit, setUnit] = useState(product?.unit ?? "كيلو");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? categories[0]?.id ?? "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Reset form when product changes
  const resetForm = () => {
    setNameAr(product?.name_ar ?? "");
    setEmoji(product?.emoji ?? "📦");
    setPrice(product?.price?.toString() ?? "0");
    setUnit(product?.unit ?? "كيلو");
    setCategoryId(product?.category_id ?? categories[0]?.id ?? "");
    setIsActive(product?.is_active ?? true);
    setIsFeatured(product?.is_featured ?? false);
    setImageUrl(product?.image_url ?? "");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) {
      toast.error("Failed to upload image");
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
    setImageUrl(urlData.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: TablesInsert<"products"> = {
      name_ar: nameAr,
      emoji,
      price: parseFloat(price),
      unit,
      category_id: categoryId,
      is_active: isActive,
      is_featured: isFeatured,
      image_url: imageUrl || null,
    };

    if (isEdit && product) {
      const { error } = await supabase.from("products").update(payload).eq("id", product.id);
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      toast.success("Product created");
    }

    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    onOpenChange(false);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (v) resetForm(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="ltr">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name (Arabic) *</label>
            <Input value={nameAr} onChange={(e) => setNameAr(e.target.value)} required dir="rtl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Emoji</label>
              <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Unit</label>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} dir="rtl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price (EGP)</label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.5" />
            </div>
            <div>
              <label className="text-sm font-medium">Category *</label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name_ar}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">Product Image</label>
            {imageUrl && (
              <img src={imageUrl} alt="" className="w-24 h-24 rounded-xl object-cover mb-2" />
            )}
            <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-xl p-4 hover:bg-secondary/50 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {uploading ? "Uploading..." : "Click to upload image"}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={isActive} onCheckedChange={setIsActive} /> Active
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} /> Featured
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
