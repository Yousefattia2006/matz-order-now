import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { SpecialOfferPopup } from "@/components/SpecialOfferPopup";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      let query = supabase.from("products").select("*").eq("is_active", true);
      if (selectedCategory) query = query.eq("category_id", selectedCategory);
      const { data, error } = await query.order("created_at");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen py-4 md:py-8">
      <SpecialOfferPopup />
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1">
            طازج كل يوم 💜
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            اختار من منتجاتنا الطازجة واطلب دلوقتي
          </p>
        </div>

        <div className="mb-6 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 md:gap-3 pb-2 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-3 rounded-full text-base md:text-lg font-semibold transition-all whitespace-nowrap ${
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
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-full text-base md:text-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
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

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">{products.length} منتج متاح</p>
        </div>
      </div>
    </div>
  );
}
