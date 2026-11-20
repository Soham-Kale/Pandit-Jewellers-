import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name.mr} (${business.name.en}), ${business.city.mr}`,
    short_name: business.name.mr,
    description: business.description.en,
    lang: "mr",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#6A2A86",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
