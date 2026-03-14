import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingCart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface OrderData {
  zone: string;
  address?: string;
  items: Array<{ name: string; qty: number; price: number }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export default function OrderConfirmed() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("tazamart-last-order");
      if (stored) {
        setOrderData(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load order data:", e);
    }
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            تم استلام طلبك! 💚
          </h1>
          <p className="text-xl text-muted-foreground">
            شكراً لتسوقك مع طازه مارت. هنتواصل معاك قريباً
          </p>
        </motion.div>

        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              ملخص طلبك
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">منطقة التوصيل</span>
                <span className="font-medium text-foreground">{orderData.zone}</span>
              </div>
              {orderData.address && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العنوان</span>
                  <span className="font-medium text-foreground">{orderData.address}</span>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <h3 className="font-bold text-foreground mb-3">المنتجات:</h3>
              <div className="space-y-2">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium text-foreground">
                      {item.price * item.qty} ج
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي المنتجات</span>
                <span className="font-medium text-foreground">{orderData.subtotal} ج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">رسوم التوصيل</span>
                <span className="font-medium text-foreground">{orderData.deliveryFee} ج</span>
              </div>
              <div className="flex justify-between text-xl pt-2 border-t border-border">
                <span className="font-bold text-foreground">الإجمالي الكلي</span>
                <span className="font-bold text-accent">{orderData.total} ج</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="warm" size="xl" className="w-full gap-2">
              <MessageCircle className="h-6 w-6" />
              فتح واتساب
            </Button>
          </a>
          <Link to="/">
            <Button variant="outline" size="xl" className="w-full gap-2">
              <ShoppingCart className="h-5 w-5" />
              تسوق تاني
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="bg-secondary rounded-2xl p-6">
            <p className="text-primary font-bold mt-2">💳 الدفع عند الاستلام</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
