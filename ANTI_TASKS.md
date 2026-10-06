# ANTI_TASKS: Portfolio PowerPoint Generator Rules & Constraints

## Overview
This document enforces strict design and content constraints for generating the presentation deck for "The Darkroom" portfolio (`Portfolio_Design_Deck.pptx`).

---

## 1. Core Principles & Anti-Patterns
- **No Invented Statistics or Claims**: Every stat, award, and project metric must be 100% verified against code (`e:\SELF\portfolio`) or live deployment (`https://yatinportfolio.vercel.app`). Unverified claims must be softened or removed.
- **Light Theme Only**: Background soft cool silver (`#EDEFF4`), crisp white cards (`#FFFFFF`), rounded stage panels (`#DCE5F0`), dark ink text (`#14161F`), Safelight red accent (`#D9392B`), Safelight tint background (`#F8DCD5` for Cover & Conclusion), Cyanotype blue headers/chips (`#1D4E7A`).
- **No Visual Noise**:
  - NO accent lines under titles
  - NO side stripes or decorative vertical bars
  - NO gradients
  - NO emoji icons
- **Strict Typography & Margins**:
  - Left margin: exactly `0.6"` on all slides.
  - Body text: 12pt or larger.
  - Captions: 10pt or larger.
  - Zero text overflow or element overlaps.
- **Speaker Notes**: Required on every slide (60-90 words, first-person perspective).

---

## 2. Palette Tokens ("Silver Print & Safelight")
| Token | Hex Code | Usage |
|---|---|---|
| Paper | `#EDEFF4` | Slide background for internal slides (2–12) |
| Card | `#FFFFFF` | Cards, container frames, background for text modules |
| Stage | `#DCE5F0` | Backdrop panels behind screenshots for visual depth |
| Ink | `#14161F` | Primary text and headings |
| Muted | `#575B68` | Secondary labels and metadata (contrast >= 4.5:1) |
| Safelight | `#D9392B` | Accent highlights, marker circles, key callouts |
| Safelight Tint | `#F8DCD5` | Full-bleed background for Slide 1 (Cover) & Slide 13 (Conclusion) |
| Cyanotype | `#1D4E7A` | Table header bars, category chips, diagram nodes |

---

## 3. Slide Hierarchy (13 Slides)
1. **Slide 1 (Cover)**: Title & Hero preview (`hero.png` + `mobile_home.png` on full-bleed Safelight tint background `#F8DCD5`).
2. **Slide 2 (Objectives)**: Problem statement & tactile engineering focus (`work_prototypes.png`).
3. **Slide 3 (Why a Portfolio)**: Need, audience, and differentiator.
4. **Slide 4 (Concept)**: Darkroom theme rationale (`hero_band.png` + `sheet_dim.png`).
5. **Slide 5 (Principles Overview)**: 4 core design & engineering principles.
6. **Slide 6 (Visual Design)**: Typography, layout, and lighting hierarchy (`hero.png` annotated with native markers 1, 2, 3).
7. **Slide 7 (Gestalt & Layout)**: Proximity, similarity, and figure/ground focus (`beyond_sheet.png` annotated with markers 1, 2, 3).
8. **Slide 8 (Interaction Design)**: Interactive darkroom frame development process (`frame_raw.png`, `frame_developing.png`, `frame_developed.png` + `beyond_chess.png`).
9. **Slide 9 (Experience & Motion)**: Canvas film strip scroll and mobile responsiveness (`film_strip.png` + `mobile_beyond.png`).
10. **Slide 10 (Anatomy of the Site)**: 8 element cards with 1-line interaction definitions + 5 always-on chips (`section_01.png` to `section_08.png`).
11. **Slide 11 (Design System)**: 3 zones — Palette & Typography, Component States (`states_cursor.png`, `states_frame.png`), Film Stock Themes (`theme_portra_sheet.png`, `theme_cinestill_sheet.png`, `theme_trix_sheet.png`).
12. **Slide 12 (Learning & Takeaways)**: Technical and design insights from building "The Darkroom".
13. **Slide 13 (Conclusion & Live Site)**: Final summary and QR code link to `yatinportfolio.vercel.app` (`qr_code.png`).

---

## 4. Screenshot & Relevance Rules
- Close-range crops showing exact elements (>= 60% of image area).
- Maximum 2 slides per screenshot file.
- Native PowerPoint shapes for callout markers (Safelight red circles with white numbers).
- Stage panels (`#DCE5F0`) padded `0.25"` around all screenshot frames.
