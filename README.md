# 🌌 3D Solar System Simulation

A stunning interactive 3D solar system built with Three.js featuring realistic planet orbits, textures, and dynamic lighting effects.

![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=flat&logo=webgl&logoColor=white)

---

## ✨ Features

- 🪐 **Realistic planet models** with authentic NASA textures
- 🌟 **Dynamic bloom effects** on the sun for dramatic lighting
- 🎮 **Interactive camera controls** with mouse drag and zoom
- ⚡ **Adjustable orbital speeds** via intuitive sliders
- 🌌 **Immersive skybox** with seamless cube-map backgrounds
- 💫 **Smooth animations** and planet rotations
- 🏷️ **Interactive tooltips** showing planet information
- 🌓 **Toggle dark/light modes** for different viewing experiences
- ⏸️ **Pause/resume functionality** for detailed observation

---

## 🚀 Quick Start

### Prerequisites

- Modern web browser with WebGL support
- Node.js (for serving the project)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd temp
   ```

2. **Install a local server** (if not already available)

   ```bash
   npm install -g serve
   ```

3. **Start the development server**

   ```bash
   npx serve .
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
temp/
├── index.html              # Main HTML file
├── js/
│   ├── main.js            # Core application logic
│   ├── planets.js         # Planet configurations
│   └── controls.js        # UI controls and interactions
├── textures/
│   ├── planets/           # Planet texture maps
│   │   ├── earth.jpg
│   │   ├── mars.jpg
│   │   └── ...
│   └── skybox/           # Cube-map textures
│       ├── px.jpg, nx.jpg
│       ├── py.jpg, ny.jpg
│       └── pz.jpg, nz.jpg
└── README.md
```

---

## 🎛️ Controls & Interaction

| Control           | Action                                  |
| ----------------- | --------------------------------------- |
| **Mouse Drag**    | Rotate camera around the solar system   |
| **Mouse Wheel**   | Zoom in/out                             |
| **Pause Button**  | Pause/resume all animations             |
| **Theme Toggle**  | Switch between dark and light modes     |
| **Speed Sliders** | Adjust individual planet orbital speeds |
| **Hover Planets** | Display planet information tooltips     |

---

## 🛠️ Technical Implementation

### Core Technologies

- **Three.js** - 3D graphics library
- **WebGL** - Hardware-accelerated 3D rendering
- **ES6 Modules** - Modern JavaScript module system

### Key Features Implementation

#### Skybox Setup

```javascript
// Seamless 360° background using cube mapping
const loader = new THREE.CubeTextureLoader();
const skybox = loader.load([
  'px.jpg',
  'nx.jpg',
  'py.jpg',
  'ny.jpg',
  'pz.jpg',
  'nz.jpg',
]);
scene.background = skybox;
```

#### Bloom Effects

```javascript
// Dynamic lighting effects using post-processing
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
```

#### Interactive Controls

```javascript
// Camera controls with smooth interactions
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
```

---

## 🎨 Assets & Resources

### Textures

- **Planet textures**: High-resolution images from NASA's planetary database
- **Skybox images**: Professional space photography for immersive backgrounds
- **Normal maps**: Enhanced surface details for realistic planet rendering

### Recommended Texture Sources

- [NASA's Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [Solar System Scope Textures](https://www.solarsystemscope.com/textures/)
- [Three.js Examples](https://threejs.org/examples/)

---

## 🔧 Troubleshooting

### Common Issues

**Problem**: Textures not loading

```
Solution: Ensure all texture files are in the correct directories and served via HTTP/HTTPS
```

**Problem**: Controls not responding

```
Solution: Check browser console for JavaScript errors and ensure WebGL is enabled
```

**Problem**: Poor performance

```
Solution: Reduce texture resolution or disable bloom effects for lower-end devices
```

### Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

---

## 🚀 Performance Optimization

- **Texture compression** for faster loading
- **Level-of-detail (LOD)** for distant planets
- **Frustum culling** for off-screen objects
- **Efficient animation loops** with `requestAnimationFrame`

---

## 🔮 Future Enhancements

- [ ] Add asteroid belt simulation
- [ ] Implement planet moons and their orbits
- [ ] Add spacecraft trajectory visualization
- [ ] Include planet rotation based on real astronomical data
- [ ] Mobile touch controls support
- [ ] VR/AR compatibility

---

## 📚 References & Credits

- **Three.js Documentation**: [threejs.org](https://threejs.org/)
- **WebGL Fundamentals**: [webglfundamentals.org](https://webglfundamentals.org/)
- **NASA Planetary Data**: [nasa.gov](https://www.nasa.gov/)
- **Bloom Effect Examples**: Three.js official examples
- **Skybox Implementation**: Three.js CubeTextureLoader documentation

---

## 📄 License

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**Built with ❤️ using Three.js**

[⭐ Star this project](.) | [🐛 Report Bug](.) | [💡 Request Feature](.)

</div>
