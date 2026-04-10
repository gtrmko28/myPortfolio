# CASE STUDY KNOWLEDGE DOCUMENT
## Breazen — UX Research
### Version 1.0 | For AI Developer Agent | Inherits Global System v2.0

---

## 0. HOW TO USE THIS DOCUMENT

This document is the single source of truth for building the **Breazen UX Research Case Study Page** at route `/case-study/breazen`. It inherits all global design tokens, typography, and interaction rules from the **Main Portfolio Knowledge Document v2.0**. Read both documents before writing a single line of code.

**Inheritance rule:** Every CSS variable, font spec, button style, and animation spec from the Global Document is valid here. This document only defines what is **new or case-study-specific**. Where this document conflicts with the global one, this document wins for this page only.

---

## 1. PAGE ARCHITECTURE

### 1.1 Route & File
```
/case-study/breazen   ← This page
```

### 1.2 Desktop Layout — Two-Column Split

```
┌─────────────────────────────────────────────────────────────┐
│  STICKY NAV (inherited from global — same header component) │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  LEFT        │  RIGHT CONTENT AREA                         │
│  SIDEBAR     │  (scrolling)                                 │
│  25% width   │  75% width                                   │
│  Sticky      │  max-width: 800px (inner content)            │
│  Scroll Spy  │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

- **Outer container:** `max-width: 1100px`, centered, `padding: 0 24px`
- **Column gap:** `48px`
- **Left sidebar:** `width: 25%`, `position: sticky`, `top: 96px` (clears nav), `align-self: flex-start`, `max-height: calc(100vh - 120px)`, `overflow-y: auto`
- **Right content area:** `width: 75%`, `padding-top: 0`
- **Right inner content:** `max-width: 800px` (text wraps at readable measure; images may bleed to 100% of the 75% column)

### 1.3 Mobile Layout (< 768px)

- Sidebar collapses and becomes a **horizontal pill-scroll tab bar** pinned just below the sticky header (`position: sticky; top: 64px; z-index: 40`). Tabs scroll horizontally, active tab has Indigo background + white text.
- Content area: full width, `padding: 0 20px`

---

## 2. CSS VARIABLES (case-study additions, all global vars also apply)

```css
:root {
  /* ── Inherited from Global ── */
  --color-bg: #FFFFFF;
  --color-text: #111827;
  --color-accent: #1B2A6B;
  --color-accent-muted: rgba(27, 42, 107, 0.25);
  --color-accent-ghost: rgba(27, 42, 107, 0.05);
  --color-text-muted: rgba(17, 24, 39, 0.5);

  /* ── Case Study Specific ── */
  --cs-sidebar-width: 25%;
  --cs-content-width: 75%;
  --cs-content-max: 800px;
  --cs-image-radius: 16px;
  --cs-image-border: 1px solid rgba(27, 42, 107, 0.10);
  --cs-quote-border: 4px solid #1B2A6B;
  --cs-quote-bg: rgba(27, 42, 107, 0.04);
  --cs-section-gap: 96px;   /* vertical space between sections */
  --cs-divider: 1px solid rgba(27, 42, 107, 0.10);
}
```

---

## 3. STICKY SCROLL-SPY SIDEBAR

### 3.1 Structure

The sidebar contains a vertical `<nav>` list of all page sections. As the user scrolls, the active section is highlighted.

```
● Product & My Role          ← active state: Indigo dot + Bold text
  Goal & Research Focus
  Product & Market Analysis
  Quantitative Research
  Qualitative Research
  Insights & Hypotheses
  Outcome
```

### 3.2 Sidebar Specs

```css
.cs-sidebar {
  width: var(--cs-sidebar-width);
  position: sticky;
  top: 96px;
  align-self: flex-start;
  padding-right: 32px;
  border-right: var(--cs-divider);
}

.cs-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cs-sidebar a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  font-family: 'Geist', 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-muted);
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: 12px;
  transition: all 200ms ease;
  line-height: 1.4;
}

