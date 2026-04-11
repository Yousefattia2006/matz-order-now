import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useDeliveryZones } from "@/hooks/useDeliveryZones";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, ArrowLeft, ArrowRight, ShoppingCart, MapPin } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function CheckoutItemImage({ product }: { product: { imageUrl?: string; emoji: string; nameAr: string } }) {
  const [imgError, setImgError] = useState(false);
  return product.imageUrl && !imgError ? (
    <img src={product.imageUrl} alt={product.nameAr} className="w-full h-full object-cover" onError={() => setImgError(true)} />
  ) : (
    <span className="text-2xl">{product.emoji}</span>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { activeZones, getZoneById } = useDeliveryZones();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    zoneId: "",
    addressText: "",
    googleMapsLink: "",
  });
  const [cleaningRequested, setCleaningRequested] = useState(false);
  const cleaningFee = cleaningRequested ? 50 : 0;

  const selectedZone = formData.zoneId ? getZoneById(formData.zoneId) : null;
  const deliveryFee = selectedZone?.fee || 0;
  const total = subtotal + deliveryFee + cleaningFee;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.zoneId) { toast.error("الرجاء اختيار منطقة التوصيل"); return; }
      setStep(2);
    } else if (step === 2) {
      if (!formData.addressText.trim() && !formData.googleMapsLink.trim()) { toast.error("الرجاء إدخال العنوان أو رابط الموقع"); return; }
      setStep(3);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleConfirm = () => {
    setIsSubmitting(true);
    const zone = getZoneById(formData.zoneId);
    let itemsList = items.map((item) => `- ${item.product.nameAr} × ${item.quantity} = ${item.product.price * item.quantity} ج`).join("\n");

    const message = `🛒 *طلب جديد من TazaMart*\n\n📍 *المنطقة:* ${zone?.nameAr || ""}\n📌 *العنوان:* ${formData.addressText}\n${formData.googleMapsLink ? `🗺 *موقع جوجل ماب:* ${formData.googleMapsLink}` : ""}\n\n📦 *تفاصيل الطلب:*\n${itemsList}\n\n💰 *إجمالي المنتجات:* ${subtotal} ج\n🚚 *رسوم التوصيل:* ${deliveryFee} ج\n✅ *الإجمالي الكلي:* ${total} ج\n\nشكراً لتسوقك مع TazaMart! 💜`;

    sessionStorage.setItem("tazamart-last-order", JSON.stringify({
      zone: zone?.nameAr, address: formData.addressText,
      items: items.map((i) => ({ name: i.product.nameAr, qty: i.quantity, price: i.product.price })),
      subtotal, deliveryFee, total,
    }));

    const whatsappUrl = `https://wa.me/201555541885?text=${encodeURIComponent(message)}`;
    clearCart();
    navigate("/order-confirmed");
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">السلة فاضية!</h1>
          <p className="text-muted-foreground text-xl mb-8">أضف منتجات للسلة أولاً</p>
          <Link to="/"><Button variant="default" size="xl" className="gap-2"><ShoppingCart className="h-5 w-5" />ابدأ التسوق</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{s}</div>
              {s < 3 && <div className={`w-8 h-1 rounded ${step > s ? "bg-primary" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">اختار منطقة التوصيل 📍</h2>
            <div className="grid grid-cols-2 gap-3">
              {activeZones.map((zone) => (
                <button key={zone.id} type="button" onClick={() => setFormData((prev) => ({ ...prev, zoneId: zone.id }))}
                  className={`p-4 rounded-xl text-center transition-all break-words ${formData.zoneId === zone.id ? "bg-primary text-primary-foreground shadow-fresh" : "bg-card text-foreground hover:bg-secondary"}`}>
                  <p className="font-bold text-base leading-tight">{zone.nameAr}</p>
                  <p className={`text-sm mt-1 ${formData.zoneId === zone.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{zone.fee} ج توصيل</p>
                </button>
              ))}
            </div>
            <Button variant="warm" size="xl" className="w-full mt-8 gap-2" onClick={handleNext}>التالي<ArrowLeft className="h-5 w-5" /></Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">العنوان بالتفصيل 📌</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="addressText" className="text-lg font-medium">اكتب عنوانك</Label>
                <Input id="addressText" value={formData.addressText} onChange={(e) => setFormData((prev) => ({ ...prev, addressText: e.target.value }))} placeholder="مثال: شارع 9، عمارة 15، الدور 3" className="mt-2 h-14 text-lg" />
              </div>
              <div>
                <Label htmlFor="googleMapsLink" className="text-lg font-medium flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />رابط جوجل ماب</Label>
                <Input id="googleMapsLink" value={formData.googleMapsLink} onChange={(e) => setFormData((prev) => ({ ...prev, googleMapsLink: e.target.value }))} placeholder="https://maps.google.com/..." className="mt-2 h-14 text-base w-full" dir="ltr" />
                <p className="text-muted-foreground text-sm mt-2">افتح جوجل ماب → اختار موقعك → اضغط مشاركة → انسخ الرابط</p>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button variant="outline" size="xl" className="flex-1 gap-2" onClick={handleBack}><ArrowRight className="h-5 w-5" />رجوع</Button>
              <Button variant="warm" size="xl" className="flex-1 gap-2" onClick={handleNext}>التالي<ArrowLeft className="h-5 w-5" /></Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">ملخص الطلب ✅</h2>
            <div className="bg-card rounded-2xl p-5 mb-4">
              <div className="flex justify-between mb-2"><span className="text-muted-foreground">المنطقة</span><span className="font-bold text-foreground">{selectedZone?.nameAr}</span></div>
              {formData.addressText && <div className="flex justify-between mb-2"><span className="text-muted-foreground shrink-0">العنوان</span><span className="font-medium text-foreground text-sm text-left max-w-[60%] break-words">{formData.addressText}</span></div>}
              {formData.googleMapsLink && <div className="flex justify-between"><span className="text-muted-foreground shrink-0">الموقع</span><a href={formData.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm truncate max-w-[60%]">فتح في جوجل ماب</a></div>}
            </div>
            <div className="bg-card rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-foreground mb-4">المنتجات</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary/50 flex items-center justify-center"><CheckoutItemImage product={item.product} /></div>
                    <div className="flex-grow min-w-0"><p className="font-bold text-foreground truncate text-sm">{item.product.nameAr}</p><p className="text-sm text-muted-foreground">{item.quantity} × {item.product.price} ج</p></div>
                    <p className="font-bold text-foreground text-sm shrink-0">{item.product.price * item.quantity} ج</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-5 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg"><span className="text-muted-foreground">إجمالي المنتجات</span><span className="font-bold text-foreground">{subtotal} ج</span></div>
                <div className="flex justify-between text-lg"><span className="text-muted-foreground">رسوم التوصيل</span><span className="font-bold text-foreground">{deliveryFee} ج</span></div>
                <div className="flex justify-between border-t border-border pt-3"><span className="text-xl font-bold text-foreground">الإجمالي</span><span className="text-2xl font-bold text-accent">{total} ج</span></div>
              </div>
            </div>
            <Button variant="warm" size="xl" className="w-full gap-2" onClick={handleConfirm} disabled={isSubmitting}><MessageCircle className="h-6 w-6" />تأكيد الطلب عبر واتساب</Button>
            <p className="text-center text-muted-foreground text-sm mt-2">سيتم إرسال الطلب عبر واتساب</p>
            <Button variant="outline" size="lg" className="w-full mt-4 gap-2" onClick={handleBack}><ArrowRight className="h-5 w-5" />رجوع</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
