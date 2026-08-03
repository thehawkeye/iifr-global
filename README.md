# iifr.global — rebuild

Phase 1 skeleton. Astro + Keystatic + Vercel.

## Local development

```sh
npm install
npm run dev
```

The placeholder index renders at <http://127.0.0.1:4321/> and the Keystatic
admin is at <http://127.0.0.1:4321/keystatic>.

## Build

```sh
npm run build
```

`output: 'static'` produces a fully static site. The Keystatic admin and API
routes run as on-demand functions on Vercel.

## Deploy

A new Vercel project called `iifr-global` is linked but no production deploy
has been made yet (Phase 1 scope). See `vercel.json` for the project-level
configuration.

## Reference

- Plan: `~/Documents/Mac Mini Sync/Business/IIFR/webdev-stack-plan-v3.md`
- Source mirror (do not modify): `~/Documents/Mac Mini Sync/u871210302.20260618111419/domains/iifr.global/public_html/`
