import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Product Image or Emoji Fallback */}
      <div className="relative w-full aspect-square bg-secondary/50 flex items-center justify-center overflow-hidden">
        {product.imageUrl && !imgError ? (
          <img
            src={product.imageUrl}
            alt={product.nameAr}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={`${compact ? "text-5xl" : "text-6xl md:text-7xl"} select-none`}>
            {product.emoji}
          </span>
        )}
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        {/* Product Name */}
        <h3
          className={`font-bold text-foreground leading-tight ${
            compact ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {product.nameAr}
        </h3>

        {/* Unit/Weight */}
        <p className="text-muted-foreground text-xs mt-1">{product.unit}</p>

        {/* Price */}
        <p
          className={`font-bold text-accent mt-auto pt-2 ${
            compact ? "text-lg" : "text-xl md:text-2xl"
          }`}
        >
          {product.price} ج
        </p>

        {/* Add to Cart Button */}
        <Button
          variant="default"
          size={compact ? "default" : "lg"}
          className="w-full mt-3 gap-2"
          onClick={() => addItem(product)}
        >
          <Plus className="h-5 w-5" />
          أضف للسلة
        </Button>
      </div>
    </motion.div>
  );
}
