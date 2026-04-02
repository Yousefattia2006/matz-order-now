import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

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

export function useProducts() {
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapRow);
    },
    staleTime: 1000 * 60,
  });

  const addProduct = async (product: Product) => {
    const { error } = await supabase.from("products").insert({
      id: product.id,
      name_ar: product.nameAr,
      emoji: product.emoji,
      image_url: product.imageUrl || null,
      price: product.price,
      unit: product.unit,
      category_id: product.categoryId,
      is_active: product.isActive,
      is_featured: product.isFeatured ?? false,
    });
    if (error) throw error;
    await refetch();
  };

  const updateProduct = async (product: Product) => {
    const { error } = await supabase.from("products").update({
      name_ar: product.nameAr,
      emoji: product.emoji,
      image_url: product.imageUrl || null,
      price: product.price,
      unit: product.unit,
      category_id: product.categoryId,
      is_active: product.isActive,
      is_featured: product.isFeatured ?? false,
    }).eq("id", product.id);
    if (error) throw error;
    await refetch();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    await refetch();
  };

  return { products, isLoading, addProduct, updateProduct, deleteProduct, refetch };
}
