import { useState, useEffect, useCallback } from "react";
import { deliveryZones as defaultZones, DeliveryZone } from "@/data/deliveryZones";

const STORAGE_KEY = "tazamart-delivery-zones";

function loadZones(): DeliveryZone[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultZones;
}

function saveZones(zones: DeliveryZone[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
  window.dispatchEvent(new Event("zones-updated"));
}

export function useDeliveryZones() {
  const [zones, setZones] = useState<DeliveryZone[]>(loadZones);

  useEffect(() => {
    const handler = () => setZones(loadZones());
    window.addEventListener("zones-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("zones-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addZone = useCallback((zone: DeliveryZone) => {
    const updated = [...loadZones(), zone];
    saveZones(updated);
    setZones(updated);
  }, []);

  const updateZone = useCallback((zone: DeliveryZone) => {
    const updated = loadZones().map((z) => (z.id === zone.id ? zone : z));
    saveZones(updated);
    setZones(updated);
  }, []);

  const deleteZone = useCallback((id: string) => {
    const updated = loadZones().filter((z) => z.id !== id);
    saveZones(updated);
    setZones(updated);
  }, []);

  const getZoneById = useCallback((id: string) => {
    return loadZones().find((z) => z.id === id);
  }, []);

  const activeZones = zones.filter((z) => z.isActive);

  return { zones, activeZones, addZone, updateZone, deleteZone, getZoneById };
}
