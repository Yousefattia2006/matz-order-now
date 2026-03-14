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
  { id: "kj-1", nameAr: "طبق كرنب سلطة متقطع", emoji: "🥬", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", price: 45, unit: "طبق", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-2", nameAr: "طبق بصل حلقات", emoji: "🧅", imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-3", nameAr: "طبق بصل مبشور", emoji: "🧅", imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-4", nameAr: "طبق جزر مبشور", emoji: "🥕", imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-5", nameAr: "طبق كوسة متقورة", emoji: "🥒", imageUrl: "https://images.unsplash.com/photo-1563252722-6434563a985d?w=400&h=400&fit=crop", price: 40, unit: "500g", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-6", nameAr: "طبق فلفل رومي جاهز للحشو", emoji: "🫑", imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", price: 27, unit: "طبق", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-7", nameAr: "طبق باذنجان مقور", emoji: "🍆", imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop", price: 45, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-8", nameAr: "طبق محشي ورق عنب جاهز للتسوية", emoji: "🥗", imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=400&fit=crop", price: 195, unit: "كيلو", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-9", nameAr: "طبق محشي كرنب جاهز للتسوية", emoji: "🥗", imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=400&fit=crop", price: 175, unit: "كيلو", categoryId: "khodar-jahza", isActive: true, isFeatured: true },
  { id: "kj-10", nameAr: "طبق بطاطس حشو متقورة", emoji: "🥔", imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82ber75b?w=400&h=400&fit=crop", price: 25, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-11", nameAr: "كيس صلصة مسبكة جاهزة", emoji: "🍅", imageUrl: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=400&fit=crop", price: 30, unit: "250g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-12", nameAr: "طبق كرنب حشو مسلوق", emoji: "🥬", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", price: 80, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-13", nameAr: "طبق ملوخية متقرطفة", emoji: "🍃", price: 50, unit: "750g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-14", nameAr: "طبق ملوخية متخرطة", emoji: "🍃", price: 65, unit: "طبق", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-15", nameAr: "طبق خضار سوتيه (بطاطس+كوسة+جزر)", emoji: "🥗", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop", price: 55, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-16", nameAr: "طبق خضار سوتيه (فاصوليا+كوسة+جزر)", emoji: "🥗", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop", price: 65, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-17", nameAr: "طبق فاصوليا جاهزة", emoji: "🫛", imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae28c38?w=400&h=400&fit=crop", price: 50, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-18", nameAr: "طبق بسلة بالجزر جاهزة", emoji: "🫛", imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae28c38?w=400&h=400&fit=crop", price: 50, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-19", nameAr: "طبق سبانخ جاهزة للطبخ", emoji: "🍀", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", price: 35, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-20", nameAr: "طبق قلقاس جاهز", emoji: "🌿", price: 45, unit: "750g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-21", nameAr: "كيلو رمان مفصص", emoji: "🍎", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop", price: 140, unit: "كيلو", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-22", nameAr: "طبق حرنكش", emoji: "🌿", price: 80, unit: "500g", categoryId: "khodar-jahza", isActive: true },
  { id: "kj-23", nameAr: "حزمة خضرة مغسولة ومتقطعة", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop", price: 7, unit: "حزمة", categoryId: "khodar-jahza", isActive: true },

  // فاكهة طازجة - Fresh Fruits
  { id: "fk-1", nameAr: "موز بلدي طازج", emoji: "🍌", imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop", price: 38, unit: "كيلو", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-2", nameAr: "تفاح أصفر مستورد", emoji: "🍏", imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop", price: 100, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-3", nameAr: "تفاح سكري ممتاز", emoji: "🍎", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", price: 100, unit: "كيلو", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-4", nameAr: "تفاح جرين طازج", emoji: "🍏", imageUrl: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop", price: 149, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-5", nameAr: "برتقال بصرة فريش", emoji: "🍊", imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop", price: 33, unit: "كيلو", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-6", nameAr: "يوسفي فريش", emoji: "🍊", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop", price: 27, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-7", nameAr: "طبق فراولة فريش", emoji: "🍓", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", price: 40, unit: "طبق", categoryId: "fakha", isActive: true, isFeatured: true },
  { id: "fk-8", nameAr: "كيوي فاخر", emoji: "🥝", imageUrl: "https://images.unsplash.com/photo-1585059895524-72f7ceab0fcb?w=400&h=400&fit=crop", price: 175, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-9", nameAr: "كنتالوب / شهد طازج", emoji: "🍈", imageUrl: "https://images.unsplash.com/photo-1621955964441-c173e01c5320?w=400&h=400&fit=crop", price: 35, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-10", nameAr: "برقوق مستورد فاخر", emoji: "🍑", imageUrl: "https://images.unsplash.com/photo-1629828874514-22b15ff47390?w=400&h=400&fit=crop", price: 127, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-11", nameAr: "جوافة ممتازة", emoji: "🍐", imageUrl: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=400&fit=crop", price: 39, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-12", nameAr: "رمان فاخر", emoji: "🍎", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop", price: 110, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-13", nameAr: "أفوكادو ممتاز", emoji: "🥑", imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", price: 250, unit: "كيلو", categoryId: "fakha", isActive: true },
  { id: "fk-14", nameAr: "أناناس قطعة", emoji: "🍍", imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop", price: 230, unit: "قطعة", categoryId: "fakha", isActive: true },

  // خضار طازجة - Fresh Vegetables (Whole)
  { id: "kh-1", nameAr: "طماطم طازجة", emoji: "🍅", imageUrl: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop", price: 25, unit: "كيلو", categoryId: "khodar", isActive: true, isFeatured: true },
  { id: "kh-2", nameAr: "خيار صوب طازج", emoji: "🥒", imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-3", nameAr: "بطاطس تحمير محلية", emoji: "🍟", imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82ber75b?w=400&h=400&fit=crop", price: 20, unit: "كيلو", categoryId: "khodar", isActive: true, isFeatured: true },
  { id: "kh-4", nameAr: "بصل أحمر طازج", emoji: "🧅", imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop", price: 18, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-5", nameAr: "بصل أبيض طازج", emoji: "🧅", imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop", price: 20, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-6", nameAr: "جزر طازج", emoji: "🥕", imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", price: 24, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-7", nameAr: "بطاطا سكري محلية", emoji: "🍠", imageUrl: "https://images.unsplash.com/photo-1596097635121-14b63b7a5f21?w=400&h=400&fit=crop", price: 25, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-8", nameAr: "كوسا طازجة", emoji: "🫒", imageUrl: "https://images.unsplash.com/photo-1563252722-6434563a985d?w=400&h=400&fit=crop", price: 36, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-9", nameAr: "فلفل رومي / حامي طازج", emoji: "🌶️", imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", price: 40, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-10", nameAr: "فلفل ألوان طازج", emoji: "🫑", imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", price: 90, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-11", nameAr: "باذنجان طازج", emoji: "🍆", imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop", price: 45, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-12", nameAr: "ليمون بلدي طازج", emoji: "🍋", imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop", price: 45, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-13", nameAr: "ملوخية فلاحي طازجة", emoji: "🍃", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-14", nameAr: "فاصوليا خضرة طازجة", emoji: "🫛", imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae28c38?w=400&h=400&fit=crop", price: 60, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-15", nameAr: "قلقاس فريش", emoji: "🍈", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-16", nameAr: "سبانخ طازجة", emoji: "☘️", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-17", nameAr: "بسلة بلدي", emoji: "🫛", imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae28c38?w=400&h=400&fit=crop", price: 40, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-18", nameAr: "بنجر طازج", emoji: "🫜", imageUrl: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400&h=400&fit=crop", price: 30, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-19", nameAr: "طبق قرع عسل طازج", emoji: "🎃", imageUrl: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=400&h=400&fit=crop", price: 30, unit: "طبق", categoryId: "khodar", isActive: true },
  { id: "kh-20", nameAr: "كيلو قرع عسل طازج", emoji: "🎃", imageUrl: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=400&h=400&fit=crop", price: 30, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-21", nameAr: "كابوتشا طازج", emoji: "🥗", price: 15, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-22", nameAr: "مشروم طبق طازج", emoji: "🍄", imageUrl: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=400&h=400&fit=crop", price: 60, unit: "طبق", categoryId: "khodar", isActive: true },
  { id: "kh-23", nameAr: "بروكلي بالقطعة", emoji: "🥦", imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop", price: 45, unit: "قطعة", categoryId: "khodar", isActive: true },
  { id: "kh-24", nameAr: "قرنبيط بالقطعة", emoji: "🥦", imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop", price: 40, unit: "قطعة", categoryId: "khodar", isActive: true },
  { id: "kh-25", nameAr: "جنزبيل طبق طازج", emoji: "🫚", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop", price: 55, unit: "طبق", categoryId: "khodar", isActive: true },
  { id: "kh-26", nameAr: "ذرة سكري طازجة", emoji: "🌽", imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop", price: 65, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-27", nameAr: "ثوم مقشر طازج", emoji: "🧄", imageUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2a28?w=400&h=400&fit=crop", price: 80, unit: "½ كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-28", nameAr: "شبكة ثوم صيني", emoji: "🧄", imageUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2a28?w=400&h=400&fit=crop", price: 45, unit: "شبكة", categoryId: "khodar", isActive: true },
  { id: "kh-29", nameAr: "كرنب سلطة أبيض/أحمر طازج", emoji: "🥬", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", price: 40, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-30", nameAr: "كرنب محشي", emoji: "🥬", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", price: 35, unit: "كيلو", categoryId: "khodar", isActive: true },
  { id: "kh-31", nameAr: "حزمة خضرة طازجة", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop", price: 4, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-32", nameAr: "كرفس بلدي", emoji: "☘️", imageUrl: "https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?w=400&h=400&fit=crop", price: 5, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-33", nameAr: "بصل أخضر حزمة", emoji: "🥬", imageUrl: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=400&fit=crop", price: 15, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-34", nameAr: "كرفس إفرنجي", emoji: "☘️", imageUrl: "https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?w=400&h=400&fit=crop", price: 30, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-35", nameAr: "حزمة سلق", emoji: "🌿", price: 5, unit: "حزمة", categoryId: "khodar", isActive: true },
  { id: "kh-36", nameAr: "برطمان ورق عنب وزن كيلو", emoji: "🍀", price: 80, unit: "برطمان", categoryId: "khodar", isActive: true },

  // لحوم ودواجن - Meat & Poultry
  { id: "lh-1", nameAr: "فراخ بلدي كاملة", emoji: "🍗", imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-2", nameAr: "كبدة فراخ", emoji: "🫀", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-3", nameAr: "لحم بتلو تقطيع", emoji: "🥩", imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-4", nameAr: "كيمة مفرومة", emoji: "🥩", imageUrl: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },
  { id: "lh-5", nameAr: "فيليه دجاج", emoji: "🍗", imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop", price: 0, unit: "كيلو", categoryId: "lahmah", isActive: false },

  // توابل وبهارات - Spices
  { id: "tw-1", nameAr: "كمون مطحون", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop", price: 15, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-2", nameAr: "كركم مطحون", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop", price: 20, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-3", nameAr: "فلفل أسود مطحون", emoji: "🌶️", imageUrl: "https://images.unsplash.com/photo-1599909533681-74084db29608?w=400&h=400&fit=crop", price: 25, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-4", nameAr: "بهارات مشكلة", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop", price: 30, unit: "100g", categoryId: "tawabil", isActive: true },
  { id: "tw-5", nameAr: "قرفة مطحونة", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1599909533681-74084db29608?w=400&h=400&fit=crop", price: 35, unit: "100g", categoryId: "tawabil", isActive: true },

  // أكل جاهز - Ready-to-Cook
  { id: "aj-1", nameAr: "صينية بطاطس باللحمة جاهزة", emoji: "🍽️", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop", price: 180, unit: "صينية", categoryId: "akl-jahiz", isActive: true },
  { id: "aj-2", nameAr: "صينية خضار بالفراخ جاهزة", emoji: "🍽️", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop", price: 150, unit: "صينية", categoryId: "akl-jahiz", isActive: true },
  { id: "aj-3", nameAr: "كفتة مشكلة جاهزة للشوي", emoji: "🍢", imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop", price: 200, unit: "كيلو", categoryId: "akl-jahiz", isActive: true },
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
