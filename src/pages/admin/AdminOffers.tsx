import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useOffers, Offer } from "@/hooks/useOffers";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminOffers() {
  const { offers, addOffer, updateOffer, deleteOffer } = useOffers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);

  const handleDelete = async (id: string) => {
    try { await deleteOffer(id); } catch (e) { console.error("Delete failed:", e); }
  };

  const handleSave = async (offer: Offer, isEdit: boolean) => {
    try {
      if (isEdit) {
        await updateOffer(offer);
      } else {
        await addOffer(offer);
      }
      setDialogOpen(false);
      setEditing(null);
    } catch (e) {
      console.error("Save failed:", e);
    }
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
                  <h3 className="font-bold text-lg text-foreground">{offer.titleAr}</h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
                    {offer.price} ج
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditing(offer); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {offer.descriptionAr && <p className="text-muted-foreground text-sm mb-2">{offer.descriptionAr}</p>}
              {offer.imageUrl && (
                <div className="w-full aspect-square overflow-hidden rounded-xl mb-2">
                  <img src={offer.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{offer.isActive ? "🟢 Active" : "🔴 Inactive"}</span>
                <span>From: {offer.startDate}</span>
                {offer.endDate && <span>To: {offer.endDate}</span>}
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
  open: boolean; onOpenChange: (v: boolean) => void; offer: Offer | null; onSave: (o: Offer, isEdit: boolean) => void;
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
      setTitleAr(offer?.titleAr ?? "");
      setDescriptionAr(offer?.descriptionAr ?? "");
      setPrice(offer?.price?.toString() ?? "0");
      setImageUrl(offer?.imageUrl ?? "");
      setIsActive(offer?.isActive ?? true);
      setStartDate(offer?.startDate ?? new Date().toISOString().slice(0, 10));
      setEndDate(offer?.endDate ?? "");
    }
  }, [open, offer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const o: Offer = {
      id: isEdit && offer ? offer.id : "",
      titleAr,
      descriptionAr,
      price: parseFloat(price),
      imageUrl,
      isActive,
      startDate,
      endDate,
      discountPercent: null,
    };
    onSave(o, isEdit);
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
