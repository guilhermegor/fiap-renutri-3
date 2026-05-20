---
name: renutri
purpose: web-app
version: "1.0"
date: 2026-05-20
author: guilherme.rodrigues@healthmoney.com.br
---

# ReNutri — Brand Design Document

> Source of truth for all visual, typographic, and verbal decisions.
> An engineer who has never seen the reference materials should be able
> to implement the brand correctly using only this document.

---

## Table of Contents

1. [Brand Prose](#1-brand-prose)
2. [Voice and Tone](#2-voice-and-tone)
3. [Design Tokens — Colour](#3-design-tokens--colour)
4. [Design Tokens — Typography](#4-design-tokens--typography)
5. [Design Tokens — Spacing, Radii, Shadows, Motion](#5-design-tokens--spacing-radii-shadows-motion)
6. [Ripeness Scale](#6-ripeness-scale)
7. [Iconography](#7-iconography)
8. [Component-Level Guidance](#8-component-level-guidance)
9. [Implementation Mapping](#9-implementation-mapping)
10. [Per-Capability Strings Convention](#10-per-capability-strings-convention)
11. [Inline HTML Bootstrap Snippet](#11-inline-html-bootstrap-snippet)

---

## 1. Brand Prose

### Positioning

ReNutri is a smart pantry management web application for Brazilian households.
It tracks expiry dates, surfaces timely alerts before food goes to waste, and
converts at-risk ingredients into actionable recipe suggestions. The product
sits at the intersection of domestic organisation, food sustainability, and
everyday nutrition — a space where a small daily habit (logging what is in
the fridge) compounds into meaningful waste reduction and real financial
savings for the family.

The Phase 1 PBL document frames the problem with precision: approximately
30 % of food produced in Brazil is discarded, amounting to 26 million tonnes
annually — enough to feed 18 million people facing food insecurity. In
greater São Paulo, households of modest means discard food worth an estimated
R$ 150 per month simply because they forgot an expiry date. ReNutri's first
target user is the resident who loses money to forgotten perishables and is
ready to act, given the right nudge at the right moment.

### Mission

Eliminate preventable household food waste by making expiry awareness
effortless and by turning the urgency of a nearly-spoiled ingredient into an
opportunity to cook something good.

### Narrative Arc

The Veo 3 production script captures the brand narrative in cinematic terms.
Act 1 opens at night in a dim kitchen: the protagonist opens her fridge to
find wilted greens, unlabelled leftovers, and a sense of quiet defeat. She
ends up ordering delivery. The emotional register is low-level frustration
mixed with resignation — a feeling the target audience recognises
immediately. The turning point arrives on a sofa, scrolling: a green
interface catches her eye. By morning the kitchen is transformed — bright,
organised, full of fresh produce — and the couple cook together, animated and
connected. The script's closing tagline, "Sua geladeira, organizada. Sua
comida, aproveitada.", distils the brand promise into twelve words that are
both practical and warm.

The visual aesthetic described for the video — natural light from a kitchen
window, golden tones, shallow depth of field, grain texture, soft greens
and warm whites — is the direct ancestor of the UI palette. The app should
feel like a continuation of that domestic documentary texture: clean but
lived-in, bright but never clinical, green but never medicinal.

### Look and Feel Adjectives

Warm. Organised. Alive. Grounded. Conversational. Purposeful.

The brand is not austere or minimalist in the cold tech sense. It is
minimalist the way a well-kept kitchen is minimalist: a place for everything,
colour from the food itself, no noise. The ripeness scale IS the visual
drama; the chrome around it should be calm and give it space.

### Brand Differentiator

Most food-tracking apps are calorie counters built around discipline and
self-denial. ReNutri is built around not wasting what you already have. The
emotional register flips from guilt (I ate too much) to agency (I used
everything before it turned). This distinction must be felt in every copy
choice, every colour weight, every micro-animation.

### Tagline (canonical)

"Sua geladeira, organizada. Sua comida, aproveitada."

Secondary line (UI contexts, shorter space): "Dispensa inteligente."

---

## 2. Voice and Tone

### Core Principles

**Warm and direct.** ReNutri speaks the way a knowledgeable friend would —
not a health brand lecturing from above, not a tech product issuing cold
system messages. The register is Brazilian informal without being sloppy.

**You is `você`, always.** No `o senhor` or `a senhora` anywhere in the
product. This is non-negotiable. The app addresses a 30-year-old navigating
daily domestic decisions; formality creates distance it cannot afford.

**Positive framing.** Lead with what is possible, not with what is about to
go wrong. Even urgent alerts are phrased as opportunities ("ainda dá tempo",
"aproveita agora") rather than pure warnings.

**Variation as respect.** High-frequency notifications (expiry alerts) must
rotate through template pools. Seeing the same sentence every day signals
automation. Variation signals presence.

**Economy of words.** Notifications are read in two seconds. Empty states
and success messages have five seconds of attention at most. Say exactly
what is needed.

### Surface-by-Surface Register

| Surface | Register | Notes |
|---|---|---|
| Onboarding | Warm, encouraging | Shorter sentences, celebratory at completion |
| Dashboard header | Neutral + occasional warmth | Time-of-day greeting on first visit |
| Ripeness badges | Label only, no copy | The badge colour speaks; no prose needed |
| Expiry alert (push notification) | Warm-urgent | Lead with ingredient name, close with invitation |
| Expiry alert (in-app toast) | Same as push, slightly longer | Can include recipe link |
| Recipe suggestion card | Appetising, action-oriented | Imperative verbs ("Faça", "Aproveita") |
| Empty state | Warm + actionable | Never "no data found"; always an invitation |
| Success feedback | Celebratory but brief | Avoid hollow affirmations like "Perfeito!" alone |
| Error state | Honest, solution-oriented | Never blame the user; offer a next step |
| Settings / theme toggle | Neutral | Functional labels only |

### Copy Variation Pools

All pools use `você`. Rotate templates pseudo-randomly keyed to the current
day-of-week modulo pool size, or shuffle client-side on each session.

#### Pool A — Expiry tomorrow (1 item)

1. "Oi! O {item} vence amanhã — que tal aproveitá-lo hoje?"
2. "O {item} está quase no limite. Que receita você faz com ele?"
3. "Lembrete amigável: o {item} vence amanhã. Ainda dá tempo!"
4. "Boa tarde! O {item} tá chegando no fim da validade. Veja uma receita rápida."
5. "Aproveita o {item} hoje — amanhã é o último dia de validade."

#### Pool B — Expiry today (1 item, urgent)

1. "Ei! O {item} vence hoje. Usa agora antes de perder!"
2. "Último dia do {item} — você ainda tem tempo de fazer algo gostoso com ele."
3. "O {item} vence hoje! Que tal uma receita rápida antes que passe?"
4. "Não deixa o {item} ir pro lixo — vence hoje. Clica aqui pra ver receitas."
5. "Hoje é o último dia do {item}. Aproveita!"

#### Pool C — Multiple items expiring soon (2–4 items)

1. "Você tem {n} itens chegando no vencimento: {lista}. Quer ver receitas que usam tudo?"
2. "Atenção: {item1} e {item2} vencem em breve. Bora cozinhar algo com eles?"
3. "Tem {n} ingredientes esperando por você: {lista}. Não deixa passar!"
4. "Antes que vençam: {lista}. Clica pra ver o que dá pra fazer com eles."
5. "{item1}, {item2}… {n} itens precisam de atenção essa semana. Veja as receitas sugeridas."
6. "Semana movimentada? Seus {n} itens não podem esperar muito mais: {lista}."

#### Pool D — Item already spoiled / past expiry

1. "O {item} passou da validade. Hora de renovar o estoque."
2. "Parece que o {item} não resistiu. Removemos ele do seu inventário."
3. "O {item} venceu. Descarta com segurança e atualiza sua dispensa."
4. "Ops — o {item} passou do prazo. Nada de se sentir mal, acontece com todo mundo."
5. "O {item} saiu do prazo. Hora de planejar a próxima compra."

### Empty-State Copy Examples (pt-BR)

**Pantry — empty:**
> "Sua dispensa está vazia por enquanto. Adiciona o primeiro alimento e a gente cuida do resto."

**Recipe suggestions — no at-risk items:**
> "Tudo fresquinho aqui! Quando um ingrediente estiver chegando no vencimento, você vê receitas para aproveitá-lo."

**Notifications — no alerts:**
> "Nenhum alerta no momento. Seus alimentos estão todos dentro do prazo."

**Search — no results:**
> "Nada encontrado com "{termo}". Tenta outro nome ou adiciona esse alimento manualmente."

### Success Copy Examples (pt-BR)

**Item added:**
> "{item} adicionado com sucesso. Vencimento em {n} dias."

**Item marked as used:**
> "Ótimo! O {item} foi aproveitado. Menos desperdício, mais consciência."

**Recipe completed (cooked):**
> "Que delícia! Você aproveitou {n} ingrediente(s) que estavam chegando no vencimento."

**Profile saved:**
> "Alterações salvas."

---

## 3. Design Tokens — Colour

### Guiding Principles

Two distinct colour families govern the product:

- **Brand green** (`--color-brand-*`): anchored at `#16a34a`. Used for the
  logo, primary navigation, section headers, and fresh-state indicators.
  This green is a mid-saturation food green — credible, not toxic. It echoes
  the natural light and verdant tones described in the Veo 3 visual brief.
- **Action amber** (`--color-action-*`): anchored at `#fb923c`. Used for CTA
  buttons, urgent badges, and recipe suggestion calls-to-action. Amber
  intentionally harmonises with `--ripeness-aging` (#fb923c is the same
  anchor), so the action layer reinforces the urgency the app is built around.

A third family — the **ripeness scale** — lives in its own token file and is
documented in Section 6.

#### Architecture note on light vs dark

The scaffold's current `theme.css` uses `:root` as dark mode and
`[data-theme='light']` as the override. The brand spec **inverts this**:
`:root` carries light-mode tokens, and `[data-theme='dark']` carries
dark-mode overrides. The rationale is that most systems default to light and
the OS-preference detection snippet (Section 11) applies `data-theme='dark'`
only when explicitly needed — leaving `:root` as the safe fallback.

### Raw Palette

The tables below define every named colour in the system. These raw tokens
are not used directly in components; components reference semantic aliases.

#### Neutrals

| Token | Light value | Dark value |
|---|---|---|
| `--neutral-50` | `#fafafa` | `#fafafa` (same — not used for bg on dark) |
| `--neutral-100` | `#f5f5f5` | `#f5f5f5` |
| `--neutral-200` | `#e5e7eb` | `#e5e7eb` |
| `--neutral-300` | `#d1d5db` | `#d1d5db` |
| `--neutral-400` | `#9ca3af` | `#9ca3af` |
| `--neutral-500` | `#6b7280` | `#6b7280` |
| `--neutral-600` | `#4b5563` | `#4b5563` |
| `--neutral-700` | `#374151` | `#374151` |
| `--neutral-800` | `#1f2937` | `#1f2937` |
| `--neutral-900` | `#111827` | `#111827` |
| `--neutral-950` | `#0a0f1a` | `#0a0f1a` |

#### Brand Greens

| Token | Value | Usage |
|---|---|---|
| `--green-50` | `#f0fdf4` | Tint backgrounds (light mode surfaces) |
| `--green-100` | `#dcfce7` | Hover tints, fresh-state bg |
| `--green-200` | `#bbf7d0` | Tag backgrounds, light chips |
| `--green-400` | `#4ade80` | `--ripeness-fresh` anchor (see §6) |
| `--green-600` | `#16a34a` | Brand primary anchor |
| `--green-700` | `#15803d` | Brand primary hover / pressed |
| `--green-800` | `#166534` | Brand dark |
| `--green-900` | `#14532d` | Deepest brand |
| `--green-950` | `#052e16` | Near-black brand (dark-mode nav surfaces) |

#### Action Ambers

| Token | Value | Usage |
|---|---|---|
| `--amber-100` | `#fef3c7` | Tint backgrounds (light), warning fills |
| `--amber-200` | `#fde68a` | Tint, badge backgrounds |
| `--amber-400` | `#fbbf24` | Action light, accent fills |
| `--amber-500` | `#f59e0b` | Action mid |
| `--amber-600` | `#d97706` | Action dark, hover state |
| `--amber-700` | `#b45309` | Action pressed |

Note: `--color-action-primary` is `#fb923c` (orange-400 on Tailwind scale),
which is warmer and more orange than pure amber. This is intentional — it
shares its anchor with `--ripeness-aging` to create the urgency resonance
described in the design brief. The amber ladder above is used for adjacent
supporting roles (fills, tints) while the action primary sits slightly
warmer.

#### Action Oranges (action-specific)

| Token | Value | Usage |
|---|---|---|
| `--orange-100` | `#ffedd5` | Action tint background |
| `--orange-300` | `#fdba74` | Action light |
| `--orange-400` | `#fb923c` | Action primary anchor |
| `--orange-500` | `#f97316` | Action hover |
| `--orange-600` | `#ea580c` | Action pressed |

### Semantic Aliases

The following tables show how semantic tokens resolve in each theme.
These are the tokens components must use — never raw palette values.

#### Semantic Token Table — Light Mode (`:root`)

| Token | Resolved hex | Notes |
|---|---|---|
| `--color-bg` | `#fafafa` | Page background |
| `--color-surface` | `#ffffff` | Cards, panels, drawers |
| `--color-surface-raised` | `#f5f5f5` | Secondary panels, inset surfaces |
| `--color-border` | `#e5e7eb` | Dividers, card edges |
| `--color-border-subtle` | `#f3f4f6` | Very light separators |
| `--color-text-default` | `#111827` | Body copy, headings |
| `--color-text-secondary` | `#4b5563` | Labels, captions, secondary info |
| `--color-text-muted` | `#9ca3af` | Placeholders, helper text |
| `--color-text-disabled` | `#d1d5db` | Disabled state copy |
| `--color-text-on-brand` | `#ffffff` | Text on green brand fills |
| `--color-text-on-action` | `#ffffff` | Text on orange action fills |
| `--color-brand-light` | `#4ade80` | Fresh indicators, tags |
| `--color-brand-primary` | `#16a34a` | Logo, nav, primary headers |
| `--color-brand-dark` | `#166534` | Pressed brand, deep accents |
| `--color-brand-tint` | `#f0fdf4` | Brand-coloured backgrounds |
| `--color-action-primary` | `#fb923c` | CTA buttons, urgent badges |
| `--color-action-hover` | `#f97316` | Action button hover |
| `--color-action-pressed` | `#ea580c` | Action button active/pressed |
| `--color-action-tint` | `#ffedd5` | Action-coloured backgrounds |
| `--color-success` | `#16a34a` | Success states (shares brand green) |
| `--color-warning` | `#f59e0b` | Warning states |
| `--color-error` | `#dc2626` | Error states, destructive actions |
| `--color-info` | `#0ea5e9` | Informational states |
| `--color-success-surface` | `#f0fdf4` | Success alert background |
| `--color-warning-surface` | `#fffbeb` | Warning alert background |
| `--color-error-surface` | `#fef2f2` | Error alert background |
| `--color-info-surface` | `#f0f9ff` | Info alert background |
| `--color-overlay` | `rgba(0,0,0,0.40)` | Modal backdrops |
| `--color-focus-ring` | `#16a34a` | Keyboard-focus outline |

#### Semantic Token Table — Dark Mode (`[data-theme='dark']`)

Dark mode is not a simple hex inversion. These values are individually tuned
for perceived luminance parity against dark surfaces.

| Token | Resolved hex | Notes |
|---|---|---|
| `--color-bg` | `#0a0f1a` | Deep page background |
| `--color-surface` | `#111827` | Cards, panels |
| `--color-surface-raised` | `#1f2937` | Elevated surfaces, modals |
| `--color-border` | `#374151` | Dividers |
| `--color-border-subtle` | `#1f2937` | Very subtle separators |
| `--color-text-default` | `#f9fafb` | Body copy on dark |
| `--color-text-secondary` | `#d1d5db` | Labels on dark |
| `--color-text-muted` | `#6b7280` | Muted on dark |
| `--color-text-disabled` | `#374151` | Disabled on dark |
| `--color-text-on-brand` | `#ffffff` | Text on green brand fills |
| `--color-text-on-action` | `#ffffff` | Text on orange action fills |
| `--color-brand-light` | `#4ade80` | Bright enough on dark bg |
| `--color-brand-primary` | `#22c55e` | Stepped up one stop vs light for parity |
| `--color-brand-dark` | `#4ade80` | Reverses: lighter on dark is "dark accent" |
| `--color-brand-tint` | `#052e16` | Dark brand fill |
| `--color-action-primary` | `#fb923c` | Same anchor — passes on dark bg |
| `--color-action-hover` | `#f97316` | |
| `--color-action-pressed` | `#ea580c` | |
| `--color-action-tint` | `#431407` | Dark action fill |
| `--color-success` | `#4ade80` | Bright on dark |
| `--color-warning` | `#fbbf24` | Stepped down from `f59e0b` for parity |
| `--color-error` | `#f87171` | Red-400 — not too harsh on dark |
| `--color-info` | `#38bdf8` | Sky-300 — sufficient contrast |
| `--color-success-surface` | `#052e16` | |
| `--color-warning-surface` | `#451a03` | |
| `--color-error-surface` | `#450a0a` | |
| `--color-info-surface` | `#082f49` | |
| `--color-overlay` | `rgba(0,0,0,0.65)` | Heavier overlay on dark |
| `--color-focus-ring` | `#4ade80` | Brighter on dark for visibility |

---

## 4. Design Tokens — Typography

### Font Commitment

**Primary sans:** Plus Jakarta Sans (all UI text).
**Monospace (optional):** JetBrains Mono (code blocks, numeric tables such as
expiry-date columns where alignment matters).

Plus Jakarta Sans is a contemporary geometric humanist sans with strong
legibility at small sizes. Its friendly curves at display weights match the
warm-but-organised brand register. It ships in weights 400 / 500 / 600 / 700,
which map exactly to the scaffold's existing weight ladder.

### Installation

```bash
npm install @fontsource/plus-jakarta-sans
# Only add JetBrains Mono if the app renders code blocks or fixed numeric tables:
npm install @fontsource/jetbrains-mono
```

### Import (add to `src/index.tsx`)

```typescript
// Required weights only — tree-shaking applies at file level
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';

// Add only if using mono:
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
```

### Font-Stack Tokens

Update `src/shared/styles/foundations/typography.css`:

```css
:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system,
               BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', Courier, monospace;
}
```

### Weight Ladder

| Token | Value | Usage |
|---|---|---|
| `--font-normal` | `400` | Body copy, captions, helper text |
| `--font-medium` | `500` | Labels, nav items, secondary buttons |
| `--font-semibold` | `600` | Headings h3–h4, badge text, card titles |
| `--font-bold` | `700` | h1–h2, primary CTA labels, display |

### Type Scale

The scaffold's existing 8-step scale is retained. The token names map to the
platform convention: `--text-{step}`. All values in `rem` with `html`
font-size set to `62.5%` (so `1rem = 10px` base). If the scaffold uses
default `html` font-size (16px), divide all values below by 1.6 to get
equivalent pixel sizes.

| Token | rem value | Approx px (62.5% base) | Usage |
|---|---|---|---|
| `--text-xs` | `1.2rem` | 12px | Helper text, timestamps, fine print |
| `--text-sm` | `1.4rem` | 14px | Captions, badge labels, secondary labels |
| `--text-base` | `1.6rem` | 16px | Body copy, list items, default paragraph |
| `--text-lg` | `1.8rem` | 18px | Card titles, section subheadings |
| `--text-xl` | `2.0rem` | 20px | Feature labels, modal titles |
| `--text-2xl` | `2.4rem` | 24px | Page section headings (h3) |
| `--text-3xl` | `3.2rem` | 32px | Page headings (h2), dashboard titles |
| `--text-4xl` | `4.2rem` | 42px | Hero / display only |

### Line-Height Tokens

| Token | Value | Usage |
|---|---|---|
| `--leading-tight` | `1.2` | Display headings, short labels |
| `--leading-normal` | `1.6` | Body text default |
| `--leading-relaxed` | `1.8` | Long-form paragraphs, onboarding copy |

### Typography Usage Rules

- **Never mix weights within a single label.** If a card title is semibold,
  its subtitle is normal — not medium (too close) and not bold (too much).
- **Heading hierarchy:** h1 uses `--text-3xl` / bold / tight; h2 uses
  `--text-2xl` / semibold / tight; h3 uses `--text-xl` / semibold / normal;
  body uses `--text-base` / normal / normal.
- **Numeric data** (expiry countdowns, inventory counts): use
  `--font-mono` + `--font-medium` so digits align in lists.
- **Plus Jakarta Sans** at `--text-xs` and `--font-normal` can feel thin on
  dark backgrounds; use `--font-medium` instead at that combination to
  maintain perceived weight parity across themes.

---

## 5. Design Tokens — Spacing, Radii, Shadows, Motion

### Spacing

The scaffold's 8-stop scale is well-calibrated for a dense-data web app.
No changes.

| Token | Value | Approx px |
|---|---|---|
| `--space-1` | `0.4rem` | ~4px |
| `--space-2` | `0.8rem` | ~8px |
| `--space-3` | `1.2rem` | ~12px |
| `--space-4` | `1.6rem` | ~16px |
| `--space-5` | `2.4rem` | ~24px |
| `--space-6` | `3.2rem` | ~32px |
| `--space-7` | `4.8rem` | ~48px |
| `--space-8` | `6.4rem` | ~64px |

Usage conventions:
- Intra-component padding: `--space-2` (tight) to `--space-4` (default).
- Between sibling cards: `--space-4`.
- Section vertical gap: `--space-6`.
- Page-level horizontal gutters: `--space-5` on mobile, `--space-7` on desktop.

### Radii

New file: `src/shared/styles/foundations/radii.css`.

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Chips, badges, small tags |
| `--radius-md` | `8px` | Buttons, inputs, small cards |
| `--radius-lg` | `12px` | Standard cards, panels |
| `--radius-xl` | `16px` | Modals, drawers, large panels |
| `--radius-pill` | `9999px` | Pill buttons, progress bars, avatar |

Use `--radius-lg` as the default card radius. The warm, organised aesthetic
calls for a gentle rounding — never sharp corners, never overly bubbly.
Pill radius is reserved for the ripeness progress bar and avatar components.

### Shadows

New file: `src/shared/styles/foundations/shadows.css`.

Shadows on dark surfaces require hue-shifted umbras (slightly warm-tinted)
to avoid the flat "grey blob" effect. The values below are tuned per theme.

#### Light-mode shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.10)` |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)` |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)` |

#### Dark-mode shadows (`[data-theme='dark']`)

Shadows on dark surfaces are perceived via the contrast between the raised
element and its background. Use lighter, warmer, semi-transparent fills
rather than deep-shadow alphas — heavy black shadows on near-black backgrounds
are invisible and counterproductive.

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.04)` |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.05)` |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06)` |
| `--shadow-xl` | `0 20px 30px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.07)` |

The hairline `box-shadow` ring (`0 0 0 1px rgba(255,255,255,0.05)`) is a
dark-mode specific technique: it gives elevated surfaces a faint luminous
edge that communicates height without requiring a visible drop shadow.

### Motion

New file: `src/shared/styles/foundations/motion.css`.

#### Design principles

- Motion communicates state change; it should never draw attention to itself.
- Ripeness colour changes between sessions must **cut**, not transition.
  A tomato moving from `--ripeness-aging` to `--ripeness-critical` between
  app launches should appear as a hard state change, not a slow drift — a
  slow colour transition reads as live decay, which would be misleading and
  alarming.
- All duration and easing tokens must have a `prefers-reduced-motion`
  override that sets durations to `0ms` and disables transforms. Opacity
  changes are preserved (they carry information, not embellishment).

#### Motion token table

| Token | Default value | Reduced-motion override | Usage |
|---|---|---|---|
| `--motion-duration-instant` | `0ms` | `0ms` | No animation |
| `--motion-duration-fast` | `150ms` | `0ms` | Hover bg-colour change |
| `--motion-duration-normal` | `200ms` | `0ms` | Modal open, page fade |
| `--motion-duration-deliberate` | `250ms` | `0ms` | Card enter (opacity + rise) |
| `--motion-duration-fill` | `300ms` | `0ms` | Ripeness-bar fill |
| `--motion-easing-out` | `cubic-bezier(0, 0, 0.2, 1)` | — | Enter animations (ease-out) |
| `--motion-easing-in` | `cubic-bezier(0.4, 0, 1, 1)` | — | Exit animations (ease-in) |
| `--motion-easing-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | — | State transitions |
| `--motion-easing-linear` | `linear` | — | Progress fills |
| `--motion-enter-rise` | `translateY(8px)` | `none` | Card enter offset |
| `--motion-modal-scale-from` | `scale(0.96)` | `none` | Modal open start scale |

#### CSS at-rule — reduced-motion block

In `motion.css`, declare the standard values first, then override:

```css
:root {
  --motion-duration-fast:       150ms;
  --motion-duration-normal:     200ms;
  --motion-duration-deliberate: 250ms;
  --motion-duration-fill:       300ms;
  --motion-enter-rise:          translateY(8px);
  --motion-modal-scale-from:    scale(0.96);
  /* easing tokens do not need reduced-motion overrides */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration-fast:       0ms;
    --motion-duration-normal:     0ms;
    --motion-duration-deliberate: 0ms;
    --motion-duration-fill:       0ms;
    --motion-enter-rise:          translateY(0);
    --motion-modal-scale-from:    scale(1);
  }
}
```

#### Per-interaction spec

| Interaction | Duration token | Easing token | Properties animated |
|---|---|---|---|
| Card enters viewport | `--motion-duration-deliberate` | `--motion-easing-out` | `opacity` (0→1), `transform` (rise→0) |
| Ripeness bar fills on mount | `--motion-duration-fill` | `--motion-easing-linear` | `width` (0→actual%) |
| Modal opens | `--motion-duration-normal` | `--motion-easing-out` | `opacity` (0→1), `transform` (scale from → 1) |
| Page transition | `--motion-duration-normal` | `--motion-easing-in-out` | `opacity` only |
| Hover background change | `--motion-duration-fast` | `--motion-easing-in-out` | `background-color` |
| Ripeness colour on session load | **No animation — hard cut** | — | `background-color`, `color` (immediate) |
| Toast/notification enters | `--motion-duration-deliberate` | `--motion-easing-out` | `opacity` (0→1), `transform` (rise→0) |

---

## 6. Ripeness Scale

### Overview

The ripeness scale is a first-class token family that represents the freshness
state of a tracked food item. It has five named stops mapping to both a
technical token and a Brazilian Portuguese vernacular label. The scale is
deliberately food-vocabulary — it speaks the language of someone standing in
front of their fridge.

### Token Family

New file: `src/shared/styles/foundations/ripeness.css`.

#### Light-mode anchors

| Token | pt-BR label | Hex | Meaning | Icon fill | Text colour |
|---|---|---|---|---|---|
| `--ripeness-fresh` | `verdinho` | `#4ade80` | Well within expiry | Filled circle | `#14532d` (dark green — passes WCAG AA) |
| `--ripeness-peak` | `maduro` | `#facc15` | Approaching mid-life | Filled circle | `#713f12` (amber-900 — yellow needs dark text) |
| `--ripeness-aging` | `atenção` | `#fb923c` | 3–5 days to expiry | Filled circle | `#431407` (orange-950) |
| `--ripeness-critical` | `passando` | `#f87171` | 1–2 days to expiry | Filled circle | `#450a0a` (red-950) |
| `--ripeness-spoiled` | `estragado` | `#9f3a38` | Past expiry | Filled circle | `#fecaca` (red-200 on dark bg — white text on this stop) |

#### Dark-mode anchors (`[data-theme='dark']`)

Dark-mode ripeness colours are re-tuned for perceived parity on near-black
surfaces. They are more saturated and slightly lighter than their light-mode
counterparts — simply darkening light-mode colours creates muddy, indistinct
badges on dark backgrounds. The peak yellow especially is de-saturated in
light mode to avoid glare; on dark it can afford to step brighter.

| Token | pt-BR label | Dark hex | Reasoning |
|---|---|---|---|
| `--ripeness-fresh` | `verdinho` | `#86efac` | Green-300 — fresh pop on dark bg |
| `--ripeness-peak` | `maduro` | `#fde047` | Yellow-300 — more vivid; yellow-400 #facc15 reads muddy on near-black |
| `--ripeness-aging` | `atenção` | `#fdba74` | Orange-300 — lighter, maintains warmth |
| `--ripeness-critical` | `passando` | `#fca5a5` | Red-300 — red-400 #f87171 reads fine but -300 adds more pop |
| `--ripeness-spoiled` | `estragado` | `#b91c1c` | Stepped to red-700 — deeper, conveys finality, readable |

#### Text on ripeness badges (dark mode)

In dark mode, all light ripeness stops (`fresh`, `peak`, `aging`, `critical`)
should use `--neutral-950` (`#0a0f1a`) as the badge text colour. The `spoiled`
stop on dark uses `#fee2e2` (red-100) as text because the bg is dark red.

### WCAG Contrast Notes

Contrast ratios assume WCAG AA (4.5:1 for normal text, 3:1 for large text).

| Stop | Light bg hex | Text hex | Ratio | Pass? |
|---|---|---|---|---|
| `fresh` | `#4ade80` | `#14532d` | ~7.2:1 | AA + AAA |
| `peak` | `#facc15` | `#713f12` | ~6.1:1 | AA + AAA |
| `aging` | `#fb923c` | `#431407` | ~5.8:1 | AA + AAA |
| `critical` | `#f87171` | `#450a0a` | ~5.4:1 | AA + AAA |
| `spoiled` | `#9f3a38` | `#fecaca` | ~5.1:1 | AA |

All stops pass WCAG AA for small text. `spoiled` is the tightest; do not use
a font size below `--text-sm` (14px) on that badge.

### Ripeness Bar (progress component)

The pantry-item card includes a horizontal ripeness bar. It fills left to
right at the `--ripeness-{state}` background colour against a
`--color-border` track. Width is proportional to days remaining vs total
shelf life (clamped 0–100 %). The fill animation uses `--motion-duration-fill`
/ `--motion-easing-linear` on mount only. Subsequent state changes cut.

### Ripeness-to-Days Mapping (reference)

These are defaults; the app allows manual override per item.

| State | Trigger |
|---|---|
| `fresh` | More than 7 days to expiry |
| `peak` | 4–7 days to expiry |
| `aging` | 2–3 days to expiry |
| `critical` | 1 day or today |
| `spoiled` | Past expiry date |

---

## 7. Iconography

### Library Commitment

**Lucide React** (`lucide-react`). No other icon library. No SVG one-offs
unless an icon genuinely does not exist in Lucide (document any such
exceptions in the capability's `index.ts` JSDoc).

```bash
npm install lucide-react
```

### Usage Rule: Outlined by Default, Filled Selectively

| Context | Style | Rationale |
|---|---|---|
| Navigation items (inactive) | Outlined | Low visual weight; secondary to page content |
| Navigation items (active) | Filled | Communicates selected state clearly |
| Header / section decorators | Outlined | Chrome; should not compete with data |
| Secondary action buttons | Outlined | Consistent with the "less weight" principle |
| Ripeness-state badge indicator | Filled `Circle` | The badge IS the data; filled weight matches urgency |
| Primary CTA (urgent actions) | Filled | Matches `--color-action-primary` urgency register |
| Toast / push notification icon | Filled `Bell` | Active notification = filled state |
| Empty states | Outlined | Large decorative icons; outlined avoids heaviness |

The underlying rule: fill communicates **presence** or **active state**.
Outline communicates **availability** or **neutrality**. When in doubt,
use outlined.

### Icon Sizes

| Context | Size | Token equivalent |
|---|---|---|
| Inline with body text | `16px` | `--text-base` width |
| Inline with label text | `18px` | `--text-lg` width |
| Navigation items | `20px` | Consistent tab-bar sizing |
| Card action icons | `20px` | |
| Section header decorators | `24px` | |
| Empty-state illustrations | `48px` | |

### Canonical Icon Mapping

| Feature / surface | Icon name | Style | Import |
|---|---|---|---|
| Pantry / fridge nav | `Refrigerator` | Outlined (inactive) / Filled* (active) | `lucide-react` |
| Recipes nav | `ChefHat` | Outlined / Filled* | `lucide-react` |
| Notifications nav | `Bell` | Outlined / Filled (has unread) | `lucide-react` |
| Settings nav | `Settings` | Outlined / Filled* | `lucide-react` |
| Add item CTA | `Plus` or `PlusCircle` | — (inside button, inherits fill) | `lucide-react` |
| Item expiry date | `CalendarDays` | Outlined | `lucide-react` |
| Ripeness badge indicator | `Circle` (CSS-coloured fill) | Filled via CSS `fill` prop | `lucide-react` |
| Search | `Search` | Outlined | `lucide-react` |
| Recipe suggestion | `Utensils` | Outlined (card) / Filled (active) | `lucide-react` |
| Warning / urgent badge | `AlertTriangle` | Filled | `lucide-react` |
| Trash / discard | `Trash2` | Outlined | `lucide-react` |
| Edit item | `Pencil` | Outlined | `lucide-react` |
| Barcode scan (future) | `ScanBarcode` | Outlined | `lucide-react` |
| Donation (Phase 2) | `HandHeart` | Outlined | `lucide-react` |
| Theme toggle | `Sun` / `Moon` | Outlined | `lucide-react` |

*Lucide React does not have a separate "filled" variant library the way some
icon sets do. Achieve the active/filled appearance by pairing a `fill` CSS
prop with the same colour as the icon's `stroke`, or by using `fill="currentColor"` and toggling a CSS class. For navigation specifically, the
recommended pattern is to set both `stroke="currentColor"` and
`fill="currentColor"` via a CSS class `.icon--filled { fill: currentColor; }`,
applied only to the active state.

---

## 8. Component-Level Guidance

### 8.1 Pantry Dashboard

The pantry dashboard is the primary landing screen. It shows the full
inventory of tracked items with their ripeness states, a search bar, and
the add-item CTA.

#### Layout

- Full-width list or 2-column grid on wider viewports (breakpoint: 640px).
- Each item row/card: `--radius-lg`, `--shadow-sm`, `--color-surface` background.
- Padding: `--space-4` horizontal, `--space-3` vertical.
- Row gap between cards: `--space-3`.

#### Typographic hierarchy per card

| Element | Token | Weight |
|---|---|---|
| Item name | `--text-lg` | `--font-semibold` |
| Expiry date | `--text-sm` | `--font-normal` / `--font-mono` |
| Ripeness label (pt-BR) | `--text-xs` | `--font-medium` |
| Category tag | `--text-xs` | `--font-medium` |

#### Ripeness badge

- Filled `Circle` icon (16px) coloured with `--ripeness-{state}`.
- pt-BR label immediately to the right: e.g. "verdinho", "atenção".
- Badge background: `--ripeness-{state}` at 15% opacity (achieved via
  hex with added alpha or `color-mix()`). Badge text: per WCAG table §6.
- Do not animate the badge colour between states — hard cut only.

#### Search bar

- Full-width, `--radius-md`, `--color-border` border.
- `Search` icon (outlined, 18px) leading; clear-X icon (outlined, 16px)
  trailing when non-empty.
- Placeholder (pt-BR): "Buscar alimento…"

#### Add-item CTA

- Fixed to bottom-right on mobile (FAB pattern) or top-right of section
  heading on desktop.
- Background: `--color-action-primary`. Text: `--color-text-on-action`.
- Icon: `PlusCircle` (filled appearance via CSS) at 20px.
- Label (pt-BR): "Adicionar alimento"
- Border-radius: `--radius-pill` for FAB, `--radius-md` for inline button.

#### Sorting / grouping

Default sort: by days to expiry ascending (`critical` and `aging` at top).
This is a deliberate UX choice — the urgency the app is built around must
be immediately visible. At-risk items use `--color-action-tint` as a subtle
row background to draw the eye without being alarming.

#### Copy register

Contextual heading (pt-BR, varies by time of day):
- Morning: "Bom dia! Veja o que está na sua dispensa."
- Afternoon: "Boa tarde! Aqui está sua dispensa."
- Evening: "Boa noite! Confira o que precisa de atenção."

Empty-state (pt-BR): "Sua dispensa está vazia por enquanto. Adiciona o
primeiro alimento e a gente cuida do resto."

### 8.2 Item Detail

The item detail screen shows the full profile of a single tracked item:
photo, expiry-date control, ripeness state indicator, and recipe suggestions
for that ingredient.

#### Layout

- Single-column, full-width.
- Photo at top: 16:9 aspect ratio, `--radius-xl` bottom corners only,
  spans full width. Fallback: gradient placeholder using `--color-brand-tint`.
- Below photo: item name (`--text-3xl` / `--font-bold`), category tag,
  ripeness badge (same spec as dashboard).
- Expiry-date control: date picker row with `CalendarDays` icon (outlined,
  20px) + date string in `--font-mono` / `--font-medium` / `--text-base`.
- Ripeness state selector: horizontal row of 5 labelled pill buttons. Active
  pill background: `--ripeness-{state}`. Inactive: `--color-surface-raised`.

#### Recipe suggestions sub-section

- Section heading (pt-BR): "Receitas para aproveitar" + `Utensils` icon outlined.
- Up to 3 recipe cards inline, scrollable row on mobile.
- See §8.3 for full recipe card spec.

#### Tokens in use

| Element | Token |
|---|---|
| Screen background | `--color-bg` |
| Card / panel | `--color-surface` + `--shadow-md` |
| Ripeness indicator | `--ripeness-{state}` |
| Expiry date text | `--font-mono`, `--text-base`, `--font-medium` |
| Action button (e.g. "Marcar como usado") | `--color-action-primary` |
| Destructive action (e.g. "Descartar item") | `--color-error` |

#### Copy register

Page title (accessible, not shown visually): "Detalhes do item"

Button labels (pt-BR):
- "Marcar como usado" (success action)
- "Editar validade" (neutral action)
- "Descartar item" (destructive — use `--color-error` variant, outlined)

### 8.3 Recipe Suggestions List

The recipe suggestions list is driven by which items in the pantry are in
`aging` or `critical` state. It is the product's core value proposition made
visual — "cook this now before it's too late."

#### Sorting principle

Recipes that consume the most at-risk ingredients (`--ripeness-aging`,
`--ripeness-critical`) are ranked first. A recipe using three `critical`
items outranks one using a single `aging` item.

#### Recipe card

- `--radius-lg`, `--shadow-sm`, `--color-surface`.
- Thumbnail: 4:3 ratio, `--radius-lg` top corners.
- Recipe name: `--text-lg` / `--font-semibold`.
- "Ingredientes necessários" tag line: `--text-sm` / `--font-normal` /
  `--color-text-secondary`.
- Urgency chip (if ≥1 ingredient is `critical` or `aging`): small pill,
  `--color-action-tint` background, `--color-action-pressed` text,
  `AlertTriangle` filled icon 14px. pt-BR label: "Aproveite logo!" (critical)
  or "Vence em breve" (aging).
- CTA: "Ver receita" — `--text-sm` / `--font-medium` / `--color-brand-primary`.

#### Empty state

(pt-BR): "Tudo fresquinho aqui! Quando um ingrediente estiver chegando no
vencimento, você vê receitas para aproveitá-lo."

#### Copy register

- Lead with appetising action verbs: "Faça um risoto com o que sobrou",
  "Aproveita a abobrinha num refogado rápido".
- Avoid clinical language ("optimize your ingredients").

### 8.4 Notification Surface

Two notification types: in-app toast and push notification.

#### In-App Toast

- Fixed bottom-center (mobile) or top-right (desktop).
- `--radius-md`, `--shadow-lg`, `--color-surface`.
- Border-left 4px solid: `--ripeness-{state}` for ripeness alerts,
  `--color-info` for informational, `--color-error` for errors.
- Leading icon: filled `Bell` (ripeness / generic), `AlertTriangle` (critical),
  `CheckCircle` (success).
- Icon colour matches border-left colour.
- Title: `--text-sm` / `--font-semibold`.
- Body: `--text-sm` / `--font-normal` / `--color-text-secondary`.
- Dismiss button: `X` icon (outlined, 16px) top-right.
- Max-width: 360px. Auto-dismiss after 5 seconds (critical: 8 seconds; errors persist until dismissed).
- Enter animation: `--motion-duration-deliberate` / `--motion-easing-out` /
  opacity + rise. Exit: `--motion-duration-normal` / `--motion-easing-in` /
  opacity + reverse rise.

Copy pool: use Pool A / B / C / D from §2 based on trigger type. Rotate
on each session.

pt-BR example titles (by stop):
- `critical`: "Atenção: vence hoje!"
- `aging`: "Tá chegando no prazo…"
- `spoiled`: "Passou da validade"

#### Push Notification

- Title: ingredient name — max 40 chars.
- Body: one of the pool templates (§2) — max 100 chars.
- Icon: app icon (green brand mark).
- Rich notification image (if supported): item photo.
- Action buttons (pt-BR): "Ver receitas" | "Dispensar"

Push notification copy must never use exclamation marks in the title (reserved
for the body where appropriate). Title is factual; body is warm.

Example push:
- Title: "Tomate cereja"
- Body: "Vence amanhã — ainda dá tempo de fazer algo gostoso com ele!"

---

## 9. Implementation Mapping

The table below is the engineer's checklist. For each token family, it names
the target file, the action required (create / modify), and what changes.

| Token family | File path | Action | What changes |
|---|---|---|---|
| Neutral scale (extended) | `src/shared/styles/foundations/scale.css` | Modify | Replace existing neutrals with the full 11-stop neutral scale from §3; add `--neutral-50` and `--neutral-950` |
| Brand greens | `src/shared/styles/foundations/primary.css` | Modify | Replace `--green-400/600/800` with the full brand-green ladder + semantic aliases `--color-brand-light/primary/dark/tint` |
| Action oranges | `src/shared/styles/foundations/primary.css` | Modify | Add `--orange-*` raw tokens + `--color-action-primary/hover/pressed/tint` |
| Status colours | `src/shared/styles/foundations/status.css` | Modify | Keep existing; add `--color-*-surface` semantic tokens; update `--color-error` to `#dc2626` |
| Text / semantic text | `src/shared/styles/foundations/text.css` | Modify | Extend with full semantic text alias set from §3 (secondary, disabled, on-brand, on-action) |
| Theme overrides | `src/shared/styles/theme.css` | Modify | Invert: `:root` = light-mode base; `[data-theme='dark']` = dark overrides. Apply full semantic alias table from §3 |
| Typography | `src/shared/styles/foundations/typography.css` | Modify | Update `--font-sans` and `--font-mono` to the Plus Jakarta Sans / JetBrains Mono stacks |
| Spacing | `src/shared/styles/foundations/spacing.css` | No change | Already correct |
| Scale (type) | `src/shared/styles/foundations/scale.css` | No change | Already correct |
| **Ripeness** | `src/shared/styles/foundations/ripeness.css` | **Create** | Full `--ripeness-*` token family, light + dark, per §6 |
| **Radii** | `src/shared/styles/foundations/radii.css` | **Create** | `--radius-sm/md/lg/xl/pill` per §5 |
| **Shadows** | `src/shared/styles/foundations/shadows.css` | **Create** | `--shadow-sm/md/lg/xl`, light + dark variants, per §5 |
| **Motion** | `src/shared/styles/foundations/motion.css` | **Create** | All `--motion-*` tokens + `@media (prefers-reduced-motion)` block, per §5 |
| **Index** | `src/shared/styles/foundations/index.css` | Modify | Add `@import` lines for all four new files |
| Font imports | `src/index.tsx` | Modify | Add `@fontsource/plus-jakarta-sans` weight imports (and JetBrains Mono if used) |
| HTML entry | `public/index.html` | Modify | Add theme bootstrap `<script>` block before `</head>`, per §11 |
| Package | `package.json` (via npm install) | — | `npm install @fontsource/plus-jakarta-sans` (+ JetBrains Mono) |

### Ripeness.css skeleton

```css
/* src/shared/styles/foundations/ripeness.css */
:root {
  /* Light-mode */
  --ripeness-fresh:    #4ade80;
  --ripeness-peak:     #facc15;
  --ripeness-aging:    #fb923c;
  --ripeness-critical: #f87171;
  --ripeness-spoiled:  #9f3a38;
}

[data-theme='dark'] {
  --ripeness-fresh:    #86efac;
  --ripeness-peak:     #fde047;
  --ripeness-aging:    #fdba74;
  --ripeness-critical: #fca5a5;
  --ripeness-spoiled:  #b91c1c;
}
```

### Updated index.css

```css
@import './scale.css';
@import './primary.css';
@import './status.css';
@import './text.css';
@import './spacing.css';
@import './typography.css';
@import './ripeness.css';
@import './radii.css';
@import './shadows.css';
@import './motion.css';
```

---

## 10. Per-Capability Strings Convention

Even before internationalisation is a requirement, all user-facing strings
must be isolated from JSX. The convention is one file per capability:

```
src/capabilities/<feature>/strings.pt-BR.ts
```

This file exports a plain object (not a class — no shared state, no
lifecycle) with all pt-BR strings for that capability:

```typescript
// src/capabilities/pantry/strings.pt-BR.ts
export const strings = {
  searchPlaceholder: 'Buscar alimento…',
  addItemLabel: 'Adicionar alimento',
  emptyState: 'Sua dispensa está vazia por enquanto. Adiciona o primeiro alimento e a gente cuida do resto.',
  greetingMorning: 'Bom dia! Veja o que está na sua dispensa.',
  greetingAfternoon: 'Boa tarde! Aqui está sua dispensa.',
  greetingEvening: 'Boa noite! Confira o que precisa de atenção.',
  ripeness: {
    fresh:    'verdinho',
    peak:     'maduro',
    aging:    'atenção',
    critical: 'passando',
    spoiled:  'estragado',
  },
} as const;
```

Rationale:

1. **grep-ability.** All pt-BR strings are in one file per capability. No
   hunting through JSX for copy.
2. **Cheap i18n path.** If locale support is added, the adapter wraps
   `strings.pt-BR.ts` without touching components.
3. **Designer collaboration.** A non-engineer can review all copy in one
   file without reading component code.
4. **Variation pools.** Notification pool arrays live here too, making it
   easy to add templates without touching notification logic.

Notification pool example:

```typescript
// src/capabilities/notifications/strings.pt-BR.ts
export const strings = {
  poolExpiryTomorrow: [
    'Oi! O {item} vence amanhã — que tal aproveitá-lo hoje?',
    'O {item} está quase no limite. Que receita você faz com ele?',
    'Lembrete amigável: o {item} vence amanhã. Ainda dá tempo!',
    'Boa tarde! O {item} tá chegando no fim da validade. Veja uma receita rápida.',
    'Aproveita o {item} hoje — amanhã é o último dia de validade.',
  ],
  // ... other pools
} as const;
```

String interpolation: use a minimal `interpolate(template, vars)` utility
function in `src/shared/utils/strings.ts`. Do not pull in a full i18n
library for this at Phase 1.

---

## 11. Inline HTML Bootstrap Snippet

### Purpose

Prevents a Flash Of Unstyled Content (FOUC) for theme. The snippet runs
synchronously, before the browser paints, to apply the correct
`data-theme` attribute to `<html>`. If the script is deferred or placed
at the end of `<body>`, FOUC will occur.

### Placement

In `public/index.html`, place the `<script>` block as the **last element
inside `<head>`**, after all `<meta>` tags and before `</head>`. Inline
scripts in `<head>` block parsing but execute before first paint — that is
exactly what is needed here.

### Also update

Change `<html lang="en">` to `<html lang="pt-BR">` in `public/index.html`.

### The snippet

```html
<script>
  (function () {
    var stored = localStorage.getItem('theme');
    var prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme;

    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else if (stored === 'system' || stored === null) {
      theme = prefersDark ? 'dark' : 'light';
    } else {
      theme = 'light';
    }

    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    /* Light mode is the :root default — no attribute needed. */
  })();
</script>
```

### Theme persistence (app-side, for reference)

When the user changes the theme in the app settings, persist with:

```typescript
// theme = 'light' | 'dark' | 'system'
localStorage.setItem('theme', theme);

if (theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else if (theme === 'light') {
  document.documentElement.removeAttribute('data-theme');
} else {
  // 'system'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}
```

Also listen to system preference changes at runtime:

```typescript
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  });
```

### UI labels (pt-BR)

| Key | Label |
|---|---|
| Section heading | "Tema" |
| Option: system | "Sistema" |
| Option: light | "Claro" |
| Option: dark | "Escuro" |

---

## Appendix — Design Decisions Not Constrained by the Interview

The following decisions were made by the author of this document without
explicit user input. They are flagged here so the implementing engineer
can override them if needed.

1. **`--neutral-*` token scale replaced.** The scaffold's existing neutrals
   used a blue-grey tint (from Bootstrap / similar). The brand spec moves to
   a warmer, more food-photography-adjacent neutral (Tailwind's `gray-*`
   family, which is close to true neutral grey). This change was implicit in
   the warm / golden visual brief from the Veo 3 script. If the team prefers
   the original blue-grey scale, the semantic aliases remain valid — only
   the raw neutrals change.

2. **`--color-success` shares brand green.** In most design systems, success
   is a distinct green. Here, success and brand share the same green ladder
   because the product's central emotion IS freshness-as-success. Using a
   divergent success green would create a confusing second green. The only
   place this may feel odd is form validation; consider adding a small
   checkmark icon to success states so colour is not the sole signal
   (WCAG accessibility practice regardless).

3. **Shadow ring technique for dark mode.** The 1px white-tinted border
   within the shadow token is a pattern borrowed from Radix UI Themes and
   Linear. It is a CSS-only technique with no accessibility implications and
   no JS cost. If it feels too pronounced on a given component, the team can
   reduce the alpha to `0.03`.

4. **Expiry-to-ripeness thresholds** (§6 "Ripeness-to-Days Mapping") are
   defaults chosen to feel intuitive. The correct thresholds should
   eventually be configurable per food category (milk → 1-day `critical`
   threshold differs from hard cheese → 7-day). The token layer is
   agnostic to this; it is a data-layer concern.

5. **Page-fade transition uses opacity only** (not slide). Slide transitions
   on page change can trigger motion sickness more readily than fades, and
   the app's navigation is lateral (bottom tabs) rather than hierarchical,
   which makes directional slides semantically ambiguous anyway.
