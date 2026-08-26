/**
 * Event schema — top-level collection.
 *
 * Field names mirror content.ts Event interface exactly:
 * slug, title, eventType, dateTime, timeZone, duration, format,
 * summary, speakers, registrationUrl, relatedProgramme, status, image, etc.
 *
 * Image fields (hotspot + crop) and alt text are required from day one.
 */
import { defineType, defineField, defineArrayMember } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Event display name, e.g. 'ECP Cohort 1 Participant Briefing'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event type",
      type: "string",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "Lecture", value: "lecture" },
          { title: "Panel", value: "panel" },
          { title: "Fellowship", value: "fellowship" },
          { title: "Convening", value: "convening" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "Short description — maps to content.ts summary",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      description: 'e.g. "Prospective ECP participants and sponsors"',
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      description: 'e.g. "Educator development", "Applied research"',
    }),
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "speakerItem",
          title: "Speaker",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "affiliation", title: "Affiliation", type: "string" },
          ],
          preview: {
            select: { title: "name", subtitle: "affiliation" },
          },
        }),
      ],
    }),
    defineField({
      name: "dateTime",
      title: "Date and time",
      type: "datetime",
      description: "ISO 8601 datetime, e.g. 2026-08-14T16:00:00+05:30",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "timeZone",
      title: "Time zone",
      type: "string",
      description: 'IANA tz, e.g. "Asia/Kolkata"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "60 minutes", "Half day", "Full day"',
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      description: 'e.g. "Online (registration required)", "In-person, New Delhi"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "relatedProgramme",
      title: "Related programme",
      type: "string",
      description:
        "Programme slug this event belongs to, e.g. 'ecp', 'efm'. Null for standalone events.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Registration open", value: "registration-open" },
          { title: "Registration closed", value: "registration-closed" },
          { title: "Past", value: "past" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Event image",
      type: "image",
      options: {
        hotspot: true,
        crop: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Required — describe the image for screen readers and SEO",
          validation: (r) =>
            r.required().error("Alt text is required on all images"),
        }),
      ],
      validation: (r) => r.required().error("Event image is required"),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description:
        "Verification source, e.g. 'IIFR events calendar — verified 2026-08-04'",
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
    select: { title: "title", subtitle: "eventType" },
  },
});
