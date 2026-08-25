/**
 * sanity.config.ts — Sanity Studio configuration for IIFR Global Contemporary.
 *
 * Embedded studio (Phase 1): accessible at /studio in the Astro app.
 * Schemas live in src/sanity/schemas/.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { programme } from "./src/sanity/schemas/programme";
import { cohort } from "./src/sanity/schemas/cohort";

export default defineConfig({
  name: "iifr-global-contemporary",
  title: "IIFR Global Contemporary",

  // Project ID from env — create project at sanity.io/manage
  projectId: process.env.SANITY_PROJECT_ID ?? "gm051u2t",
  dataset: process.env.SANITY_DATASET ?? "staging",

  plugins: [
    structureTool(),
    visionTool(), // GROQ playground at /vision
  ],

  schema: {
    types: [programme, cohort],
  },
});
