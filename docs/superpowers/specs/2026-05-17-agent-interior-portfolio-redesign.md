# Agent for Interior Design - Immersive Portfolio Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio thành immersive cinematic experience với full animations, parallax effects, scroll snap navigation, và premium dark luxe + light airy fusion aesthetic.

**Architecture:** Single-page với scroll-snap sections, Framer Motion cho animations, custom cursor, loading screen, và split-text reveals. Mỗi section có visual identity riêng nhưng thống nhất trong flow.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scroll

---

## 1. Loading Screen

**Mục tiêu:** Animated loading screen với logo và progress bar, fade-out khi ready.

**Visual:**
- Background: #0a0a0a (dark)
- Logo text: "AID" với gold gradient (#d4af37)
- Progress bar: thin line với neon glow (#00f0ff)
- Duration: 2-3 seconds

**Animation:**
- Logo: fade-in + scale from 0.8 → 1.0
- Progress bar: width 0% → 100% với ease-out
- Exit: full screen fade-out over 500ms

**Implementation:**
- Create: `src/components/LoadingScreen.tsx`
- Add to: `src/app/page.tsx` (conditional render)

---

## 2. Custom Cursor

**Mục tiêu:** Replace default cursor với custom dot + ring effect.

**Visual:**
- Dot: 8px solid white, immediate follow
- Ring: 40px transparent with white border, lagged follow
- Scale on hover: ring grows to 60px

**Implementation:**
- Create: `src/components/ui/CustomCursor.tsx`
- Add to: `src/app/layout.tsx`

---

## 3. Navigation Dots (Enhanced)

**Mục tiêu:** Scroll-snap navigation với animated dots.

**Visual:**
- Vertical dots on right side
- Active: filled + neon glow
- Inactive: hollow
- Hover: scale up

**Implementation:**
- Modify: `src/components/NavigationDots.tsx`
- Add: scroll-snap click handlers

---

## 4. Hero Section - Dark Luxe with Split-Text

**Mục tiêu:** Full-screen dark hero với parallax background và split-text reveal.

**Visual:**
- Background: Dark #0a0a0a
- 5 hero images auto-sliding (5s intervals)
- Gradient overlay: black/60 → transparent
- Heading: "AGENT FOR INTERIOR DESIGN" - split into lines
- Subheading: fade-in after heading

**Split-Text Animation:**
- Each word/line wraps in span
- Initial: opacity 0, y: 50
- Reveal: staggered 100ms per line, y: 0, opacity 1
- Duration: 0.8s per line, ease: [0.25, 0.1, 0.25, 1]

**Parallax:**
- Background image moves at 0.5x scroll speed
- Use Framer Motion useScroll + useTransform

**Implementation:**
- Modify: `src/components/HeroSection.tsx`
- Add: SplitText component, parallax logic, auto-slide

---

## 5. About Section - Light Airy

**Mục tiêu:** Light background với fade-in reveal và stats animation.

**Visual:**
- Background: #fafafa (light)
- Profile image: rounded với subtle shadow
- Stats: 12+ Years, 85+ Projects, 50+ Clients
- Quote block với italic styling

**Animations:**
- Section fades in on scroll into view
- Image slides in from left
- Text slides in from right
- Stats: count-up animation on view

**Implementation:**
- Modify: `src/components/AboutSection.tsx`
- Add: Scroll-triggered animations, count-up effect

---

## 6. Services Section - Dark Card Hover

**Mục tiêu:** Dark transition section với 3D card hover effects.

**Visual:**
- Background: #1a1a1a (dark gray)
- 3 service cards: Consultation, Design, Execution
- Each card: icon + title + description
- Neon accent on hover

**3D Hover Effect:**
- On hover: card rotates slightly toward cursor
- Transform: perspective 1000px, rotateX/Y based on cursor position
- Scale: 1.05 on hover

**Implementation:**
- Modify: `src/components/ServicesSection.tsx`
- Add: 3D tilt effect using onMouseMove

---

## 7. Projects Section - Light Grid with Zoom

**Mục tiêu:** Light background với filter tabs và image zoom hover.

**Visual:**
- Background: #fafafa
- Filter tabs: All, Office, Shophouse, Villa
- Project grid: 3 columns
- Card: image + overlay (name, style, area)

**Image Zoom Hover:**
- Scale: 1.0 → 1.1 on hover
- Overlay: gradient from transparent → black/50
- Duration: 0.4s ease

**Lightbox:**
- Click card → fullscreen lightbox
- Navigation arrows
- Close on ESC or click outside
- Smooth transition animations

**Implementation:**
- Modify: `src/components/ProjectsSection.tsx`
- Create: `src/components/ui/Lightbox.tsx`
- Add: zoom effects, lightbox logic

---

## 8. Testimonials Section - Dark Carousel

**Mục tiêu:** Dark background với testimonial carousel và neon accents.

**Visual:**
- Background: #0a0a0a
- Testimonial cards: quote + client photo + name + project
- Neon accent lines
- Auto-advance every 6s

**Animation:**
- Slide transition: fade + translate
- Staggered content reveal per slide
- Progress indicator with neon glow

**Implementation:**
- Modify: `src/components/TestimonialsSection.tsx`
- Add: auto-advance logic, enhanced animations

---

## 9. Gallery Section - Light with Drag-Drop

**Mục tiêu:** Light background với enhanced drag-drop upload.

**Visual:**
- Background: #fafafa
- Drop zone: large dashed border area
- Preview grid: uploaded images
- Hover effects on images

**Implementation:**
- Modify: `src/components/gallery/VisitorGallery.tsx`
- Already exists: DropZone, ImagePreview components
- Enhance: animations, visual feedback

---

## 10. Contact Section - Gradient Background

**Mục tiêu:** Gradient background (dark to light) với floating labels.

**Visual:**
- Background: gradient from #0a0a0a → #2d2d2d → #fafafa
- Form fields: dark inputs with light text
- Labels: float up on focus/filled
- Submit button: gold accent

**Implementation:**
- Modify: `src/components/ContactSection.tsx`
- Add: gradient bg, floating label styles

---

## 11. Footer - Minimal Dark

**Mục tiêu:** Minimal dark footer với social links.

**Visual:**
- Background: #0a0a0a
- Logo + tagline
- Social icons với hover glow
- Copyright text

**Implementation:**
- Modify: `src/components/Footer.tsx`

---

## 12. Smooth Scroll Integration

**Mục tiêu:** Native-like smooth scrolling với Lenis.

**Implementation:**
- Install: `npm install @studio-freight/lenis`
- Create: `src/lib/smooth-scroll.ts`
- Integrate in: `src/app/layout.tsx`

---

## 13. Main Page Integration

**Mục tiêu:** Integrate all components trong page.tsx.

**Implementation:**
- Modify: `src/app/page.tsx`
- Add: LoadingScreen, CustomCursor
- Update: section structure

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Add CustomCursor, SmoothScroll
│   └── page.tsx           # Add LoadingScreen, update sections
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx    # NEW
│   │   ├── Lightbox.tsx        # NEW
│   │   └── Button.tsx          # MODIFY (enhance)
│   ├── LoadingScreen.tsx       # NEW
│   ├── NavigationDots.tsx      # MODIFY (scroll-snap)
│   ├── HeroSection.tsx         # MODIFY (split-text, parallax)
│   ├── AboutSection.tsx        # MODIFY (scroll animations)
│   ├── ServicesSection.tsx     # MODIFY (3D hover)
│   ├── ProjectsSection.tsx     # MODIFY (zoom, lightbox)
│   ├── TestimonialsSection.tsx  # MODIFY (carousel)
│   ├── ContactSection.tsx      # MODIFY (gradient, float labels)
│   └── Footer.tsx              # MODIFY
├── lib/
│   ├── smooth-scroll.ts         # NEW
│   └── utils.ts                # MODIFY (add helpers)
```

---

## Color Palette (CSS Variables)

```css
--color-bg-dark: #0a0a0a;
--color-bg-dark-gray: #1a1a1a;
--color-bg-light: #fafafa;
--color-gold: #d4af37;
--color-neon: #00f0ff;
--color-text-light: #ffffff;
--color-text-dark: #2d2d2d;
--color-text-secondary: #6b6b6b;
```

---

## Animation Timing

| Animation | Duration | Easing |
|-----------|----------|--------|
| Split-text reveal | 0.8s per line | [0.25, 0.1, 0.25, 1] |
| Fade-in | 0.6s | ease-out |
| Hover scale | 0.4s | ease |
| Slide transition | 0.6s | ease |
| Progress bar | 2s | ease-out |

---

## Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@studio-freight/lenis": "^1.0.0"
  }
}
```

---

## Implementation Order

1. LoadingScreen + CustomCursor (foundation)
2. Smooth scroll setup
3. Hero section (split-text + parallax)
4. About section (scroll animations)
5. Services section (3D hover)
6. Projects section (zoom + lightbox)
7. Testimonials section (carousel)
8. Gallery section (drag-drop enhanced)
9. Contact section (gradient + float labels)
10. Footer
11. Main page integration + testing