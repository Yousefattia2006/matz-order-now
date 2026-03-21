import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/data/products";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminProducts() {
  const { products: productList, addProduct, updateProduct, deleteProduct } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted");
  };

  const handleSave = (product: Product, isEdit: boolean) => {
    if (isEdit) {
      updateProduct(product);
      toast.success("Product updated");
    } else {
      addProduct(product);
      toast.success("Product created");
    }
    setDialogOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Products</h1>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-secondary">
            <tr>
              <th className="px-3 py-3 font-medium">Image</th>
              <th className="px-3 py-3 font-medium">Name (AR)</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium hidden sm:table-cell">Unit</th>
              <th className="px-3 py-3 font-medium hidden sm:table-cell">Category</th>
              <th className="px-3 py-3 font-medium">Active</th>
              <th className="px-3 py-3 font-medium hidden sm:table-cell">Featured</th>
              <th className="px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-secondary/50">
                <td className="px-3 py-3">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <span className="text-2xl">{p.emoji}</span>
                  )}
                </td>
                <td className="px-3 py-3 font-medium">{p.nameAr}</td>
                <td className="px-3 py-3">{p.price} ج</td>
                <td className="px-3 py-3 hidden sm:table-cell">{p.unit}</td>
                <td className="px-3 py-3 hidden sm:table-cell">
                  {categories.find((c) => c.id === p.categoryId)?.nameAr ?? p.categoryId}
                </td>
                <td className="px-3 py-3">{p.isActive ? "✅" : "❌"}</td>
                <td className="px-3 py-3 hidden sm:table-cell">{p.isFeatured ? "⭐" : "—"}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setDialogOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editing}
        onSave={handleSave}
      />
    </div>
  );
}

function ProductFormDialog({
  open, onOpenChange, product, onSave,
}: {
  open: boolean; onOpenChange: (v: boolean) => void; product: Product | null; onSave: (p: Product, isEdit: boolean) => void;
}) {
  const isEdit = !!product;

  const [nameAr, setNameAr] = useState(product?.nameAr ?? "");
  const [emoji, setEmoji] = useState(product?.emoji ?? "📦");
  const [price, setPrice] = useState(product?.price?.toString() ?? "0");
  const [unit, setUnit] = useState(product?.unit ?? "كيلو");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");

  const resetForm = () => {
    setNameAr(product?.nameAr ?? "");
    setEmoji(product?.emoji ?? "📦");
    setPrice(product?.price?.toString() ?? "0");
    setUnit(product?.unit ?? "كيلو");
    setCategoryId(product?.categoryId ?? categories[0]?.id ?? "");
    setIsActive(product?.isActive ?? true);
    setIsFeatured(product?.isFeatured ?? false);
    setImageUrl(product?.imageUrl ?? "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Product = {
      id: isEdit && product ? product.id : `prod-${Date.now()}`,
      nameAr,
      emoji,
      price: parseFloat(price),
      unit,
      categoryId,
      isActive,
      isFeatured,
      imageUrl: imageUrl || undefined,
    };
    onSave(p, isEdit);
    resetForm();
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
                    <SelectItem key={c.id} value={c.id}>{c.nameAr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Image</label>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={isActive} onCheckedChange={setIsActive} /> Active
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} /> Featured
            </label>
          </div>
          <Button type="submit" className="w-full">
            {isEdit ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
