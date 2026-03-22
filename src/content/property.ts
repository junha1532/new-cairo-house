import type { Property } from "@/content/types";

export const cairoProperty: Property = {
  name: "New Cairo House (Curated Stay)",
  neighborhood: "New Cairo",
  description:
    "A quiet, well-designed home base for a few guests at a time — ideal for higher-budget travelers who want comfort, privacy, and reliable logistics in Cairo.",
  whatMakesItSpecial: [
    "Limited availability (not a marketplace listing)",
    "Concierge-style hosting and local support",
    "High standards for cleanliness and sleep quality",
    "Good access to key districts while staying calm at night"
  ],
  amenities: [
    { label: "Fast Wi‑Fi", description: "Reliable for calls and remote work." },
    { label: "Air conditioning", description: "Bedrooms + living area." },
    { label: "Blackout curtains", description: "For deep sleep and jet lag." },
    { label: "Filtered water", description: "Refill station on-site." },
    { label: "Airport pickup", description: "Optional private transfer." },
    { label: "Local support", description: "On-call help when you need it." }
  ],
  imageRequirements: [
    {
      filename: "cairo-house-hero.jpg",
      recommendedSize: "2400×1600 (3:2)",
      alt: "Bright premium living area in Cairo stay"
    },
    {
      filename: "cairo-house-bedroom.jpg",
      recommendedSize: "2000×1500 (4:3)",
      alt: "Quiet bedroom with hotel-quality bedding"
    },
    {
      filename: "cairo-house-bathroom.jpg",
      recommendedSize: "2000×1500 (4:3)",
      alt: "Clean modern bathroom with warm tones"
    },
    {
      filename: "cairo-house-workspace.jpg",
      recommendedSize: "2000×1500 (4:3)",
      alt: "Minimal workspace with daylight"
    }
  ]
};

