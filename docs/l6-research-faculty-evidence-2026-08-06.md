# L6 evidence: Research & Faculty split

## Scope delivered

- Hub: `/contemporary/research-and-faculty`
- Academic Council list: `/contemporary/research-and-faculty/academic-council`
- Faculty list: `/contemporary/research-and-faculty/faculty`
- Linked individual profiles: `/contemporary/research-and-faculty/profiles/{slug}`

## Sources

- Academic Council: <https://iifr.global/about.php>
- Faculty: <https://iifr.global/research.php>

The implementation stores only IIFR-published names, roles, and concise source-faithful summaries in `src/contemporary/lib/people.ts`. It does not publish inferred programme involvement, credentials, or contact information.

## Build and route evidence

Observed 2026-08-06T15:27:15Z:

```text
npm run build                    PASS
Academic Council profile links   16
Faculty profile links            10
Expected group/profile files      present
Hub links to both group routes    present
Group pages contain source links  present
```

The build prerendered two group-list routes and 23 individual profile routes. No deployment was made.
