#!/usr/bin/env node
/**
 * scripts/sanity-seed-ecp.js
 *
 * Seed one ECP programme document into the local Sanity staging dataset.
 * Run AFTER creating the "staging" dataset at sanity.io/manage for project gm051u2t.
 *
 * Usage:
 *   node scripts/sanity-seed-ecp.js
 *
 * Environment (in .env):
 *   SANITY_PROJECT_ID=gm051u2t
 *   SANITY_DATASET=staging
 *   SANITY_WRITE_TOKEN=<token from sanity.io/manage > API > Tokens>
 *
 * To get a write token:
 *   1. Go to sanity.io/manage
 *   2. Select project gm051u2t
 *   3. API > Tokens > Add API Token
 *   4. Name it "seed-script", type "Full R/W"
 *   5. Copy the token to SANITY_WRITE_TOKEN in .env
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually (no dotenv dep)
try {
  const envPath = resolve(__dirname, "../../.env");
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env not present — rely on CI/system env vars
}

const projectId = process.env.SANITY_PROJECT_ID ?? "gm051u2t";
const dataset = process.env.SANITY_DATASET ?? "staging";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "ERROR: SANITY_WRITE_TOKEN is not set.\n" +
    "Go to https://www.sanity.io/manage > gm051u2t > API > Tokens > Add Token\n" +
    "Name: seed-script | Type: Full R/W\n" +
    "Then set SANITY_WRITE_TOKEN=<token> in .env and re-run."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
});

const ecpDocument = {
  _type: "programme",
  _id: "ecp",
  slug: { _type: "slug", current: "ecp" },
  title: "Educators' Certificate Programme",
  shortName: "ECP",
  programmeType: "certification",
  proposition:
    "Translate professional experience into credible teaching, curriculum design, and academic influence.",
  audience: [
    "Senior industry professionals",
    "Aspiring Professors of Practice",
    "Faculty and educators",
    "L&D and CHRO leaders",
  ],
  duration: "4-month programme",
  format: "On campus, New Delhi",
  outcomes: [
    "Design a course you can actually teach",
    "Build a publishable case or applied note",
    "Practise teaching in a peer-reviewed classroom",
    "Earn an EFMD-recognised certificate of completion",
  ],
  curriculum: [
    {
      _key: "c1",
      module: "Foundations of teaching and learning",
      description:
        "How adults learn, designing learning outcomes, and building a course outline.",
    },
    {
      _key: "c2",
      module: "Curriculum, assessment, and case writing",
      description:
        "Designing assessment, writing cases, and academic writing for practitioners.",
    },
    {
      _key: "c3",
      module: "AI-enabled teaching and academic practice",
      description:
        "Responsible use of AI in teaching, research, and academic workflows.",
    },
    {
      _key: "c4",
      module: "Capstone and peer teaching",
      description:
        "Teach a real session, receive structured feedback, and submit a capstone artefact.",
    },
  ],
  faculty: [
    { _key: "f1", name: "Academic Council faculty", role: "Academic leadership" },
    { _key: "f2", name: "Professors of Practice", role: "Practitioner faculty" },
  ],
  certification:
    "IIFR Certificate of Completion, EFMD-recognised programme (see certification language note). Founding Batch Scholarship",
  cohorts: [
    {
      _key: "cohort-1",
      id: "ecp-2026-08",
      name: "August 2026 cohort",
      status: "registration-open",
      startDate: "2026-08-21",
      endDate: null,
      applicationDeadline: null,
      fee: "Rs. 5,00,000 + GST",
      format: "On campus, New Delhi",
      location: "Bharatiya Vidya Bhavan, New Delhi",
      capacity: null,
      applicationUrl: "https://admissions.iifr.global/ecp/#apply_now",
      brochureUrl: "/contemporary/start?intent=brochure&programme=ecp",
      owner: { name: "IIFR Admissions", role: "Owner: IIFR admissions office", lastReviewedAt: "2026-08-04" },
    },
  ],
  status: "open",
  source: "staging-dev.iifr.global/ecp.php — verified 2026-08-10",
  owner: { name: "IIFR Admissions", role: "Owner: IIFR admissions office", lastReviewedAt: "2026-08-04" },
};

async function seed() {
  console.log(`Writing ECP document to ${projectId}/${dataset}...`);
  try {
    const result = await client.createOrReplace(ecpDocument);
    console.log(`✓ Seeded programme: ${result._id}`);
    console.log(`  slug: ${result.slug?.current}`);
    console.log(`  title: ${result.title}`);
    console.log(`  cohorts: ${result.cohorts?.length ?? 0}`);
    console.log("\nNext: run `npm run dev` and visit /contemporary/programmes/ecp");
  } catch (err) {
    console.error("✗ Seed failed:", err.message);
    if (err.message.includes("Dataset not found")) {
      console.error(
        "\nThe 'staging' dataset does not exist yet.\n" +
        "Go to https://www.sanity.io/manage > gm051u2t > Dataset\n" +
        "Add dataset named 'staging', then re-run this script."
      );
    }
    process.exit(1);
  }
}

seed();
