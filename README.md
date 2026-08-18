# Pearl Dental Care

A modern, animated marketing website for **Pearl Dental Care**, a dental clinic in Kochi, Kerala. Built as a single-page React app with smooth scroll-triggered animations, an interactive before/after smile comparison, a scrolling "About Us" story section, and a simulated appointment booking flow.

## Features

- **Hero carousel** — auto-advancing slideshow of 5 treatments (checkups, Invisalign, implants, cleaning, laser gum care), each with its own image, headline, and quick-filter tag
- **Scroll-driven "About Us" story** — a sticky, scroll-linked section that steps through 4 technology chapters (digital scanning, clear aligners, veneers, implants) as the visitor scrolls
- **Services grid** — bento-style layout of 5 core treatments, each opening a detail popup with benefits and FAQs
- **Interactive before/after slider** — drag-to-compare smile transformation demo
- **Specialist doctor profiles** — with bios, credentials, and a "Book Consultation" flow
- **Patient testimonials** — carousel with an "Add Review" form
- **FAQ accordion**
- **Appointment booking modal** — collects service, doctor, date/time, and contact details
- **Privacy Policy & Terms of Service** — real, separate routed pages
- **Smooth, scroll-triggered fade/stagger animations** throughout, with hover-lift effects on cards and a subtle parallax on the hero and CTA backgrounds; respects `prefers-reduced-motion`

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** — build tool / dev server
- **Tailwind CSS v4** — styling
- **motion** (Framer Motion) — animations, scroll-linked parallax, and reveal effects
- **react-router-dom** — client-side routing (home, privacy policy, terms of service)
- **Express** — minimal dev/prod server; also exposes an optional `/api/generate-image` endpoint (Gemini image generation) that isn't currently wired into the UI






