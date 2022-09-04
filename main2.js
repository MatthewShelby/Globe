//#region Setup Scene

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
var ySpeed = 0.002;

// const camera = new THREE.PerspectiveCamera(75, innerWidth * 0.5 / innerHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, innerWidth * 1.4 / innerHeight, 0.1, 1000);
// camera.position.set(0, 10, 20);
camera.position.set(0, 10, 50);
camera.zoom = 3.2;
camera.updateProjectionMatrix();
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1b17);
// renderer.setSize(innerWidth * 0.5, innerHeight);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AmbientLight(0xffffff));



Array(1140).fill().forEach(addStar);

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
      const sf = 95;//
      gltfScene.scene.scale.set(sf, sf - 20, sf);

      //gltfScene.scene.rotation.y = Math.PI / 0.9;
      console.info(gltfScene.scene);
      gltfScene.scene.rotateX(0.21)
      sphere = gltfScene.scene;
      // g1.rotateY(120)
      scene.add(sphere);
      sphere.position.set(17, 2, 0);


});

var giongToPos1 = false;
function pos() {
      if (!giongToPos1) {
            giongToPos1 = true;


            var tt = 0;
            $('.sec-hide').fadeOut(1000);
            setTimeout(() => {
                  $('.details').fadeIn(1000);
                  giongToPos1 = false;

            }, 1000);

            var interval = setInterval(() => {
                  camera.rotateY(0.003);
                  tt++;
                  if (tt > 70) {
                        clearInterval(interval);
                        ySpeed = 0.00038
                        stopper = false
                  }
            }, 8);
      }
}

function pos2() {
      var tt = 0;

      var interval = setInterval(() => {
            camera.rotateY(-0.003);

            tt++;
            if (tt > 70) {
                  clearInterval(interval);
                  ySpeed = 0.002
                  stopper = false
            }
      }, 8);
}
// document.getElementById('set2').addEventListener('click', pos2)
//#endregion



