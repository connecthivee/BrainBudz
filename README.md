# BrainBudz — Premium 3D Landing

A high-end WebGL landing page for **BrainBudz**, a children’s educational brand. The scene is a floating island classroom in the sky built from oversized learning tools: wooden alphabets, tactile books, puzzle boards, and counting coins.

## Features

- **3D floating island** — Custom shader with subtle motion and cursor-reactive “magnetic” displacement
- **Learning objects** — Wooden letters (A, B), stacked books, puzzle pieces, and coins with soft float animation and cursor pull
- **Magnetic ripple** — Cursor movement drives a soft ripple layer in front of the scene
- **Ambient particles** — Subtle floating particles for depth
- **Glassmorphism UI** — Minimal overlay with clean typography and soft glass panels
- **Scroll transitions** — Hero scene moves and scales as you scroll into product cards
- **Cinematic lighting** — Directional sun, hemisphere, and point lights with shadows
- **Fog & depth** — Distance fog for a sky/island feel

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Stack

- **Vite** + **React 18**
- **Three.js** via **@react-three/fiber** and **@react-three/drei**
- Custom GLSL for island elevation and magnetic ripple
