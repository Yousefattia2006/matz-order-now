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
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-0" dir="rtl">
        <div className="relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur rounded-full p-1.5 hover:bg-background transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground text-center">
            <h2 className="text-2xl font-bold mb-1">🎉 عروض خاصة!</h2>
            <p className="text-primary-foreground/80">لا تفوت عروضنا الحصرية</p>
          </div>

          <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-card rounded-xl border border-border overflow-hidden">
                {offer.image_url && (
                  <div className="w-full aspect-square overflow-hidden">
                    <img src={offer.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-lg">{offer.title_ar}</h3>
                  {offer.description_ar && (
                    <p className="text-muted-foreground text-sm mt-1">{offer.description_ar}</p>
                  )}
                  {(offer as any).price > 0 && (
                    <p className="font-bold text-accent text-xl mt-2">{(offer as any).price} ج</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <Button
              className="w-full text-lg py-6"
              onClick={() => { setOpen(false); navigate("/shop"); }}
            >
              تسوق الآن 🛒
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
