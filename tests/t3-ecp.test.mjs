import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";

const text = (path) => readFile(path, "utf8");

test("ECP duration statement is present", async () => {
  const ecp = await text("src/pages/ecp.astro");
  assert.match(ecp, /4-month programme with 8 classroom days across 3 residencies/i);
  assert.match(ecp, /followed by 2 capstone projects with faculty mentorship/i);
});

test("ECP has no stale Round 1 / 30 June 2026 early-bird copy", async () => {
  const ecp = await text("src/pages/ecp.astro");
  assert.doesNotMatch(ecp, /Round 1.*30 June 2026/i);
  assert.doesNotMatch(ecp, /Rs\.?\s*4,00,000\s*\+\s*GST\s*by\s*30\s*June\s*2026/i);
});

test("ECP has Webinars & Masterclass YouTube section with all three URLs", async () => {
  const ecp = await text("src/pages/ecp.astro");
  const webinars = await text("src/components/sections/WebinarsAndMasterclass.astro");
  assert.match(ecp, /WebinarsAndMasterclass/);
  assert.match(webinars, /Webinars[\s\S]{0,30}Masterclass/);
  for (const id of ["NX90Hf8u1GY", "rDgqBGB8wf4", "S1RCyVIayfA"]) {
    assert.match(webinars, new RegExp(`youtube-nocookie\\.com/embed/${id}`));
  }
  assert.match(webinars, /loading="lazy"/);
  assert.doesNotMatch(webinars, /autoplay=true/);
});

test("ECP has #faq anchor after Faculty", async () => {
  const ecp = await text("src/pages/ecp.astro");
  assert.match(ecp, /ecp-faculty-grid[\s\S]*id="faq"/);
});

test("ECP has Capstone Projects and Scholarship Support categories", async () => {
  const ecp = await text("src/pages/ecp.astro");
  assert.match(ecp, /Capstone Projects/);
  assert.match(ecp, /Capstone 1 — Course Design/);
  assert.match(ecp, /Capstone 2 — Case Writing/);
  for (const category of ["Academic Excellence", "Public Service", "Social Impact"]) assert.match(ecp, new RegExp(category));
});
