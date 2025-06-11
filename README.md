
# 🌌 3D Solar System Simulation (Three.js)


---


## 🚀 Live Demo

```bash
npx serve .
````

Then open `http://localhost:3000` in your browser to explore the simulation.

---


* Planet textures sourced from NASA or SolarSystemScope.
* Skybox images should be part of a **cube-map** to maintain visual consistency.

---

## 🛠️ Setup & Run

1. Clone or download the project.

2. Install textures and structure the folders as above.

3. Run a local server:

   ```bash
   npx serve .
   ```

4. Access the demo at `http://localhost:3000` in a modern browser.

---

## 🎛️ Controls & Interaction

* **Mouse** drag/scroll for camera control
* **Pause** and **Dark/Light** buttons at the top-right
* **Sliders** adjust individual planet orbital speeds
* **Hover** to display planet names via tooltip

---

## 🧠 Technical Highlights

* Uses **ES Modules** with Three.js add-ons (`OrbitControls`, `EffectComposer`, `UnrealBloomPass`)

* Implements skybox via `CubeTextureLoader()` for seamless backgrounds ([discourse.threejs.org][1], [waelyasmina.net][2], [threejs.org][3], [threejs.org][4], [github.com][5], [discourse.threejs.org][6], [discourse.threejs.org][7])

* Applies **bloom effect** on the sun for dramatic lighting using `UnrealBloomPass`&#x20;

* Includes **sun rotation**, planet orbits, and tooltip functionality

* Fully styled in JavaScript — no CSS or HTML styling required

---

## 📚 Credits & References

* **Bloom effect demonstration** from Three.js examples ([github.com][8])
* **Skybox setup** using `CubeTextureLoader()` techniques ([threejs.org][4])

---

## 🎯 Future Enhancements

* **Saturn’s rings** via `RingGeometry`
* **Earth’s moon** orbiting dynamics
* **Orbit path visualization** using lines or trails
* **Day/night lighting effect** for Earth

Let me know if you'd like to walk through any of these features!

---

## 🧾 License
```
Released under the **MIT License** — you're free to use, modify, and share this project!
```


