# Showroom Model Guide (Honda Ridgeline & Prologue)

A fast, browser-based reference for a Honda salesperson to use on the lot, on a desktop, tablet or phone.
Pick a model, see exactly what changes between trims, explain model-year history, and answer common
customer questions without digging through the full spec sheet.

## Running it

There's no build step and nothing to install. Open `index.html` in any modern browser, or host the folder on any
static web host (GitHub Pages, Netlify, an internal web server). It works offline once loaded.

## What's in it

| Area | What it does |
| --- | --- |
| **Model picker** | Cards for each model with an illustration, starting price and trim count. Paint swatches recolor the illustration. |
| **Compare Trims** | Side-by-side table. **Show differences only** (on by default) hides everything that's identical, so only the real differences show. Each feature has a tag such as *Elite only*, *Touring & up* or *All trims*. Pick any 2+ trims and filter by keyword. |
| **What Each Trim Adds** | One card per trim: price jump over the previous trim, what it adds, what it upgrades, and anything it *gives up*. For example, Black Edition doesn't include TrailSport's off-road hardware. |
| **Model-Year History** | Color-coded timeline: **New Generation** (red), **Major Refresh** (orange), **Update** (blue), Carryover (gray). Includes generation summaries and a **"Customer has a ____"** tool that lists everything that changed between their year and the current model, which is useful for trade-ins and used units. |
| **Quick Answers** | Customer FAQs (towing, charging, tax credit, CarPlay, plywood in the bed…), key specs, and competitor talking points. |
| **Global search** | Press `/` and type what the customer asked about: "HUD", "cooled seats", "sunroof", "tow". It shows which trim has it on every model. |

Dark mode, print styles and mobile layout are included. Deep links work, e.g. `index.html#prologue-compare`.

## Data and accuracy

All vehicle content lives in `data/*.js`, one file per model. It is **factory equipment only**. Dealer-installed
accessories (floor mats, etc.) are intentionally excluded.

- Data reflects the **2026 model year as of Oct 2026**. Prologue prices include Honda's $7,500 MSRP cut from April 2026.
- Items marked **`verify`** had conflicting public sources. Confirm them against Honda's current spec sheet or
  the dealer order guide, then delete `verify: true` from that line.
- Prices are MSRP and exclude destination.

### Adding or editing a model

Copy `data/prologue.js` to `data/<model>.js`, edit it, and add a `<script>` tag for it in `index.html`
before `js/app.js`. Feature values are listed in trim order:

```js
{ name: "Ventilated front seats", v: [false, false, true] }        // false = not available, true = standard
{ name: "Audio system", v: ["Standard", "Bose", "Bose"] }           // text = trim-specific value
{ name: "Heated wiper park area", v: [false, false, true], verify: true, note: "Shown under the feature name" }
```

History entries use `type`: `generation`, `refresh`, `update`, `carryover`, `gap` or `news`.

### Using real photos

The app draws its own vehicle illustrations so it needs no image files. To use dealership photos, put them in
`images/` and add `photo: "images/ridgeline.jpg"` to that model's data file.
