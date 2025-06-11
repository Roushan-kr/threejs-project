
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    let paused = false;
    let darkMode = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Sun with texture
    const sunTexture = new THREE.TextureLoader().load('textures/sun.jpg');
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(4, 64, 64),
      new THREE.MeshBasicMaterial({ map: sunTexture })
    );
    scene.add(sun);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = Array.from({length: 1000 * 3}, () => (Math.random() - 0.5) * 1000);
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Planets with texture
    const textureLoader = new THREE.TextureLoader();
    const planets = [
      { name: 'Mercury', size: 0.1, distance: 4, speed: 0.04, texture: 'textures/mercury.jpg' },
      { name: 'Venus', size: 0.2, distance: 6, speed: 0.03, texture: 'textures/venus.jpg' },
      { name: 'Earth', size: 0.21, distance: 8, speed: 0.02, texture: 'textures/earth.jpg' },
      { name: 'Mars', size: 0.15, distance: 10, speed: 0.018, texture: 'textures/mars.jpg' },
      { name: 'Jupiter', size: 0.6, distance: 14, speed: 0.012, texture: 'textures/jupiter.jpg' },
      { name: 'Saturn', size: 0.5, distance: 18, speed: 0.01, texture: 'textures/saturn.jpg' },
      { name: 'Uranus', size: 0.4, distance: 22, speed: 0.008, texture: 'textures/uranus.jpg' },
      { name: 'Neptune', size: 0.39, distance: 26, speed: 0.007, texture: 'textures/neptune.jpg' }
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
      const geometry = new THREE.SphereGeometry(planet.size, 48, 48);
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
          mesh.position.y = Math.sin(orbitAngles[i] * 0.5) * 0.3; // Slight y-axis tilt for 3D orbit
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
      scene.background = new THREE.Color(darkMode ? 0x000000 : 0xffffff);
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
  