//#region Animation
var stopper = false;
function animate() {
      requestAnimationFrame(animate);
      if (!mouseDown && !stopper) {
            sphere.rotateY(ySpeed);
            // sphere.rotateY(0.002);
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

document.getElementById('lenzo').addEventListener('click', openLenzo)
document.getElementById('opous').addEventListener('click', openOpous)
document.getElementById('de').addEventListener('click', openDeCuple)
document.getElementById('faxen').addEventListener('click', openFaxen)
document.getElementById('win').addEventListener('click', openWin)

var latestDetail;

function openLenzo() {
      latestDetail = 'lenzo';
      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'Lenzo DeFi';
      document.getElementById('des-prb').style.width = '80%';
      // document.getElementById('des-prb').style.width = '25%';
      document.getElementById('des-text').innerHTML = 'Lenzo is a DeFi platform where the token "LENZ" would be managed.';
      $("#des-card").toggle(900);
}

function openOpous() {
      latestDetail = 'opous';

      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'Opous GameFi';
      document.getElementById('des-prb').style.width = '20%';
      document.getElementById('des-text').innerHTML = 'Opous is a Decenteralized game platform. Its a multi genere exciting game.';
      $("#des-card").toggle(900);
}

function openDeCuple() {
      latestDetail = 'decuple';
      console.log('latestDetail :' + latestDetail)
      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'DeCuple NFTs';
      document.getElementById('des-prb').style.width = '65%';

      document.getElementById('des-text').innerHTML = 'DeCuple is an amazing NFT Marketplace where you can take buy, stake, and lots of other actions with NFTs';
      $("#des-card").toggle(900);
}

function openFaxen() {
      latestDetail = 'faxen';

      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'Faxen Exchange';
      document.getElementById('des-prb').style.width = '45%';

      document.getElementById('des-text').innerHTML = 'Faxen is a centeralized exchange serves you with best rates for most of cryptos.';
      $("#des-card").toggle(900);
}

function openWin() {
      latestDetail = 'win';

      var isOn = document.getElementById('des-card').style.display;
      if (isOn == 'block') {
            $("#des-card").toggle(200);
      }
      GoRandom();
      document.getElementById('des-title').innerHTML = 'Sports win store';
      document.getElementById('des-prb').style.width = '5%';

      document.getElementById('des-text').innerHTML = 'At the Sports store you can stake "LENZ" and get rewarded with sport euipments.';
      $("#des-card").toggle(900);
}

//#endregion


//#region DETAILS

document.getElementById('des-btn').addEventListener('click', openDetails)
function openDetails() {
      setDetails()
      pos()
}
var goingToPos0 = false;
document.getElementById('close-btn').addEventListener('click', closeDetails)
function closeDetails() {
      if (!goingToPos0) {
            goingToPos0 = true;

            pos2()
            $('#details').fadeOut(1000)
            setTimeout(() => {
                  $('.sec-hide').fadeIn(1000)
                  goingToPos0 = false;

            }, 1000);
      }

}

function closeDescription() {
      $('#des-card').fadeOut(300);
      stopper = false;
}
document.querySelector('canvas').addEventListener('click', closeDescription)


function setDetails() {
      console.log('setDetails been called. latestDetail is: ' + latestDetail)
      switch (latestDetail) {
            case 'lenzo':
                  document.getElementById('details-title').innerHTML = 'Lenzo - Finances and beyond'
                  document.getElementById('details-text').innerHTML = 'The LENZ is the managerial commodity and security token in the whole ecosystem of our projects. <br> When it comes to DeFi, you can have access to every financial tool and technic in Lenzo.'
                  document.getElementById('back-img').style.backgroundImage = "url(assets/images/Sites/Lenzo.png)";
                  document.getElementById('main-link').href = 'http://faxen.io'
                  break;


            case 'opous':
                  document.getElementById('details-title').innerHTML = 'Opous - The GameFi platform'
                  document.getElementById('details-text').innerHTML = 'Opous is a browser-based metaverse simulation game. players will gain access to functionalities and rewards by participating in challenges. the play reflects a great expression of the "play to own" concept.  '
                  document.getElementById('back-img').style.backgroundImage = "url(assets/images/Sites/Opous.png)";
                  document.getElementById('main-link').href = 'http://opous.network'
                  break;

            case 'decuple':
                  document.getElementById('details-title').innerHTML = 'DeCuple NFTs - The NFT marketplace'
                  document.getElementById('details-text').innerHTML = 'At the Decuple, you can buy, sell, mint, presell and airdrop NFTs. also you can order an NFT with your specific utilities. some of utilities are just great services on our other blockchain projects ofcource includes a big discount'
                  document.getElementById('back-img').style.backgroundImage = "url(assets/images/Sites/DeCuple.png)";
                  document.getElementById('main-link').href = 'http://decuple.network'
                  break;

            case 'faxen':
                  document.getElementById('details-title').innerHTML = 'Faxen Exchange - The Crypto market'
                  document.getElementById('details-text').innerHTML = 'Faxen is a regulated centralized exchange where every body can buy/sell crypto and place an offer. Traders can use all the future and option trade tools on the platform'
                  document.getElementById('back-img').style.backgroundImage = "url(assets/images/Sites/Faxen.png)";
                  document.getElementById('main-link').href = 'http://faxen.io'
                  break;


            case 'win':
                  document.getElementById('details-title').innerHTML = 'Sports Win'
                  document.getElementById('details-text').innerHTML = 'Participants, by staking token helping the project to grow.</p> <li>Sport wear</li> <li>Sport equipments</li> <li>Sport Events</li>  <p>We would be all together....</p>'
                  document.getElementById('back-img').style.backgroundImage = "url(assets/images/Sites/Win.png)";
                  document.getElementById('main-link').href = 'https://sports.yahoo.com/'
                  break;


            default:
                  break;
      }

}


$('#pic-frame').mouseover(function () {
      $('#center-link-add').show();
})

$('#pic-frame').mouseleave(function () {
      $('#center-link-add').hide();
})
//#endregion





