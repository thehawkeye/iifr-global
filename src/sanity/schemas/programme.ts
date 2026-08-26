/**
 * Programme schema — top-level collection.
 *
 * Field names mirror content.ts Programme interface exactly:
 * shortName, proposition, cohorts[].applicationUrl, etc.
 *
 * Uses slug.name as the display title (maps to content.ts title field).
 */
import { defineType, defineField } from "sanity";
import { cohort } from "./cohort";

export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",

  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Programme display name, e.g. 'Educators' Certificate Programme'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      description: 'e.g. "ECP", "EFM"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "programmeType",
      title: "Programme type",
      type: "string",
      options: {
        list: [
          { title: "Certification", value: "certification" },
          { title: "Fellowship", value: "fellowship" },
          { title: "Workshop", value: "workshop" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "proposition",
      title: "Value proposition",
      type: "text",
      description: "Short, punchy description — maps to Keystatic 'tagline'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "array",
      of: [{ type: "string" }],
      description: "List of audience segments",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "4-month programme"',
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      description: 'e.g. "On campus, New Delhi"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Full description in Portable Text",
    }),
    defineField({
      name: "outcomes",
      title: "Learning outcomes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "curriculum",
      title: "Curriculum",
      type: "array",
      of: [
        {
          type: "object",
          name: "curriculumModule",
          title: "Module",
          fields: [
            { name: "module", title: "Module title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "faculty",
      title: "Faculty",
      type: "array",
      of: [
        {
          type: "object",
          name: "facultyMember",
          title: "Faculty member",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "certification",
      title: "Certification",
      type: "text",
    }),
    defineField({
      name: "cohorts",
      title: "Cohorts",
      type: "array",
      of: [{ type: "cohort" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "By enquiry", value: "by-enquiry" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Verification source, e.g. 'staging-dev.iifr.global/ecp.php — verified 2026-08-10'",
    }),
    defineField({
      name: "owner",
      title: "Owner",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "role", title: "Role", type: "string" },
        { name: "lastReviewedAt", title: "Last reviewed at", type: "string" },
      ],
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "shortName" },
  },
});
