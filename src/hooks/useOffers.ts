import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Offer {
  id: string;
  titleAr: string;
  descriptionAr: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  discountPercent: number | null;
}

function mapRow(row: any): Offer {
  return {
    id: row.id,
    titleAr: row.title_ar,
    descriptionAr: row.description_ar ?? "",
    price: Number(row.price ?? 0),
    imageUrl: row.image_url ?? "",
    isActive: row.is_active,
    startDate: row.start_date ? row.start_date.slice(0, 10) : "",
    endDate: row.end_date ? row.end_date.slice(0, 10) : "",
    discountPercent: row.discount_percent ?? null,
  };
}

export function useOffers() {
  const { data: offers = [], refetch } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("special_offers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapRow);
    },
    staleTime: 1000 * 60,
  });

  const activeOffers = offers.filter((o) => {
    if (!o.isActive) return false;
    const now = new Date().toISOString().slice(0, 10);
    if (o.startDate && o.startDate > now) return false;
    if (o.endDate && o.endDate < now) return false;
    return true;
  });

  const addOffer = async (offer: Omit<Offer, "id">) => {
    const { error } = await supabase.from("special_offers").insert({
      title_ar: offer.titleAr,
      description_ar: offer.descriptionAr || null,
      price: offer.price,
      image_url: offer.imageUrl || null,
      is_active: offer.isActive,
      start_date: offer.startDate,
      end_date: offer.endDate || null,
      discount_percent: null,
    });
    if (error) throw error;
    await refetch();
  };

  const updateOffer = async (offer: Offer) => {
    const { error } = await supabase.from("special_offers").update({
      title_ar: offer.titleAr,
      description_ar: offer.descriptionAr || null,
      price: offer.price,
      image_url: offer.imageUrl || null,
      is_active: offer.isActive,
      start_date: offer.startDate,
      end_date: offer.endDate || null,
      discount_percent: null,
    }).eq("id", offer.id);
    if (error) throw error;
    await refetch();
  };

  const deleteOffer = async (id: string) => {
    const { error } = await supabase.from("special_offers").delete().eq("id", id);
    if (error) throw error;
    await refetch();
  };

  return { offers, activeOffers, addOffer, updateOffer, deleteOffer, refetch };
}
