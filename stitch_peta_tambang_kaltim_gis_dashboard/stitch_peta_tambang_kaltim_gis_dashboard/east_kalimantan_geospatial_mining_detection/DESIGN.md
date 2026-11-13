---
name: East Kalimantan Geospatial Mining Detection
colors:
  surface: '#0d141b'
  surface-dim: '#0d141b'
  surface-bright: '#333a42'
  surface-container-lowest: '#080f15'
  surface-container-low: '#151c23'
  surface-container: '#192027'
  surface-container-high: '#242b32'
  surface-container-highest: '#2e353d'
  on-surface: '#dce3ed'
  on-surface-variant: '#e2beb8'
  inverse-surface: '#dce3ed'
  inverse-on-surface: '#2a3139'
  outline: '#a98984'
  outline-variant: '#5a413c'
  surface-tint: '#ffb4a6'
  primary: '#ffb4a6'
  on-primary: '#670600'
  primary-container: '#f95c43'
  on-primary-container: '#5a0500'
  inverse-primary: '#b32a17'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#5cde97'
  on-tertiary: '#00391f'
  tertiary-container: '#05a665'
  on-tertiary-container: '#00311a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#400200'
  on-primary-fixed-variant: '#900e01'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#7afbb1'
  tertiary-fixed-dim: '#5cde97'
  on-tertiary-fixed: '#002110'
  on-tertiary-fixed-variant: '#00522f'
  background: '#0d141b'
  on-background: '#dce3ed'
  surface-variant: '#2e353d'
typography:
  display:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: '0'
  metric-num:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.03em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: -0.01em
  caption-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 0.875rem
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 1rem
  margin-desktop: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-precision, technical, and authoritative scientific interface for satellite-derived environmental intelligence. Built for academic researchers, geospatial analysts, regional policymakers, and conservation stakeholders, it prioritizes analytical clarity, high-density data legibility, and zero visual distortion.

The visual style blends **technical minimalism** with **modern analytical GIS instrumentation**:
- **Tone:** Methodical, empirical, restrained, and alert.
- **Atmosphere:** Deep cockpit dark environment optimized for extended multi-spectral satellite image analysis under varied ambient lighting.
- **Graphic Philosophy:** Strictly utilitarian. No decorative or blurred gradients, no soft ambient glows, and no non-functional skeuomorphism. Depth is achieved entirely through calibrated surface layering, structural dark borders, and vivid semantic land-cover signatures.

## Colors

The palette is engineered around dark surfaces paired with high-contrast thematic land-cover classification hues. Backgrounds preserve dark-adaptation, allowing false-color imagery and thematic overlays to remain front and center.

### Core Canvas & Structure
- **Canvas Base (`#0F1419`):** Application viewport, deep underlay, and outer viewport margin.
- **Surface Layer 1 (`#161D24`):** Side panels, inspectors, top navigation bar, and primary containers.
- **Surface Layer 2 (`#1C2631`):** Metric tiles, nested cards, popover inspectors, and table header rows.
- **Surface Active / Hover (`#24303A`):** Interactive item states and table row hover states.
- **Structural Borders (`#24303A`):** High-contrast section dividers, panel splitters, and modal outlines.
- **Subtle Borders (`#1B242D`):** Nested card perimeters, input borders, and internal grid lines.

### Text & Data Metrics
- **Primary Text (`#F3F4F6`):** Standard data readout, critical metric values, and primary headings.
- **Secondary Text (`#9CA3AF`):** Axis labels, table column headers, and ancillary parameters.
- **Muted Text (`#6B7280`):** Inactive toggles, unit indicators, and timestamps.

### Thematic GIS Land Cover Classes
- **Mining / Clearing (`#F0563E`):** Critical operational indicator for illegal or unpermitted land excavations.
- **Oil Palm (`#F2B83A`):** Monoculture agricultural plantation class.
- **Forest Canopy (`#2BB673`):** Dense tropical canopy and conservation boundary masks.
- **Settlement / Built-up (`#9AA4B2`):** Urban areas, villages, and infrastructure clusters.
- **Water Body (`#3B82F6`):** River networks, retention basins, and coastal water masks.
- **Prediction Candidate / Anomaly Alert (`#38BDF8`):** AI model inferences, candidate vector boundaries, and crisp bounding indicators.

## Typography

Typography prioritizes spatial and numerical density. **Inter** handles narrative, headings, and quantitative readouts, while **JetBrains Mono** is reserved exclusively for geospatial coordinates (WGS84/UTM), sensor metadata, confidence intervals, and model hyperparameter values.

- **Tabular Figures:** All statistical metric tiles, spatial measurement summaries, and raster area counters must explicitly render with `font-variant-numeric: tabular-nums` to eliminate jitter during real-time pan/zoom data recalculations.
- **Hierarchical Discipline:** Data-dense interfaces avoid multi-weight body copy. Hierarchy is expressed through size and subtle opacity shifting (`#F3F4F6` down to `#9CA3AF` and `#6B7280`) rather than variable font weight sprawl.

## Layout & Spacing

The layout is built as a precision workstation shell featuring full-bleed map viewports flanked by collapsible, fixed-width analytical docks.

- **Desktop Structure (1280px+):** 
  - **Left Rail (320px fixed):** Layer management, spectral band selectors, and model threshold controls.
  - **Center Canvas (Fluid flex):** WebGL/MapLibre viewport with anchored HUD overlays (scale bars, coordinate crosshairs, minimap).
  - **Right Panel (380px fixed):** Detection telemetry, distribution charts, and prediction candidate inspection feeds.
