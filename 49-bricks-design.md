# 49 Bricks — Design Specification
### A premium villa & stay-rental marketplace, in the spirit of StayVista

> **Assumption:** "49 Bricks" is a curated marketplace for renting luxury villas, bungalows and holiday homes (not a buy/sell listings portal) — matching the StayVista reference. If you actually want a buy/sell/broker site instead of a stays marketplace, flag it and I'll adjust the sections (add EMI calculators, agent profiles, etc.) rather than search/booking flows.

Stack target: **React + Tailwind CSS only** (no UI kit). This doc is the full token system + layout/component spec to hand to whoever builds it (or to yourself, section by section).

---

## 1. Brand logic

The name is literal: **49** — a specific, human number (a small boutique portfolio, not "thousands of listings") + **Bricks** — the material of a home before it's a lifestyle. The design should feel like it's about the *craft of a stay*: solid, warm, handmade, never glossy-corporate.

**Signature element:** a **running-bond brick course** — a thin horizontal band of offset rectangles — used as a structural divider between sections and as the grid logic for the property cards themselves (alternate rows nudge left/right like bricks in a wall, instead of a plain masonry grid). It's the one motif the whole site is built around, so it appears exactly twice: as section dividers, and as the collection grid offset. Nowhere else — no brick icons stuffed into buttons or bullet points.

---

## 2. Color palette

Deliberately *brick-warm*, not the generic AI-cliché cream+terracotta pairing — pulled darker/redder than #D97757 so it reads as clay/masonry, not a stock accent.

| Token | Hex | Use |
|---|---|---|
| `--clay-700` (Brick) | `#8C3A2B` | Primary brand color — CTAs, active states, brand mark |
| `--clay-900` (Fired Brick) | `#5E2620` | Hover/pressed states, dark accents on light bg |
| `--mortar-950` (Charcoal) | `#26221E` | Body text, footer background, dark sections |
| `--limewash-50` (Warm Plaster) | `#F4EEE4` | Page background |
| `--limewash-100` (Card White) | `#FBF8F2` | Card/panel background |
| `--moss-600` (Moss) | `#6C7A54` | Secondary accent — verified badges, nature/outdoor tags |
| `--brass-500` (Brass) | `#B8935A` | Tertiary accent — price highlights, ratings, dividers |
| `--stone-400` (Stone) | `#9A9086` | Muted text, captions, placeholders |

