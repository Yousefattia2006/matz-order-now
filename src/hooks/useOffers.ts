import { useState, useEffect, useCallback } from "react";

export interface Offer {
  id: string;
  titleAr: string;
  descriptionAr: string;
  discountPercent: number | null;
  imageUrl: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

const STORAGE_KEY = "tazamart-offers";

function loadOffers(): Offer[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveOffers(offers: Offer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  window.dispatchEvent(new Event("offers-updated"));
}

export function useOffers() {
  const [offerList, setOfferList] = useState<Offer[]>(loadOffers);

  useEffect(() => {
    const handler = () => setOfferList(loadOffers());
    window.addEventListener("offers-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("offers-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addOffer = useCallback((offer: Offer) => {
    const updated = [offer, ...loadOffers()];
    saveOffers(updated);
    setOfferList(updated);
  }, []);

  const updateOffer = useCallback((offer: Offer) => {
    const updated = loadOffers().map((o) => (o.id === offer.id ? offer : o));
    saveOffers(updated);
    setOfferList(updated);
  }, []);

  const deleteOffer = useCallback((id: string) => {
    const updated = loadOffers().filter((o) => o.id !== id);
    saveOffers(updated);
    setOfferList(updated);
  }, []);

  const activeOffers = offerList.filter((o) => {
    if (!o.isActive) return false;
    const now = new Date().toISOString().slice(0, 10);
    if (o.startDate && o.startDate > now) return false;
    if (o.endDate && o.endDate < now) return false;
    return true;
  });

  return { offers: offerList, activeOffers, addOffer, updateOffer, deleteOffer };
}
