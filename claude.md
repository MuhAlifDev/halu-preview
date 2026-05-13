# Halu. Coffee — Scrollytelling Landing Page

## Brand
Name: Halu. (with period)  Founded: 2020, Leppangeng
Logo: /public/halu_logo.png — white outlined on transparent bg
Logo color rule (HaluLogo component uses CSS mask-image):
  - On dark/green bg -> backgroundColor: #F8F3EA (cream/white)
  - On light/cream bg -> backgroundColor: #1A4D2E (forest green)
  - Navbar uses pastHero state to switch dynamically

## Tech Stack
Astro 4.16.19 | React 18 | Motion 11.18.2 | Lenis 1.3.23 | Tailwind 3.x | No Google Fonts

## Color System (4 tokens)
forest  #1A4D2E  dominant, dark sections bg
cream   #F8F3EA  page bg, text on dark
coffee  #C4832A  accent — prices, labels, hover
latte   #EDE4D4  surface alt (Stats, Branches sections)
Canvas/preloader: #0c0a07 (CANVAS_BG const — inline, must match image sequence)

## Typography
Headings -> font-serif (Georgia)  |  Body/labels -> font-sans (system-ui)

## Page Sections
1. SequenceScroll  Canvas hero + preloader with 3x logo, "Since 2020 Leppangeng" in #c4832a
2. About           Character scrub, faster animation (bg-cream)
3. Bento           Cafe gallery with /halu-drinks.jpg (bg-cream)
4. Stats           3 green cards (2020/8 branches/99.8%), useInView amount:0 fix
5. Menu            3 categories all under 20K IDR, bg-text z:0 opacity:50%
6. Testimonials    Autoplay, 5-star SVG rating, text uses inline style (not Tailwind) for reliability
7. Branches        8 branches: Leppangeng/Makassar/Soppeng, hover dims to 68% opacity
8. SocialMedia     3 platforms, inline styles for text visibility on forest bg
9. CTASection      Forest bg, magnetic button
10. Footer         HaluLogo cream, all text uses inline rgba for guaranteed visibility

## Visibility Fix Pattern
Problem: initial={{ opacity: 0 }} + viewport detection failure = invisible content
Fix applied to Stats, Branches, SocialMedia, Menu:
  - Outer wrapper has NO opacity animation
  - Inner motion.div has animation but with isInView amount: 0 (fires on first pixel)
  - Testimonials/Footer/SocialMedia use inline style color values (not Tailwind classes)
    to bypass any Tailwind purge or class-name rendering issues

## Hero Logo
SequenceScroll.tsx HaluLogo:
  - Preloader: width clamp(240px, 35vw, 360px) / height clamp(80px, 12vw, 120px)
  - Hero overlay: width clamp(260px, 38vw, 440px) / height clamp(86px, 13vw, 148px)
  - "Since 2020 · Leppangeng" inline style color: #c4832a, fontSize clamp(0.9rem...)

## Branches
8 branches across:
  - Leppangeng (3): Leppangeng, Leppangeng Selatan, Leppangeng Utara
  - Makassar (3): Makassar, Pettarani, Panakkukang
  - Soppeng (2): Soppeng, Salotungo
Hover: dims content to opacity 0.68 only, no fill/color change, no text disappear

## Assets
/public/sequence/      240 frames
/public/halu_logo.png  Brand logo
/public/halu-drinks.jpg Halu product photo

## Dev
npm run dev -> http://localhost:4321
npm run build -> dist/
