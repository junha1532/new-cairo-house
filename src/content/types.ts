export type PackageTier = "Signature" | "Classic" | "Private";

export type TravelPackage = {
  slug: string;
  title: string;
  duration: string;
  highlights: string[];
  fromPriceUsd: number;
  tier: PackageTier;
};

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
};

export type PropertyAmenity = {
  label: string;
  description?: string;
};

export type Property = {
  name: string;
  neighborhood: string;
  description: string;
  whatMakesItSpecial: string[];
  amenities: PropertyAmenity[];
  imageRequirements: Array<{
    filename: string;
    recommendedSize: string;
    alt: string;
  }>;
};

