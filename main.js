
//#region Setup Scene
// import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'






// import * as THREE from 'three/src/Three';
// import { OrbitControls } from 'three/src/controls/OrbitControls';

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
//import { SpotLight } from 'three';
// import { addStar } from './addStars';

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x0f091f);
//scene.background = new THREE.Color(0x0f091f);


// const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

//#endregion


//#region Objects

//#region lateral




scene.add(new THREE.AmbientLight(0xffffff));


function addStar() {
  const geometry = new THREE.SphereGeometry(0.075, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xc0bccc });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1200).fill().forEach(addStar);








//#endregion





// The main sphere
const sphereGeometry = new THREE.SphereGeometry(10, 50, 50);
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./assets/images/E-removebg-preview.png')
  , transparent: true, opacity: 1
});
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(0, 0, 0)
//scene.add(sphere);

var g1;
// The sephere object
const glftLoader = new GLTFLoader();
glftLoader.load('./assets/objects/globe1/Project Name.gltf', (gltfScene) => {
  // gltfScene.scene.position.set(0, -100, 10);
  const sf = 80;//
  gltfScene.scene.scale.set(sf, sf, sf);

  //gltfScene.scene.rotation.y = Math.PI / 0.9;
  console.info(gltfScene.scene);

  g1 = gltfScene.scene;
  // g1.rotateY(120)
  scene.add(g1);

});

//#region The look control

var mouseDown = false,
  mouseX = 0,
  mouseY = 0;


var canvas = renderer.domElement

canvas.addEventListener('mousemove', function (evt) {
  if (!mouseDown) { return }
  //console.log('drag')
  evt.preventDefault();
  var deltaX = evt.clientX - mouseX,
    deltaY = evt.clientY - mouseY;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
  //console.log('evt.clientY' + evt.clientX)

  // DO SOMETHING HERE WITH X and Y 
  g1.rotation.y += deltaX / 100
  //g1.rotation.x += deltaY / 100

}, false);

canvas.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  mouseDown = true;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}, false);

canvas.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  mouseDown = false;
}, false);


//#endregion


const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);

spotLight.castShadow = true;

console.log('decay: ' + spotLight.intensity)
setTimeout(() => {
  // spotLight.decay = 1.6
  spotLight.intensity = 11.6
  g1.rotateX(0.21);
  g1.position.set(0, -1, -3);

  console.log('decay: ' + spotLight.intensity)
}, 1000);

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);


//#endregion








//#region Operation

function animate() {
  requestAnimationFrame(animate);
  if (!mouseDown && g1) {
    g1.rotateY(0.002);
    //g1.position.set(0, -1, 0);

  }
  //g1.rotateY(0.002);
  //controls.update();
  renderer.render(scene, camera);
}

animate();


/*
function addStar() {
  const geometry = new THREE.SphereGeometry(1.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloat(10));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(50).fill().forEach(addStar);
*/

//#endregion