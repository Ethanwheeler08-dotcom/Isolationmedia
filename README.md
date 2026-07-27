# Isolation Media

Marketing site for **Isolation Media**, a paid media agency that works
exclusively with law firms.

> *Full caseloads. Nothing else.*

## Stack

Hand built static site with no framework and no build step. Just open `index.html`.

- `index.html` single page site (hero, stats, why legal only, services, results, process, testimonials, FAQ, contact, footer)
- `assets/css/style.css` all styling
- `assets/js/main.js` scroll reveals, animated counters, sticky nav, mobile menu, contact form
- `assets/fonts/` Montreal Medium (display) and Franklin Gothic Book (body)
- `assets/img/brand/` brand identity assets (wordmark, brandmark, avatars, favicon)

## Brand

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#14120E` | type, results band |
| Signal Orange | `#FF5C00` | single accent |
| Paper | `#FAF9F5` | warm white ground |
| Paper Tint | `#F1EFE8` | section tint, stats and CTA bands |
| Stone | `#8A8780` | secondary text, captions |

Clean, light, editorial layout. Orange is used sparingly: brand mark, primary
buttons and small accents only.

## Run locally

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## To do / customise later

- Replace the stats, case results and testimonials with real client numbers and
  quotes before going live
- Wire the contact form to a backend or form service (currently opens the
  visitor's mail client to `hello@isolationmedia.com`)
- Confirm the real domain email address
