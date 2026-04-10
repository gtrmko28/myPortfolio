---
name: design-inspiration
description: "Mandatory pre-build design analysis and global design system constraints. Active on every UI task — React, Tailwind, JSX, or CSS component, page, layout, or design modification."
---

# design-inspiration.md
> **Antigravity Skill — Active on every UI task**

---

## ⚠️ SYSTEM DIRECTIVE

**This instruction is mandatory. You must follow it completely before generating any UI code.**

Before writing a single line of React, Tailwind, JSX, or CSS for any new component, page, layout, or design modification, you **must** execute the following steps in order:

### Step 1 — Scan the skill folder for reference images
Locate every image file (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.gif`) present in this skill folder. These are your visual ground truth. They represent the exact aesthetic direction the user wants to achieve.

> If no reference images are found, **stop and notify the user** before proceeding. Say: *"No reference images were found in the design-inspiration skill folder. Please add at least one reference screenshot or mockup so I can align to your intended visual style."* Do not invent a direction from scratch.

### Step 2 — Perform a deep visual analysis of every reference image
For each image found, extract and document (internally) the following signals:

| Signal | What to look for |
|---|---|
| **Layout structure** | Grid vs. freeform, number of columns, sidebar presence, hero layout, content hierarchy, whitespace usage |
| **Spatial rhythm** | Padding generosity, margin patterns, density (airy vs. packed), section heights |
| **Typography** | Font personality (geometric, humanist, serif, mono), weight contrast between headings and body, size scale, tracking, line height |
| **Color usage** | Background surfaces, text colors, accent placement, border and divider treatment, shadow depth |
| **Component language** | How buttons, inputs, cards, badges, tabs, and modals are shaped and styled |
| **Interaction cues** | Hover affordances, focus indicators, active states, motion hints |
| **Decorative details** | Iconography style, illustration presence, dividers, tags, avatars, list markers |
| **Overall mood** | Is the design editorial? Product-grade? Minimal? Playful? Luxurious? Dense? Clinical? |

### Step 3 — Synthesize before you build
After analyzing all reference images, form a single synthesis statement (internally) that answers: *"What are the 3–5 most defining visual characteristics of these references that I must carry into my output?"* Your generated code must directly reflect these characteristics.

### Step 4 — Cross-reference with the Global Design System
Reconcile what you observed in the reference images against the hard constraints defined in the **Global Design System** section below. The references inform *style, mood, and feel*. The Global Design System governs *non-negotiable tokens and rules*. When they conflict, the Global Design System wins.

### Step 5 — Only now, write code
Proceed to generate production-quality React and Tailwind code that is faithful to both the reference images and the design system below. Every decision — a spacing value, a font weight, a border radius, a color — must be traceable back to either a reference image signal or a design system rule.

---

## 🎨 GLOBAL DESIGN SYSTEM

These are hard constraints. They apply to every component, every page, every interaction — no exceptions, no overrides, unless the user explicitly instructs a change in the current session.

---

### Colors

```
Background:   Pure White       #FFFFFF
Primary Text: Dark Graphite    #111827
Accent:       Deep Navy Indigo #1B2A6B
```

**Extended palette derived from the above:**

| Role | Hex | Tailwind |
|---|---|---|
| Background | `#FFFFFF` | `bg-white` |
| Primary Text | `#111827` | `text-[#111827]` |
| Secondary Text | `#6B7280` | `text-[#6B7280]` |
| Accent | `#1B2A6B` | `text-[#1B2A6B]` / `bg-[#1B2A6B]` |
| Accent Hover | `#16235A` | `hover:bg-[#16235A]` |
| Accent Muted | `rgba(27,42,107,0.08)` | `bg-[#1B2A6B]/8` |
| Surface / Card | `#F9FAFB` | `bg-[#F9FAFB]` |
| Border | `#E5E7EB` | `border-[#E5E7EB]` |
| Divider | `#F3F4F6` | `divide-[#F3F4F6]` |

**Rules:**
- Page and section backgrounds are always white (`#FFFFFF`) or surface (`#F9FAFB`). No colored, dark, or gradient page backgrounds unless a reference image shows this and the user approves it.
- The accent color `#1B2A6B` is used for CTAs, links, active states, icon highlights, and emphasis — never as a large decorative fill on content areas.
- Do not introduce colors from outside this palette. No teal, coral, orange, purple, or neon tints.

---

### Typography

**Font family: Geist**

```css
font-family: 'Geist', 'Inter', sans-serif;
```

Always import or configure Geist. In Next.js projects, use `next/font/google`. In Vite/CRA projects, load via `@fontsource/geist` or a CDN link.

```js
// tailwind.config.js — always extend with this
theme: {
  extend: {
    fontFamily: {
      sans: ['Geist', 'Inter', 'sans-serif'],
    },
  },
}
```

**Type scale:**

| Level | Size | Weight | Tracking |
|---|---|---|---|
| Display | `text-5xl` / `3rem+` | `font-bold` (700) | `-0.02em` |
| H1 | `text-4xl` | `font-bold` (700) | `-0.02em` |
| H2 | `text-3xl` | `font-semibold` (600) | `-0.015em` |
| H3 | `text-2xl` | `font-semibold` (600) | `-0.01em` |
| H4 | `text-xl` | `font-medium` (500) | `0` |
| Body | `text-base` | `font-normal` (400) | `0` |
| Small | `text-sm` | `font-normal` (400) | `0` |
| Label / Cap | `text-xs` | `font-medium` (500) | `+0.05em` |

**Rules:**
- Never use Inter, Roboto, Arial, system-ui, or any Tailwind default font stack as the primary typeface.
- Heading line height: `leading-tight` (`1.15`). Body line height: `leading-relaxed` (`1.6`).
- Uppercase labels must always pair with `tracking-wide` and `font-medium`.

---

### Buttons

**All buttons must be pill-shaped. This is absolute.**

```css
border-radius: 32px;
```

Tailwind equivalent: `rounded-full`

> ❌ Never use `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, or `rounded-2xl` on any button, anywhere, ever.

**Button variants:**

```jsx
// Primary
<button className="rounded-full bg-[#1B2A6B] text-white px-6 py-2.5 font-medium
  hover:bg-[#16235A] transition-all duration-150 ease-in-out">
  Label
</button>

// Secondary (outlined)
<button className="rounded-full border border-[#1B2A6B] text-[#1B2A6B] px-6 py-2.5
  font-medium hover:bg-[#1B2A6B]/8 transition-all duration-150 ease-in-out">
  Label
</button>

// Ghost
<button className="rounded-full text-[#1B2A6B] px-6 py-2.5 font-medium
  hover:bg-[#1B2A6B]/8 transition-all duration-150 ease-in-out">
  Label
</button>

// Destructive
<button className="rounded-full bg-red-500 text-white px-6 py-2.5 font-medium
  hover:bg-red-600 transition-all duration-150 ease-in-out">
  Label
</button>

// Disabled (any variant)
<button disabled className="rounded-full bg-[#E5E7EB] text-[#9CA3AF] px-6 py-2.5
  font-medium cursor-not-allowed">
  Label
</button>
```

**Size modifiers:**
- Large: `px-8 py-3 text-base`
- Default: `px-6 py-2.5 text-sm`
- Small: `px-4 py-2 text-xs`

---

### Spacing & Layout

- Base grid: **8px**. All spacing must be a multiple of 4px or 8px.
- Standard container: `max-w-6xl mx-auto px-6`
- Reading-width container: `max-w-3xl mx-auto px-6`
- Section vertical padding: `py-16` (default) to `py-24` (hero/featured)
- Card padding: `p-6` (default), `p-8` (spacious)
- Grid gaps: `gap-6` or `gap-8`

---

### Cards & Surfaces

```jsx
// Standard card
<div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm
  hover:shadow-md transition-shadow duration-150">
  ...
</div>

// Muted surface card
<div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6">
  ...
</div>
```

**Rules:**
- Cards always use `rounded-2xl`. Never `rounded` or `rounded-lg` for card containers.
- Shadows are subtle: `shadow-sm` at rest, `shadow-md` on hover. Never `shadow-xl` or `shadow-2xl` on cards.
- No glassmorphism, blur backdrops, or frosted glass unless a reference image explicitly uses them.

---

### Iconography

- Default library: **Lucide React** (`lucide-react`)
- Sizes: `16px` inline text · `20px` UI controls · `24px` standalone
- Color: `text-[#111827]` neutral · `text-[#1B2A6B]` accent · `text-[#6B7280]` muted
- Never use emoji as functional UI icons.

---

### Motion & Transitions

- All interactive elements: `transition-all duration-150 ease-in-out`
- Entrance animations: fade up — `opacity-0 translate-y-2` → `opacity-100 translate-y-0`, duration `300ms`
- Stagger delay between sequential elements: `50ms` increments
- No bouncy, springy, or exaggerated easing. Keep motion purposeful and restrained.
- Focus rings: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A6B]`

---

## 🚫 ANTI-PATTERNS — NEVER DO THESE

The following are explicitly prohibited in all output, regardless of context:

- Using `rounded-md`, `rounded-lg`, `rounded-xl` on buttons
- Using Inter, Roboto, Arial, or system-ui as the primary font
- Dark page backgrounds, gradient fills, or colored hero backgrounds not sourced from a reference image
- Purple gradients, teal, coral, neon, or any off-palette color
- Generic card patterns with no visual connection to the reference images
- Drop shadows heavier than `shadow-md` on standard components
- Inventing a visual direction without first analyzing the reference images
- Overriding design system tokens without explicit user instruction

---

## ✅ PRE-DELIVERY COMPLIANCE CHECKLIST

Before delivering any code, confirm internally:

- [ ] I have scanned the skill folder and located all reference images
- [ ] I have analyzed every reference image for layout, color, type, and component signals
- [ ] My output reflects the visual mood and patterns observed in the references
- [ ] All buttons use `rounded-full` — never `rounded-md`, `rounded-lg`, or `rounded-xl`
- [ ] Font family is set to Geist with the correct Tailwind config extension
- [ ] All colors are sourced from the defined palette using `#FFFFFF` / `#111827` / `#1B2A6B`
- [ ] Spacing follows the 8px base grid
- [ ] No anti-patterns listed above are present anywhere in the output