.cs-sidebar a::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  flex-shrink: 0;
  transition: background 200ms ease;
}

/* Active State */
.cs-sidebar a.active {
  font-weight: 700;
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}

.cs-sidebar a.active::before {
  background: var(--color-accent);
}

/* Hover State */
.cs-sidebar a:hover {
  color: var(--color-text);
}
```

### 3.3 Scroll Spy Logic

```javascript
// Use IntersectionObserver. Observe each <section id="..."> element.
// threshold: 0.25
// When a section enters viewport at ≥25%, add class 'active' to its sidebar link.
// Remove 'active' from all other links.
// Offset: rootMargin: "-80px 0px -60% 0px" to trigger near the top of viewport.
```

**Sidebar nav items and their `href` anchors:**

| Nav Label | Section ID |
|---|---|
| Product & My Role | `#product-role` |
| Goal & Research Focus | `#goal-research` |
| Product & Market Analysis | `#market-analysis` |
| Quantitative Research | `#quantitative` |
| Qualitative Research | `#qualitative` |
| Insights & Hypotheses | `#insights` |
| Outcome | `#outcome` |

---

## 4. UNIVERSAL IMAGE STYLE RULE

Every image, screenshot, or diagram inside the right content area must have:

```css
.cs-image {
  width: 100%;
  border-radius: var(--cs-image-radius);  /* 16px */
  border: var(--cs-image-border);         /* 1px solid rgba(27,42,107,0.10) */
  display: block;
  object-fit: cover;
}
```

Image captions (optional, below image):
```css
.cs-image-caption {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 8px;
  text-align: center;
  font-style: italic;
}
```

---

## 5. SECTION: BACK BUTTON + PAGE HEADER (above two-column layout)

Before the two-column split begins, render a full-width header area:

### 5.1 Back Button (Sticky)

```css
/* Sticky pill button — top of page, appears above two-column layout */
.cs-back-btn {
  position: sticky;
  top: 72px;  /* clears global sticky nav */
  z-index: 30;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-bg);
  border: 1px solid var(--color-accent-muted);
  color: var(--color-accent);
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 32px;
  text-decoration: none;
  transition: all 200ms ease;
  margin-bottom: 40px;
}

.cs-back-btn:hover {
  box-shadow: 0 0 20px 4px rgba(27, 42, 107, 0.40);
  background: var(--color-accent);
  color: #FFFFFF;
}
```

**Content:** `← Back to Portfolio` — links to `/`

### 5.2 Hero / Title Block

```
[FULL WIDTH — above two-column split]

Tag pills: [Mobile App]  [UX Research]
H1:  Breazen — UX Research
Subtitle: A research-driven investigation into how people use breathing
          and meditation apps — and what stops them from coming back.
Meta row: Role: UX Researcher  |  Timeline: [placeholder]  |  Type: Mobile App Research
```

**Specs:**

```css
.cs-hero {
  padding: 64px 0 48px;
  border-bottom: var(--cs-divider);
  margin-bottom: 64px;
}

.cs-hero-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.cs-tag {
  font-family: 'Geist', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent);
  border: 1px solid var(--color-accent-muted);
  border-radius: 32px;
  padding: 4px 14px;
  letter-spacing: 0.01em;
}

.cs-hero h1 {
  font-family: 'Geist', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0 0 16px;
}

.cs-hero-subtitle {
  font-size: 18px;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.6;
  max-width: 680px;
  margin-bottom: 32px;
}

.cs-hero-meta {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.cs-hero-meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cs-hero-meta-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cs-hero-meta-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}
```

**Meta values:**
- Role: `UX Researcher`
- Timeline: `[Placeholder — add dates]`
- Team: `Solo project`
- Type: `Mobile App`

---

## 6. SECTION HEADING STYLE (all H2 inside content area)

```css
.cs-section {
  padding-bottom: var(--cs-section-gap);
  scroll-margin-top: 100px;  /* offset for sticky nav */
}

.cs-section h2 {
  font-family: 'Geist', sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: left;   /* STRICTLY LEFT-ALIGNED */
  margin: 0 0 32px;
  padding-bottom: 16px;
  border-bottom: var(--cs-divider);
}
```

