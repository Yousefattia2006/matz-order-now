import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useOffers } from "@/hooks/useOffers";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const { products, isLoading } = useProducts();
  const { activeOffers } = useOffers();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (selectedCategory) return p.categoryId === selectedCategory;
    return true;
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Offers Section */}
        {activeOffers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">🔥 عروض مميزة</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {activeOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="min-w-[260px] max-w-[300px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 overflow-hidden shrink-0"
                >
                  {offer.imageUrl && (
                    <div className="w-full aspect-square overflow-hidden">
                      <img src={offer.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-bold text-foreground">{offer.titleAr}</h3>
                    {offer.descriptionAr && (
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{offer.descriptionAr}</p>
                    )}
                    {offer.price > 0 && (
                      <p className="font-bold text-accent text-lg mt-1">{offer.price} ج</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">تسوق الآن 🛒</h1>
          <p className="text-muted-foreground text-lg">اختر من منتجاتنا الطازجة</p>
        </div>

        <div className="mb-8 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-3 pb-2 min-w-max">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all whitespace-nowrap ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-fresh"
                  : "bg-card text-foreground hover:bg-secondary"
              }`}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-fresh"
                    : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                <span>{category.emoji}</span>
                <span>{category.name_ar}</span>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-border">
                <Skeleton className="w-full aspect-square" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد منتجات متاحة</h3>
            <p className="text-muted-foreground text-lg">جرب اختيار قسم تاني</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-lg">{filteredProducts.length} منتج متاح</p>
        </div>
      </div>
    </div>
  );
}
