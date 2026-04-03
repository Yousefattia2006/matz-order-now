import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DeliveryZone {
  id: string;
  nameAr: string;
  nameEn: string;
  fee: number;
  isActive: boolean;
}

function mapRow(row: any): DeliveryZone {
  return {
    id: row.id,
    nameAr: row.name_ar,
    nameEn: row.name_en || "",
    fee: Number(row.fee),
    isActive: row.is_active,
  };
}

export function useDeliveryZones() {
  const queryClient = useQueryClient();
  const queryKey = ["delivery-zones"];

  const { data: zones = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("delivery_zones")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data || []).map(mapRow);
    },
  });

  const addZone = useMutation({
    mutationFn: async (zone: DeliveryZone) => {
      const { error } = await supabase.from("delivery_zones").insert({
        id: zone.id,
        name_ar: zone.nameAr,
        name_en: zone.nameEn,
        fee: zone.fee,
        is_active: zone.isActive,
        sort_order: zones.length,
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateZone = useMutation({
    mutationFn: async (zone: DeliveryZone) => {
      const { error } = await supabase
        .from("delivery_zones")
        .update({
          name_ar: zone.nameAr,
          name_en: zone.nameEn,
          fee: zone.fee,
          is_active: zone.isActive,
        })
        .eq("id", zone.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteZone = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("delivery_zones")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const getZoneById = (id: string) => zones.find((z) => z.id === id);

  const activeZones = zones.filter((z) => z.isActive);

  return {
    zones,
    activeZones,
    isLoading,
    addZone: (zone: DeliveryZone) => addZone.mutateAsync(zone),
    updateZone: (zone: DeliveryZone) => updateZone.mutateAsync(zone),
    deleteZone: (id: string) => deleteZone.mutateAsync(id),
    getZoneById,
  };
}
