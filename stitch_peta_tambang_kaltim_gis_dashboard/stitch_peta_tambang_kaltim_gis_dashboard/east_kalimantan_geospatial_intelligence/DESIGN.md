---
name: East Kalimantan Geospatial Intelligence
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#4c463f'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#7e766e'
  outline-variant: '#cfc5bc'
  surface-tint: '#655d54'
  primary: '#17120b'
  on-primary: '#ffffff'
  primary-container: '#2c261f'
  on-primary-container: '#968c83'
  inverse-primary: '#d0c5ba'
  secondary: '#635e4e'
  on-secondary: '#ffffff'
  secondary-container: '#e6dfca'
  on-secondary-container: '#676352'
  tertiary: '#171109'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d261d'
  on-tertiary-container: '#988c80'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ece0d6'
  primary-fixed-dim: '#d0c5ba'
  on-primary-fixed: '#201b14'
  on-primary-fixed-variant: '#4d463e'
  secondary-fixed: '#e9e2cd'
  secondary-fixed-dim: '#cdc6b2'
  on-secondary-fixed: '#1e1c0f'
  on-secondary-fixed-variant: '#4b4737'
  tertiary-fixed: '#eee0d2'
  tertiary-fixed-dim: '#d1c4b6'
  on-tertiary-fixed: '#211a12'
  on-tertiary-fixed-variant: '#4e453b'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
  code-tabular:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system delivers a high-density, analytical GIS command environment tailored for environmental monitoring, land-use audits, and autonomous concession compliance across East Kalimantan (Borneo). The system pairs the analytical precision of satellite remote sensing with the warm, non-fatiguing tactility of archival cartography.

The design philosophy combines **Warm Analytical Cartography** with **Instrument-Grade Functionalism**:
- **Tone:** Methodical, unhurried, authoritative, and ecologically rooted. It eliminates the cold, sterile eye strain of generic dark-mode GIS suites in favor of sun-bleached parchment tones suitable for long-duration spatial auditing shifts.
- **Interface Structure:** Low visual noise, crisp boundaries, zero ornamental gradients, and data-first spatial densities. The dashboard prioritizes map views, vectorized spatial layers, multi-temporal NDVI/SAR spectral indices, and telemetry inspection panels.

## Colors

The palette grounds the interface in balanced cream and earthen minerals, reserving saturated visual energy exclusively for land-cover segmentation and geospatial classification:

### Base & Neutrals
- **Canvas Base (`#FBF9F4`):** Warm light cream serving as the viewport substrate, canvas underlay, and background behind map viewports.
- **Surface Container (`#F3EFE6`):** Secondary container tier used for side docks, floating inspection panels, layer trees, and analytical modal drawers.
- **Border & Division Sand (`#E5DEC9`):** Precise dividing line tone applied across all split-views, table headers, and vector inspector dividers.
- **Primary Typography & Vectors (`#2C261F`):** Deep volcanic bark for high-contrast alphanumeric metrics, active states, and structural glyphs.
- **Muted Typography & Labels (`#595045`):** Subdued earth tone for coordinate readouts (lat/long), metadata descriptors, and timestamp intervals.

### Semantic Land-Cover Classes
- **Tambang (Open-Pit Mining & Tailings) (`#E6482E`):** High-alert terra-cotta cinnabar. Highlights active stripping, pit excavations, and unpermitted concession incursions.
- **Sawit (Oil Palm Monoculture) (`#D99B1C`):** Dense amber ochre. Identifies organized canopy grids, young planting plots, and plantation corridors.
- **Hutan (Primary & Secondary Rainforest) (`#208B56`):** Forest emerald viridian. Signifies intact canopy, protected peatland corridors, and conservation forest reserves.
- **Permukiman (Settlements & Infrastructure) (`#6C7A89`):** Slate river stone. Designates log landings, worker encampments, processing facilities, and civic corridors.

## Typography

Typography is set exclusively in **Inter** to maintain neutral metric parsing, uniform numeric legibility, and high information throughput:
- **OpenType Tabular Figures (`tnum`):** Enforced across all coordinate reads, polygon surface areas (hectares/km²), temporal delta timestamps, and elevation/spectral indices to prevent layout jitter during scrub-timeline interactions.
- **Scale Compactness:** Dashboard titles cap at `1.5rem` (`24px`), reserving horizontal real estate for vector attribute tables, multi-spectral legends, and layer trees.
- **Case Rhythms:** Data keys, telemetry labels, and coordinate headers use uppercase letterforms with `+0.04em` tracking at `0.6875rem` (`11px`) to visually separate structural metrics from dynamic content.

## Layout & Spacing