---

## 7. SECTION CONTENT SPECS

---

### SECTION 1 — Product & My Role
**ID:** `product-role`
**H2:** Product & My Role

**Content layout:** Intro paragraph + responsibilities list.

**Intro text:**
> Breazen — застосунок дихальних практик та медитацій. Проект існує на ринку та має реальну аудиторію. Мета дослідження — зрозуміти, хто реальний користувач продукту, які в нього болі та мотивації, та що заважає йому повертатися.

**Responsibilities block:**

```css
.cs-role-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cs-role-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  color: var(--color-text);
  line-height: 1.55;
}

.cs-role-list li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  margin-top: 8px;
  flex-shrink: 0;
}
```

**List items:**
- Провела конкурентний аналіз (7 додатків)
- Організувала та провела кількісне опитування (50 респондентів)
- Провела глибинні інтерв'ю (7 учасників)
- Сформувала сегменти користувачів та user personas
- Побудувала User Journey Map
- Сформулювала інсайти та гіпотези для продуктової команди

---

### SECTION 2 — Goal & Research Focus
**ID:** `goal-research`
**H2:** Goal & Research Focus

**Layout:** 2-column card grid (stacks to 1-col mobile)

```css
.cs-goal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.cs-goal-card {
  background: var(--color-accent-ghost);
  border: var(--cs-image-border);
  border-radius: 12px;
  padding: 24px;
}

.cs-goal-card-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 10px;
}

.cs-goal-card p {
  font-size: 15px;
  color: var(--color-text);
  line-height: 1.6;
  margin: 0;
}
```

**Cards content:**

| Label | Content |
|---|---|
| Research Goal | Зрозуміти мотивації, бар'єри та поведінкові патерни людей, які використовують або хочуть використовувати додатки для дихання та медитацій |
| Business Question | Які ключові фрикції заважають користувачам повертатись до застосунку? |
| Design Question | Що продукт може зробити краще, щоб вписатися у реальний контекст та потреби людей? |
| Scope | Мобільний застосунок. Фокус на онбордингу, вибору практик та взаємодії під час вправ |

---

### SECTION 3 — Product & Market Analysis
**ID:** `market-analysis`
**H2:** Product & Market Analysis

**Intro text:**
> Що робила: Пройшла основні користувацькі флоу у 7 конкурентних продуктах. Оцінювала архітектуру інформації, онбординг, навігацію, персоналізацію та UX-якість.

**Sub-heading before image grid:**
```css
.cs-subsection-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
```

**IMAGE BLOCK 1 — Competitor Analysis Table (Whimsical)**

```
[INSERT IMAGE: аналіз_КОНКУРЕНТА.jpg — full-width, apply .cs-image styles]
Caption: "Порівняльний аналіз 7 конкурентів: Headspace, Calm, Breathwrk, Breethe, 
          Zenner, HAPDAY, Headspace Mindful Meditation"
```

**IMAGE BLOCK 2 — Competitor UX Flows**

```
[INSERT IMAGE: аналіз_ЮАЙКИ.png — full-width, apply .cs-image styles]
Caption: "Аналіз UX-флоу та архітектури конкурентних продуктів"
```

**IMAGE BLOCK 3 — Product Strengths & Weaknesses (FigJam/Miro cards)**

```
[INSERT IMAGE: АНАЛІЗ_ПРОДУКТУ_У.png — full-width, apply .cs-image styles]
Caption: "Strengths та Weaknesses Breazen за результатами евристичного аналізу"
```

**Key findings text block** (after images):

