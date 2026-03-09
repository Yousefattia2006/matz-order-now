import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            السلة فاضية!
          </h1>
          <p className="text-muted-foreground text-xl mb-8">
            ابدأ التسوق وأضف منتجات للسلة
          </p>
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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              سلة مشترياتك 🛒
            </h1>
            <p className="text-muted-foreground text-lg">
              {items.length} منتج في السلة
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={clearCart}
          >
            <Trash2 className="h-5 w-5 ml-2" />
            تفريغ السلة
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 md:p-6 flex items-center gap-4"
              >
                {/* Emoji */}
                <div className="text-4xl md:text-5xl flex-shrink-0">
                  {item.product.emoji}
                </div>

                {/* Product Info */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-foreground text-lg md:text-xl truncate">
                    {item.product.nameAr}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.product.unit}
                  </p>
                  <p className="text-accent font-bold text-xl mt-1">
                    {item.product.price} ج
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="w-12 text-center text-xl font-bold text-foreground">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                {/* Item Total */}
                <div className="text-left min-w-[80px]">
                  <p className="text-muted-foreground text-sm">الإجمالي</p>
                  <p className="text-foreground font-bold text-xl">
                    {item.product.price * item.quantity} ج
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">عدد المنتجات</span>
                  <span className="font-bold text-foreground">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">إجمالي المنتجات</span>
                  <span className="font-bold text-foreground">{subtotal} ج</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-foreground">
                      الإجمالي
                    </span>
                    <span className="text-2xl font-bold text-accent">
                      {subtotal} ج
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    + رسوم التوصيل حسب المنطقة
                  </p>
                </div>
              </div>

              <Link to="/checkout">
                <Button variant="warm" size="xl" className="w-full gap-2">
                  إتمام الطلب
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </Button>
              </Link>

              <Link to="/shop" className="block mt-4">
                <Button variant="outline" size="lg" className="w-full">
                  متابعة التسوق
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
