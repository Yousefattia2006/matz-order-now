import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { deliveryZones, getZoneById } from "@/data/deliveryZones";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, ArrowRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    sameWhatsapp: true,
    zoneId: "",
    notes: "",
    preferredTime: "morning",
    acceptTerms: false,
  });

  const selectedZone = formData.zoneId ? getZoneById(formData.zoneId) : null;
  const deliveryFee = selectedZone?.fee || 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("الرجاء إدخال الاسم");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("الرجاء إدخال رقم الموبايل");
      return;
    }
    if (!formData.zoneId) {
      toast.error("الرجاء اختيار منطقة التوصيل");
      return;
    }
    if (!formData.acceptTerms) {
      toast.error("الرجاء الموافقة على شروط الطلب");
      return;
    }

    setIsSubmitting(true);

    // Build WhatsApp message
    const whatsappNumber = formData.sameWhatsapp ? formData.phone : formData.whatsapp;
    const zone = getZoneById(formData.zoneId);
    const timeLabels: Record<string, string> = {
      morning: "صباحاً (9-12)",
      afternoon: "ظهراً (12-3)",
      evening: "مساءً (3-6)",
    };

    let itemsList = items
      .map(
        (item) =>
          `- ${item.product.nameAr} × ${item.quantity} = ${
            item.product.price * item.quantity
          } ج`
      )
      .join("\n");

    const message = `🛒 *طلب جديد من تازة مارت*

👤 *الاسم:* ${formData.name}
📍 *المنطقة:* ${zone?.nameAr || ""}
📞 *رقم الموبايل:* ${formData.phone}

📦 *تفاصيل الطلب:*
${itemsList}

💰 *إجمالي المنتجات:* ${subtotal} ج
🚚 *رسوم التوصيل:* ${deliveryFee} ج
✅ *الإجمالي الكلي:* ${total} ج

⏰ *وقت التسليم المفضل:* ${timeLabels[formData.preferredTime]}
${formData.notes ? `📝 *ملاحظات:* ${formData.notes}` : ""}

شكراً لتسوقك مع تازة مارت! 🌿`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201000000000?text=${encodedMessage}`;

    // Store order data for confirmation page
    sessionStorage.setItem(
      "tazamart-last-order",
      JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        zone: zone?.nameAr,
        items: items.map((i) => ({
          name: i.product.nameAr,
          qty: i.quantity,
          price: i.product.price,
        })),
        subtotal,
        deliveryFee,
        total,
        preferredTime: timeLabels[formData.preferredTime],
      })
    );

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Clear cart and navigate to confirmation
    clearCart();
    navigate("/order-confirmed");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            السلة فاضية!
          </h1>
          <p className="text-muted-foreground text-xl mb-8">
            أضف منتجات للسلة أولاً
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            إتمام الطلب 📝
          </h1>
          <p className="text-muted-foreground text-lg">
            أكمل بياناتك لتأكيد الطلب
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  معلوماتك 👤
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-lg font-medium">
                      الاسم بالكامل *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="محمد أحمد"
                      className="mt-2 h-14 text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-lg font-medium">
                      رقم الموبايل *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01X XXXX XXXX"
                      className="mt-2 h-14 text-lg"
                      dir="ltr"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="sameWhatsapp"
                      checked={formData.sameWhatsapp}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          sameWhatsapp: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="sameWhatsapp" className="text-lg">
                      نفس رقم الواتساب
                    </Label>
                  </div>
                  {!formData.sameWhatsapp && (
                    <div>
                      <Label htmlFor="whatsapp" className="text-lg font-medium">
                        رقم الواتساب
                      </Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="01X XXXX XXXX"
                        className="mt-2 h-14 text-lg"
                        dir="ltr"
                      />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Delivery Zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  منطقة التوصيل 📍
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {deliveryZones
                    .filter((z) => z.isActive)
                    .map((zone) => (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, zoneId: zone.id }))
                        }
                        className={`p-4 rounded-xl text-center transition-all ${
                          formData.zoneId === zone.id
                            ? "bg-primary text-primary-foreground shadow-fresh"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        <p className="font-bold text-lg">{zone.nameAr}</p>
                        <p
                          className={`text-sm mt-1 ${
                            formData.zoneId === zone.id
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {zone.fee} ج توصيل
                        </p>
                      </button>
                    ))}
                </div>
              </motion.div>

              {/* Preferred Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  وقت التسليم المفضل ⏰
                </h2>
                <RadioGroup
                  value={formData.preferredTime}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, preferredTime: value }))
                  }
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { value: "morning", label: "صباحاً (9-12)" },
                    { value: "afternoon", label: "ظهراً (12-3)" },
                    { value: "evening", label: "مساءً (3-6)" },
                  ].map((time) => (
                    <div
                      key={time.value}
                      className="flex items-center gap-3 bg-secondary px-4 py-3 rounded-xl"
                    >
                      <RadioGroupItem value={time.value} id={time.value} />
                      <Label htmlFor={time.value} className="text-lg cursor-pointer">
                        {time.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  ملاحظات خاصة 📝
                </h2>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="أي ملاحظات على الطلب..."
                  className="min-h-[120px] text-lg"
                />
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  ملخص الطلب
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <span className="text-2xl">{item.product.emoji}</span>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {item.product.nameAr}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {item.product.price} ج
                        </p>
                      </div>
                      <p className="font-bold text-foreground">
                        {item.product.price * item.quantity} ج
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">إجمالي المنتجات</span>
                    <span className="font-bold text-foreground">{subtotal} ج</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">رسوم التوصيل</span>
                    <span className="font-bold text-foreground">
                      {deliveryFee > 0 ? `${deliveryFee} ج` : "اختر المنطقة"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-xl font-bold text-foreground">
                      الإجمالي الكلي
                    </span>
                    <span className="text-2xl font-bold text-accent">
                      {total} ج
                    </span>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 mt-6">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        acceptTerms: checked as boolean,
                      }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="acceptTerms" className="text-base leading-relaxed">
                    بأكد إن البيانات صحيحة وموافق على استلام الطلب والدفع عند
                    الاستلام
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="warm"
                  size="xl"
                  className="w-full mt-6 gap-2"
                  disabled={isSubmitting}
                >
                  <MessageCircle className="h-6 w-6" />
                  تأكيد الطلب عبر واتساب
                </Button>

                <Link to="/cart" className="block mt-4">
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <ArrowRight className="h-5 w-5 rotate-180" />
                    رجوع للسلة
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