- **Tablet / Responsive (768px – 1279px):** Side panels collapse into dockable sliding drawers (`z-index: 40`), maximizing the map interaction area.
- **Mobile (<768px):** Single-column stacked workflow where bottom sheets house telemetry cards over a locked-aspect interactive map.
- **Spacing Rhythm:** Based on an uncompromising 4px/8px micro-grid. In data-dense areas such as tables and satellite filter stacks, compact vertical gaps (`space-xs` and `space-sm`) take precedence to retain visible context without excessive scrolling.

## Elevation & Depth

Visual hierarchy does not use diffuse dropshadows or blurring filters. Depth is articulated purely through tonal stacking and razor-sharp border separation:

- **Level 0 (Map Canvas):** The dynamic geospatial map view (`#0F1419` base tile background).
- **Level 1 (Dock Panels & Viewport Rails):** Background `#161D24` backed by a 1px right/left border of `#24303A`.
- **Level 2 (Analytical Tiles & Cards):** Background `#1C2631` bordered with 1px `#1B242D`.
- **Level 3 (Dropdowns, Overlays & Tooltips):** Background `#1C2631` with a distinct 1px border of `#38BDF8` (or `#24303A` for generic overlays) paired with a solid, compact shadow: `0 4px 12px rgba(0, 0, 0, 0.6)`.
- **Focus & Selection Outlines:** Focused interactive inputs and selected candidate polygons adopt a sharp `1.5px solid #38BDF8` ring with zero blur offset.

## Shapes

The geometric framework is calibrated to a precise **10px baseline border radius** (`0.625rem`) for interactive containers, panels, and cards. This softens structural technical density while maintaining an engineered, clean-cut aesthetic.

- **Panels & Metric Cards:** 10px corner radius (`rounded-lg`), cleanly framed with continuous 1px dark borders.
- **Buttons, Segmented Toggles & Inputs:** Standardized at 6px to 8px (`rounded-md`) to ensure tactile differentiation from enclosing cards.
- **Indicators, Chips & Pill Filters:** Fully rounded pills (`9999px`) reserved specifically for status states, land-cover classification badges, and active layer chips.
- **Internal Progress & Distribution Bars:** 4px radius on segmented progress tracks.

## Components

### 1. Metric Tiles
Compact summary cards displaying total hectares, predicted clearing zones, and model confidence scores:
- **Container:** Background `#1C2631`, 1px border `#1B242D`, 10px rounded corners, padding `space-md`.
- **Top Row:** Metric label in `body-sm` (`#9CA3AF`) paired with a `label-mono` timestamp or delta indicator.
- **Center Value:** Formatted in `metric-num` (`#F3F4F6`).
- **Footer Detail:** Micro trendline or delta pill tag (`+12.4 ha vs baseline`).

### 2. Stacked Horizontal Distribution Bars
Land-cover composition breakdown across monitored AOIs:
- **Track Height:** 8px with a 4px corner radius.
- **Segments:** Contiguous colored segments (Mining `#F0563E`, Palm `#F2B83A`, Forest `#2BB673`, Settlement `#9AA4B2`, Water `#3B82F6`).
- **Legend Integration:** Dot-prefixed items under the bar displaying category label and percentage using `label-mono`.

### 3. Layer Filter Pills & Toggles
Controls for toggling satellite spectral composites and model masks:
- **Base Style:** Rounded pill shape, height 28px, background `#161D24`, border 1px solid `#24303A`.
- **Content:** 8px circular thematic color indicator, layer title in `body-sm`, and an opacity percentage readout in `label-mono`.
- **Active State:** Border shifts to `#38BDF8` or the matching thematic class hue, background dark-tinted with class color at 12% opacity.

### 4. Interactive GIS Inspection Table
Compact tabular representation of inferred clearing sites:
- **Header:** Background `#1C2631`, uppercase `caption-mono` (`#9CA3AF`), bottom border 1px solid `#24303A`.
- **Rows:** Alternating subtle zebra striping (`#161D24` / `#182028`), hover highlight `#24303A`.
- **Cells:** Padding `space-xs space-sm`. Coordinates, confidence scores (e.g., `0.942`), and cell areas formatted strictly in `label-mono`.

### 5. Methodology Pipeline Cards
Multi-stage status indicators depicting the CNN processing workflow (Sentinel-2 L2A Ingestion → Preprocessing & Cloud Masking → Inference Engine → Vector Extraction):
- **Container:** Nested within analytical docks, framed with `#1B242D`.
- **Connector Nodes:** Crisp 2px lines (`#24303A`) connecting discrete step chips with active pulses in `#38BDF8`.
- **Status Indicator:** Small square status badge (Pending: `#6B7280`, Running: `#38BDF8`, Complete: `#2BB673`, Alert: `#F0563E`).

### 6. Buttons & Inputs
- **Primary Action Button:** Background `#F0563E` (for critical clearing alerts/exports) or `#38BDF8` (for analytical runs), foreground `#0F1419`, font weight 600, radius 8px, zero text shadow.
- **Secondary / Ghost Button:** Background transparent, border 1px solid `#24303A`, text `#F3F4F6`, hover background `#1C2631`.
- **Coordinate Search / Filter Inputs:** Background `#0F1419`, border 1px solid `#24303A`, text `#F3F4F6`, placeholder `#6B7280`, focus ring 1.5px solid `#38BDF8`.