import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "@/data/categories";
import { useProducts } from "@/hooks/useProducts";
import { useOffers } from "@/hooks/useOffers";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const { products } = useProducts();
  const { activeOffers } = useOffers();

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
                    <img src={offer.imageUrl} alt="" className="w-full h-28 object-cover" />
                  )}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground">{offer.titleAr}</h3>
                      {offer.discountPercent && (
                        <span className="shrink-0 px-2 py-0.5 bg-destructive text-destructive-foreground rounded-full text-xs font-bold">
                          {offer.discountPercent}%
                        </span>
                      )}
                    </div>
                    {offer.descriptionAr && (
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{offer.descriptionAr}</p>
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
                <span>{category.nameAr}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
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
