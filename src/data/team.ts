export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    id: "ellice",
    name: "Ellice",
    role: "Founder · Principal Architect",
    bio: "Ellice founded the studio to pursue an architecture grounded in place, climate, and people. Her work moves between coastal residences and small civic projects across the Philippines.",
    photo: "/team/placeholder-1.svg",
  },
  {
    id: "associate-architect",
    name: "Associate Architect",
    role: "Associate · Design Lead",
    bio: "Leads the studio's residential and interior portfolios, with a particular fondness for craft details and the warmth of natural materials.",
    photo: "/team/placeholder-2.svg",
  },
  {
    id: "project-architect",
    name: "Project Architect",
    role: "Project Architect",
    bio: "Coordinates documentation and construction-stage support. Bridges design intent with contractors on site.",
    photo: "/team/placeholder-3.svg",
  },
  {
    id: "visualizer",
    name: "3D Visualizer",
    role: "Visualization Lead",
    bio: "Builds the renders, animations, and walkthroughs that let clients stand inside a design before a single stone is laid.",
    photo: "/team/placeholder-4.svg",
  },
];
