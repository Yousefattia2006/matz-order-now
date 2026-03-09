export interface DeliveryZone {
  id: string;
  nameAr: string;
  nameEn: string;
  fee: number;
  isActive: boolean;
}

export const deliveryZones: DeliveryZone[] = [
  { id: "maadi", nameAr: "المعادي", nameEn: "Maadi", fee: 25, isActive: true },
  { id: "nasr-city", nameAr: "مدينة نصر", nameEn: "Nasr City", fee: 30, isActive: true },
  { id: "haram", nameAr: "الهرم", nameEn: "Haram", fee: 35, isActive: true },
  { id: "zamalek", nameAr: "الزمالك", nameEn: "Zamalek", fee: 40, isActive: true },
  { id: "tagamoa", nameAr: "التجمع الخامس", nameEn: "New Cairo", fee: 45, isActive: true },
  { id: "october", nameAr: "أكتوبر", nameEn: "6th of October", fee: 50, isActive: true },
  { id: "obour", nameAr: "العبور / الشروق", nameEn: "Obour / Shorouk", fee: 55, isActive: true },
  { id: "heliopolis", nameAr: "مصر الجديدة", nameEn: "Heliopolis", fee: 30, isActive: true },
  { id: "dokki", nameAr: "الدقي", nameEn: "Dokki", fee: 35, isActive: true },
  { id: "mohandessin", nameAr: "المهندسين", nameEn: "Mohandessin", fee: 35, isActive: true },
];

export const getZoneById = (id: string): DeliveryZone | undefined => {
  return deliveryZones.find((zone) => zone.id === id);
};
