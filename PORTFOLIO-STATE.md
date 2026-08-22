# Portfolio Current State — Full Description

## Project Overview

**Location:** `C:\Users\esude\Documents\Portfolio\portfolio-site`

A single-page developer portfolio for **Yesudei Erdenesukh** — a frontend developer and Informatics teacher based in Ulaanbaatar, Mongolia. Built with Next.js 16, TypeScript, and Tailwind CSS v4. Deploys to Vercel as a static site.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.3.1 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + custom CSS variables |
| Icons | lucide-react |
| Animations | Framer Motion (nav), CSS transitions, IntersectionObserver |
| Fonts | Google Fonts (Space Grotesk, Inter, JetBrains Mono, Caveat) |
| Package Manager | npm |

---

## Color Palette (Space-themed)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0A0E1A` | Deep navy page background |
| `--bg-panel` | `#111827` | Card/panel surfaces |
| `--line` | `#1E293B` | Borders, dividers, timeline |
| `--text` | `#E2E8F0` | Primary text (chalk white) |
| `--muted` | `#94A3B8` | Secondary text (dusty blue-gray) |
| `--accent` | `#F2C14E` | Chalk yellow — links, CTAs, skill bars, underlines |

---

## Typography

| Role | Font | Weights | Used For |
|------|------|---------|----------|
| Display | Space Grotesk | 500/600/700 | Headings (h1, h2, h3) |
| Body | Inter | 400/500/600 | Paragraphs, descriptions |
| Mono | JetBrains Mono | 400/500/600 | Nav links, section eyebrows (`// about`), labels, dates, typewriter |
| Handwritten | Caveat | 600/700 | Cyrillic name subtitle only |

---

## File Structure

```
src/
├── app/
│   ├── globals.css        (211 lines — tokens, animations, reduced-motion)
│   ├── layout.tsx         (26 lines — metadata, Google Fonts via CSS import)
│   └── page.tsx           (25 lines — composes all sections)
└── components/
    ├── Nav.tsx            (97 lines — fixed nav, glass-blur, hamburger mobile)
    ├── Hero.tsx           (109 lines — two-column, typewriter, monogram panel)
    ├── Typewriter.tsx     (59 lines — role-cycling typewriter effect)
    ├── ChalkUnderline.tsx (32 lines — SVG stroke-dashoffset draw animation)
    ├── ChalkDust.tsx      (38 lines — CSS floating particles)
    ├── SectionReveal.tsx  (40 lines — IntersectionObserver fade+rise)
    ├── About.tsx          (76 lines — bio + trait chips)
    ├── Experience.tsx     (64 lines — dashed timeline, 2 entries)
    ├── Skills.tsx         (84 lines — 3-column skill groups + languages)
    ├── SkillBar.tsx       (46 lines — animated fill bars)
    ├── Education.tsx      (39 lines — single card)
    ├── Contact.tsx        (60 lines — click-to-copy email, phone link)
    └── Footer.tsx         (17 lines — handwritten signature + copyright)
```

**Dependencies:** `next`, `react`, `react-dom`, `framer-motion`, `lucide-react`

---

## Component Breakdown

### Nav (`Nav.tsx`)
- **Fixed position** at top, full-width, z-index 50
- **Glass morphism:** `backdrop-filter: blur(12px)`, semi-transparent `bg-panel/90` on scroll
- **Logo:** `yesudei@dev:~$` in JetBrains Mono, chalk yellow
- **Desktop:** 5 section links (`// about`, `// experience`, `// skills`, `// education`, `// contact`)
- **Mobile:** Hamburger button toggles dropdown via Framer Motion AnimatePresence
- **Scroll progress bar:** 2px fixed at very top (z-index 9999), fills yellow as you scroll
- **Scroll state:** Changes from transparent to glass-bg after 20px scroll

### Hero (`Hero.tsx`)
- **Full viewport height** (`min-h-screen`), centered vertically
- **Two-column grid** on desktop, single column on mobile
- **Left column:**
  - Terminal-style eyebrow: `> greeting.sh`
  - Name: "Yesudei" + "Erdenesukh" in Space Grotesk 4xl-6xl bold
  - Chalk-drawn SVG underline animation under name
  - Cyrillic subtitle: "Эрдэнэсүх Есүдэй" in Caveat handwritten font
  - Typewriter cycling: "Frontend Developer" / "Informatics Teacher" / "React & JavaScript" / "Ulaanbaatar, MN"
  - One-line pitch paragraph
  - Two CTA buttons: "Get in touch" (yellow filled) + "View work" (bordered)
  - Green pulse dot + "Available for frontend roles"
- **Right column:**
  - Dark panel with giant faint "YE" monogram (Space Grotesk, 10-14rem)
  - Monogram follows mouse with parallax offset
  - Floating chalk dust particles (CSS animation)
  - `~/portfolio` label in bottom-left corner
  - Hidden on mobile (`hidden md:flex`)
