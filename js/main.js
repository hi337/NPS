import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const loader = new GLTFLoader();
const parent_element = document.getElementById("chesspiece");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  parent_element.getBoundingClientRect().width /
    parent_element.getBoundingClientRect().height,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
  parent_element.getBoundingClientRect().width,
  parent_element.getBoundingClientRect().height
);
parent_element.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);

let chesspiece;

// loading the chess piece
loader.load(
  "./models/king/scene.gltf",
  function (gltf) {
    gltf.scene.traverse((node) => {
      if (node.isMesh) {
        node.material = new THREE.MeshPhongMaterial({
          color: 0xf3d600,
        });
      }
    });
    gltf.scene.scale.set(10, 10, 10);
    chesspiece = gltf.scene;
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  (error) => {
    console.log("An error happened: " + error);
  }
);

//camera positioning
camera.position.set(110, 110, 110);
camera.lookAt(0, 0, 0);

//light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(110, 110, 110);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
