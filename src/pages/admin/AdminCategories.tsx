import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/products";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Category {
  id: string;
  name_ar: string;
  name_en: string | null;
  emoji: string;
  slug: string;
  color: string;
  sort_order: number;
}

function mapRow(row: any): Product {
  return {
    id: row.id,
    nameAr: row.name_ar,
    nameEn: row.name_en ?? undefined,
    emoji: row.emoji,
    imageUrl: row.image_url ?? undefined,
    price: Number(row.price),
    unit: row.unit,
    categoryId: row.category_id,
    isActive: row.is_active,
    isFeatured: row.is_featured,
  };
}

function SortableProductCard({ row, index }: { row: any; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
    touchAction: "none" as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative cursor-grab active:cursor-grabbing">
      <ProductCard product={mapRow(row)} />
      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow">
        {index + 1}
      </div>
    </div>
  );
}

function CategoryProductsView({ category, onBack }: { category: Category; onBack: () => void }) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["category-products", category.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", category.id)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = products.findIndex((p) => p.id === active.id);
    const newIndex = products.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(products, oldIndex, newIndex);

    setSaving(true);
    try {
      await Promise.all(
        reordered.map((p, i) =>
          supabase.from("products").update({ sort_order: i } as any).eq("id", p.id)
        )
      );
      await refetch();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (e) {
      console.error("Reorder failed:", e);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-3xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{category.name_ar}</h1>
          <p className="text-sm text-muted-foreground">{products.length} products · Press & hold to reorder</p>
        </div>
        {saving && <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-muted-foreground">No products in this category</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={products.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {products.map((row, index) => (
                <SortableProductCard key={row.id} row={row} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default function AdminCategories() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

  if (selectedCategory) {
    return <CategoryProductsView category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

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
          <div
            key={cat.id}
            className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors"
            onClick={() => setSelectedCategory(cat)}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.emoji}</span>
              <div>
                <p className="font-bold text-foreground">{cat.name_ar}</p>
                <p className="text-sm text-muted-foreground">{cat.name_en} · {cat.slug}</p>
              </div>
            </div>
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="ltr">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          const id = isEdit && category ? category.id : slug.toLowerCase().replace(/\s+/g, "-");
          onSave({
            id,
            name_ar: nameAr,
            name_en: nameEn || null,
            emoji,
            slug: id,
            color,
            sort_order: category?.sort_order ?? 0,
          }, isEdit);
        }} className="space-y-4">
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
