export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  slug: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "khodar-jahza",
    nameAr: "خضار جاهزة",
    nameEn: "Pre-cut Vegetables",
    emoji: "🥬",
    slug: "khodar-jahza",
    color: "bg-emerald-100",
  },
  {
    id: "fakha",
    nameAr: "فاكهة طازجة",
    nameEn: "Fresh Fruits",
    emoji: "🍎",
    slug: "fakha",
    color: "bg-red-100",
  },
  {
    id: "khodar",
    nameAr: "خضار طازجة",
    nameEn: "Fresh Vegetables",
    emoji: "🥕",
    slug: "khodar",
    color: "bg-green-100",
  },
  {
    id: "lahmah",
    nameAr: "لحوم ودواجن",
    nameEn: "Meat & Poultry",
    emoji: "🥩",
    slug: "lahmah",
    color: "bg-rose-100",
  },
  {
    id: "tawabil",
    nameAr: "توابل وبهارات",
    nameEn: "Spices & Seasonings",
    emoji: "🌶️",
    slug: "tawabil",
    color: "bg-amber-100",
  },
  {
    id: "akl-jahiz",
    nameAr: "أكل جاهز",
    nameEn: "Ready-to-Cook",
    emoji: "🍽️",
    slug: "akl-jahiz",
    color: "bg-orange-100",
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};
