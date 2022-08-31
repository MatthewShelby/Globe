
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
//import { findDirection } from './addStars';

const camera = new THREE.PerspectiveCamera(75, innerWidth * 0.5 / innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1b17);
//scene.background = new THREE.Color(0x0f091f);


// const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(innerWidth * 0.5, innerHeight);
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

// Array(1200).fill().forEach(addStar);
Array(40).fill().forEach(addStar);








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
spotLight.position.set(140, 1200, 300);

spotLight.castShadow = true;

console.log('decay: ' + spotLight.intensity)
setTimeout(() => {
  // spotLight.decay = 1.6
  spotLight.intensity = 11.6
  // g1.rotateX(0.21);
  g1.position.set(0.5, 1, 3);
  g1.rotation.y = -Math.PI;

  console.log('decay: ' + spotLight.intensity)
}, 1000);

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);


//#endregion

function Iran() {

  const path = findDirection(g1.quaternion._y, 0.8);
  console.log('path:  ' + path)
  console.log('g1.rotation._y:  ' + g1.rotation._y)



  // g1.quaternion.y = 0;
  // g1.quaternion.z = 0;
  // g1.quaternion.x = 0;
  spinAs(path)
  //g1.rotation.y = 0.8;
  stopper = true;

  document.getElementById('deg3').innerHTML = g1.rotation._y;
  document.getElementById('deg4').innerHTML = g1.quaternion._y;

}

function California() {


  // g1.rotation.y = -0.2;
  g1.quaternion.y = 0;
  g1.quaternion.z = 0;
  g1.quaternion.x = 0;
  // g1.rotation.y = -0.78;
  g1.rotation.y = 3.9;
  stopper = true;

  document.getElementById('deg3').innerHTML = g1.rotation._y;
  document.getElementById('deg4').innerHTML = g1.quaternion._y;

  /*
  if (g1.quaternion._y < 0) {
    g1.rotation.y = -0.78;
  } else {
    // g1.rotateY(0.3);

    g1.rotation.y = -0.78;
    document.getElementById('deg3').innerHTML = g1.rotation._y;
    document.getElementById('deg4').innerHTML = g1.quaternion._y;

  }*/

}


document.getElementById('goto1').addEventListener('click', GoTo);
document.getElementById('california').addEventListener('click', California);
document.getElementById('iran').addEventListener('click', Iran);
document.getElementById('Stop').addEventListener('click', function () {

  stopper = !stopper;
});

var min = 0;
var max = 0;
//#region Operation
var ind = 0;
var ros = new Array;

export function getArray() {
  return ros;
}
var stopper = false;
function animate() {
  requestAnimationFrame(animate);
  //console.log(Number(g1.rotation._y))
  if (!mouseDown && g1 && !stopper) {
    g1.rotateY(0.002);
    //g1.position.set(0, -1, 0);

    ros[ind] = [ind, g1.rotation._y]
    ind++;
    if (Number(g1.rotation._y) < min) {
      min = Number(g1.rotation._y);
      document.getElementById('min').innerHTML = g1.rotation._y;
    }
    if (Number(g1.rotation._y) > max) {
      max = Number(g1.rotation._y);
      document.getElementById('max').innerHTML = g1.rotation._y;

    }

    document.getElementById('cr1').innerHTML = g1.rotation._y;
    document.getElementById('cq1').innerHTML = g1.quaternion._y;

  }

  // console.info(g1.rotation);


  //g1.rotateY(0.002);
  //controls.update();
  renderer.render(scene, camera);
}

animate();

function GoTo() {
  stopper = true;
  console.info(ros)
  google.charts.setOnLoadCallback(drawChart);


}

google.charts.load('current', { packages: ['corechart'] });
//google.charts.setOnLoadCallback(drawChart);

function spinAs(path) {
  var ind = 0
  var inter = setInterval(() => {
    if (path > 0) {
      g1.rotation.y += path * 0.01;
    } else {
      g1.rotation.y -= path * 0.01;
    }
    ind++;
    if (ind == 100) {
      clearInterval(inter)
      console.log('g1.rotation._y:  ' + g1.rotation._y)

    }
  }, 10);

}

function findDirection(current, target) {
  var tetha = current;
  while (tetha > (Math.PI / 2)) {
    tetha -= ((Math.PI / 2));
  }
  console.log('current:  ' + current + 'tetha:  ' + tetha + '  target:  ' + target)
  const def = target - tetha;
  if (target > tetha) {
    if (def > (Math.PI / 2)) {
      return def
    } else {
      return -def
    }
    //return (Math.PI / 2) - def;
  } else {
    if (def > (Math.PI / 2)) {
      return def
    } else {
      return -def
    }
    //return -1 * ((Math.PI / 2) - def);
  }
}

var iranY = 0.8;
function Iran2() {
  if (g1.rotation.y > iranY) {
    var inta = setInterval(() => {
      if (g1.rotation.y > iranY) {
        g1.rotation.y -= 0.02;
      } else {
        clearInterval(inta)
      }
    }, 10);
  } else {
    var inta = setInterval(() => {
      if (g1.rotation.y < iranY) {
        g1.rotation.y += 0.02;
      } else {
        clearInterval(inta)
      }
    }, 10);
  }

}

document.getElementById('iran2').addEventListener('click', Iran2);

function drawChart() {
  var c = ros;

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Date');
  data.addColumn('number', 'Distance');

  data.addRows(c);

  var options = {
    hAxis: {
      title: 'Indexime'
    },
    vAxis: {
      title: 'Rotation'
    },
    backgroundColor: '#f1f8e9'
  };

  var chart = new google.visualization.LineChart(document.getElementById('yo'));
  chart.draw(data, options);
}

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