The dashboard employs a strict **modular GIS workstation layout** optimized for high-resolution monitors while scaling down to field tablets:
- **Layout Model:** Fixed viewport canvas (100vh) anchored by a dominant interactive central map viewport flanked by collapsible side inspection docks (default 320px left rail for layer hierarchies/legend; 380px right rail for temporal analysis and concession audits).
- **Rhythm & Grid:** Built upon a dense 4px baseline matrix. Spacing tokens prioritize compact data density (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 12px) to minimize dead screen real estate.
- **Adaptive Breakpoints:**
  - **Desktop (≥1280px):** Simultaneous multi-dock view with full attribute tables pinned along the lower third tray.
  - **Tablet (768px - 1279px):** Attribute tray collapses into an overlay drawer; side panels switch to toggleable fly-out flyovers.
  - **Mobile (<768px):** Single-pane full viewport map with swipeable bottom sheets for layer classification badges and quick statistical snapshots.

## Elevation & Depth

Visual hierarchy is communicated through **structural tonal layering** and **low-contrast hair-line outlines** rather than prominent drop shadows, keeping vector shapes and map overlays crisp:

- **Level 0 (Base Substrate):** Map canvas and geographic tiles running Sentinel/Planet scope rasters.
- **Level 1 (Dock & Rail Paneling):** `#F3EFE6` containers bounded by solid 1px `#E5DEC9` structural lines. Zero drop shadows.
- **Level 2 (Floating Map Controllers & Overlays):** Floating zoom extents, scale rulers, measurement tools, and mini-basemap selectors sit on `#FBF9F4` with a 1px `#E5DEC9` outline and an ambient sub-surface anchor: `0 2px 8px rgba(44, 38, 31, 0.06)`.
- **Level 3 (Attribute Inspectors & Popovers):** Contextual polygon query cards and anomaly detection alerts use `#FBF9F4` with `0 4px 16px rgba(44, 38, 31, 0.10)` bounded by a 1px border tinted to the dominant detection class (e.g., `#E6482E` for an active mining intrusion).

## Shapes

The design system enforces **Soft (0.25rem / 4px)** corner radii across interactive components and card containers:
- **Pragmatic Utility:** The subtle 4px radius softens UI perimeters while retaining an industrial, precise instrument aesthetic.
- **Pill Exceptions:** Class legend tags and categorical status indicators utilize pill radii (`9999px`) to immediately signal categorical classification states rather than interactive dock panels.
- **Map Overlays:** Floating HUD elements, toolbars, and layer cards strictly observe the 4px curvature to harmonize with rectilinear coordinate grids.

## Components

### Buttons
- **Primary Action:** Solid `#2C261F` fill with `#FBF9F4` Inter 600 text. Hover transitions to `#595045`. 4px radius, 32px height for compact toolbars.
- **Secondary Action:** `#F3EFE6` fill, 1px `#E5DEC9` border, `#2C261F` text. Active state renders with 1px `#2C261F` outline.
- **Spatial Tool Buttons:** Square 32x32px icon-only triggers with `#2C261F` iconography. Selected state flips to `#2C261F` background with `#FBF9F4` glyph.

### Class Chips & Metric Badges
- **Segmentation Tags:** Pill-shaped tags displaying a 6px solid class pip, category name, and coverage area (e.g., `Tambang · 1,420 ha`).
- **Color Pairings:**
  - *Tambang:* `#E6482E` indicator with subtle `rgba(230, 72, 46, 0.12)` background tint.
  - *Sawit:* `#D99B1C` indicator with `rgba(217, 155, 28, 0.12)` background tint.
  - *Hutan:* `#208B56` indicator with `rgba(32, 139, 86, 0.12)` background tint.
  - *Permukiman:* `#6C7A89` indicator with `rgba(108, 122, 137, 0.12)` background tint.

### Data Tables & Attribute Lists
- **Rows & Spacing:** Dense 28px cell height; horizontal borders set to 1px `#E5DEC9`.
- **Text Alignment:** Metric quantities, hectares, coordinates, and percentages use `font-variant-numeric: tabular-nums` and right alignment. Class labels and identifiers align left.
- **Selection State:** Active inspected row utilizes `#F3EFE6` with a 2px left border accent corresponding to the land-use class.

### Input Fields & Layer Sliders
- **Text Inputs (Search & Lat/Long Coordinates):** 32px height, `#FBF9F4` surface, 1px `#E5DEC9` frame, text `#2C261F`. Focus state introduces a 1.5px `#2C261F` border ring.
- **Opacity / Temporal Range Sliders:** 4px track height in `#E5DEC9` with `#2C261F` progress fill and a 12px circular `#2C261F` thumb.

### Detection Alert Cards
- Used for rapid flagging of illegal deforestation or unpermitted mining expansions. Card surface is `#F3EFE6` with a 1px solid `#E5DEC9` perimeter, capped by a top boundary line colored in `#E6482E` (Tambang) or `#D99B1C` (Sawit), housing satellite timestamp, concession license ID, and delta confidence score.