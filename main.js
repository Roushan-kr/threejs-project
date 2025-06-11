// main.js — Enhanced Realism + Bloom + Skybox + Sun Rotation

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

let paused = false, darkMode = true;

// Scene & Skybox (6-face cube)
const scene = new THREE.Scene();
const loaderCube = new THREE.CubeTextureLoader().setPath('textures/space/');
scene.background = loaderCube.load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg']); // skybox 

// Camera & Renderer
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.set(40, 30, 40);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Post-processing (Bloom)
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,   // strength
  0.4,   // radius
  0.85   // threshold
);
composer.addPass(bloomPass); // glow effect 

// Styles via JS (no CSS)
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
['toggle-animation','toggle-theme','controls'].forEach(id => {
  const el = document.getElementById(id);
  el.style.position = 'absolute';
  el.style.zIndex = '1';
});
document.getElementById('toggle-animation').style.top = '10px';
document.getElementById('toggle-animation').style.right = '10px';
document.getElementById('toggle-theme').style.top = '40px';
document.getElementById('toggle-theme').style.right = '10px';
const ctrl = document.getElementById('controls');
ctrl.style.top = '10px';
ctrl.style.left = '10px';
ctrl.style.color = 'white';

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 300;

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 3, 1000);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Sun + Glow
const textureLoader = new THREE.TextureLoader();
const sunTex = textureLoader.load('textures/sun.jpg');
const sun = new THREE.Mesh(new THREE.SphereGeometry(4, 64, 64), new THREE.MeshBasicMaterial({ map: sunTex }));
scene.add(sun);

const glow = new THREE.Mesh(
  new THREE.SphereGeometry(5.5, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.5 })
);
scene.add(glow);

// Planets
const planets = [
  { name: 'Mercury', size: 0.3, distance: 6, speed: 0.04, texture: 'mercury.jpg' },
  { name: 'Venus', size: 0.5, distance: 9, speed: 0.032, texture: 'venus.jpg' },
  { name: 'Earth', size: 0.5, distance: 12, speed: 0.02, texture: 'earth.jpg' },
  { name: 'Mars', size: 0.4, distance: 15, speed: 0.017, texture: 'mars.jpg' },
  { name: 'Jupiter', size: 1.2, distance: 20, speed: 0.011, texture: 'jupiter.jpg' },
  { name: 'Saturn', size: 1.0, distance: 26, speed: 0.009, texture: 'saturn.jpg' },
  { name: 'Uranus', size: 0.7, distance: 32, speed: 0.007, texture: 'uranus.jpg' },
  { name: 'Neptune', size: 0.7, distance: 38, speed: 0.006, texture: 'neptune.jpg' }
];

const planetMeshes = [];
const angles = new Array(planets.length).fill(0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.createElement('div');
Object.assign(tooltip.style, {
  position: 'absolute', background: 'rgba(0,0,0,0.6)', color: 'white',
  padding: '2px 6px', borderRadius: '4px', display: 'none'
});
document.body.appendChild(tooltip);

// Create planets & controls
planets.forEach((p, i) => {
  const mat = new THREE.MeshStandardMaterial({ map: textureLoader.load(`textures/${p.texture}`) });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 64, 64), mat);
  mesh.name = p.name;
  scene.add(mesh);
  planetMeshes.push(mesh);

  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0.001; input.max = 0.1; input.step = 0.0005;
  input.value = p.speed;
  input.oninput = () => p.speed = parseFloat(input.value);

  ctrl.append(`${p.name} speed: `, input, document.createElement('br'));
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Sun rotation
  sun.rotation.y += 0.002;
  glow.rotation.y += 0.002;

  if (!paused) {
    planets.forEach((p, i) => {
      angles[i] += p.speed;
      const mesh = planetMeshes[i];
      mesh.position.set(
        p.distance * Math.cos(angles[i]),
        Math.sin(angles[i] * 0.3) * 0.3,
        p.distance * Math.sin(angles[i])
      );
      mesh.rotation.y += 0.01;
    });
  }

  // Tooltip on hover
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(planetMeshes);
  if (hits.length) {
    const hit = hits[0];
    tooltip.style.display = 'block';
    tooltip.textContent = hit.object.name;
    tooltip.style.left = `${(mouse.x*0.5+0.5)*window.innerWidth}px`;
    tooltip.style.top = `${(-mouse.y*0.5+0.5)*window.innerHeight}px`;
  } else tooltip.style.display = 'none';

  composer.render();
}

animate();

// UI event handlers
document.getElementById('toggle-animation').onclick = () => {
  paused = !paused;
  document.getElementById('toggle-animation').textContent = paused ? 'Resume' : 'Pause';
};

document.getElementById('toggle-theme').onclick = () => {
  darkMode = !darkMode;
  scene.background = darkMode
    ? loaderCube.load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'])
    : new THREE.Color(0xffffff);
  ctrl.style.color = darkMode ? 'white' : 'black';
  tooltip.style.color = darkMode ? 'white' : 'black';
  tooltip.style.background = darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)';
};

// Window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse tracking
window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});
