import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
    >
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
        <h3
          className={`font-bold text-foreground leading-tight ${
            compact ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {product.nameAr}
        </h3>
        <p className="text-muted-foreground text-xs mt-1">{product.unit}</p>
        <p
          className={`font-bold text-accent mt-auto pt-2 ${
            compact ? "text-lg" : "text-xl md:text-2xl"
          }`}
        >
          {product.price} ج
        </p>

        {quantity === 0 ? (
          <Button
            variant="default"
            size={compact ? "default" : "lg"}
            className="w-full mt-3 gap-2"
            onClick={() => addItem(product)}
          >
            <Plus className="h-5 w-5" />
            أضف للسلة
          </Button>
        ) : (
          <div className="flex items-center justify-between mt-3 bg-primary/10 rounded-xl p-1">
            <Button
              variant="default"
              size="icon"
              className="h-11 w-11 rounded-lg"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold text-foreground min-w-[40px] text-center">
              {quantity}
            </span>
            <Button
              variant="default"
              size="icon"
              className="h-11 w-11 rounded-lg"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