```css
.cs-findings-list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

Content bullets:
- **Strengths:** Simple exercise set, calm color palette, appealing illustrations, no mandatory sign-up
- **Weaknesses:** Confusing IA, poor exercise guidance (no breathing cues, static timer), no in-exercise controls (can't pause/exit), unclear value of "clarity card" feature

---

### SECTION 4 — Quantitative Research
**ID:** `quantitative`
**H2:** Quantitative Research

**Intro text:**
> Онлайн-опитування, 50 респондентів. Цільова аудиторія: люди, які займаються або цікавляться дихальними практиками та медитаціями. Мета — кількісно підтвердити ключові поведінкові патерни та мотивації.

**BIG STATS BLOCK:**

```css
.cs-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 40px 0;
}

.cs-stat-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 24px;
  border: var(--cs-image-border);
  border-radius: 12px;
  background: var(--color-accent-ghost);
}

.cs-stat-number {
  font-family: 'Geist', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
  letter-spacing: -0.03em;
}

.cs-stat-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.5;
}
```

**Stats content:**

| Number | Label |
|---|---|
| 72% | Використовують застосунок для швидкого зняття стресу |
| 92.9% | Намагаються подолати стрес або тривожні думки |
| 50% | Займаються для перезавантаження під час/після роботи |
| 71.4% | Використовують після важкого дня для розслаблення |
| 14.3% | Як ранковий ритуал перед новим днем |
| 7.1% | Щоб заснути |

*(Use 3-column grid on desktop; wrap to 2-col on tablet, 1-col on mobile)*

**IMAGE BLOCK — Survey Results Chart:**

```
[INSERT IMAGE: 2025-11-03_15_39_39-Опитування...png — full-width, apply .cs-image styles]
Caption: "Результати кількісного опитування: цілі використання дихальних практик (n=14)"
```

**Key insight callout** (after image):

```css
.cs-insight-callout {
  background: var(--color-accent-ghost);
  border-left: var(--cs-quote-border);
  border-radius: 0 8px 8px 0;
  padding: 20px 24px;
  margin-top: 32px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.6;
}
```

Content:
> Дихання сприймається як швидкий емоційний скид, а не щоденна звичка. Люди звертаються до практик у момент, коли потрібна регуляція емоцій.

---

### SECTION 5 — Qualitative Research
**ID:** `qualitative`
**H2:** Qualitative Research

**Intro text:**
> Глибинні інтерв'ю: 7 учасників, 45–60 хвилин кожне. Мета — зрозуміти контекст, мотивації та бар'єри у власних словах користувачів.

**IMAGE BLOCK 1 — Affinity Mapping / Segments:**

```
[INSERT IMAGE: сегменти.png — full-width, apply .cs-image styles]
Caption: "Affinity mapping: кластеризація відповідей за темами — Motivation, Practice Format, 
          Visual Style, Barriers, Value, Usage Context"
```

**USER QUOTE BLOCKS:**

```css
.cs-quote-block {
  background: var(--cs-quote-bg);           /* rgba(27,42,107,0.04) */
  border-left: var(--cs-quote-border);      /* 4px solid #1B2A6B */
  border-radius: 0 12px 12px 0;
  padding: 24px 28px;
  margin: 16px 0;
}

.cs-quote-text {
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  color: var(--color-text);
  line-height: 1.65;
  margin: 0 0 12px;
}

