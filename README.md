# Chidera Ojimba — Cloud Engineer Portfolio

Personal portfolio website of a Cloud Engineer specialising in AWS, Azure, Kubernetes, Terraform, and CI/CD automation. Built with React, Vite, Tailwind CSS, and Framer Motion. Deployed on Vercel.

---

## Live Site

> Coming soon — deploy to Vercel and add your URL here.

---

## Tech Stack

| Layer      | Technology        |
| ---------- | ----------------- |
| Framework  | React 19 + Vite 7 |
| Styling    | Tailwind CSS 3    |
| Animations | Framer Motion     |
| Scroll     | react-scroll      |
| Linting    | ESLint 9          |
| Deployment | Vercel            |

---

## Features

**Design**

- Bright, modern look — light by default with a one-click **dark mode** (remembers your choice, no flash on load)
- Plus Jakarta Sans + JetBrains Mono typography, indigo → sky → cyan gradient accents
- Floating glass navbar with an animated active-section indicator
- Respects `prefers-reduced-motion`

**Sections**

- Hero with a typewriter that cycles through roles, a photo with floating tech chips, and a scrolling technology strip
- About with "what I do" cards and animated stat counters
- Intro video with a click-to-play facade (the YouTube player only loads when you press play)
- Skills with icons, a live **skill search**, and a Certifications tab
- Projects with **filter chips** (AWS, Terraform, Kubernetes, Docker, CI/CD) and animated re-layout
- Contact with copy-email button, inline success/error messages, and spam honeypot

**Extras**

- **Ctrl/Cmd + K quick menu** — jump to any section, toggle theme, open resume/GitHub/LinkedIn, copy email
- Scroll progress bar and back-to-top button
- Cursor-following spotlight on cards
- Fully responsive — mobile, tablet, and desktop

---

## Editing Content

All text, links, skills, certifications and projects live in `src/data/portfolioData.js`.

- **Projects:** add `categories` to control which filter chips a project appears under.
- **Certifications:** leave `credentialUrl` empty (`""`) if there is no public link — the card shows a neutral label instead of a dead link.
- **Hero roles:** edit `personalInfo.roles` for the typewriter.

Theme colours are CSS variables at the top of `src/index.css` (`:root` for light, `.dark` for dark).

---

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # lint
```