Tailwind config extension:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      clay: { 50:'#FBF1EC', 300:'#D89C87', 500:'#AC5340', 700:'#8C3A2B', 900:'#5E2620' },
      mortar: { 50:'#F1EFEC', 300:'#8A8377', 700:'#443E37', 950:'#26221E' },
      limewash: { 50:'#F4EEE4', 100:'#FBF8F2' },
      moss: { 500:'#7C8B63', 600:'#6C7A54', 700:'#57623F' },
      brass: { 400:'#C7A876', 500:'#B8935A', 600:'#9C7940' },
      stone: { 300:'#B7AFA4', 400:'#9A9086', 500:'#7D746A' },
    },
    fontFamily: {
      display: ['"Fraunces"', 'ui-serif', 'serif'],
      body: ['"General Sans"', '"Inter"', 'ui-sans-serif', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    borderRadius: {
      none: '0px', sm: '2px', DEFAULT: '2px', md: '4px', lg: '6px', // sharp, masonry-like edges — no pill buttons, no rounded-2xl cards
    },
  }
}
```

---

## 3. Typography

Three roles, used with restraint:

- **Display — Fraunces** (variable serif, high optical weight, slight ink-trap warmth). Used *only* for H1/H2 headlines and the wordmark. Set tight (`tracking-tight`), large, at font-weight 600–900. This is what gives the site its "handmade materials" personality instead of a generic sans-only startup look.
- **Body — General Sans / Inter**. All paragraph copy, nav, buttons. Weight 400–500, generous line-height (`leading-relaxed`) for a calm, unhurried read.
- **Mono — JetBrains Mono**. Reserved for *numbers only*: prices, dates, guest counts, property codes ("Villa No. 12/49"), star ratings. This ties back to the brand's numeric identity ("49") and gives specs a plaque-like, architectural precision.

Type scale (Tailwind classes):

```
H1  text-5xl md:text-7xl   font-display font-semibold tracking-tight
H2  text-3xl md:text-5xl   font-display font-semibold
H3  text-xl  md:text-2xl   font-display font-medium
Body      text-base md:text-lg  font-body font-normal leading-relaxed
Caption   text-sm font-body text-stone-400
Numerals  font-mono text-sm md:text-base tracking-wide
```

---

## 4. Layout — page by page

### Wireframe: Home

```
┌────────────────────────────────────────────────────┐
│  [49 Bricks]     Villas  Collections  Experiences   │  ← sticky nav, transparent
│                          About  Contact   [Enquire] │     over hero, solid on scroll
├────────────────────────────────────────────────────┤
│                                                      │
│           FULL-BLEED HERO IMAGE / SLOW PAN          │
│        "Script your stay, one brick at a time."     │
│                                                      │
│     ┌──────────────────────────────────────────┐    │
│     │ Location │ Check-in │ Check-out │ Guests │ 🔍│  ← floating search bar,
│     └──────────────────────────────────────────┘    │     overlaps hero + next section
├──▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨ brick-course divider ▨▨▨▨▨▨▨▨▨▨──┤
│   49 villas · 14 cities · 4.8★ avg · est. 2019      │  ← trust strip, mono numerals
├────────────────────────────────────────────────────┤
│  Featured Collections                    View all → │
│  ┌────────┐   ┌────────┐   ┌────────┐              │
│  │ Card 1 │ ┌────────┐ ┌────────┐  ┌────────┐       │  ← offset "brick course" grid:
│  └────────┘ │ Card 2 │ │ Card 3 │  │ Card 4 │        │     odd cards sit higher,
│             └────────┘ └────────┘  └────────┘       │     even cards lower — like
├──▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨ brick-course divider ▨▨▨▨▨▨▨▨▨▨──┤     a running-bond wall
│  Why 49 Bricks                                      │
│  [Verified]   [Private pools]  [Host on-call] [Curated]│  ← 4 feature blocks, icon+text
├────────────────────────────────────────────────────┤
│  Curated Experiences (editorial strip)              │
│  "Monsoon in Lonavala"  "Desert nights in Jaisalmer" │
├────────────────────────────────────────────────────┤
│  What guests say          ◀ testimonial carousel ▶  │
├──────────────── brass newsletter band ──────────────┤
│  Footer (mortar-950): sitemap · social · brick-course top border│
└────────────────────────────────────────────────────┘
```

### Section notes

**Nav**
- Absolute-positioned, transparent, white text over hero; on scroll (`>80px`) crossfades to `bg-limewash-50/95 backdrop-blur` with `mortar-950` text and a `1px` brick-toned bottom border.
- Wordmark: "49" in mono, "Bricks" in Fraunces — reinforces the two-typeface brand logic in miniature.
- CTA button "Enquire" — solid `clay-700`, sharp corners, `hover:bg-clay-900`.

**Hero**
- Full-bleed villa photography (16:9 crop, slow 20s Ken-Burns zoom, `prefers-reduced-motion` disables it).
- Headline in Fraunces, subhead in body font, both left-aligned on a scrim gradient (`from-mortar-950/60 to-transparent`).
- Search bar: `bg-limewash-100`, sharp `rounded-sm` corners, drop shadow, positioned `translate-y-1/2` so it straddles the hero/trust-strip boundary — this is the one "float" moment on the page, everything else sits flat.

**Trust strip**
- Single row, mono numerals + body labels, divided by thin vertical `brass-500/40` rules, centered.

**Featured Collections grid (the signature)**
- CSS grid, 4 columns desktop / 2 tablet / 1 mobile.
- Odd-indexed cards: `mt-0`. Even-indexed cards: `mt-10` (desktop only) — literally staggered like a brick course. On scroll, cards animate in from alternating left/right by 24px, staggered 80ms apart, mimicking bricks being laid.
- Card anatomy: image (4:5), gradient scrim, property name (Fraunces), location + capacity (body, `stone-400`), price/night (mono, `clay-700`, right-aligned), small `moss-600` "Verified" badge top-left if applicable.
- Corners sharp (`rounded-sm` max) — no soft rounded-2xl cards; that's the one accessory being deliberately removed to keep the masonry logic legible.

**Why 49 Bricks**
- 4-up icon row (line icons, `mortar-950`, no filled/duotone icons — keep them quiet). Each: short label + one sentence, not marketing copy — plain statements ("A host answers within 15 minutes, day or night.").

**Curated Experiences**
- Horizontal-scroll editorial cards (large image, small caption), a change of rhythm from the grid above — this is where "Vista"-style aspirational storytelling lives, distinct from the transactional property grid.

**Testimonials**
- Simple carousel, one quote at a time, Fraunces italic for the quote, mono for guest initials + stay dates.

**Newsletter band**
- Full-width `brass-500` background, `mortar-950` text, single email input + button, sharp corners.

**Footer**
- `mortar-950` background, `limewash-50` text, thin brick-course pattern as the very top border (repeating a small SVG of 3 offset rectangles).
- Columns: Explore / Company / Support / Social. Bottom bar: © 49 Bricks, legal links.

---

## 5. Components spec (for the React build)

| Component | Key Tailwind behavior |
|---|---|
| `<Navbar />` | `fixed top-0 w-full z-50`, scroll-listener toggles bg/text classes |
| `<SearchBar />` | 4-field flex row → stacks to `flex-col gap-3` below `md:` |
| `<PropertyCard />` | `group`, image `group-hover:scale-105 transition-transform duration-500`, staggered `nth-child` margin via a small `isEven` prop rather than CSS `:nth-child` (React-friendly) |
| `<BrickDivider />` | Reusable SVG strip component, `<svg>` repeating offset-rect pattern, used between every major section |
| `<FeatureBlock />` | Icon + heading + one-line body, `flex flex-col items-start gap-2` |
| `<Testimonial />` | Carousel state via `useState` index, no external carousel library needed at this scale |
| `<Button />` | Two variants only — `variant="solid"` (clay bg) and `variant="outline"` (brass border, transparent bg); both `rounded-sm`, no third variant, keep the system small |

---

## 6. Motion

- Hero image: slow ambient zoom only.
- Collection grid: staggered slide-in on scroll (IntersectionObserver + Tailwind `transition` classes toggled via React state), alternating direction per column to reinforce the brick-laying idea. This is the one orchestrated moment — everywhere else motion is a simple 150–200ms hover/opacity transition, nothing more.
- Respect `prefers-reduced-motion: reduce` — disable Ken Burns + stagger, keep instant fades only.

---

## 7. Accessibility & responsive floor

- All interactive elements have visible focus rings: `focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2`.
- Color contrast: `mortar-950` on `limewash-50` and `limewash-50` on `mortar-950` both pass AA; `clay-700` on white passes AA for large text/buttons — verify at implementation time if copy sizes change.
- Breakpoints: mobile-first, key ones `sm:640 md:768 lg:1024 xl:1280`. Search bar and grid are the two components that materially restructure per breakpoint (see above); everything else just narrows.

---

## 8. What to build first

1. Design tokens (`tailwind.config.js` above) + Fraunces/General Sans/JetBrains Mono font loading.
2. `<Navbar />`, `<Hero />`, `<SearchBar />`.
3. `<BrickDivider />` + `<PropertyCard />` + the staggered grid — this is the section worth spending the most polish on since it's the signature.
4. Remaining sections (Why Us, Experiences, Testimonials, Newsletter, Footer) — simpler, mostly type + spacing.
