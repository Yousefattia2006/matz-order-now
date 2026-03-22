import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartBar() {
  const { itemCount, subtotal } = useCart();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          key="cart-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-primary text-primary-foreground shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
          style={{ position: "fixed" }}
        >
          <Link to="/cart" className="block">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/20 rounded-full p-2">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-lg">{itemCount} منتج</p>
                  <p className="font-bold text-sm opacity-90">{subtotal} ج</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold text-lg">
                عرض السلة
                <ArrowLeft className="h-5 w-5" />
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
