import { useState } from "react";
import { categories } from "@/data/categories";
import { useProducts } from "@/hooks/useProducts";
import { useOffers } from "@/hooks/useOffers";
import { ProductCard } from "@/components/ProductCard";
import { SpecialOfferPopup } from "@/components/SpecialOfferPopup";
import { motion } from "framer-motion";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { products } = useProducts();
  const { activeOffers } = useOffers();

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (selectedCategory) return p.categoryId === selectedCategory;
    return true;
  });

  return (
    <div className="min-h-screen py-4 md:py-8">
      <SpecialOfferPopup />
      <div className="container mx-auto px-4">
        {/* Offers Section */}
        {activeOffers.length > 0 && (
          <div className="mb-6">
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
                <span>{category.nameAr}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
          >
            {filteredProducts.map((product, index) => (
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
          <p className="text-muted-foreground">{filteredProducts.length} منتج متاح</p>
        </div>
      </div>
    </div>
  );
}
