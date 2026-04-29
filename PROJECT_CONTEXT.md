Project Context — quick start

This file stores minimal context and startup steps so you (or a new chat) can get running quickly.

Prerequisites
- Node.js 18+ (includes `node --watch`) and npm

Frontend
1. From project root run:

```bash
npm install
npm run dev
```

This starts the Vite dev server at http://localhost:5173/.

Backend (optional)
1. Enter the backend folder and install:

```bash
cd backend
npm install
npm run dev
```

Note: `npm run dev` in `backend` normally starts `node --watch src/server.js`.

Common issues
- If fonts or styles look off: open `index.html` to check font imports and `src/index.css` for font-family and theme variables.
- The portfolio no longer fetches or references GitHub content.
- If layout changes do not appear, stop and restart the Vite dev server.

Current design notes
- Light monochrome retro-technical aesthetic.
- Serif headers + monospace UI.
- Hero uses a theme-aware hands background image, a terminal access form, split dossier layout, and a dense system footer.
- Footer social icons are local anchors and email only.

What I changed (local)
- Built a custom light-themed portfolio in `src/App.tsx`.
- Added scanlines, borders, and responsive grid rules in `src/index.css`.
- Added metadata and font imports in `index.html`.
- Removed the local README-based portfolio integration and deleted the GitHub profile helper.
- Restored the terminal-gated unlock flow with the command `ACCESS PORTFOLIO`.
- Replaced the fabricated hero/project copy with personal bio content and removed the Neural Net Sentinel card.
