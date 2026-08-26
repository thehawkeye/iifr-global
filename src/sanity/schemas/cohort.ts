/**
 * Cohort schema — embedded object type within `programme`.
 * Not a top-level collection.
 *
 * Field names mirror content.ts Cohort interface exactly.
 */
import { defineType, defineField } from "sanity";

export const cohort = defineType({
  name: "cohort",
  title: "Cohort",
  type: "object",

  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: 'Internal identifier, e.g. "ecp-2026-08"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'Display name, e.g. "August 2026 cohort"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Registration open", value: "registration-open" },
          { title: "Registration closed", value: "registration-closed" },
          { title: "In session", value: "in-session" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
    }),
    defineField({
      name: "applicationDeadline",
      title: "Application deadline",
      type: "date",
    }),
    defineField({
      name: "fee",
      title: "Fee",
      type: "string",
      description: 'Display string, e.g. "Rs. 5,00,000 + GST"',
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      description: 'e.g. "On campus, New Delhi"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "string",
      description: 'e.g. "Cohorts of 20–40"',
    }),
    defineField({
      name: "applicationUrl",
      title: "Application URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brochureUrl",
      title: "Brochure URL",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "status" },
  },
});
