# Isolation Media

Marketing site for **Isolation Media**, a generative engine optimisation (GEO
and AEO) agency. When customers ask AI assistants a buying question, we make
our clients the answer.

> *Be the answer. Nothing else.*

## Stack

Hand built static site with no framework and no build step. Any static server
works.

- `index.html` home (hero, stats, the shift, services overview, results preview, quote, CTA)
- `services.html` the four services in detail plus process and exclusivity promise
- `results.html` stats, case studies and testimonials
- `about.html` story, facts and values
- `contact.html` audit request form and FAQ
- `blog.html` article listing, with six GEO articles under `blog/`
- `404.html` not found page
- `assets/css/style.css` all styling
- `assets/js/main.js` scroll reveals, animated counters, sticky nav, mobile menu, contact form
- `assets/fonts/` Montreal Medium (display) and Franklin Gothic Book (body)
- `assets/img/brand/` brand identity assets (wordmark, brandmark, avatars, favicon)

## Brand

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#0B1E1A` | type, dark bands |
| Signal Mint | `#0E9F78` | single accent, buttons |
| Signal Bright | `#2BE4AC` | accent on dark bands |
| Paper | `#F7FAF8` | cool white ground |
| Paper Tint | `#EDF3F0` | section tint bands |
| Stone | `#7C8B85` | secondary text, captions |

Clean, light, editorial layout. The accent is used sparingly: brand mark,
primary buttons and small markers only.

## Run locally

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## To do / customise later

- Replace the stats, case studies and testimonials with real client numbers
  and quotes
- Wire the contact form to a backend or form service (currently opens the
  visitor's mail client to `admin@isolationmedia.com`)
- Confirm the real domain email address
