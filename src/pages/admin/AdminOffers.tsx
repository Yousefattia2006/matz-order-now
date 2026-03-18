import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Offer = Tables<"special_offers">;

export default function AdminOffers() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["admin-offers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("special_offers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("special_offers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
      toast.success("Offer deleted");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Special Offers</h1>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Offer
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : offers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No offers yet. Create one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{offer.title_ar}</h3>
                  {offer.discount_percent && (
                    <span className="inline-block mt-1 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-bold">
                      {offer.discount_percent}% OFF
                    </span>
                  )}
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
              {offer.image_url && <img src={offer.image_url} alt="" className="w-full h-32 object-cover rounded-xl mb-2" />}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{offer.is_active ? "🟢 Active" : "🔴 Inactive"}</span>
                <span>From: {new Date(offer.start_date).toLocaleDateString()}</span>
                {offer.end_date && <span>To: {new Date(offer.end_date).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <OfferFormDialog open={dialogOpen} onOpenChange={setDialogOpen} offer={editing} />
    </div>
  );
}

function OfferFormDialog({
  open, onOpenChange, offer,
}: {
  open: boolean; onOpenChange: (v: boolean) => void; offer: Offer | null;
}) {
  const queryClient = useQueryClient();
  const isEdit = !!offer;

  const [titleAr, setTitleAr] = useState(offer?.title_ar ?? "");
  const [descriptionAr, setDescriptionAr] = useState(offer?.description_ar ?? "");
  const [discountPercent, setDiscountPercent] = useState(offer?.discount_percent?.toString() ?? "");
  const [imageUrl, setImageUrl] = useState(offer?.image_url ?? "");
  const [isActive, setIsActive] = useState(offer?.is_active ?? true);
  const [startDate, setStartDate] = useState(offer?.start_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(offer?.end_date?.slice(0, 10) ?? "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setTitleAr(offer?.title_ar ?? "");
    setDescriptionAr(offer?.description_ar ?? "");
    setDiscountPercent(offer?.discount_percent?.toString() ?? "");
    setImageUrl(offer?.image_url ?? "");
    setIsActive(offer?.is_active ?? true);
    setStartDate(offer?.start_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
    setEndDate(offer?.end_date?.slice(0, 10) ?? "");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `offers/${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) { toast.error("Upload failed"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
    setImageUrl(urlData.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title_ar: titleAr,
      description_ar: descriptionAr || null,
      discount_percent: discountPercent ? parseInt(discountPercent) : null,
      image_url: imageUrl || null,
      is_active: isActive,
      start_date: new Date(startDate).toISOString(),
      end_date: endDate ? new Date(endDate).toISOString() : null,
    };

    if (isEdit && offer) {
      const { error } = await supabase.from("special_offers").update(payload).eq("id", offer.id);
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      toast.success("Offer updated");
    } else {
      const { error } = await supabase.from("special_offers").insert(payload);
      if (error) { toast.error(error.message); setSubmitting(false); return; }
      toast.success("Offer created");
    }

    queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
    onOpenChange(false);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (v) resetForm(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="ltr">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Offer" : "Add Offer"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title (Arabic) *</label>
            <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required dir="rtl" />
          </div>
          <div>
            <label className="text-sm font-medium">Description (Arabic)</label>
            <Textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} dir="rtl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Discount %</label>
              <Input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} min="0" max="100" />
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
            <label className="text-sm font-medium">Offer Image</label>
            {imageUrl && <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded-xl mb-2" />}
            <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-xl p-4 hover:bg-secondary/50 transition-colors">
              <span className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Click to upload"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
