# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**iRhuman.ai** is a marketing/portfolio website showcasing AI solutions for businesses. Forked from M2AI_Web2.0 as an independent brand variation. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Brand Identity

Logo text styling: **iRhuman.ai**
- `i` - white (#FFFFFF)
- `R` - azure blue (#0091EA)
- `human.` - white (#FFFFFF)
- `ai` - amber (#FFB300 - 55% yellow / 45% red-orange blend)

Brand colors defined in `tailwind.config.js` as `azure` and `amber`.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture

### Entry Points
- `index.html` → `index.tsx` → `App.tsx`
- CSS entry: `src/index.css` (Tailwind directives)

### File Structure (Root-Level Components)
Components and source files live at the project root (not in `src/`):
- `App.tsx` - Main app, composes all page sections
- `types.ts` - TypeScript interfaces for all data models
- `constants.ts` - All static data (carousel images, section configs, form options, voice agents)

### Component Patterns
- **Section components** (`components/sections/*.tsx`) - Each major page section is a standalone component
- **`Section` wrapper** (`components/Section.tsx`) - Provides consistent padding, max-width, and scroll-triggered fade-in animation using `useIntersectionObserver`
- **Carousel** - Hero section with rotating wheel of clickable images; each image links to a page section via `sectionId`

### Data Flow
All static content is centralized in `constants.ts`:
- `CAROUSEL_IMAGES` - Maps to sections via `sectionId` field
- `CONTENT_SECTIONS` - Section metadata (id, title, theme, animation type)
- `VOICE_AGENTS` - Vapi.ai demo links
- Form options for `AuditModal`

### Styling
- Tailwind CSS with custom theme in `tailwind.config.js`
- Custom colors: `navy`, `teal`, `orange` (with light/dark variants)
- Custom animations: `fade-in-up`, `fade-in-left`, `fade-in-right`, `scale-in`
- Path alias: `@` → project root

### Key Patterns
- Intersection Observer hook (`hooks/useIntersectionObserver.ts`) handles scroll animations
- Modal pattern via `AuditModal` component with form state management
- Icons from `lucide-react`