- **Background:** Two radial gradients (blue top, faint yellow bottom-right)

### Typewriter (`Typewriter.tsx`)
- Cycles through 4 role phrases character-by-character
- Types at 80ms/char, pauses 2s at end, deletes at 40ms/char
- Blinking `|` cursor animation
- Uses `useRef` to avoid setState-in-effect lint issues

### ChalkUnderline (`ChalkUnderline.tsx`)
- SVG path with wavy hand-drawn line
- `stroke-dashoffset` animation: starts at 300, transitions to 0 after 500ms delay
- Chalk yellow stroke, 2.5px width, 0.7 opacity

### ChalkDust (`ChalkDust.tsx`)
- 20 particles with deterministic positions (no `Math.random`)
- CSS `float-up` animation: rise 120px, drift right 30px, fade out
- Staggered delays (0-4s), durations (3-6s)

### SectionReveal (`SectionReveal.tsx`)
- Wraps any section content
- Starts with `opacity: 0, translateY(24px)`
- IntersectionObserver triggers reveal (fade + rise)
- Configurable delay prop for staggered reveals

### About (`About.tsx`)
- Section eyebrow: `// about`
- Two-column grid (3/5 bio, 2/5 traits)
- Bio: 3 paragraphs of the build prompt content
- Traits: 7 chip badges with icons (Users, Zap, Heart, Brain, Star, Smile, Code)
- Each chip: `bg-panel border border-line rounded-full`

### Experience (`Experience.tsx`)
- Section eyebrow: `// experience`
- Vertical dashed timeline (CSS repeating-linear-gradient)
- Yellow-bordered dots at each entry
- 2 entries (most recent first):
  1. Informatics Teacher — Nomch School — Sep 2025–Present
  2. Frontend Developer — Nuden Solution LLC — May 2025–Sep 2025
- Each entry: period badge, role heading, company name, one-line description

### Skills (`Skills.tsx`)
- Section eyebrow: `// skills`
- 3-column grid: Development / Design / Media & Other
- Each column: panel card with border, containing skill bars
- **Skill data:**
  - Development: HTML/CSS 80%, JavaScript 70%, React 70%, Python 70%, GitHub 60%
  - Design: Figma 50%, Adobe Photoshop 50%, Android Studio 70%
  - Media & Other: OBS Studio 70%, Video/content 70%
- Languages row below: Mongolian (Native), English (Upper-intermediate)

### SkillBar (`SkillBar.tsx`)
- Label + percentage on top row (JetBrains Mono)
- 2px rounded bar, `bg-line` track, `bg-accent` fill
- Fill animates from 0 to target width on scroll (IntersectionObserver)
- 1s ease-out transition

### Education (`Education.tsx`)
- Section eyebrow: `// education`
- Single card with border, max-width xl
- GraduationCap icon in yellow-tinted background
- University name + "Bachelor's, Software Engineering — 2022–2026"

### Contact (`Contact.tsx`)
- Section eyebrow: `// contact`
- Centered card, max-width lg, with border and panel background
- Two buttons:
  - Email: click-to-copy `esudei2845@gmail.com`, shows "Copied ✓" for 2s
  - Phone: `tel:+97689801905` link

### Footer (`Footer.tsx`)
- Top border line
- Left: "Yesudei Erdenesukh" in Caveat handwritten font
- Right: copyright + "Built with Next.js & Tailwind CSS"

---

## Animations & Interactions

| Feature | Implementation | Trigger |
|---------|---------------|---------|
| Typewriter | `useState` + `useRef` + `setTimeout` loop | Auto on load |
| Chalk underline | SVG `stroke-dashoffset` CSS transition | 500ms after load |
| Section reveal | IntersectionObserver + CSS class swap | Scroll into view |
| Skill bar fill | IntersectionObserver + width transition | Scroll into view |
| Scroll progress | `scroll` event listener, width percentage | Continuous |
| Chalk dust | CSS `@keyframes float-up` | Auto, staggered |
| Monogram parallax | `mousemove` event, transform translate | Mouse movement |
| Nav glass | Scroll > 20px toggles class | Scroll |
| Mobile nav | Framer Motion AnimatePresence | Hamburger click |
| Copy email | `navigator.clipboard.writeText()` | Button click |
| Cursor blink | CSS `@keyframes blink` | Auto, infinite |

---

## Accessibility

- `prefers-reduced-motion`: All animations/transitions cut to ~0.01ms
- Keyboard focus: `outline: 2px solid var(--accent)` on `:focus-visible`
- Mobile nav: `aria-label="Toggle navigation"` on hamburger button
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Desktop (md+) | Two-column hero, 3-column skills, horizontal nav |
| Mobile (<md) | Single-column everything, hamburger nav dropdown, hero panel hidden |

Minimum supported width: ~360px

---

## Build Status

- `npm run build` — **passes clean** (0 errors, 0 warnings)
- `npm run lint` — **passes clean** (0 errors)
- Dev server: `http://localhost:3000`
