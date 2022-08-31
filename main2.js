//#region Setup Scene

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';


const camera = new THREE.PerspectiveCamera(75, innerWidth * 0.5 / innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1b17);
renderer.setSize(innerWidth * 0.5, innerHeight);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AmbientLight(0xffffff));



Array(40).fill().forEach(addStar);

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
//#endregion

//#region setup LIGHTS
scene.add(new THREE.AmbientLight(0xffffff));

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(140, 1200, 300);
spotLight.intensity = 11.6

scene.add(spotLight);

//#endregion



//#region Objects


// The main sphere
const sphereGeometry = new THREE.SphereGeometry(10, 50, 50);
const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('./assets/images/E-removebg-preview.png')
      , transparent: true, opacity: 1
});
var sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(0, 8, 0)
//scene.add(sphere);


//the globe
const glftLoader = new GLTFLoader();
glftLoader.load('./assets/objects/globe1/Project Name.gltf', (gltfScene) => {
      // gltfScene.scene.position.set(0, -100, 10);
      const sf = 80;//
      gltfScene.scene.scale.set(sf, sf, sf);

      //gltfScene.scene.rotation.y = Math.PI / 0.9;
      console.info(gltfScene.scene);
      gltfScene.scene.rotateX(0.21)
      sphere = gltfScene.scene;
      // g1.rotateY(120)
      scene.add(sphere);

});

//#endregion



//#region Animation
var stopper = false;
function animate() {
      requestAnimationFrame(animate);
      if (!mouseDown && !stopper) {
            sphere.rotateY(0.002);
      }

      setPageInfo();
      renderer.render(scene, camera);
}
animate();
console.info(sphere);
//#endregion





//#region MOUSE CONTROLL


var canvas = renderer.domElement
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

canvas.addEventListener('mousemove', function (evt) {
      if (!mouseDown) { return }
      //console.log('drag')
      evt.preventDefault();
      var deltaX = evt.clientX - mouseX;
      var deltaY = evt.clientY - mouseY;
      mouseX = evt.clientX;
      mouseY = evt.clientY;
      //console.log('evt.clientY' + evt.clientX)

      // DO SOMETHING HERE WITH X and Y 
      // g1.rotation.y += deltaX / 100
      sphere.rotation.y += deltaX / 100
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

//#region LOcation CONTROLLER 
document.getElementById('Stop').addEventListener('click', StopperToggle);
document.getElementById('california').addEventListener('click', goToCalifornia);
document.getElementById('iran').addEventListener('click', goToIran);
document.getElementById('japan').addEventListener('click', goToJapan);
document.getElementById('spain').addEventListener('click', goToSpain);
document.getElementById('rand').addEventListener('click', GoRandom);


function StopperToggle() {
      stopper = !stopper;
}

function goToCalifornia() {
      goToAPlace(-2.08);
}

function goToIran() {
      goToAPlace(0.82);
}

function goToJapan() {
      goToAPlace(-0.6);
}

function goToSpain() {
      goToAPlace(1.85);
}
function goToAPlace(y) {
      console.log('go to place called. y: ' + y)

      stopper = true;
      if (sphere.rotation._y > Math.PI * 2) {
            sphere.rotation.y -= Math.PI * 2;
      }
      // setPageInfo();

      if (sphere.rotation.y > y) {
            if (sphere.rotation.y > Math.PI * 2) {
                  while (sphere.rotation.y > Math.PI * 2) {
                        sphere.rotation.y -= Math.PI * 2;
                  }
            }
            var deficit = sphere.rotation.y - y;
            var interval = setInterval(() => {
                  sphere.rotation.y -= deficit / 100;
                  if (sphere.rotation.y < y) {
                        clearInterval(interval);
                  }
            }, 10);
      }


      if (sphere.rotation.y < y) {
            if (sphere.rotation.y < -Math.PI * 2) {
                  while (sphere.rotation.y < -Math.PI * 2) {
                        sphere.rotation.y += Math.PI * 2;
                  }
            }
            var deficit = y - sphere.rotation.y;

            var interval = setInterval(() => {
                  sphere.rotation.y += deficit / 100;
                  if (sphere.rotation.y > y) {
                        clearInterval(interval);
                  }
            }, 10);
      }
}


var locs = [-2.08, 0.82, -0.6, 1.85, -3.05]
var previous = 7;
var tt;
export function GoRandom() {
      console.log('go random called.')
      var loc = getRandomLocation();
      console.log('loc: ' + loc)
      goToAPlace(loc);
      if (tt) {
            clearTimeout(tt);
      }
      tt = setTimeout(() => {
            stopper = false
      }, 18000);
}

function getRandomLocation() {
      console.log('getRandomLocation been called.')

      while (true) {
            var num = Math.floor(Math.random() * 5);
            if (num != previous) {
                  previous = num;
                  return locs[num];
            }
      }
}
//#endregion

//#region PageINFRO
function setPageInfo() {
      const Nim = Math.PI;

      document.getElementById('cr1').innerHTML = sphere.rotation._y;
      document.getElementById('cq1').innerHTML = sphere.quaternion._y;
      document.getElementById('df1').innerHTML = Nim - sphere.rotation._y;
      document.getElementById('df2').innerHTML = (Math.floor(sphere.rotation._y / Nim));
      document.getElementById('df3').innerHTML = sphere.rotation._y - (Nim * Math.floor(sphere.rotation._y / Nim));
      document.getElementById('df4').innerHTML = sphere.rotation._y + (Nim - sphere.rotation._y);

}


document.getElementById('go-btn').addEventListener('click', function () {
      sphere.rotation.y = Number(document.getElementById('input1').value);
})
//#endregion





//#region DESCRIPTIONS


// document.getElementById('lenzo').addEventListener('click', openLenzo)



// function openLenzo() {
//       GoRandom();

//       // document.getElementById('des-card').style.display = 'block';
//       // document.getElementById('des-title').innerHTML = 'Lenzo DeFi';
//       // document.getElementById('des-text').innerHTML = 'Lenzo is a DeFi platform where the token "LENZ" would be managed.';

// }

//#endregion




