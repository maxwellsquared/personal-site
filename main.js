import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


let s = 'moc.liamg@nhukxam'
let e = s.split("").reverse().join("");


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.setZ(35);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xBADA55 });
const torus = new THREE.Mesh(geometry, material);
torus.position.setX(2);
torus.position.setZ(50);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('./images/space-background.jpg');
scene.background = spaceTexture;

// avatar

const maxTexture = new THREE.TextureLoader().load('./images/maxkuhn.jpg');
const max = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: maxTexture })
);

scene.add(max);
max.position.set(4, 5, -5);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  max.rotation.x += 0.05;
  max.rotation.y += 0.075;
  max.rotation.z += 0.1;

  camera.position.z = t * -0.001;
  camera.position.y = t * 0.05;
  camera.position.x = t * -0.002;

}
document.body.onscroll = moveCamera;

function animate() {
  // game loop!
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.03;

  max.rotation.z += 0.003;

  controls.update();

  renderer.render(scene, camera);
}

document.getElementById('email').innerHTML = '<a href="mailto:' + e + '">✉️ ' + e + '</a>';
animate();