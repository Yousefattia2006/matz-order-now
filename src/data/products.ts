export interface Product {
  id: string;
  nameAr: string;
  nameEn?: string;
  emoji: string;
  imageUrl?: string;
  price: number;
  unit: string;
  categoryId: string;
  isActive: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  // خضار جاهزة - Pre-cut Vegetables
  { id: "kj-1", nameAr: "طبق كرنب سلطة متقطع", emoji: "🥬", price: 45, unit: "طبق", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-2", nameAr: "طبق بصل حلقات", emoji: "🧅", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-3", nameAr: "طبق بصل مبشور", emoji: "🧅", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-4", nameAr: "طبق جزر مبشور", emoji: "🥕", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-5", nameAr: "طبق كوسة متقورة", emoji: "🥒", price: 40, unit: "500g", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-6", nameAr: "طبق فلفل رومي جاهز للحشو", emoji: "🫑", price: 27, unit: "طبق", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-7", nameAr: "طبق باذنجان مقور", emoji: "🍆", price: 45, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-8", nameAr: "طبق محشي ورق عنب جاهز للتسوية", emoji: "🥗", price: 195, unit: "كيلو", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-9", nameAr: "طبق محشي كرنب جاهز للتسوية", emoji: "🥗", price: 175, unit: "كيلو", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-10", nameAr: "طبق بطاطس حشو متقورة", emoji: "🥔", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-11", nameAr: "كيس صلصة مسبكة جاهزة", emoji: "🍅", price: 30, unit: "250g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-12", nameAr: "طبق كرنب حشو مسلوق", emoji: "🥬", price: 80, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-13", nameAr: "طبق ملوخية متقرطفة", emoji: "🍃", price: 50, unit: "750g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-14", nameAr: "طبق ملوخية متخرطة", emoji: "🍃", price: 65, unit: "طبق", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-15", nameAr: "طبق خضار سوتيه (بطاطس+كوسة+جزر)", emoji: "🥗", price: 55, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-16", nameAr: "طبق خضار سوتيه (فاصوليا+كوسة+جزر)", emoji: "🥗", price: 65, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-17", nameAr: "طبق فاصوليا جاهزة", emoji: "🫛", price: 50, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-18", nameAr: "طبق بسلة بالجزر جاهزة", emoji: "🫛", price: 50, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-19", nameAr: "طبق سبانخ جاهزة للطبخ", emoji: "🍀", price: 35, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-20", nameAr: "طبق قلقاس جاهز", emoji: "🌿", price: 45, unit: "750g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-21", nameAr: "كيلو رمان مفصص", emoji: "🍎", price: 140, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-22", nameAr: "طبق حرنكش", emoji: "🌿", price: 80, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-23", nameAr: "حزمة خضرة مغسولة ومتقطعة", emoji: "🌿", price: 7, unit: "حزمة", categoryId: "khodar-jahza", isActive: true },

  // فاكهة طازجة - Fresh Fruits
  { id: "fk-1", nameAr: "موز بلدي طازج", emoji: "🍌", price: 38, unit: "كيلو", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-2", nameAr: "تفاح أصفر مستورد", emoji: "🍏", price: 100, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-3", nameAr: "تفاح سكري ممتاز", emoji: "🍎", price: 100, unit: "كيلو", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-4", nameAr: "تفاح جرين طازج", emoji: "🍏", price: 149, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-5", nameAr: "برتقال بصرة فريش", emoji: "🍊", price: 33, unit: "كيلو", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-6", nameAr: "يوسفي فريش", emoji: "🍊", price: 27, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-7", nameAr: "طبق فراولة فريش", emoji: "🍓", price: 40, unit: "طبق", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-8", nameAr: "كيوي فاخر", emoji: "🥝", price: 175, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-9", nameAr: "كنتالوب / شهد طازج", emoji: "🍈", price: 35, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-10", nameAr: "برقوق مستورد فاخر", emoji: "🍑", price: 127, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-11", nameAr: "جوافة ممتازة", emoji: "🍐", price: 39, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-12", nameAr: "رمان فاخر", emoji: "🍎", price: 110, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-13", nameAr: "أفوكادو ممتاز", emoji: "🥑", price: 250, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-14", nameAr: "أناناس قطعة", emoji: "🍍", price: 230, unit: "قطعة", categoryId: "fakha", isActive: true },

  // خضار طازجة - Fresh Vegetables (Whole)
  { id: "kh-1", nameAr: "طماطم طازجة", emoji: "🍅", price: 25, unit: "كيلو", categoryId: "khodar", isActive: true, isFeatured: true },
  { id: "kh-2", nameAr: "خيار صوب طازج", emoji: "🥒", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-3", nameAr: "بطاطس تحمير محلية", emoji: "🍟", price: 20, unit: "كيلو", categoryId: "khodar", isActive: true, isFeatured: true },
  { id: "kh-4", nameAr: "بصل أحمر طازج", emoji: "🧅", price: 18, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-5", nameAr: "بصل أبيض طازج", emoji: "🧅", price: 20, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-6", nameAr: "جزر طازج", emoji: "🥕", price: 24, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-7", nameAr: "بطاطا سكري محلية", emoji: "🍠", price: 25, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-8", nameAr: "كوسا طازجة", emoji: "🫒", price: 36, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-9", nameAr: "فلفل رومي / حامي طازج", emoji: "🌶️", price: 40, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-10", nameAr: "فلفل ألوان طازج", emoji: "🫑", price: 90, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-11", nameAr: "باذنجان طازج", emoji: "🍆", price: 45, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-12", nameAr: "ليمون بلدي طازج", emoji: "🍋", price: 45, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-13", nameAr: "ملوخية فلاحي طازجة", emoji: "🍃", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-14", nameAr: "فاصوليا خضرة طازجة", emoji: "🫛", price: 60, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-15", nameAr: "قلقاس فريش", emoji: "🍈", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-16", nameAr: "سبانخ طازجة", emoji: "☘️", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-17", nameAr: "بسلة بلدي", emoji: "🫛", price: 40, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-18", nameAr: "بنجر طازج", emoji: "🫜", price: 30, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-19", nameAr: "طبق قرع عسل طازج", emoji: "🎃", price: 30, unit: "طبق", categoryId: "khodar", isActive: true },
  { id: "kh-20", nameAr: "كيلو قرع عسل طازج", emoji: "🎃", price: 30, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-21", nameAr: "كابوتشا طازج", emoji: "🥗", price: 15, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-22", nameAr: "مشروم طبق طازج", emoji: "🍄", price: 60, unit: "طبق", categoryId: "khodar", isActive: true },
  { id: "kh-23", nameAr: "بروكلي بالقطعة", emoji: "🥦", price: 45, unit: "قطعة", categoryId: "khodar", isActive: true },
  { id: "kh-24", nameAr: "قرنبيط بالقطعة", emoji: "🥦", price: 40, unit: "قطعة", categoryId: "khodar", isActive: true },
  { id: "kh-25", nameAr: "جنزبيل طبق طازج", emoji: "🫚", price: 55, unit: "طبق", categoryId: "khodar", isActive: true },
  { id: "kh-26", nameAr: "ذرة سكري طازجة", emoji: "🌽", price: 65, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-27", nameAr: "ثوم مقشر طازج", emoji: "🧄", price: 80, unit: "½ كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-28", nameAr: "شبكة ثوم صيني", emoji: "🧄", price: 45, unit: "شبكة", categoryId: "khodar", isActive: true },
  { id: "kh-29", nameAr: "كرنب سلطة أبيض/أحمر طازج", emoji: "🥬", price: 40, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-30", nameAr: "كرنب محشي", emoji: "🥬", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-31", nameAr: "حزمة خضرة طازجة", emoji: "🌿", price: 4, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-32", nameAr: "كرفس بلدي", emoji: "☘️", price: 5, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-33", nameAr: "بصل أخضر حزمة", emoji: "🥬", price: 15, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-34", nameAr: "كرفس إفرنجي", emoji: "☘️", price: 30, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-35", nameAr: "حزمة سلق", emoji: "🌿", price: 5, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-36", nameAr: "برطمان ورق عنب وزن كيلو", emoji: "🍀", price: 80, unit: "برطمان", categoryId: "khodar", isActive: true },

  // لحوم ودواجن - Meat & Poultry
  { id: "lh-1", nameAr: "فراخ بلدي كاملة", emoji: "🍗", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-2", nameAr: "كبدة فراخ", emoji: "🫀", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-3", nameAr: "لحم بتلو تقطيع", emoji: "🥩", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-4", nameAr: "كيمة مفرومة", emoji: "🥩", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-5", nameAr: "فيليه دجاج", emoji: "🍗", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },

  // توابل وبهارات - Spices (placeholder)
  { id: "tw-1", nameAr: "كمون مطحون", emoji: "🌿", price: 15, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-2", nameAr: "كركم مطحون", emoji: "🌿", price: 20, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-3", nameAr: "فلفل أسود مطحون", emoji: "🌶️", price: 25, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-4", nameAr: "بهارات مشكلة", emoji: "🌿", price: 30, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-5", nameAr: "قرفة مطحونة", emoji: "🌿", price: 35, unit: "100g", categoryId: "tawabil", isActive: true },

  // أكل جاهز - Ready-to-Cook (placeholder)
  { id: "aj-1", nameAr: "صينية بطاطس باللحمة جاهزة", emoji: "🍽️", price: 180, unit: "صينية", categoryId: "akl-jahiz", isActive: true },
  { id: "aj-2", nameAr: "صينية خضار بالفراخ جاهزة", emoji: "🍽️", price: 150, unit: "صينية", categoryId: "akl-jahiz", isActive: true },
  { id: "aj-3", nameAr: "كفتة مشكلة جاهزة للشوي", emoji: "🍢", price: 200, unit: "كيلو", categoryId: "akl-jahiz", isActive: true },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.categoryId === categoryId && p.isActive);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured && p.isActive);
};

export const getActiveProducts = (): Product[] => {
  return products.filter((p) => p.isActive);
};
