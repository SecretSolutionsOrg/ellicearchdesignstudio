export type Service = {
  id: string;
  title: string;
  blurb: string;
  details: string[];
};

export const services: Service[] = [
  {
    id: "architectural-design",
    title: "Architectural Design",
    blurb: "From the first sketch to the last detail — buildings that hold their place.",
    details: [
      "Concept design & schematics",
      "Design development & documentation",
      "Construction-stage support",
    ],
  },
  {
    id: "interior-design",
    title: "Interior Design",
    blurb: "Rooms that frame the way you live, work, and gather.",
    details: ["Spatial planning", "Material & finish curation", "Custom millwork & lighting"],
  },
  {
    id: "3d-visualization",
    title: "3D Visualization",
    blurb: "Photoreal renders and walkthroughs that let you stand inside the idea.",
    details: ["Exterior & interior renders", "Animated flythroughs", "VR walkthroughs"],
  },
  {
    id: "site-master-planning",
    title: "Site & Master Planning",
    blurb: "Reading the land before drawing on it.",
    details: ["Site analysis", "Zoning & setback strategy", "Phased development plans"],
  },
  {
    id: "sustainability",
    title: "Sustainability Consulting",
    blurb: "Low-impact buildings that earn their lifespan.",
    details: ["Passive design strategies", "Material lifecycle review", "Energy & water modeling"],
  },
  {
    id: "renovation",
    title: "Renovation & Adaptive Reuse",
    blurb: "New life inside existing walls.",
    details: ["Condition assessment", "Heritage-sensitive interventions", "Phased occupied works"],
  },
];
