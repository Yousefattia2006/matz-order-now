import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const POPUP_KEY = "tazamart-offer-seen";

export function SpecialOfferPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: offers } = useQuery({
    queryKey: ["active-offers"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("special_offers")
        .select("*")
        .eq("is_active", true)
        .lte("start_date", now)
        .or(`end_date.is.null,end_date.gte.${now}`)
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (offers && offers.length > 0) {
      const seen = sessionStorage.getItem(POPUP_KEY);
      if (!seen) {
        setOpen(true);
        sessionStorage.setItem(POPUP_KEY, "1");
      }
    }
  }, [offers]);

  if (!offers || offers.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-[340px] w-[90vw] p-0 overflow-hidden rounded-2xl border-0 gap-0 [&>button]:hidden"
        dir="rtl"
      >
        {/* Single close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2.5 left-2.5 z-20 bg-background/80 backdrop-blur rounded-full p-1.5 hover:bg-background transition-colors shadow-sm"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-4 text-primary-foreground text-center">
          <h2 className="text-lg font-bold">🎉 عروض خاصة!</h2>
          <p className="text-primary-foreground/80 text-sm">لا تفوت عروضنا الحصرية</p>
        </div>

        <div className="px-3 py-3 space-y-2.5 max-h-[45vh] overflow-y-auto">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-card rounded-xl border border-border overflow-hidden">
              {offer.image_url && (
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={offer.image_url}
                    alt={offer.title_ar}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-3">
                <h3 className="font-bold text-foreground text-base leading-snug">{offer.title_ar}</h3>
                {offer.description_ar && (
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{offer.description_ar}</p>
                )}
                {(offer.price ?? 0) > 0 && (
                  <p className="font-bold text-accent text-lg mt-1.5">{offer.price} ج</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 pb-3 pt-1">
          <Button
            className="w-full text-base py-5"
            onClick={() => { setOpen(false); navigate("/shop"); }}
          >
            تسوق الآن 🛒
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
