export type TravelItem = {
  id: string;
  title: string;
  location: string;
  minDays: number;
  summary: string;
  idealSeasons: ("Winter" | "Spring" | "Summer" | "Autumn")[];
  videoSrc: string;
  posterSrc: string;
  baseGuideUsd: number;
  baseCarUsdSedanPerDay: number;
  baseCarUsdVanPerDay: number;
  perRoomPerNightUsd: number;
  perPersonActivityPerDayUsd: number;
};

export const travelItems: TravelItem[] = [
  {
    id: "cairo-giza-core",
    title: "Cairo & Giza essentials",
    location: "Cairo / Giza",
    minDays: 2,
    summary: "Museum, Islamic Cairo, and a full day at the Giza Plateau.",
    idealSeasons: ["Winter", "Spring", "Autumn"],
    videoSrc: "/new-cairo-house/video/cairo-giza.mp4",
    posterSrc: "/new-cairo-house/images/cairo-giza.jpg",
    baseGuideUsd: 280,
    baseCarUsdSedanPerDay: 140,
    baseCarUsdVanPerDay: 190,
    perRoomPerNightUsd: 210,
    perPersonActivityPerDayUsd: 45
  },
  {
    id: "luxor-temples",
    title: "Luxor temples & West Bank",
    location: "Luxor",
    minDays: 2,
    summary: "Karnak, Luxor Temple, Valley of the Kings, and key tombs.",
    idealSeasons: ["Winter", "Spring", "Autumn"],
    videoSrc: "/new-cairo-house/video/luxor.mp4",
    posterSrc: "/new-cairo-house/images/luxor.jpg",
    baseGuideUsd: 260,
    baseCarUsdSedanPerDay: 120,
    baseCarUsdVanPerDay: 170,
    perRoomPerNightUsd: 190,
    perPersonActivityPerDayUsd: 40
  },
  {
    id: "aswan-nile",
    title: "Aswan & Nile slowdown",
    location: "Aswan",
    minDays: 2,
    summary: "Philae Temple, felucca sunset, Nubian village, and Nile views.",
    idealSeasons: ["Winter", "Spring", "Autumn"],
    videoSrc: "/new-cairo-house/video/aswan.mp4",
    posterSrc: "/new-cairo-house/images/aswan.jpg",
    baseGuideUsd: 240,
    baseCarUsdSedanPerDay: 110,
    baseCarUsdVanPerDay: 160,
    perRoomPerNightUsd: 180,
    perPersonActivityPerDayUsd: 40
  },
  {
    id: "red-sea",
    title: "Red Sea unwind",
    location: "Hurghada / Red Sea",
    minDays: 3,
    summary: "Reef time, resort downtime, and warm evenings by the sea.",
    idealSeasons: ["Spring", "Summer", "Autumn"],
    videoSrc: "/new-cairo-house/video/red-sea.mp4",
    posterSrc: "/new-cairo-house/images/red-sea.jpg",
    baseGuideUsd: 0,
    baseCarUsdSedanPerDay: 80,
    baseCarUsdVanPerDay: 120,
    perRoomPerNightUsd: 230,
    perPersonActivityPerDayUsd: 55
  },
  {
    id: "alexandria-day",
    title: "Alexandria coastal day",
    location: "Alexandria",
    minDays: 1,
    summary: "Day trip for sea air, cafes, and a different pace from Cairo.",
    idealSeasons: ["Winter", "Spring", "Autumn"],
    videoSrc: "/new-cairo-house/video/alexandria.mp4",
    posterSrc: "/new-cairo-house/images/alexandria.jpg",
    baseGuideUsd: 220,
    baseCarUsdSedanPerDay: 150,
    baseCarUsdVanPerDay: 200,
    perRoomPerNightUsd: 0,
    perPersonActivityPerDayUsd: 35
  }
];

