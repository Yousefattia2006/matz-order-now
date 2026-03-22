import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function CartItemImage({ item }: { item: { product: { imageUrl?: string; emoji: string; nameAr: string } } }) {
  const [imgError, setImgError] = useState(false);
  return item.product.imageUrl && !imgError ? (
    <img
      src={item.product.imageUrl}
      alt={item.product.nameAr}
      className="w-full h-full object-cover aspect-square"
      onError={() => setImgError(true)}
    />
  ) : (
    <span className="text-3xl md:text-4xl">{item.product.emoji}</span>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">
            🛒
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-4">السلة فاضية!</h1>
          <p className="text-muted-foreground text-xl mb-8">ابدأ التسوق وأضف منتجات للسلة</p>
          <Link to="/shop">
            <Button variant="default" size="xl" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              ابدأ التسوق
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">سلة مشترياتك 🛒</h1>
            <p className="text-muted-foreground text-lg">{items.length} منتج في السلة</p>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={clearCart}
          >
            <Trash2 className="h-5 w-5 ml-2" />
            تفريغ
          </Button>
        </div>

        <div className="bg-card rounded-2xl p-5 mb-8">
          <h3 className="font-bold text-foreground mb-4">المنتجات</h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary/50 flex items-center justify-center">
                  <CartItemImage item={item} />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-foreground truncate text-sm">{item.product.nameAr}</p>
                  <p className="text-sm text-muted-foreground">{item.quantity} × {item.product.price} ج</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="font-bold text-foreground text-sm shrink-0">{item.product.price * item.quantity} ج</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 h-8 w-8"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 mb-4">
          <div className="flex justify-between text-lg mb-2">
            <span className="text-muted-foreground">إجمالي المنتجات</span>
            <span className="font-bold text-foreground">{subtotal} ج</span>
          </div>
          <p className="text-muted-foreground text-sm">+ رسوم التوصيل حسب المنطقة</p>
        </div>

        <Link to="/checkout">
          <Button variant="warm" size="xl" className="w-full gap-2">
            التالي
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <Link to="/" className="block mt-4">
          <Button variant="outline" size="lg" className="w-full">متابعة التسوق</Button>
        </Link>
      </div>
    </div>
  );
}
