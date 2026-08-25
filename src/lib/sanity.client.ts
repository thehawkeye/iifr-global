/**
 * src/lib/sanity.client.ts
 *
 * Read-only Sanity client for Astro build pages.
 * Uses @sanity/client with graceful degradation when SANITY_API_TOKEN
 * is not set (works against public datasets).
 *
 * For local dev with private datasets, set SANITY_API_TOKEN
 * (read-only) in .env. The token is never sent to the browser.
 */
import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.SANITY_PROJECT_ID ?? "gm051u2t";
const dataset = process.env.SANITY_DATASET ?? "staging";

/**
 * Read-only client for build-time GROQ queries.
 * token is optional — works against public datasets without it.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
  // Optional: read-only token. Graceful degradation if absent.
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Image URL builder for hotspot/crop support.
 * Usage: imageBuilder.image(imageAsset).crop(crop).hotspot(hotspot).width(400).url()
 */
export const imageBuilder = createImageUrlBuilder(sanityClient);
