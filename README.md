# 🧱 Brick It – LEGO Mosaic & 3D Web App

A web application that transforms images and 3D models into LEGO-compatible instructions.

## Features

### 🎨 Mosaic Mode
- Upload an image or generate one with AI
- Crop the image to your preference
- Automatically converts to a 16x16 LEGO mosaic
- Export as PNG + machine-compatible .txt file

### 🧊 3D Model Mode
- Upload .stl files
- Auto-voxelize into LEGO bricks
- Interactive 3D preview with Three.js
- Export as machine-compatible .txt file

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/kingsleyfong/brick-it-webapp.git
cd brick-it-webapp
```

2. Install dependencies:
```bash
cd app
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Default Test Images

To add the default test images:

1. Add `pikachu.png` to `/app/public/` for Mosaic mode
2. Add `gengar.stl` to `/app/public/` for 3D mode

## Technology Stack

- React (via Vite)
- Tailwind CSS
- React Router
- Three.js for 3D visualization
- React Easy Crop for image cropping

## License

MIT License

## Credits

Built by Kingsley Fong at the University of Washington.

LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web app. 