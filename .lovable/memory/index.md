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
- Product type: camelCase frontend interface mapped from snake_case DB columns via useProducts hook
- Cart: Context + localStorage, uses frontend Product type (camelCase)
- Admin: /admin/* routes (LTR, no navbar/footer), protected by Supabase auth via admin-login edge function
- Admin auth: Edge function validates password "taza2024", creates/signs-in Supabase user, returns session
- Storage: product-images bucket (public) for admin uploads
- Special offers: product-style items with name, description, price, image (no discount field)
- Special offer popup on first visit (sessionStorage flag)
- All data (products, categories, offers) persisted in Supabase, fetched via react-query
- No toast notifications in admin dashboard

## Removed
- Leaf logo next to brand name
- CartBar checkout button (إتمام الطلب)
- Static data as primary source (now Supabase is source of truth)
- localStorage-based product/offer storage
- Discount-based offer creation
- Toast notifications from admin pages
