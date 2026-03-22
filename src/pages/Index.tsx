import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useOffers } from "@/hooks/useOffers";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { SpecialOfferPopup } from "@/components/SpecialOfferPopup";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/data/products";

function offerToProduct(offer: any): Product {
  return {
    id: `offer-${offer.id}`,
    nameAr: offer.titleAr,
    emoji: "🔥",
    imageUrl: offer.imageUrl || undefined,
    price: offer.price,
    unit: "عرض",
    categoryId: "offers",
    isActive: true,
  };
}

function OfferCard({ offer }: { offer: any }) {
  const { items, addItem, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);
  const product = offerToProduct(offer);
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="min-w-[130px] max-w-[150px] bg-card rounded-xl border border-primary/20 overflow-hidden shrink-0 flex flex-col">
      <div className="relative w-full aspect-square bg-secondary/50 flex items-center justify-center overflow-hidden">
        {offer.imageUrl && !imgError ? (
          <img src={offer.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <span className="text-5xl select-none">🔥</span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-sm leading-tight">{offer.titleAr}</h3>
        {offer.descriptionAr && (
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{offer.descriptionAr}</p>
        )}
        {offer.price > 0 && (
          <p className="font-bold text-accent text-lg mt-auto pt-1">{offer.price} ج</p>
        )}
        {quantity === 0 ? (
          <Button variant="default" size="default" className="w-full mt-2 gap-1 text-sm" onClick={() => addItem(product)}>
            <Plus className="h-4 w-4" />
            أضف للسلة
          </Button>
        ) : (
          <div className="flex items-center justify-between mt-2 bg-primary/10 rounded-xl p-1">
            <Button variant="default" size="icon" className="h-9 w-9 rounded-lg" onClick={() => updateQuantity(product.id, quantity - 1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold text-foreground min-w-[30px] text-center">{quantity}</span>
            <Button variant="default" size="icon" className="h-9 w-9 rounded-lg" onClick={() => updateQuantity(product.id, quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { products } = useProducts();
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
                <OfferCard key={offer.id} offer={offer} />
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
                <span>{category.name_ar}</span>
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
