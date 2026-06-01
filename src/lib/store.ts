"use client";

import { useMagicAuth, getStoredUser, isLoggedIn } from "@siva/shared-ui";
export { useMagicAuth, getStoredUser, isLoggedIn };

export const SITE_CONFIG = {
  name: "RoamPlan",
  site: "roamplan",
  accentColor: "#0ea5e9",
  freeLimit: 10,
  freeFeature: "free trip plans",
  lockedFeature: "unlimited itineraries + PDF export",
};

export const AFFILIATES = [
  {
    name: "Notion",
    tagline: "Organise your packing lists, notes and itineraries",
    cta: "Try Notion →",
    color: "#000000",
    icon: "📝",
    url: "https://notion.so/?affiliate=siva",
  },
  {
    name: "Canva",
    tagline: "Design shareable trip itineraries and travel journals",
    cta: "Design Free →",
    color: "#7c3aed",
    icon: "🎨",
    url: "https://canva.com/?affiliate=siva",
  },
  {
    name: "Coursera",
    tagline: "Learn the language of your destination before you go",
    cta: "Explore →",
    color: "#0056d2",
    icon: "🎓",
    url: "https://coursera.org/?affiliate=siva",
  },
];
