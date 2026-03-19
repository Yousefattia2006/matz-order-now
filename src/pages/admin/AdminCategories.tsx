import { useState } from "react";
import { categories as initialCategories, Category } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminCategories() {
  const [categoryList, setCategoryList] = useState<Category[]>(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const handleDelete = (id: string) => {
    setCategoryList((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  };

  const handleSave = (cat: Category, isEdit: boolean) => {
    if (isEdit) {
      setCategoryList((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
      toast.success("Category updated");
    } else {
      setCategoryList((prev) => [...prev, cat]);
      toast.success("Category created");
    }
    setDialogOpen(false);
    setEditing(null);
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
                <p className="font-bold text-foreground">{cat.nameAr}</p>
                <p className="text-sm text-muted-foreground">{cat.nameEn} · {cat.slug}</p>
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

  const [nameAr, setNameAr] = useState(category?.nameAr ?? "");
  const [nameEn, setNameEn] = useState(category?.nameEn ?? "");
  const [emoji, setEmoji] = useState(category?.emoji ?? "📦");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [color, setColor] = useState(category?.color ?? "bg-gray-100");

  const resetForm = () => {
    setNameAr(category?.nameAr ?? "");
    setNameEn(category?.nameEn ?? "");
    setEmoji(category?.emoji ?? "📦");
    setSlug(category?.slug ?? "");
    setColor(category?.color ?? "bg-gray-100");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = isEdit && category ? category.id : slug.toLowerCase().replace(/\s+/g, "-");
    const cat: Category = { id, nameAr, nameEn, emoji, slug: id, color };
    onSave(cat, isEdit);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (v) resetForm(); }}>
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
