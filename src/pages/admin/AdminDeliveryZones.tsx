import { useState } from "react";
import { useDeliveryZones } from "@/hooks/useDeliveryZones";
import { DeliveryZone } from "@/data/deliveryZones";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";

export default function AdminDeliveryZones() {
  const { zones, addZone, updateZone, deleteZone } = useDeliveryZones();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ nameAr: "", nameEn: "", fee: "" });

  const resetForm = () => {
    setForm({ nameAr: "", nameEn: "", fee: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.nameAr.trim()) { toast.error("Enter location name"); return; }
    if (!form.fee || isNaN(Number(form.fee))) { toast.error("Enter valid delivery fee"); return; }

    if (editingId) {
      updateZone({ id: editingId, nameAr: form.nameAr, nameEn: form.nameEn, fee: Number(form.fee), isActive: true });
      toast.success("Location updated");
    } else {
      const id = form.nameEn.toLowerCase().replace(/\s+/g, "-") || `zone-${Date.now()}`;
      addZone({ id, nameAr: form.nameAr, nameEn: form.nameEn, fee: Number(form.fee), isActive: true });
      toast.success("Location added");
    }
    resetForm();
  };

  const handleEdit = (zone: DeliveryZone) => {
    setEditingId(zone.id);
    setForm({ nameAr: zone.nameAr, nameEn: zone.nameEn, fee: String(zone.fee) });
    setShowForm(true);
  };

  const handleDelete = (zone: DeliveryZone) => {
    if (confirm(`Delete "${zone.nameAr}"?`)) {
      deleteZone(zone.id);
      toast.success("Location deleted");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Delivery Locations</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-4 mb-6 border border-border">
          <h2 className="font-bold mb-4">{editingId ? "Edit Location" : "New Location"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label>Name (Arabic) *</Label>
              <Input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} placeholder="المعادي" className="mt-1" />
            </div>
            <div>
              <Label>Name (English)</Label>
              <Input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} placeholder="Maadi" className="mt-1" />
            </div>
            <div>
              <Label>Delivery Fee (EGP) *</Label>
              <Input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} placeholder="25" className="mt-1" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} className="gap-2"><Check className="h-4 w-4" /> Save</Button>
            <Button variant="outline" onClick={resetForm} className="gap-2"><X className="h-4 w-4" /> Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {zones.map((zone) => (
          <div key={zone.id} className="flex items-center justify-between bg-card rounded-xl p-3 border border-border">
            <div className="min-w-0">
              <p className="font-bold text-foreground truncate">{zone.nameAr}</p>
              <p className="text-sm text-muted-foreground">{zone.nameEn} — {zone.fee} EGP</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(zone)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(zone)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
        {zones.length === 0 && <p className="text-muted-foreground text-center py-8">No delivery locations yet.</p>}
      </div>
    </div>
  );
}
