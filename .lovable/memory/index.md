TazaMart design system, architecture, and project constraints

# TazaMart Design System

## Brand
- Name: TazaMart
- Tagline: طازج كل يوم، يوصلك على بابك
- Arabic RTL primary, dir="rtl" on html
- WhatsApp: 201093363030

## Colors (HSL in index.css)
- Primary purple: 255 89% 60% (#723DF4)
- Accent orange: 28 91% 54% (#F4821F)  
- Background cream: 40 69% 97% (#FDFAF4)
- Card light purple: 250 36% 97%
- Gold: 38 81% 52%
- Destructive/meat red: 6 63% 46%

## Fonts
- Cairo (Arabic primary), DM Sans (English)

## UI Rules
- Min touch target 52px, buttons 56px
- Large text (18px+ body), prices bold orange
- Target users: Egyptian mothers, elderly women
- ProductCard shows +1/-1 when item in cart
- No leaf logo beside brand name

## Architecture
- Cart: Context + localStorage (no backend yet)
- WhatsApp ordering via wa.me URL scheme to 201093363030
- Multi-step checkout: zone → address/google maps → summary → confirm via WhatsApp
- No customer name/phone/notes/delivery time in checkout (removed)
- No terms & conditions
- CartBar: no إتمام الطلب button, just shows count/total
- Checkout scrolls to top on step change
- Cart summary shows product images same as cart page
