// main.js (enhanced realism version)
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let paused = false;
let darkMode = true;

const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
  .setPath('textures/space/')
  .load([
    'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'
  ]);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(40, 30, 40);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Apply styles with JS (no CSS)
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

['toggle-animation', 'toggle-theme', 'controls'].forEach(id => {
  const el = document.getElementById(id);
  el.style.position = 'absolute';
  el.style.zIndex = '1';
});
document.getElementById('toggle-animation').style.top = '10px';
document.getElementById('toggle-animation').style.right = '10px';
document.getElementById('toggle-theme').style.top = '40px';
document.getElementById('toggle-theme').style.right = '10px';
document.getElementById('controls').style.top = '10px';
document.getElementById('controls').style.left = '10px';
document.getElementById('controls').style.color = 'white';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.maxDistance = 300;

const pointLight = new THREE.PointLight(0xffffff, 3, 1000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Realistic glowing sun
const sunTexture = new THREE.TextureLoader().load('textures/sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(new THREE.SphereGeometry(4, 64, 64), sunMaterial);
scene.add(sun);

const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.5 });
const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(5.5, 64, 64), glowMaterial);
sunGlow.position.copy(sun.position);
scene.add(sunGlow);

// Planet textures and data
const textureLoader = new THREE.TextureLoader();
const planets = [
  { name: 'Mercury', size: 0.3, distance: 6, speed: 0.04, texture: 'textures/mercury.jpg' },
  { name: 'Venus', size: 0.5, distance: 9, speed: 0.032, texture: 'textures/venus.jpg' },
  { name: 'Earth', size: 0.5, distance: 12, speed: 0.02, texture: 'textures/earth.jpg' },
  { name: 'Mars', size: 0.4, distance: 15, speed: 0.017, texture: 'textures/mars.jpg' },
  { name: 'Jupiter', size: 1.2, distance: 20, speed: 0.011, texture: 'textures/jupiter.jpg' },
  { name: 'Saturn', size: 1.0, distance: 26, speed: 0.009, texture: 'textures/saturn.jpg' },
  { name: 'Uranus', size: 0.7, distance: 32, speed: 0.007, texture: 'textures/uranus.jpg' },
  { name: 'Neptune', size: 0.7, distance: 38, speed: 0.006, texture: 'textures/neptune.jpg' }
];

const planetMeshes = [];
const orbitAngles = new Array(planets.length).fill(0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const tooltip = document.createElement('div');
Object.assign(tooltip.style, {
  position: 'absolute', color: 'white', background: 'rgba(0,0,0,0.6)',
  padding: '2px 6px', borderRadius: '4px', display: 'none'
});
document.body.appendChild(tooltip);

planets.forEach((planet, index) => {
  const texture = textureLoader.load(planet.texture);
  const geometry = new THREE.SphereGeometry(planet.size, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = planet.name;
  scene.add(mesh);
  planetMeshes.push(mesh);

  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0.001;
  input.max = 0.1;
  input.step = 0.001;
  input.value = planet.speed;
  input.oninput = () => planet.speed = parseFloat(input.value);
  const label = document.createElement('label');
  label.innerText = planet.name + ' speed';
  document.getElementById('controls').appendChild(label);
  document.getElementById('controls').appendChild(input);
  document.getElementById('controls').appendChild(document.createElement('br'));
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (!paused) {
    planets.forEach((planet, i) => {
      orbitAngles[i] += planet.speed;
      const mesh = planetMeshes[i];
      mesh.position.x = planet.distance * Math.cos(orbitAngles[i]);
      mesh.position.z = planet.distance * Math.sin(orbitAngles[i]);
      mesh.position.y = Math.sin(orbitAngles[i] * 0.3) * 0.3;
      mesh.rotation.y += 0.01;
    });
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planetMeshes);
  if (intersects.length > 0) {
    tooltip.style.display = 'block';
    tooltip.innerText = intersects[0].object.name;
    tooltip.style.left = mouse.x * window.innerWidth / 2 + window.innerWidth / 2 + 'px';
    tooltip.style.top = -mouse.y * window.innerHeight / 2 + window.innerHeight / 2 + 'px';
  } else {
    tooltip.style.display = 'none';
  }

  renderer.render(scene, camera);
}

animate();

document.getElementById('toggle-animation').onclick = () => {
  paused = !paused;
  document.getElementById('toggle-animation').innerText = paused ? 'Resume' : 'Pause';
};

document.getElementById('toggle-theme').onclick = () => {
  darkMode = !darkMode;
  scene.background = darkMode
    ? new THREE.CubeTextureLoader().setPath('textures/space/').load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'])
    : new THREE.Color(0xffffff);
  tooltip.style.color = darkMode ? 'white' : 'black';
  tooltip.style.background = darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)';
  document.getElementById('controls').style.color = darkMode ? 'white' : 'black';
};

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
