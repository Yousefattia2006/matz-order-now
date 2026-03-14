TazaMart design system, architecture, and project constraints

# TazaMart Design System

## Brand
- Name: TazaMart / طازه مارت
- Tagline: طازج كل يوم، يوصلك على بابك
- Arabic RTL primary, dir="rtl" on html

## Colors (HSL in index.css)
- Primary green: 130 46% 33% (#2D7A3A)
- Accent orange: 28 91% 54% (#F4821F)  
- Background cream: 40 69% 97% (#FDFAF4)
- Foreground deep green: 129 38% 16%
- Card light green: 120 36% 95%
- Gold: 38 81% 52%
- Destructive/meat red: 6 63% 46%

## Fonts
- Cairo (Arabic primary), DM Sans (English)

## UI Rules
- Min touch target 52px, buttons 56px
- Large text (18px+ body), prices bold orange
- Target users: Egyptian mothers, elderly women
- ProductCard shows +1/-1 when item in cart

## Architecture
- Cart: Context + localStorage (no backend yet)
- WhatsApp ordering via wa.me URL scheme
- Multi-step checkout: zone → address/google maps → summary → confirm via WhatsApp
- No customer name/phone/notes/delivery time in checkout (removed)
- Categories in src/data/categories.ts
- Products in src/data/products.ts (80+ items, with imageUrl from Unsplash)
- Delivery zones in src/data/deliveryZones.ts
