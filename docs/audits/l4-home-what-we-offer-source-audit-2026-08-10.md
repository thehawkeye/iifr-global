# L4 Home "What we offer" source audit

Verified on 2026-08-10 against the live source endpoints named in the L4 brief. This audit is limited to the data rendered by the Home programme cards and the ECP application route.

## ECP

Source: `https://staging-dev.iifr.global/ecp.php`

Observed in the ECP quick facts and hero:

- ECP is open for the August 2026 cohort, starting 21 Aug 2026.
- Duration is a 4-month programme.
- Delivery is on campus in New Delhi.
- Fee is Rs. 5,00,000 + GST; scholarships are available.

The staging source does not state an end date, application deadline, or cohort capacity in the rendered quick facts. Those fields are intentionally omitted from the contemporary ECP cohort record rather than inferred.

## ECP application CTA

Source: `https://admissions.iifr.global/ecp/`

The rendered "Apply Now" links use `href="#apply_now"` and resolve to `https://admissions.iifr.global/ecp/#apply_now`. The contemporary ECP primary CTA now uses that exact resolved URL.

## Programme state directions

The L4 task brief supplies the authoritative states not present in the ECP source:

- Executive Fellow in Management: `Coming soon`
- Research and faculty development workshops: `By enquiry`

No dates, fees, or intake details are displayed for EFM because no source was supplied for them.
