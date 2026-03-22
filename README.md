# Travel Concierge MVP (Egypt)

Production-ready MVP for a boutique Egypt travel concierge website (not a marketplace). Built with Next.js (App Router), React, TypeScript, and Tailwind CSS. Hosting-ready for Vercel.

## Features

- Home, Packages, Cairo Stay (Room Rental), Contact/Inquiry pages
- Premium, minimal UI (neutral + warm sand tones)
- Reusable components: `Navbar`, `Footer`, cards, form fields, buttons
- Mock inquiry endpoint (`POST /api/inquiry`) that logs server-side
- Basic SEO metadata per page
- Fast local dev with live refresh (HMR)

## Getting started (local dev with live refresh)

From the project folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Where to edit content

- Packages data: `src/content/packages.ts`
- Testimonials: `src/content/testimonials.ts`
- Cairo stay info + image checklist: `src/content/property.ts`

## Images (what you need)

This MVP uses tasteful placeholders to keep setup simple. To use real images:

1. Create `public/images/`
2. Add files matching the checklist shown on the Cairo Stay page (and your hero imagery), e.g.:
   - `public/images/cairo-house-hero.jpg`
   - `public/images/cairo-house-bedroom.jpg`
   - `public/images/cairo-house-bathroom.jpg`
   - `public/images/cairo-house-workspace.jpg`

You can then swap placeholder blocks in:

- `src/app/page.tsx`
- `src/app/room/page.tsx`

…for real images (e.g. `<img src="/images/..." />` or `next/image`).

## Inquiry handling

- Form submits to: `src/app/api/inquiry/route.ts`
- Current behavior: validates + logs inquiry (visible in server logs / Vercel logs)
- Next step for production: send to email/CRM (Resend/SendGrid/HubSpot/etc.)

