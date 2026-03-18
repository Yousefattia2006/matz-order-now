

# Admin Dashboard + Dynamic Products + Special Offers

## Overview
Build an admin dashboard for managing products, categories, and special offers, backed by Supabase. Products and categories will be stored in the database instead of static files. A special offers popup will show on first visit.

## Prerequisites
You need to connect an external Supabase project first. I'll guide you through that after you approve.

## Database Schema

**Tables:**
1. **products** - id, name_ar, emoji, image_url, price, unit, category_id (FK), is_active, is_featured, created_at
2. **categories** - id, name_ar, name_en, emoji, slug, color, sort_order, created_at
3. **special_offers** - id, title_ar, description_ar, image_url, discount_percent, product_id (FK nullable), is_active, start_date, end_date, created_at
4. **user_roles** - id, user_id (FK to auth.users), role (enum: admin/user)

RLS policies: public read on products/categories/offers, admin-only write. `has_role()` security definer function for role checks.

## Storage
- **product-images** bucket (public) for product photos uploaded by admin

## Admin Dashboard (`/admin`)

**Pages:**
- `/admin` - Overview with counts
- `/admin/products` - Product list with add/edit/delete, image upload, category assignment
- `/admin/categories` - Create/edit/delete categories
- `/admin/offers` - Create/manage special offers with date ranges

**Auth:** Simple login page at `/admin/login`. Protected routes check admin role via `has_role()`.

## Product Management Form
- Arabic name, price, unit, category dropdown
- Image upload to Supabase Storage (drag & drop)
- Active/featured toggles

## Special Offers Popup
- Shows on homepage on first visit (tracked via localStorage flag)
- Displays active offers (filtered by date range)
- Dismissible modal with offer image, title, discount badge
- "تسوق الآن" button links to the product or shop page

## Frontend Changes
- Replace static `products`/`categories` arrays with Supabase queries (react-query)
- Keep existing UI/UX unchanged for shoppers
- Add admin routes to App.tsx (no navbar/footer on admin pages)

## File Structure (new)
```text
src/pages/admin/
  AdminLogin.tsx
  AdminLayout.tsx
  AdminDashboard.tsx
  AdminProducts.tsx
  AdminCategories.tsx
  AdminOffers.tsx
src/components/SpecialOfferPopup.tsx
src/hooks/useAdmin.ts
src/integrations/supabase/  (auto-generated client)
supabase/migrations/
  001_create_tables.sql
```

## Steps
1. Connect Supabase to project
2. Create database tables, storage bucket, and RLS policies via migrations
3. Seed existing product/category data into database
4. Build admin auth + role check hook
5. Build admin CRUD pages (products, categories, offers)
6. Add image upload to product form
7. Refactor storefront to fetch from Supabase instead of static data
8. Build special offers popup on homepage

