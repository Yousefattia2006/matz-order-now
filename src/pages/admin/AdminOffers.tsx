import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface OfferRow {
  id: string;
  title_ar: string;
  description_ar: string | null;
  price: number;
  image_url: string | null;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
}

export default function AdminOffers() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<OfferRow | null>(null);

  const { data: offers = [] } = useQuery({
    queryKey: ["admin-offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("special_offers")
        .select("id, title_ar, description_ar, price, image_url, is_active, start_date, end_date")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as OfferRow[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("special_offers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      queryClient.invalidateQueries({ queryKey: ["active-offers"] });
      toast.success("Offer deleted");
    },
  });

  const handleSave = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
    queryClient.invalidateQueries({ queryKey: ["active-offers"] });
    setDialogOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Special Offers</h1>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Offer
        </Button>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No offers yet. Create one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{offer.title_ar}</h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
                    {offer.price} ج
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditing(offer); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(offer.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {offer.description_ar && <p className="text-muted-foreground text-sm mb-2">{offer.description_ar}</p>}
              {offer.image_url && (
                <div className="w-full aspect-square overflow-hidden rounded-xl mb-2">
                  <img src={offer.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{offer.is_active ? "🟢 Active" : "🔴 Inactive"}</span>
                <span>From: {offer.start_date?.slice(0, 10)}</span>
                {offer.end_date && <span>To: {offer.end_date.slice(0, 10)}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <OfferFormDialog open={dialogOpen} onOpenChange={setDialogOpen} offer={editing} onSave={handleSave} />
    </div>
  );
}

function OfferFormDialog({
  open, onOpenChange, offer, onSave,
}: {
  open: boolean; onOpenChange: (v: boolean) => void; offer: OfferRow | null; onSave: () => void;
}) {
  const isEdit = !!offer;

  const [titleAr, setTitleAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [price, setPrice] = useState("0");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (open) {
      setTitleAr(offer?.title_ar ?? "");
      setDescriptionAr(offer?.description_ar ?? "");
      setPrice(offer?.price?.toString() ?? "0");
      setImageUrl(offer?.image_url ?? "");
      setIsActive(offer?.is_active ?? true);
      setStartDate(offer?.start_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
      setEndDate(offer?.end_date?.slice(0, 10) ?? "");
    }
  }, [open, offer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title_ar: titleAr,
      description_ar: descriptionAr || null,
      price: parseFloat(price),
      image_url: imageUrl || null,
      is_active: isActive,
      start_date: startDate,
      end_date: endDate || null,
      discount_percent: null,
    };

    if (isEdit && offer) {
      const { error } = await supabase.from("special_offers").update(payload).eq("id", offer.id);
      if (error) { toast.error("Failed to update"); return; }
      toast.success("Offer updated");
    } else {
      const { error } = await supabase.from("special_offers").insert(payload);
      if (error) { toast.error("Failed to create"); return; }
      toast.success("Offer created");
    }
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="ltr">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Offer" : "Add Offer"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name (Arabic) *</label>
            <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required dir="rtl" />
          </div>
          <div>
            <label className="text-sm font-medium">Description (Arabic)</label>
            <Textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} dir="rtl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price (EGP) *</label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.5" required />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mt-6">
                <Switch checked={isActive} onCheckedChange={setIsActive} /> Active
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Image</label>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>
          <Button type="submit" className="w-full">
            {isEdit ? "Update Offer" : "Create Offer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
