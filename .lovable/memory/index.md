Design system, constraints, and architecture for TazaMart

## Brand
- Name: TazaMart / تازة مارت
- Primary purple: 255 89% 60% (#723DF4)
- Accent orange: 28 91% 54%
- Background cream: 40 69% 97%
- Fonts: Cairo (AR), DM Sans (EN)
- WhatsApp: 01093363030

## Architecture
- Backend: Supabase (products, categories, special_offers, user_roles tables)
- Product type: Tables<"products"> from supabase types (name_ar, image_url, NOT nameAr/imageUrl)
- Cart: Context + localStorage, uses Supabase product type
- Admin: /admin/* routes (LTR, no navbar/footer), protected by has_role() check
- Storage: product-images bucket (public) for admin uploads
- Special offers popup on first visit (sessionStorage flag)

## Removed
- Leaf logo next to brand name
- CartBar checkout button (إتمام الطلب)
- Static data files (src/data/products.ts, src/data/categories.ts) - now from Supabase
