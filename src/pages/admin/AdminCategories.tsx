import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"categories">;

export default function AdminCategories() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
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
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(cat.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryFormDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editing} />
    </div>
  );
}

function CategoryFormDialog({
  open, onOpenChange, category,
}: {
  open: boolean; onOpenChange: (v: boolean) => void; category: Category | null;
}) {
  const queryClient = useQueryClient();
  const isEdit = !!category;

  const [nameAr, setNameAr] = useState(category?.name_ar ?? "");
  const [nameEn, setNameEn] = useState(category?.name_en ?? "");
  const [emoji, setEmoji] = useState(category?.emoji ?? "📦");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [color, setColor] = useState(category?.color ?? "bg-gray-100");
  const [sortOrder, setSortOrder] = useState(category?.sort_order?.toString() ?? "0");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setNameAr(category?.name_ar ?? "");
    setNameEn(category?.name_en ?? "");
    setEmoji(category?.emoji ?? "📦");
    setSlug(category?.slug ?? "");
    setColor(category?.color ?? "bg-gray-100");
    setSortOrder(category?.sort_order?.toString() ?? "0");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const id = slug.toLowerCase().replace(/\s+/g, "-");

    const payload = {
      name_ar: nameAr,
      name_en: nameEn || null,
      emoji,
      slug: id,
      color,
      sort_order: parseInt(sortOrder),
    };

    if (isEdit && category) {
      const { error } = await supabase.from("categories").update(payload).eq("id", category.id);
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      toast.success("Category updated");
    } else {
      const { error } = await supabase.from("categories").insert({ ...payload, id });
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      toast.success("Category created");
    }

    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    onOpenChange(false);
    resetForm();
    setSubmitting(false);
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
              <label className="text-sm font-medium">Sort Order</label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Color Class</label>
            <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="bg-green-100" />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
