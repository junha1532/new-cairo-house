import type { TravelPackage } from "@/content/types";

export const packages: TravelPackage[] = [
  {
    slug: "cairo-luxor-aswan-classics",
    title: "Cairo + Luxor + Aswan Classics",
    duration: "7 days / 6 nights",
    tier: "Classic",
    fromPriceUsd: 3200,
    highlights: [
      "Private airport pickup + driver support",
      "Giza Plateau sunrise timing (less crowds)",
      "Luxor temples with a vetted Egyptologist",
      "Aswan felucca sunset + Nubian village",
      "Pacing optimized for comfort (not a checklist)"
    ]
  },
  {
    slug: "heritage-and-nile-signature",
    title: "Heritage + Nile Signature",
    duration: "7 days / 6 nights",
    tier: "Signature",
    fromPriceUsd: 5200,
    highlights: [
      "Premium hotel selection + room upgrades when possible",
      "Dining guidance (safe, excellent, and local)",
      "Cairo design districts + museum strategy",
      "Door-to-door logistics for stress-free transfers",
      "24/7 concierge support during your trip"
    ]
  },
  {
    slug: "private-family-smooth-pace",
    title: "Private Family (Smooth Pace)",
    duration: "7 days / 6 nights",
    tier: "Private",
    fromPriceUsd: 6900,
    highlights: [
      "Family-friendly pacing + flexible mornings",
      "Kid-friendly highlights with minimal waiting",
      "Larger vehicle + additional support on request",
      "Handpicked guides with a calm teaching style",
      "Backup plans for heat, crowds, and energy"
    ]
  }
];