.cs-quote-attribution {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

**Quotes to render** (6 quotes, one per insight theme):

1. > "I do breathing when I feel anxious or overwhelmed. It makes things easier."
   *— Учасник дослідження, Quick Relief Seeker*

2. > "I don't like when someone talks during breathing. I just want calm, silence."
   *— Учасник дослідження, Aesthetic Minimalist*

3. > "Registration annoys me. I just want to try it. I'll delete the app if there's too much friction."
   *— Учасник дослідження, Quick Relief Seeker*

4. > "I'd like to know what exactly this exercise helps with — what it actually gives me."
   *— Учасник дослідження, Conscious Explorer*

5. > "Bright colors don't help me relax. I want a clean, calm interface with nothing distracting."
   *— Учасник дослідження, Aesthetic Minimalist*

6. > "I don't do it daily — only when I feel anxious. It's a tool for certain moments."
   *— Учасник дослідження, Quick Relief Seeker*

---

**IMAGE BLOCK 2 — User Personas:**

```
[INSERT IMAGE: юзер_персони.png — full-width, apply .cs-image styles]
Caption: "3 User Personas: Dasha «Quick Relief Seeker», Julia «Conscious Explorer», 
          Anastasia «Aesthetic Minimalist»"
```

**IMAGE BLOCK 3 — User Journey Map:**

```
[INSERT IMAGE: юзер_джні_мапппп.png — full-width, apply .cs-image styles]
Caption: "User Journey Map: Dasha «Quick Relief Seeker» — від тригера до рефлексії"
```

---

### SECTION 6 — Insights & Hypotheses
**ID:** `insights`
**H2:** Insights & Hypotheses

**Intro text:**
> На основі кількісного та якісного дослідження сформульовано 8 перевірюваних гіпотез для продуктової команди.

**TWO-COLUMN TABLE LAYOUT:**

```css
.cs-hypotheses-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 32px;
}

/* Column headers */
.cs-hypotheses-table thead th {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  padding: 12px 16px;
  background: var(--color-accent-ghost);
  border-bottom: var(--cs-divider);
  text-align: left;
}

.cs-hypotheses-table thead th:first-child {
  border-radius: 8px 0 0 0;
}

.cs-hypotheses-table thead th:last-child {
  border-radius: 0 8px 0 0;
}

/* Data rows */
.cs-hypotheses-table tbody tr {
  border-bottom: var(--cs-divider);
}

.cs-hypotheses-table tbody tr:last-child td {
  border-bottom: none;
}

.cs-hypotheses-table tbody td {
  padding: 20px 16px;
  vertical-align: top;
  font-size: 15px;
  color: var(--color-text);
  line-height: 1.6;
}

/* Insight column */
.cs-hypotheses-table td:first-child {
  width: 50%;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

/* H-badge */
.cs-h-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: #FFFFFF;
  font-family: 'Geist', sans-serif;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 32px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Insight number circle */
.cs-insight-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid var(--color-accent-muted);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 1px;
}
```

**Table headers:** `Key Insight` | `Product Hypothesis`

**Table rows (8 pairs):**

| # | Key Insight | H Badge | Product Hypothesis |
|---|---|---|---|
| 01 | Користувачі звертаються до практик у момент стресу, а не за розкладом. Дихання = швидкий скид, не ритуал. | H1 | Якщо додати режим «Зараз» (1–3 хв без навігації і вибору) — конверсія у сесію зросте у користувачів з високою тривожністю |
| 02 | Реєстрація та довгий онбординг є головним бар'єром для нових користувачів. | H2 | Якщо прибрати обов'язкову реєстрацію і дати почати без логіну — retention після першого візиту зросте |
| 03 | Користувачі не розуміють різницю між вправами і не знають, яку обрати для свого стану. | H3 | Додавання короткого опису ефекту до кожної вправи збільшить глибину перегляду каталогу |
| 04 | Таймер не рухається під час вправи — користувачі не розуміють, чи вправа активна. | H4 | Анімований індикатор дихання (вдих/видих) підвищить відчуття прогресу і знизить дропаут під час вправи |
| 05 | Яскраві кольори та перевантажений інтерфейс заважають розслаблятися. | H5 | Мінімалістичний, спокійний UI збільшить час сесії і частоту повернень у сегменту Aesthetic Minimalist |
| 06 | Користувачі хочуть вибирати між голосом, музикою або тишею під час вправи. | H6 | Персоналізація звукового формату сесії збільшить кількість завершених вправ |
| 07 | Призначення «clarity card» незрозуміле — користувачі ігнорують або видаляють. | H7 | Якщо пояснити цінність «clarity card» через onboarding tooltip — engagement з цією фічею зросте |
| 08 | Практики використовуються ситуативно, не щодня — застосунок має підтримувати гнучкість, а не нав'язувати звичку. | H8 | Відмова від нагадувань-зобов'язань та додавання «м'яких» contextual nudges підвищить довгостроковий retention |

---

### SECTION 7 — Outcome
**ID:** `outcome`
**H2:** Outcome

**Layout:** Clean, spacious text block. No grid. Max reading width.

```css
.cs-outcome {
  padding-bottom: 120px;
}

.cs-outcome-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.cs-outcome h2 {
  /* inherits .cs-section h2 styles */
}

.cs-outcome-body {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.65;
  margin-bottom: 24px;
}

.cs-outcome-body strong {
  font-weight: 600;
  color: var(--color-text);
}
```

**Outcome text:**

У результаті дослідження я:

**Сформувала повну картину користувача** — 3 чіткі сегменти з різними мотиваціями, контекстами використання та толерантністю до фрикцій.

**Виявила критичні UX-проблеми** — відсутність анімованого індикатора дихання, обов'язкова реєстрація, незрозуміла структура каталогу та нечітка цінність ключових фіч.

**Сформувала 8 перевірюваних гіпотез** на основі даних — кожна прив'язана до конкретного сегменту, больової точки та очікуваного продуктового результату.

**Підготувала базу для наступних кроків** — дані готові для передачі продуктовій команді або для подальшої фази: прототипування та UX-тестування рішень.

---

**Outcome closing card:**

```css
.cs-outcome-cta-card {
  margin-top: 48px;
  padding: 40px;
  background: var(--color-accent-ghost);
  border: var(--cs-image-border);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cs-outcome-cta-card p {
  font-size: 17px;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.6;
  margin: 0;
}
```

**Card content:**
> Це дослідження — не академічна вправа. Кожен інсайт тут підкріплений реальними даними від реальних людей і спрямований на конкретні продуктові рішення, які можна будувати завтра.

*(Below this card, render the "Back to Portfolio" pill button — same spec as `.cs-back-btn`)*

---

## 8. SCROLL ANIMATION SPECS (case study page)

```javascript
// All .cs-section elements:
// - opacity: 0, translateY: 16px → opacity: 1, translateY: 0
// - Trigger: IntersectionObserver, threshold: 0.15
// - Duration: 500ms, cubic-bezier(0.22, 1, 0.36, 1)
// - Stagger: 100ms between child elements within a section (stats cards, quote blocks, table rows)

// Stat cards: staggered 80ms apart
// Quote blocks: staggered 60ms apart
// Table rows: staggered 40ms apart (only first 4 rows animate; rest instant)
```

---

## 9. RESPONSIVE RULES (case study specific)

| Element | Desktop (≥1100px) | Tablet (768–1099px) | Mobile (<768px) |
|---|---|---|---|
| Two-column layout | Sidebar 25% + Content 75% | Sidebar 220px fixed + Content flex | Sidebar hidden, horizontal tab bar |
| Stats grid | 3 columns | 2 columns | 1 column |
| Goal cards grid | 2 columns | 2 columns | 1 column |
| Hypotheses table | 2 columns | 2 columns | Stacked cards (badge + insight / hypothesis) |
| Quote blocks | Full width of content area | Full width | Full width |
| Hero H1 | 52px | 40px | 30px |
| Section H2 | 32px | 28px | 24px |

---

## 10. ASSET PLACEMENT GUIDE

| Asset | File Name | Section | Instructions |
|---|---|---|---|
| Product Strengths/Weaknesses | `АНАЛІЗ_ПРОДУКТУ_У.png` | Market Analysis | Full-width, `.cs-image`, caption below |
| Competitor Analysis Table | `АНАЛІЗ_КОНКУРЕНТА.jpg` | Market Analysis | Full-width, `.cs-image`, caption below |
| UX Flows Analysis | `аналіз_ЮАЙКИ.png` | Market Analysis | Full-width, `.cs-image`, caption below |
| Survey Results Chart | `2025-11-03_15_39_39-Опитування...png` | Quantitative Research | Full-width, `.cs-image`, caption below |
| Affinity Mapping / Segments | `сегменти.png` | Qualitative Research | Full-width, `.cs-image`, caption below |
| User Personas | `юзер_персони.png` | Qualitative Research | Full-width, `.cs-image`, caption below |
| User Journey Map | `юзер_джні_мапппп.png` | Qualitative Research | Full-width, `.cs-image`, caption below |

**All images:** Apply `border-radius: 16px` + `border: 1px solid rgba(27,42,107,0.10)` + `display: block` + `width: 100%`.

---

## 11. TECHNICAL CHECKLIST — AI AGENT MUST VERIFY BEFORE SHIPPING

- [ ] Route `/case-study/breazen` is registered and accessible
- [ ] Page inherits global CSS variables — no hardcoded hex values
- [ ] Sticky global nav renders correctly on this page
- [ ] Back button (`← Back to Portfolio`) is pill-shaped, links to `/`, has glow hover
- [ ] Two-column layout: sidebar 25%, content 75%, column gap 48px
- [ ] Sidebar is sticky (`top: 96px`) with scroll spy active
- [ ] Active sidebar link shows Indigo dot + bold text + left Indigo border
- [ ] All section IDs match sidebar `href` anchors exactly
- [ ] All H2 headings are strictly **left-aligned**
- [ ] All images have `border-radius: 16px` + `1px solid rgba(27,42,107,0.10)` border
- [ ] Stats numbers render in `#1B2A6B` Indigo, large (36–52px), bold
- [ ] Quote blocks have `4px solid #1B2A6B` left border + `rgba(27,42,107,0.04)` background
- [ ] H-badges (H1–H8) are pill-shaped, `#1B2A6B` background, white text
- [ ] Mobile: sidebar becomes horizontal scroll tab bar
- [ ] Mobile: stats grid collapses to 1 column
- [ ] Mobile: hypotheses table becomes stacked cards
- [ ] Scroll animations: sections fade-in-up with IntersectionObserver
- [ ] Captions below all images, in `--color-text-muted`, 12px, italic, centered
- [ ] Outcome section ends with "Back to Portfolio" pill button

---

## 12. SECTION ORDER SUMMARY

```
[Global Sticky Nav — inherited]
    ↓
[Back Button — pill, links to /]
    ↓
[HERO / Title Block] — full width, above columns
    ↓
[TWO-COLUMN LAYOUT BEGINS]
├── [LEFT: Sticky Scroll-Spy Sidebar]
└── [RIGHT: Content Sections]
    ├── 1. Product & My Role           (#product-role)
    ├── 2. Goal & Research Focus       (#goal-research)
    ├── 3. Product & Market Analysis   (#market-analysis)
    ├── 4. Quantitative Research       (#quantitative)
    ├── 5. Qualitative Research        (#qualitative)
    ├── 6. Insights & Hypotheses       (#insights)
    └── 7. Outcome                     (#outcome)
[TWO-COLUMN LAYOUT ENDS]
    ↓
[Global Footer — inherited]
```

---

---

## 14. GLOBAL PRIMARY BUTTON STYLE (v2.1)

All primary actions (e.g., "View Full Case", "View Live Site", main CTAs) must follow this high-fidelity specification:

### 14.1 Visual Specs
- **Shape:** Full pill (`rounded-full`)
- **Background:** `--color-accent` (`#1B2A6B`)
- **Text Color:** White (`#FFFFFF`)
- **Font:** Bold, `16px`
- **Case:** All Caps (`uppercase`)
- **Tracking:** `0.1em` (wide)
- **Padding:** `px-10 py-5` (generous white space)

### 14.2 Interaction
- **Transition:** `all 300ms ease`
- **Hover:** Slight background fade (`/90`) + subtle shadow (`shadow-md`)
- **Focus:** `outline-offset: 4px`

---

*Breazen Case Study Knowledge Document v1.2 — Updated Global Button Rule*
*Inherits: Mariia_Portfolio_Project_Knowledge_v2.0*
*Route: /case-study/breazen*
