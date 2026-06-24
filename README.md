# Isolation Media

Marketing site for **Isolation Media** — a London paid-advertising & SEO agency.
Bold, aggressive, energetic, relevant, superior.

> *Isolate what works.*

## Stack

Hand-built static site — no framework, no build step. Just open `index.html`.

- `index.html` — single-page site (hero, intro, stats, work, services, process, about, logos, testimonials, contact, footer)
- `assets/css/style.css` — all styling
- `assets/js/main.js` — loader, scroll reveals, animated counters, sticky nav, mobile menu, contact form
- `assets/fonts/` — Montreal Medium (display) + Franklin Gothic Book (body)
- `assets/img/brand/` — brand identity assets (wordmark, brandmark, avatars, favicon)

## Brand

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#0F0E0C` | type, dark backgrounds |
| Signal Orange | `#FF5C00` | single accent (the "signal") |
| Paper | `#F2F0EA` | warm off-white surfaces |
| Stone | `#8A8782` | secondary text, captions |

Design language borrows the structure & feel of a reference site (rounded panels,
sticky stacked cards, marquees, scroll reveals) rebuilt entirely in Isolation's
own palette and voice.

## Run locally

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## To do / customise later

- Swap placeholder case studies & testimonials for real ones
- Drop real client logos into the marquee
- Wire the contact form to a backend or form service (currently opens the user's
  mail client to `hello@isolationmedia.com`)
- Replace social links in the footer
- Confirm the real domain email address
