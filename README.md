# QGolf Asia — local website prototype

A responsive, image-led redesign using warm ivory, muted olive, large editorial typography, real course photography, and the original QGolf logo.

## Run

Requires Node.js 18 or newer. No installation or build is necessary.

```powershell
cd qgolf-asia
npm start
```

Open http://127.0.0.1:4173. The server binds only to the local machine. Stop it with Ctrl+C. If port 4173 is already occupied, reuse the running prototype or set a different `PORT` before starting.

## Included interactions

- Three selectable photographic hero scenes.
- Destination and text search across three curated, real QGolf courses.
- Favorite courses retained in localStorage.
- Course detail dialogs and links to official course sites and current QAccess rates.
- A round planner with date validation, golfer count, session preference, editable summary, saved-plan recovery/removal, and text-file download. It makes no live reservation.
- Four membership tabs, keyboard navigation, citizenship-based published fee display, and a comparison table.
- Validated local membership enquiry preview. Contact details are neither persisted nor transmitted.
- QGolf story dialog, FAQs, mobile navigation, reduced-motion support, and official app-store links.
- App-style phone screens with fixed bottom navigation, saved-course collection, touch-sized controls, and bottom-sheet dialogs.
- Mobile membership comparisons, safe-area support, and a home-screen manifest with app icons.

All visual assets and fonts required to render the prototype are stored locally. External links open official websites. The phone UI and membership card styling are design concepts.

## Files

- `index.html`: page structure and accessible controls.
- `styles.css`: desktop and mobile layouts, animations, and CSS artwork.
- `app.js`: browser-local interactions.
- `mobile.css` and `mobile.js`: responsive app shell and mobile navigation.
- `manifest.webmanifest`: home-screen launch settings (requires a connection; no offline cache).
- `server.mjs`: dependency-free static local server.
- `sources.html`: content provenance and photography credits.

Membership fees are figures published on the supplied QGolf site, not live quotations. Current prices, eligibility, reservations, and benefits must be confirmed with QGolf. See `sources.html` for direct references.

## Verification

`npm run check` checks JavaScript syntax. Mobile update verified in the browser on 12 October 2026:

- Desktop layout at 1440px, tablet at 768px, and phone widths of 390px and 320px; no horizontal page overflow.
- All rendered images loaded, local fonts loaded, and no browser console errors or warnings.
- Bali/Bogor filters, text search, favorite toggling, and saved-course view.
- Course details, planner submission, saved-plan recovery, editing, removal, and text download.
- Membership selection, international fee switch, comparison table, required form fields, and enquiry preview.
- Mobile bottom navigation, menu, direct screen links, back navigation, and reload recovery.
- Main page, CSS, JavaScript, credits page, and representative image assets returned HTTP 200.

## GitHub Pages

This is a static site. Publish the `main` branch at the repository root. `.nojekyll` is included, and all local asset paths are relative so the site works beneath a GitHub Pages project path. No build step or server deployment is required.
