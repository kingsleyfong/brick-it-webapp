// context.md
// Brick It – Unified Context File for Cursor AI
// All architecture, user flow, component breakdown, and logic centralized in one file
// Last synced: March 28, compiled for Cursor by ChatGPT

# 🧱 Brick It – LEGO Mosaic & 3D Web App

## 📌 Overview

**Brick It** is a fully client-side, Netlify-hosted web app that transforms images and `.stl` files into LEGO-compatible instructions.

The user chooses between:
- 🎨 **Mosaic Mode**: Generate or upload an image → crop → pixelate → LEGO color match → download PNG + `.txt`
- 🧊 **3D Model Mode**: Upload `.stl` → voxelize + preview in 3D → download `.txt`

## ✅ Setup Instructions

```bash
npm create vite@latest brick-it-mosaic -- --template react
cd brick-it-mosaic
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom react-easy-crop three
```

`public/_redirects` for Netlify SPA routing:
```
/*    /index.html   200
```

## 🔁 App Workflow

```txt
┌────────────┐
│  Home Page │
└────┬───────┘
     │
     ├── Mosaic Mode
     │    ├─ AI Prompt or Upload Image
     │    ├─ If AI → ONNX Image Gen (in-browser)
     │    ├─ Crop image (square)
     │    ├─ Downscale to 16x16
     │    ├─ Match LEGO colors
     │    ├─ Render LEGO studs grid
     │    └─ Export PNG + .txt (<x> <y> <z> <color index>)
     │
     └── 3D Model Mode
          ├─ Upload STL
          ├─ Auto-voxelize
          ├─ Preview with Three.js
          └─ Export .txt (<x> <y> <z> <color index>)
```

## ⚙️ Tech Stack

| Layer            | Tool / Library                  |
|------------------|----------------------------------|
| Framework        | React (via Vite)                |
| Styles           | Tailwind CSS                    |
| Routing          | React Router                    |
| Image Cropping   | `react-easy-crop`               |
| AI Image Gen     | ONNX Runtime Web (hardcoded)    |
| Image Processing | Pyodide (WASM)                  |
| 3D Viewer        | Three.js                        |
| Hosting          | Netlify (Free Tier)             |

## 📂 Folder Structure

```txt
src/
├─ components/
│  └─ Header.jsx
├─ context/
│  └─ ImageContext.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ MosaicStart.jsx
│  ├─ CropImage.jsx
│  ├─ MosaicGenerator.jsx
│  ├─ PreviewPanel.jsx
│  └─ ThreeDHome.jsx
├─ utils/
│  ├─ cropImageToCanvas.js
│  └─ legoColorMap.js
```

## 📌 Routing

```txt
<App>
├─ <Header />
├─ <Routes>
│   ├─ "/" → <Home />
│   ├─ "/mosaic" → <MosaicStart />
│   ├─ "/crop" → <CropImage />
│   ├─ "/preview" → <PreviewPanel />
│   └─ "/3d" → <ThreeDHome />
```

## 🧠 AI Image Generation (Mosaic)

- Uses a hardcoded ONNX model (recommended: `cifar10` or `karlo`)
- Runs only when user enters a prompt
- Image generated at high-res → user crops → app downscales to 16×16
- If AI fails to load (e.g. mobile device), fallback to manual upload with warning

## ✂️ Crop Tool

- Uses `react-easy-crop`
- Screen split into **two rows**:
  - Top: Instructions + Confirm Crop button
  - Bottom: Cropping area only
- Enforces **square crop only**
- On confirm: image passed via global context

## 🎨 Color Setup Modal

- Always accessible from header (pinned masthead)
- Uses color wheel with RGB/HEX input
- Internally maps to LEGO color index
- Color-to-index logic handled in `legoColorMap.js`
- Configuration is saved to `localStorage`
- Automatically loaded if browser is refreshed

## 📷 Mosaic Preview

- Shows only **final LEGO-mapped mosaic**
- Overlaid with 16×16 **LEGO stud grid** to simulate real build plate
- No zoom or fullscreen (for now)
- Export:
  - `.txt` file in format: `<x> <y> <z> <color index>` (z = 1 always)
  - `.png` or `.jpeg` image of final LEGO mosaic
- User is **prompted to name `.txt` file**, defaulting to `HH-MM-DD-MM.txt`
- Line endings: UNIX (`
`) for ROBOTC compatibility

## 🧊 3D Model Mode

- User uploads `.stl` (single material only)
- App automatically voxelizes using Pyodide logic
- Preview loads into Three.js immediately
- Color mapping based on saved LEGO config
- Mouse controls:
  - Orbit, Zoom, Pan enabled
- Controls:
  - “Clear” and “Reload STL”
- Export format:
  - `.txt` → `<x> <y> <z> <color index>`

## 🔁 Persistence & Session Behavior

- Image, prompt, crop area, and color config saved in `localStorage`
- On refresh:
  - App tries to rehydrate session
  - If data missing → user sent back to `/mosaic`

## 🔒 Error Handling

- If no image is uploaded or AI fails:
  - “Continue” button is disabled
- If user refreshes crop/preview directly:
  - Redirect to `/mosaic`
- If ONNX model fails to load:
  - Show warning and fallback to image upload

## 🔧 Netlify Notes

- Hosted using **Netlify Free Tier**
- All processing is client-side
- Static build includes:
  - `vite.config.js` with correct `base: ""`
  - `_redirects` file for SPA fallback

## ✅ Development Phases

### Phase 1: Mosaic MVP
- [x] Mode selector + header UI
- [x] Image upload or AI prompt
- [x] AI fallback handler
- [x] Crop tool with 2-row layout
- [x] Downscale to 16x16
- [x] LEGO color matching
- [x] Export `.txt` + `.png`

### Phase 2: 3D Model Mode
- [x] Upload `.stl` file
- [x] Auto voxelization
- [x] Three.js viewer
- [x] Color setup modal reuse
- [x] Export `.txt`

### Phase 3: Enhancements
- [ ] Mobile layout support
- [ ] Layer-by-layer viewer (3D)
- [ ] Save/Load `.json` mosaic project
- [ ] AI model selector
- [ ] Help modal + credits

## 🧩 Cursor Developer Notes

- All image blobs passed as data URLs
- AI image generation is synchronous per prompt
- Color mapping uses closest RGB match
- Mosaic file export logic in `utils/`
- No backend — avoid fetch/post
- Avoid large dependencies to stay Netlify-compatible

## 📘 README Public Notes

**Brick It** is a browser-based tool that transforms images and 3D models into LEGO instructions.Exported files are compatible with LEGO robots (ROBOTC-ready).Built by Kingsley Fong at the University of Washington.MIT License.

---
