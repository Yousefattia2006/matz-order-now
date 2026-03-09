import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Emoji Icon */}
      <div
        className={`${
          compact ? "text-4xl mb-2" : "text-5xl md:text-6xl mb-3"
        } select-none`}
      >
        {product.emoji}
      </div>

      {/* Product Name */}
      <h3
        className={`font-bold text-foreground leading-tight ${
          compact ? "text-base" : "text-lg md:text-xl"
        }`}
      >
        {product.nameAr}
      </h3>

      {/* Unit/Weight */}
      <p className="text-muted-foreground text-sm mt-1">{product.unit}</p>

      {/* Price */}
      <p
        className={`font-bold text-accent mt-2 ${
          compact ? "text-xl" : "text-2xl md:text-3xl"
        }`}
      >
        {product.price} ج
      </p>

      {/* Add to Cart Button */}
      <Button
        variant="default"
        size={compact ? "default" : "lg"}
        className="w-full mt-4 gap-2"
        onClick={() => addItem(product)}
      >
        <Plus className="h-5 w-5" />
        أضف للسلة
      </Button>
    </motion.div>
  );
}
