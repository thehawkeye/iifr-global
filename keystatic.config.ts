// Keystatic content schema — Phase 1 skeleton.
//
// The schemas below are deliberately thin: each collection has the minimum
// fields the v3 plan (§4.1) requires for the data model. Full schema design
// (CTAs, FAQ arrays, SEO objects, multi-language support, related-post
// references) is Phase 3 work and will be added without breaking the path /
// slug layout defined here.
//
// Storage is `local` for Phase 1 so Akshat can develop against the file system.
// Phase 3 will flip storage to `github` once the GitHub OAuth app and the
// `iifr-global` GitHub repo are wired up.

import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site settings',
      path: 'src/content/site-settings/',
      schema: {
        siteName: fields.text({
          label: 'Site name',
          validation: { isRequired: true },
        }),
        ga4Id: fields.text({ label: 'GA4 measurement ID' }),
        gtmId: fields.text({ label: 'Google Tag Manager ID' }),
        googleAdsId: fields.text({ label: 'Google Ads ID' }),
        metaPixelId: fields.text({ label: 'Meta Pixel ID' }),
        contactEmail: fields.text({ label: 'Contact email' }),
      },
    }),
  },
  collections: {
    programmes: collection({
      label: 'Programmes',
      slugField: 'title',
      path: 'src/content/programmes/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Programme title',
            validation: { isRequired: true },
          },
        }),
        tagline: fields.text({ label: 'Tagline' }),
        description: fields.markdoc({ label: 'Description' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Open for applications', value: 'open' },
            { label: 'Coming soon', value: 'coming-soon' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'coming-soon',
        }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      schema: {
        title: fields.slug({
          name: {
            label: 'Event title',
            validation: { isRequired: true },
          },
        }),
        startDate: fields.date({ label: 'Start date' }),
        endDate: fields.date({ label: 'End date' }),
        location: fields.text({ label: 'Location' }),
        registrationUrl: fields.url({ label: 'Registration URL' }),
        summary: fields.text({ label: 'Summary' }),
      },
    }),
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Post title',
            validation: { isRequired: true },
          },
        }),
        format: fields.select({
          label: 'Format',
          options: [
            { label: 'Practitioner essay', value: 'practitioner-essay' },
            { label: 'Research note', value: 'research-note' },
            { label: 'Case study', value: 'case-study' },
          ],
          defaultValue: 'practitioner-essay',
        }),
        dek: fields.text({ label: 'Dek (subheading)', multiline: true }),
        authorName: fields.text({ label: 'Author name' }),
        authorProfile: fields.text({
          label: 'Author profile slug (points at people.ts entry — not enforced in Phase 1)',
        }),
        publishDate: fields.date({ label: 'Publish date' }),
        updateDate: fields.date({ label: 'Update date' }),
        readingTime: fields.text({ label: 'Reading time' }),
        topic: fields.text({ label: 'Topic' }),
        audience: fields.text({ label: 'Audience' }),
        relatedProgramme: fields.text({
          label: 'Related programme slug (matches programmes collection)',
        }),
        source: fields.text({
          label: 'Source (informational; readonly after first write)',
        }),
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
    faculty: collection({
      label: 'Faculty',
      slugField: 'name',
      path: 'src/content/faculty/*',
      schema: {
        name: fields.slug({
          name: {
            label: 'Full name',
            validation: { isRequired: true },
          },
        }),
        title: fields.text({ label: 'Title' }),
        affiliation: fields.text({ label: 'Affiliation' }),
        bio: fields.text({ label: 'Short bio', multiline: true }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
            validation: { isRequired: true },
          },
        }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        programme: fields.text({ label: 'Programme' }),
        consent: fields.checkbox({ label: 'Consent to publish' }),
      },
    }),
  },
});
