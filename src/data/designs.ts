export type Design = {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Interior" | "Landscape" | "Concept";
  year: number;
  location: string;
  description: string;
  image: string;
  highlights: string[];
};

// Placeholder palette tones used to procedurally generate frame artwork.
// Real photos can replace `image` later — anything truthy that's a URL will work.
export const designs: Design[] = [
  {
    id: "azure-cliff-residence",
    title: "Azure Cliff Residence",
    category: "Residential",
    year: 2025,
    location: "Batangas, PH",
    description:
      "A coastal residence cantilevered over a limestone bluff. Living spaces open onto the horizon through floor-to-ceiling glazing, while a sheltered terrace folds the sea into the interior.",
    image: "/designs/placeholder-1.jpg",
    highlights: ["Coastal cantilever", "Passive cross-ventilation", "Reclaimed teak"],
  },
  {
    id: "atrium-office",
    title: "The Atrium Office",
    category: "Commercial",
    year: 2024,
    location: "Makati, PH",
    description:
      "A mid-rise workplace organised around a planted atrium. The vertical garden cools the lobby and brings daylight to every floor plate.",
    image: "/designs/placeholder-2.jpg",
    highlights: ["Living atrium", "Daylight autonomy 78%", "Cross-laminated timber core"],
  },
  {
    id: "loom-house",
    title: "Loom House",
    category: "Residential",
    year: 2024,
    location: "Tagaytay, PH",
    description:
      "A weekend home woven from local hardwood lattices. The screens filter the highland sun and become lanterns at night.",
    image: "/designs/placeholder-3.jpg",
    highlights: ["Hardwood lattice envelope", "Hipped clay-tile roof", "Rainwater harvesting"],
  },
  {
    id: "harbor-pavilion",
    title: "Harbor Pavilion",
    category: "Commercial",
    year: 2023,
    location: "Cebu, PH",
    description:
      "A waterfront pavilion that hosts markets by day and performances by night. The roof, a single inverted catenary shell, becomes a sail above the harbor.",
    image: "/designs/placeholder-4.jpg",
    highlights: ["Catenary shell roof", "Tidal-resilient platform", "Open civic ground floor"],
  },
  {
    id: "stillwater-villa",
    title: "Stillwater Villa",
    category: "Residential",
    year: 2023,
    location: "Laguna, PH",
    description:
      "A lakeside villa arranged around a central reflecting pool. Bedrooms float on the water; the kitchen anchors the family on the shore.",
    image: "/designs/placeholder-5.jpg",
    highlights: ["Reflecting-pool courtyard", "Suspended bedroom wing", "Earth-bermed services"],
  },
  {
    id: "lantern-cafe",
    title: "Lantern Café",
    category: "Interior",
    year: 2024,
    location: "Quezon City, PH",
    description:
      "A neighbourhood café reimagined as a lantern at dusk. Warm-tone fixtures and rice-paper screens diffuse a soft glow onto the street.",
    image: "/designs/placeholder-6.jpg",
    highlights: ["Rice-paper light wells", "Reclaimed brick floor", "Modular seating"],
  },
  {
    id: "ridge-retreat",
    title: "Ridge Retreat",
    category: "Concept",
    year: 2025,
    location: "Concept study",
    description:
      "A speculative mountain retreat that steps gently down a ridgeline, each terrace framing a different vantage of the valley below.",
    image: "/designs/placeholder-7.jpg",
    highlights: ["Stepped terraces", "Bermed thermal mass", "Off-grid water + power"],
  },
  {
    id: "civic-grove",
    title: "Civic Grove",
    category: "Landscape",
    year: 2024,
    location: "Pasig, PH",
    description:
      "A pocket park threading native trees through a former parking yard. Permeable paving and rain-gardens recharge the local watershed.",
    image: "/designs/placeholder-8.jpg",
    highlights: ["Native canopy planting", "Permeable paving", "Rain-garden bioswales"],
  },
];
