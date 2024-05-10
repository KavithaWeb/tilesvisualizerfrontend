import * as THREE from '/three/build/three.module.js';
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
// import 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.min.js';
import { ClearPass } from 'https://threejs.org/examples/jsm/postprocessing/ClearPass.js';
// import { Pass } from './Pass';
import { BloomPass } from 'https://threejs.org/examples/jsm/postprocessing/BloomPass.js';
import { EffectComposer } from 'https://threejs.org/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejs.org/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://threejs.org/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from "https://threejs.org/examples/jsm/shaders/FXAAShader.js";
import { CopyShader } from "https://threejs.org/examples/jsm/shaders/CopyShader.js";
import { LuminosityHighPassShader } from "https://threejs.org/examples/jsm/shaders/LuminosityHighPassShader.js";
import { ShaderPass } from 'https://threejs.org/examples/jsm/postprocessing/ShaderPass.js';
import { Reflector } from './three/examples/jsm/objects/Reflector.js'
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://threejs.org/examples/jsm/loaders/DRACOLoader.js";
import { BackSide, DoubleSide } from 'three';
import { request } from '../services/api.service.js';
import { bathroom, bathroom1, bathroom2 } from '../Mainjavascript/constants.js';
import { Texture } from 'three';

const canvas = document.querySelector('.bathroom1');

const scene = new THREE.Scene();

const scene1 = new THREE.Scene();

const fov = 40;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 4000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 800);
camera.lookAt(0, 0, 0)


scene.add(camera);


const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);

renderer.setClearColor(0x101000, 0);
renderer.shadowMap.enabled = true;
renderer.autoClear = false;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.LinearToneMapping
// renderer.toneMappingExposure = 0.7;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.shadowMap.needsUpdate = true;
// THREE.ColorManagement.legacyMode = true

let controls = new OrbitControls(camera, renderer.domElement);


controls.minDistance = 0;
controls.maxDistance = 800;
controls.enableDamping = true;
controls.dampingFactor = 0.2;

// setTimeout(rotate, 8000);

// function rotate() {
//   controls.autoRotate = true;
//   controls.autoRotateSpeed = 0.8;
// }



/// Variables for smooth zooming
let isZooming = false;
let targetDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
const zoomSpeed = 0.5; // Adjust the speed of zooming

// Function to handle smooth zooming
function smoothZoom(zoomAmount) {
  if (isZooming) return; // Prevent multiple zoom actions at once

  isZooming = true;

  // Calculate the target distance after applying the zoom
  targetDistance += zoomAmount;

  // Restrict the target distance within the minDistance and maxDistance
  targetDistance = THREE.MathUtils.clamp(targetDistance, controls.minDistance, controls.maxDistance);
}


// Example usage: Add event listeners to zoom in and out buttons
const zoomInButton = document.getElementById('zoom-in-button');
zoomInButton.addEventListener('click', () => {
  smoothZoom(-80); // Adjust the zoom level as per your requirements
});

const zoomOutButton = document.getElementById('zoom-out-button');
zoomOutButton.addEventListener('click', () => {
  smoothZoom(80); // Adjust the zoom level as per your requirements
});


document.addEventListener('DOMContentLoaded', function () {
  var fullscreenBtn = document.getElementById('fullscreen-btn');


  // Go fullscreen when the button is clicked
  fullscreenBtn.addEventListener('click', function () {
    var element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  });
});



// const lightsData = [
//   { position: new THREE.Vector3(0, 0, -250), target: new THREE.Vector3(0, 0, 0), intensity: 1 },
//   { position: new THREE.Vector3(0, 0, 250), target: new THREE.Vector3(0, 0, 0), intensity: 1 },
//   { position: new THREE.Vector3(200, 0, 0), target: new THREE.Vector3(0, 0, 0), intensity: 1 },
//   { position: new THREE.Vector3(-200, 0, 0), target: new THREE.Vector3(0, 0, 0), intensity: 1 },
//   { position: new THREE.Vector3(0, 200, 0), target: new THREE.Vector3(0, 0, 0), intensity: 1.1 },
//   { position: new THREE.Vector3(0, -200, 0), target: new THREE.Vector3(0, 0, 0), intensity: 1.5 },
// ];

// for (const lightData of lightsData) {
//   const light = new THREE.DirectionalLight(0xffffff, lightData.intensity);
//   light.position.copy(lightData.position);
//   light.target.position.copy(lightData.target);
//   light.castShadow = true;

//   scene.add(light.target);
//   scene.add(light);
//   light.target.updateMatrixWorld();
// }

// const light30 = new THREE.DirectionalLight(0xffffff, 1);
// light30.position.set(0, 0, -250);
// light30.target.position.set(0, 0, 0);
// light30.castShadow = true

// scene.add(light30.target);
// scene.add(light30);
// // const spotLightHelper30 = new THREE.SpotLightHelper( light30 );
// // scene1.add( spotLightHelper30 );
// light30.target.updateMatrixWorld();


// const spotLightHelper31 = new THREE.DirectionalLight(0xffffff, 1);
// spotLightHelper31.position.set(0, 0, 250);
// spotLightHelper31.target.position.set(0, 0, 0);
// spotLightHelper31.castShadow = true

// scene.add(spotLightHelper31.target);
// scene.add(spotLightHelper31);
// // const spotLightHelper31spotLightHelper31 = new THREE.DirectionalLightHelper( spotLightHelper31 );
// // scene1.add( spotLightHelper31spotLightHelper31 );
// spotLightHelper31.target.updateMatrixWorld();

// const spotLightHelper32 = new THREE.DirectionalLight(0xffffff, 1);
// spotLightHelper32.position.set(200, 0, 0);
// spotLightHelper32.target.position.set(0, 0, 0);
// spotLightHelper32.castShadow = true

// scene.add(spotLightHelper32.target);
// scene.add(spotLightHelper32);
// // const spotLightHelper32spotLightHelper32 = new THREE.DirectionalLightHelper( spotLightHelper32 );
// // scene1.add( spotLightHelper32spotLightHelper32 );
// spotLightHelper32.target.updateMatrixWorld();


// const spotLightHelper33 = new THREE.DirectionalLight(0xffffff, 1);
// spotLightHelper33.position.set(-200, 0, 0);
// spotLightHelper33.target.position.set(0, 0, 0);
// spotLightHelper33.castShadow = true

// scene.add(spotLightHelper33.target);
// scene.add(spotLightHelper33);
// // const spotLightHelper33spotLightHelper33 = new THREE.DirectionalLightHelper( spotLightHelper33 );
// // scene1.add( spotLightHelper33spotLightHelper33 );
// spotLightHelper33.target.updateMatrixWorld();


// const spotLightHelper34 = new THREE.DirectionalLight(0xffffff, 1.1);
// spotLightHelper34.position.set(0, 200, 0);
// spotLightHelper34.target.position.set(0, 0, 0);
// spotLightHelper34.castShadow = true

// scene.add(spotLightHelper34.target);
// scene.add(spotLightHelper34);
// // const spotLightHelper34spotLightHelper34 = new THREE.DirectionalLightHelper( spotLightHelper34 );
// // scene1.add( spotLightHelper34spotLightHelper34 );
// spotLightHelper34.target.updateMatrixWorld();


// const spotLightHelper35 = new THREE.DirectionalLight(0xffffff, 1.5);
// spotLightHelper35.position.set(0, -200, 0);
// spotLightHelper35.target.position.set(0, 0, 0);
// spotLightHelper35.castShadow = true

// scene.add(spotLightHelper35.target);
// scene.add(spotLightHelper35);
// // const spotLightHelper35spotLightHelper35 = new THREE.DirectionalLightHelper( spotLightHelper35 );
// // scene1.add( spotLightHelper35spotLightHelper35 );
// spotLightHelper35.target.updateMatrixWorld();



// TOP

const light = new THREE.SpotLight(0xffffff, 0.4);
light.position.set(-80, 420, 0);
//  light.target.position.set(-800, 150, 0)

camera.add(light)
scene.add(light);


// const spotLightHelper1 = new THREE.SpotLightHelper( light );
// scene.add( spotLightHelper1 );

// BOTTOM

const light1 = new THREE.SpotLight(0xffffff, 0.3);
light1.position.set(40, -550, 50);

scene.add(light1);
// const spotLightHelper2 = new THREE.SpotLightHelper( light1 );
// scene.add( spotLightHelper2 );

// RIGHT

const light2 = new THREE.SpotLight(0xffffff, 0.5);
light2.position.set(550, 0, 0);
light2.target.position.set(-900, -45, 0);



scene.add(light2.target);
scene.add(light2);
// const spotLightHelper2 = new THREE.SpotLightHelper( light2 );
// scene.add( spotLightHelper2 );
light2.target.updateMatrixWorld();

// LEFT

const light3 = new THREE.SpotLight(0xffffff, 0.3);
light3.position.set(-470, 120, -150);
light3.target.position.set(800, -80, 0);
light3.castShadow = true


scene.add(light3.target);
scene.add(light3);
// const spotLightHelper3 = new THREE.SpotLightHelper( light3 );
// scene.add( spotLightHelper3 );
light3.target.updateMatrixWorld();

// BACK

const light4 = new THREE.SpotLight(0xffffff, 0.3);
light4.position.set(-30, -20, 800);
light4.target.position.set(-100, 110, -350);


scene.add(light4.target);
scene.add(light4);
// const spotLightHelper4 = new THREE.SpotLightHelper( light4 );
// scene.add( spotLightHelper4 );
light4.target.updateMatrixWorld();


// FLUSH

var lightshower = new THREE.SpotLight(0xFFB6C1, 0.2);
lightshower.position.set(20, -50, 0);
lightshower.target.position.set(500, -120, 170);
lightshower.castShadow = true;
// const helper2 = new THREE.SpotLightHelper( lightshower, 15 );
// scene.add( helper2 );
scene.add(lightshower);
lightshower.target.updateMatrixWorld();

// HANGER

var light6 = new THREE.SpotLight(0xffffff, 2);
light6.position.set(210, 0, -180);
light6.target.position.set(500, 50, -390);
// const helper2 = new THREE.SpotLightHelper( light6, 10 );
// scene.add( helper2 );
scene.add(light6);
light6.target.updateMatrixWorld();


// HANGER

var light15 = new THREE.SpotLight(0xffffff, 2);
light15.position.set(200, 20, -165);
light15.target.position.set(500, 110, -400);
// const helper15 = new THREE.SpotLightHelper( light15, 10 );
// scene.add( helper15 );

scene.add(light15);
light15.target.updateMatrixWorld();

// HAND SHOWER

var light7 = new THREE.SpotLight(0xffffff, 0.3);
light7.position.set(110, -150, 220);
light7.target.position.set(500, 600, 450);

// const helper3 = new THREE.SpotLightHelper( light7, 10 );
// scene.add( helper3 );


light7.shadow.camera.far = 3000
light7.shadow.camera.fov = 60
scene.add(light7);
light7.target.updateMatrixWorld();

// SHOWER

var light20 = new THREE.SpotLight(0xffffff, 4);
light20.position.set(190, 130, 110);
light20.target.position.set(500, 600, 350);

// const helper20 = new THREE.SpotLightHelper( light20, 10 );
// scene.add( helper20 );
light20.castShadow = true;

scene.add(light20);
light20.target.updateMatrixWorld();

// TAP

var light8 = new THREE.SpotLight(0xC0C0C0, 0.1);
light8.position.set(0, -90, -290);
light8.target.position.set(0, 110, -390);

// const helper4 = new THREE.SpotLightHelper( light8, 10 );
// scene.add( helper4 );
scene.add(light8);
light8.target.updateMatrixWorld();


// DOOR

var light9 = new THREE.SpotLight(0xffffff, 0.5);
light9.position.set(0, 0, 100);
light9.target.position.set(-400, 0, 260);
// const helper9 = new THREE.SpotLightHelper( light9, 10 );
// scene.add( helper9 );
scene.add(light9);
light9.target.updateMatrixWorld();





let right = bathroom.right;
let left = bathroom.left;
let top = bathroom.top;
let bottom = bathroom.bottom;
let back = bathroom.back;
let front = bathroom.front;


let right1 = bathroom1.right1;
let left1 = bathroom1.left1;
let top1 = bathroom1.top1;
let bottom1 = bathroom1.bottom1;
let back1 = bathroom1.back1;
let front1 = bathroom1.front1;


let right2 = bathroom2.right2;
let left2 = bathroom2.left2;
let top2 = bathroom2.top2;
let bottom2 = bathroom2.bottom2;
let back2 = bathroom2.back2;
let front2 = bathroom2.front2;

let loader = new THREE.TextureLoader();

let imageload = [];

let page = 0;
const size = 18;
let data = [];
let filteredData = [];
let loadedIds = [];

async function fetchMoreData(start) {
  const url = `/users?page=${page}&size=${size}`;
  const response = await request(url, {
    credentials: 'same-origin',
    method: 'GET',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/json', },
  });
  newData.sort((a, b) => new Date(b.uploadTimestamp) - new Date(a.uploadTimestamp));
  data = [...data, ...newData];
  console.log(data);
  renderData(start);
  page++;
}



function renderData(start) {

  const container = document.getElementById("tiles");

  filteredData = data.filter((item) => item.tiles === "tilesimages");

  let html = "";

  // const attachedData = { id:"8", tiles: "tilesimages" };
  // const newData = attachedData;

  const attachedData1 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03576_b.jpg", id: "9", tiles: "tilesimages" };
  const newData1 = attachedData1;

  const attachedData2 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03575_b.jpg", id: "10", tiles: "tilesimages" };
  const newData2 = attachedData2;

  const attachedData3 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03686_b.jpg", id: "11", tiles: "tilesimages" };
  const newData3 = attachedData3;

  const attachedData4 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03627_b.jpg", id: "12", tiles: "tilesimages" };
  const newData4 = attachedData4;

  // filteredData[0] = newData;

  filteredData[1] = newData1;

  filteredData[2] = newData2;

  filteredData[3] = newData3;

  filteredData[4] = newData4;

  for (let i = start; i < filteredData.length && i < start + size; i++) {
    const item = filteredData[i];
    html += `<input class="stop" type="checkbox" name="imageIds" value="${item.fileUrl}"><button  onclick="tileselect()" class="img1" name="${i}"><img class="img2" src="${item.fileUrl}" width="190" height="110"><h6>APPLY DESIGN</h6></button>`;
    console.log(filteredData);
  }

  container.innerHTML += html;

  var images1 = document.getElementsByClassName("img2");

  imageload = [];

  images1 = [];

  images1 = document.getElementsByClassName("img2");

  for (const img1 of images1) {

    imageload.push(loader.load(`${img1.src}?not-from-cache-please`));

  }

  console.log(imageload);
  TilesChanger();
  TilesChanger1();
  TilesChanger2();
  ffff();

}

var butts = document.getElementById("vvv");

butts.addEventListener('click', onClickeds);

function onClickeds() {
  const start = page * size;
  fetchMoreData(start);
}
fetchMoreData(1);



var defaultTexture2 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/img6.jpg'}?not-from-cache-please`);




defaultTexture2.wrapS = THREE.RepeatWrapping;
defaultTexture2.wrapT = THREE.RepeatWrapping;
defaultTexture2.repeat.set(1, 1);


const defaultMaterial2 = new THREE.MeshBasicMaterial({ map: defaultTexture2, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });



// Set texture wrap and gap properties for default materials
const defaultWrapS = THREE.RepeatWrapping;
const defaultWrapT = THREE.RepeatWrapping;
const defaultGap = 0.003;
const defaultGapColor = new THREE.Color('lightgrey');



defaultMaterial2.map.wrapS = defaultWrapS;
defaultMaterial2.map.wrapT = defaultWrapT;
defaultMaterial2.map.repeat.set(1, 1);


let gapValue = 0.003; 
 // Default gap value
let skyBox;
let repeatX = 4; // Default X repeat value
let repeatY = 3; // Default Y repeat value
let applyChessLayout = false; 

function TilesChanger(obj = {}) {

  let materialside = [];

  defaultMaterial2.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial2.onBeforeCompile);

  materialside.push(defaultMaterial2);


  imageload.forEach((texture, ii) => {
    if (texture.id != 18) {
      console.log(texture);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
    }

    
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, color: new THREE.Color(0.9, 0.9, 0.9) });
    console.log(material);
    const gapColor = new THREE.Color('lightgrey');
    material.onBeforeCompile = setMaterialShaderProperties(gapValue, gapColor, material.onBeforeCompile);

    materialside.push(material);
    console.log(materialside);
  });

  function setMaterialShaderProperties(gapValue, gapColor, _onBeforeCompile) {
    return shader => {
      shader.uniforms.gap = { value: gapValue };
      shader.uniforms.gapColor = { value: gapColor };
      shader.uniforms.applyChessLayout = { value: applyChessLayout };
 
      shader.fragmentShader = `
        uniform float gap;
        uniform vec3 gapColor;
        uniform bool applyChessLayout;
        
        ` + shader.fragmentShader;
  
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        vec4 texelColor = texture2D(map, vUv);
        vec2 cUv = abs(fract(vUv) - 0.5);
        float gapLimit = 0.5 - gap;
        vec2 fe = fwidth(vUv);
        float e = length(fe) * 0.5;
        float s = smoothstep(gapLimit - e, gapLimit + e, max(cUv.x, cUv.y));
  
        texelColor = mix(texelColor, vec4(gapColor, 1.0), s);
  
        if (applyChessLayout) {
          // Chessboard pattern
          vec2 chessboard = floor(vUv * 2.0);
          float isBlack = mod(chessboard.x + chessboard.y, 2.0);
          vec3 blackColor = vec3(0.0, 0.0, 0.0);
          vec3 whiteColor = vec3(1.0, 1.0, 1.0);
          vec3 boardColor = mix(blackColor, whiteColor, isBlack);
  
          diffuseColor *= texelColor * vec4(boardColor, 1.0);
        } else {
          diffuseColor *= texelColor;
        }
        `
      );
  
      return shader;
    };
  }


  const cubeGeometry = new THREE.BoxGeometry(495, 220, 700);

  right = obj?.right || right
  left = obj?.left || left
  top = obj?.top || top
  bottom = obj?.bottom || bottom
  back = obj?.back || back
  front = obj?.front || front


  const groups = [
    { start: 0, count: 6, materialIndex: right },
    { start: 6, count: 6, materialIndex: right },
    // { start: 12, count: 6, materialIndex: top },
    { start: 18, count: 6, materialIndex: bottom },
    { start: 24, count: 6, materialIndex: right },
    { start: 30, count: 6, materialIndex: right }
  ];

  cubeGeometry.groups = groups;

  if (!skyBox) {
    skyBox = new THREE.Mesh(cubeGeometry, materialside);
    console.log(materialside);
    skyBox.position.set(0, -188, 0);
    scene.add(skyBox);
  }

  else {
    skyBox.geometry = cubeGeometry;

    skyBox.material = materialside;

  }



  function updateRepeatValues() {
    if (skyBox) {
      skyBox.material.forEach(material => {
        const texture = material.map;
        console.log(texture);
        if (texture.id == 4) {
          texture.repeat.set(1, 1);
        } else {
          texture.repeat.set(repeatX, repeatY);
          texture.needsUpdate = true; // Notify Three.js that the texture has been updated
        }
      });
  
      renderer.render(scene, camera);
    }
  }
  
  
  
  const gapInput = document.getElementById('gapInput');
  
  gapInput.addEventListener('input', () => {
  const newGapValue = parseFloat(gapInput.value);
  if (!isNaN(newGapValue)) {
    changeGapValue(newGapValue);
    TilesChanger();
  } else {
    console.log('Invalid gap value entered');
  }
  });
  
  
  
  // Function to change the gap value
  function changeGapValue(newGapValue) {
  gapValue = newGapValue; // Update the gapValue variable
  // Update the uniforms in the shader with the new gap value
  materialside.forEach(material => {
    if (material.uniforms && material.uniforms.gap) {
      material.uniforms.gap.value = gapValue;
    }
  });
  // renderer.render(scene, camera);
  }
  
  
  document.getElementById('changeLayoutButton').addEventListener('click', () => {
   
    
  });
  
  document.getElementById('changeLayoutsButton').addEventListener('click', () => {
    applyChessLayout = !applyChessLayout; // Toggle the chess layout flag
    // updateMaterialShaderProperties();
    TilesChanger();
    
  });
  
  
  
  document.getElementById('repeatWidth').addEventListener('input', event => {
    repeatX = parseInt(event.target.value);
    updateRepeatValues();
  });
  
  document.getElementById('repeatHeight').addEventListener('input', event => {
    repeatY = parseInt(event.target.value);
    updateRepeatValues();
  });
  
  
  // Add event listeners to the rotation buttons
  const rotate45Button = document.getElementById('rotate45Button');
  const rotate90Button = document.getElementById('rotate90Button');
  const rotate135Button = document.getElementById('rotate135Button');
  const rotate180Button = document.getElementById('rotate180Button');
  

  rotate45Button.addEventListener('click', () => {
    console.log("fgdgd");
    rotateTextures(45); // Rotate by 45 degrees
    // TilesChanger(); // Update the skybox
  });
  

  rotate90Button.addEventListener('click', () => {
    rotateTextures(90); // Rotate by 90 degrees
    // TilesChanger(); // Update the skybox
  });
  

  rotate135Button.addEventListener('click', () => {
    rotateTextures(135); // Rotate by 135 degrees
    // TilesChanger(); // Update the skybox
  });
  
  
  rotate180Button.addEventListener('click', () => {
    rotateTextures(180); // Rotate by 135 degrees
    // TilesChanger(); // Update the skybox
  });
  
  function rotateTextures(angleInDegrees) {
   
    const angleInRadians = (angleInDegrees * Math.PI) / 180; // Convert degrees to radians
    materialside.forEach(material => {
      if (material.map) {
        material.map.rotation = angleInRadians; // Rotate the texture by the specified angle
        material.map.needsUpdate = true; // Notify Three.js that the texture has been updated
      }
    });
  }
  
}



var defaultTexture22 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/img6.jpg'}?not-from-cache-please`);





defaultTexture22.wrapS = THREE.RepeatWrapping;
defaultTexture22.wrapT = THREE.RepeatWrapping;
defaultTexture22.repeat.set(1, 1);




const defaultMaterial22 = new THREE.MeshBasicMaterial({ map: defaultTexture22, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });





defaultMaterial22.map.wrapS = defaultWrapS;
defaultMaterial22.map.wrapT = defaultWrapT;
defaultMaterial22.map.repeat.set(1, 1);



let gapValue1 = 0.003; 
 // Default gap value
let skyBox1;
let repeatX1 = 4; // Default X repeat value
let repeatY1 = 3; // Default Y repeat value
let applyChessLayout1 = false; 
function TilesChanger1(obj = {}) {

  let materialside = [];

  defaultMaterial22.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial22.onBeforeCompile);

  materialside.push(defaultMaterial22);

  imageload.forEach((texture, ii) => {
    if (texture.id != 18) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX1, repeatY1);
    }

    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, color: new THREE.Color(0.7, 0.7, 0.7)});

    const gapColor = new THREE.Color('lightgrey');
    material.onBeforeCompile = setMaterialShaderProperties(gapValue1, gapColor, material.onBeforeCompile);

    materialside.push(material);
    console.log(materialside);
  });

  function setMaterialShaderProperties(gapValue1, gapColor, _onBeforeCompile) {
    return shader => {
      shader.uniforms.gap = { value: gapValue1 };
      shader.uniforms.gapColor = { value: gapColor };
      shader.uniforms.applyChessLayout = { value: applyChessLayout1 };
 
      shader.fragmentShader = `
        uniform float gap;
        uniform vec3 gapColor;
        uniform bool applyChessLayout;
        
        ` + shader.fragmentShader;
  
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        vec4 texelColor = texture2D(map, vUv);
        vec2 cUv = abs(fract(vUv) - 0.5);
        float gapLimit = 0.5 - gap;
        vec2 fe = fwidth(vUv);
        float e = length(fe) * 0.5;
        float s = smoothstep(gapLimit - e, gapLimit + e, max(cUv.x, cUv.y));
  
        texelColor = mix(texelColor, vec4(gapColor, 1.0), s);
  
        if (applyChessLayout) {
          // Chessboard pattern
          vec2 chessboard = floor(vUv * 2.0);
          float isBlack = mod(chessboard.x + chessboard.y, 2.0);
          vec3 blackColor = vec3(0.0, 0.0, 0.0);
          vec3 whiteColor = vec3(1.0, 1.0, 1.0);
          vec3 boardColor = mix(blackColor, whiteColor, isBlack);
  
          diffuseColor *= texelColor * vec4(boardColor, 1.0);
        } else {
          diffuseColor *= texelColor;
        }
        `
      );
  
      return shader;
    };
  }


  const cubeGeometry1 = new THREE.BoxGeometry(495, 190, 700);


  right1 = obj?.right1 || right1
  left1 = obj?.left1 || left1
  top1 = obj?.top1 || top1
  bottom1 = obj?.bottom1 || bottom1
  back1 = obj?.back1 || back1
  front1 = obj?.front1 || front1


  const groups = [
    { start: 0, count: 6, materialIndex: right1 },
    { start: 6, count: 6, materialIndex: right1 },
    // { start: 12, count: 6, materialIndex: top },
    // { start: 18, count: 6, materialIndex: bottom },
    { start: 24, count: 6, materialIndex: right1 },
    { start: 30, count: 6, materialIndex: right1 }
  ];

  cubeGeometry1.groups = groups;

  if (!skyBox1) {
    skyBox1 = new THREE.Mesh(cubeGeometry1, materialside);
    skyBox1.position.set(0, 17, 0);
    skyBox1.castShadow = true;
    skyBox1.receiveShadow = true;
    scene.add(skyBox1);
  }

  else {
    skyBox1.geometry = cubeGeometry1;

    skyBox1.material = materialside;

  }


  



  function updateRepeatValues() {
    if (skyBox) {
      skyBox.material.forEach(material => {
        const texture = material.map;
        console.log(texture);
        if (texture.id == 4) {
          texture.repeat.set(1, 1);
        } else {
          texture.repeat.set(repeatX1, repeatY1);
          texture.needsUpdate = true; // Notify Three.js that the texture has been updated
        }
      });
  
      renderer.render(scene, camera);
    }
  }
  
  
  
  const gapInput = document.getElementById('gapInput');
  
  gapInput.addEventListener('input', () => {
  const newGapValue = parseFloat(gapInput.value);
  if (!isNaN(newGapValue)) {
    changeGapValue(newGapValue);
    TilesChanger();
  } else {
    console.log('Invalid gap value entered');
  }
  });
  
  
  
  // Function to change the gap value
  function changeGapValue(newGapValue) {
  gapValue = newGapValue; // Update the gapValue variable
  // Update the uniforms in the shader with the new gap value
  materialside.forEach(material => {
    if (material.uniforms && material.uniforms.gap) {
      material.uniforms.gap.value = gapValue;
    }
  });
  // renderer.render(scene, camera);
  }
  
  
  document.getElementById('changeLayoutButton').addEventListener('click', () => {
   
    
  });
  
  document.getElementById('changeLayoutsButton').addEventListener('click', () => {
    applyChessLayout = !applyChessLayout; // Toggle the chess layout flag
    // updateMaterialShaderProperties();
    TilesChanger();
    
  });
  
  
  
  document.getElementById('repeatWidth').addEventListener('input', event => {
    repeatX = parseInt(event.target.value);
    updateRepeatValues();
  });
  
  document.getElementById('repeatHeight').addEventListener('input', event => {
    repeatY = parseInt(event.target.value);
    updateRepeatValues();
  });
  
  
  // Add event listeners to the rotation buttons
  const rotate45Button = document.getElementById('rotate45Button');
  const rotate90Button = document.getElementById('rotate90Button');
  const rotate135Button = document.getElementById('rotate135Button');
  const rotate180Button = document.getElementById('rotate180Button');
  

  rotate45Button.addEventListener('click', () => {
    console.log("fgdgd");
    rotateTextures(45); // Rotate by 45 degrees
    // TilesChanger(); // Update the skybox
  });
  

  rotate90Button.addEventListener('click', () => {
    rotateTextures(90); // Rotate by 90 degrees
    // TilesChanger(); // Update the skybox
  });
  

  rotate135Button.addEventListener('click', () => {
    rotateTextures(135); // Rotate by 135 degrees
    // TilesChanger(); // Update the skybox
  });
  
  
  rotate180Button.addEventListener('click', () => {
    rotateTextures(180); // Rotate by 135 degrees
    // TilesChanger(); // Update the skybox
  });
  
  function rotateTextures(angleInDegrees) {
 
    const angleInRadians = (angleInDegrees * Math.PI) / 180; // Convert degrees to radians
    skyBox.material.forEach(material => {
      const texture = material.map;
      if (texture.id == 4) {
        texture.repeat.set(1, 1);
      } else {
       texture.rotation = angleInRadians; // Rotate the texture by the specified angle
       texture.needsUpdate = true; // Notify Three.js that the texture has been updated
      }
  
    });
  }
  

}



// var defaultTexture1 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03576_b.jpg'}?not-from-cache-please`);
var defaultTexture222 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/img6.jpg'}?not-from-cache-please`);
// var defaultTexture3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03575_b.jpg'}?not-from-cache-please`);

// Set texture wrap properties for default textures
// defaultTexture1.wrapS = THREE.RepeatWrapping;
// defaultTexture1.wrapT = THREE.RepeatWrapping;
// defaultTexture1.repeat.set(5, 5);

defaultTexture222.wrapS = THREE.RepeatWrapping;
defaultTexture222.wrapT = THREE.RepeatWrapping;
defaultTexture222.repeat.set(1, 1);

// defaultTexture3.wrapS = THREE.RepeatWrapping;
// defaultTexture3.wrapT = THREE.RepeatWrapping;
// defaultTexture3.repeat.set(3, 5);

// Create default materials using the default textures
// const defaultMaterial1 = new THREE.MeshBasicMaterial({ map: defaultTexture1, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
const defaultMaterial222 = new THREE.MeshBasicMaterial({ map: defaultTexture222, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
// const defaultMaterial3 = new THREE.MeshBasicMaterial({ map: defaultTexture3, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });




// defaultMaterial1.map.wrapS = defaultWrapS;
// defaultMaterial1.map.wrapT = defaultWrapT;
// defaultMaterial1.map.repeat.set(5, 5);

defaultMaterial222.map.wrapS = defaultWrapS;
defaultMaterial222.map.wrapT = defaultWrapT;
defaultMaterial222.map.repeat.set(1, 1);

// defaultMaterial3.map.wrapS = defaultWrapS;
// defaultMaterial3.map.wrapT = defaultWrapT;
// defaultMaterial3.map.repeat.set(3, 5);


let gapValue2 = 0.003; 
 // Default gap value
let skyBox2;
let repeatX2 = 4; // Default X repeat value
let repeatY2 = 3; // Default Y repeat value
let applyChessLayout2 = false; 

function TilesChanger2(obj = {}) {
  let materialside = [];


  // defaultMaterial1.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial1.onBeforeCompile);


  defaultMaterial222.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial222.onBeforeCompile);


  // defaultMaterial3.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial3.onBeforeCompile);

  // Add the default materials to the materialside array
  // materialside.push(defaultMaterial1);
  materialside.push(defaultMaterial222);
  // materialside.push(defaultMaterial3);

  imageload.forEach((texture, ii) => {
    if (texture.id != 18) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX2, repeatY2);
    }
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide,  color: new THREE.Color(0.9, 0.9, 0.9) });

    const gapColor = new THREE.Color('lightgrey');
    material.onBeforeCompile = setMaterialShaderProperties(gapValue2, gapColor, material.onBeforeCompile);

    materialside.push(material);
    console.log(materialside);
  });

  function setMaterialShaderProperties(gapValue2, gapColor, _onBeforeCompile) {
    return shader => {
      shader.uniforms.gap = { value: gapValue2 };
      shader.uniforms.gapColor = { value: gapColor };
      shader.uniforms.applyChessLayout = { value: applyChessLayout2 };
 
      shader.fragmentShader = `
        uniform float gap;
        uniform vec3 gapColor;
        uniform bool applyChessLayout;
        
        ` + shader.fragmentShader;
  
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        vec4 texelColor = texture2D(map, vUv);
        vec2 cUv = abs(fract(vUv) - 0.5);
        float gapLimit = 0.5 - gap;
        vec2 fe = fwidth(vUv);
        float e = length(fe) * 0.5;
        float s = smoothstep(gapLimit - e, gapLimit + e, max(cUv.x, cUv.y));
  
        texelColor = mix(texelColor, vec4(gapColor, 1.0), s);
  
        if (applyChessLayout) {
          // Chessboard pattern
          vec2 chessboard = floor(vUv * 2.0);
          float isBlack = mod(chessboard.x + chessboard.y, 2.0);
          vec3 blackColor = vec3(0.0, 0.0, 0.0);
          vec3 whiteColor = vec3(1.0, 1.0, 1.0);
          vec3 boardColor = mix(blackColor, whiteColor, isBlack);
  
          diffuseColor *= texelColor * vec4(boardColor, 1.0);
        } else {
          diffuseColor *= texelColor;
        }
        `
      );
  
      return shader;
    };
  }


  const cubeGeometry2 = new THREE.BoxGeometry(495, 190, 700);


  right2 = obj?.right2 || right2
  left2 = obj?.left2 || left2
  top2 = obj?.top2 || top2
  bottom2 = obj?.bottom2 || bottom2
  back2 = obj?.back2 || back2
  front2 = obj?.front2 || front2



  const groups = [
    { start: 0, count: 6, materialIndex: right2 },
    { start: 6, count: 6, materialIndex: right2 },
    { start: 12, count: 6, materialIndex: top2 },
    // { start: 18, count: 6, materialIndex: bottom },
    { start: 24, count: 6, materialIndex: right2 },
    { start: 30, count: 6, materialIndex: right2 }
  ];

  cubeGeometry2.groups = groups;

  if (!skyBox2) {
    skyBox2 = new THREE.Mesh(cubeGeometry2, materialside);
    skyBox2.position.set(0, 207, 0);
    skyBox2.castShadow = true;
    skyBox2.receiveShadow = true;
    scene.add(skyBox2);
  }

  else {
    skyBox2.geometry = cubeGeometry2;

    skyBox2.material = materialside;

  }

 


  function updateRepeatValues() {
    if (skyBox) {
      skyBox.material.forEach(material => {
        const texture = material.map;
        console.log(texture);
        if (texture.id == 4) {
          texture.repeat.set(1, 1);
        } else {
          texture.repeat.set(repeatX2, repeatY2);
          texture.needsUpdate = true; // Notify Three.js that the texture has been updated
        }
      });
  
      renderer.render(scene, camera);
    }
  }
  
  
  
  const gapInput = document.getElementById('gapInput');
  
  gapInput.addEventListener('input', () => {
  const newGapValue = parseFloat(gapInput.value);
  if (!isNaN(newGapValue)) {
    changeGapValue(newGapValue);
    TilesChanger();
  } else {
    console.log('Invalid gap value entered');
  }
  });
  
  
  
  // Function to change the gap value
  function changeGapValue(newGapValue) {
  gapValue = newGapValue; // Update the gapValue variable
  // Update the uniforms in the shader with the new gap value
  materialside.forEach(material => {
    if (material.uniforms && material.uniforms.gap) {
      material.uniforms.gap.value = gapValue;
    }
  });
  // renderer.render(scene, camera);
  }
  
  
  document.getElementById('changeLayoutButton').addEventListener('click', () => {
   
    
  });
  
  document.getElementById('changeLayoutsButton').addEventListener('click', () => {
    applyChessLayout = !applyChessLayout; // Toggle the chess layout flag
    // updateMaterialShaderProperties();
    TilesChanger();
    
  });
  
  
  
  document.getElementById('repeatWidth').addEventListener('input', event => {
    repeatX = parseInt(event.target.value);
    updateRepeatValues();
  });
  
  document.getElementById('repeatHeight').addEventListener('input', event => {
    repeatY = parseInt(event.target.value);
    updateRepeatValues();
  });
  
  
  // Add event listeners to the rotation buttons
  const rotate45Button = document.getElementById('rotate45Button');
  const rotate90Button = document.getElementById('rotate90Button');
  const rotate135Button = document.getElementById('rotate135Button');
  const rotate180Button = document.getElementById('rotate180Button');
  

  rotate45Button.addEventListener('click', () => {
    console.log("fgdgd");
    rotateTextures(45); // Rotate by 45 degrees
    // TilesChanger(); // Update the skybox
  });
  

  rotate90Button.addEventListener('click', () => {
    rotateTextures(90); // Rotate by 90 degrees
    // TilesChanger(); // Update the skybox
  });
  

  rotate135Button.addEventListener('click', () => {
    rotateTextures(135); // Rotate by 135 degrees
    // TilesChanger(); // Update the skybox
  });
  
  
  rotate180Button.addEventListener('click', () => {
    rotateTextures(180); // Rotate by 135 degrees
    // TilesChanger(); // Update the skybox
  });
  
  function rotateTextures(angleInDegrees) {
   
    const angleInRadians = (angleInDegrees * Math.PI) / 180; // Convert degrees to radians
    materialside.forEach(material => {
      if (material.map) {
        material.map.rotation = angleInRadians; // Rotate the texture by the specified angle
        material.map.needsUpdate = true; // Notify Three.js that the texture has been updated
      }
    });
  }
  

}



function TilesChanger3(obj = {}) {
  var imageload2 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Blur-PNG-Picture.png'}?not-from-cache-please`)
  var imageload3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-04-24 203442.png'}?not-from-cache-please`)
  const material1 = new THREE.MeshBasicMaterial({ map: imageload2, side: BackSide, transparent: true, opacity: 0.7 });
  const material2 = new THREE.MeshBasicMaterial({ map: imageload3, side: BackSide, transparent: true, opacity: 0.08 });

  let materialarray = [material1, material2];

  const cubeGeometry3 = new THREE.BoxGeometry(494, 599, 699);

  const groups = [
    { start: 0, count: 6, materialIndex: 0 },
    { start: 0, count: 6, materialIndex: 1 },
    { start: 6, count: 6, materialIndex: 0 },
    { start: 6, count: 6, materialIndex: 1 },
    // { start: 12, count: 6, materialIndex: 0 },
    // { start: 18, count: 6, materialIndex: 0 },
    { start: 24, count: 6, materialIndex: 0 },
    { start: 24, count: 6, materialIndex: 1 },
    { start: 30, count: 6, materialIndex: 0 },
    { start: 30, count: 6, materialIndex: 1 }
  ];

  cubeGeometry3.groups = groups;
  // const edges = new THREE.EdgesGeometry(cubeGeometry3);
  // const line = new THREE.LineSegments(edges, new THREE.LineDashedMaterial({
  //   color: new THREE.Color().setHSL(0, 0, 0.45),
  //   dashSize: 0.1,
  //   gapSize: 0.05
  // }));
  // line.position.set(0, 2, 0);
  // scene.add(line);


  const skyBox3 = new THREE.Mesh(cubeGeometry3, materialarray);
  console.log(material1);
  skyBox3.position.set(0, 2, 0);
  skyBox3.castShadow = true;
  skyBox3.receiveShadow = true;

  scene.add(skyBox3);

}


TilesChanger3();

const reflectorGeometry = new THREE.CircleGeometry(80, 50, 50);
const reflector = new Reflector(reflectorGeometry, {
  clipBias: 0.001,
  textureWidth: 1024 * window.devicePixelRatio,
  textureHeight: 1024 * window.devicePixelRatio,
  color: 0x777777
});

reflector.position.set(-7, 100, -339);
scene.add(reflector);


let circleGeo = new THREE.CircleGeometry(85, 60);
let circleMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: DoubleSide })
let circle = new THREE.Mesh(circleGeo, circleMat);
circle.position.set(-7, 100, -342);
circle.scale.setX(1);
scene.add(circle);


// let circleGeo1 = new THREE.CircleGeometry(120, 60);
// let circleMat1 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/glow1.png'), side: DoubleSide, transparent: true })
// let circle1 = new THREE.Mesh(circleGeo1, circleMat1);
// circle1.position.set(-7, 100, -349);
// circle1.scale.setX(1);
// scene.add(circle1);



const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/js/libs/draco/')

var gltfloader = new GLTFLoader();
gltfloader.setDRACOLoader(dracoLoader)


gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/88.glb', function (gltf2) {

  const model2 = gltf2.scene;

  model2.rotation.y = Math.PI / 1;
  model2.scale.set(100, 100, 100);
  model2.position.set(230, -25, -250);

  scene.add(model2);
  model2.traverse(function (child) {
    if (child.isMesh) {

      child.material.color = new THREE.Color(0xFFFFFF);

      child.material.metalness = 0.9;
      child.material.roughness = 0;

      child.material.needsUpdate = true;
    }
  });
});



gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/basin.glb', function (gltf3) {

  const model3 = gltf3.scene;

  model3.rotation.y = Math.PI / 1;
  model3.scale.set(600, 600, 600);
  model3.position.set(0, -131, -280);


  scene.add(model3);
  model3.traverse(function (child) {
    if (child.isMesh) {


      child.material.needsUpdate = true;
    }
  });
});


gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/versailles_wc_with_seat.glb', function (gltf10) {

  const model10 = gltf10.scene;

  model10.rotation.y = Math.PI / -2;
  model10.scale.set(200, 200, 200);
  model10.position.set(140, -300, 20);

  scene.add(model10);
  model10.traverse(function (child) {
    if (child.isMesh) {

      child.material.metalness = 0.2;
      child.material.roughness = 0.1;

      child.material.needsUpdate = true;
    }
  });
});



gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/tapnew.glb', function (gltf4) {

  const model4 = gltf4.scene;

  model4.rotation.y = Math.PI / 1;
  model4.scale.set(200, 200, 200);
  model4.position.set(55, 30, 200);

  scene.add(model4);
  model4.traverse(function (child) {
    if (child.isMesh) {


      child.material.color = new THREE.Color(0xFFFFFF);
      child.material.metalness = 0.8;
      child.material.roughness = 0.2;
      child.material.needsUpdate = true;

    }
  });
});



gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/tap.glb', function (gltf1) {

  const model1 = gltf1.scene;

  model1.rotation.y = Math.PI / 1;
  model1.scale.set(200, 200, 200);
  model1.position.set(-8, -124, -340);

  scene.add(model1);
  model1.traverse(function (child) {
    if (child.isMesh) {


      child.material.metalness = 0.9;
      child.material.roughness = 0.3;
      child.material.needsUpdate = true;
    }
  });
});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/new2.glb', function (gltf5) {

  const model5 = gltf5.scene;

  model5.rotation.y = Math.PI / 1;
  model5.scale.set(350, 350, 350);
  model5.position.set(210, 110, 220);
  model5.castShadow = true;

  scene.add(model5);
  model5.traverse(function (child) {
    if (child.isMesh) {



      child.material.color = new THREE.Color(0xC0C0C0);
      child.material.metalness = 1;
      child.material.roughness = 0.62;
      child.material.needsUpdate = true;
    }
  });
});


gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/flower vase.glb', function (gltf8) {

  const model8 = gltf8.scene;


  model8.scale.set(700, 700, 700);
  model8.position.set(-170, -127, -280);
  model8.castShadow = true;
  model8.receiveShadow = true;
  scene.add(model8);
  model8.traverse(function (child) {
    if (child.isMesh) {


      child.material.needsUpdate = true;
    }
  });
});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/table.glb', function (gltf6) {

  const model6 = gltf6.scene;

  model6.rotation.y = Math.PI / 1;
  model6.scale.set(2100, 2100, 2100);
  model6.position.set(-3, -340, -280);

  scene.add(model6);

});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/bottle.glb', function (gltf15) {

  const model15 = gltf15.scene;

  model15.rotation.y = 6;
  model15.scale.set(300, 300, 300);
  model15.position.set(170, -130, -265);
  scene.add(model15);
  model15.traverse(function (child) {
    if (child.isMesh) {

      child.material.needsUpdate = true;
    }
  });
});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/13.glb', function (gltf16) {

  const model16 = gltf16.scene;

  model16.rotation.y = Math.PI / 2;
  model16.scale.set(200, 200, 200);
  model16.position.set(-246, -320, 150);

  scene.add(model16);
  model16.traverse(function (child) {
    if (child.isMesh) {

      child.material.color = new THREE.Color(0xC0C0C0);

      child.material.needsUpdate = true;
    }
  });
});



var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();

var index = 0;

var middlechange;


document.getElementById('middletile').addEventListener('click', middletile);

function middletile() {
  var middle = document.getElementById('middletile').value;
  middlechange = middle;
  bottomchange = 1;
  topchange = 0;
}

var bottomchange;

document.getElementById('bottomtile').addEventListener('click', bottomtile);

function bottomtile() {
  var bottoms = document.getElementById('bottomtile').value;
  bottomchange = bottoms;
  middlechange = 2;
  topchange = 0;
}

var topchange;

document.getElementById('toptile').addEventListener('click', toptile);

function toptile() {
  var tops = document.getElementById('toptile').value;
  topchange = tops;
  middlechange = 2;
  bottomchange = 1;
}


// var bottomchange;

document.getElementById('floortile').addEventListener('click', floortile);

function floortile() {
  var tops = document.getElementById('floortile').value;
  bottomchange = tops;
  middlechange = 2;
  topchange = 0;
}

renderer.domElement.addEventListener('dblclick', onClick, false);

function onClick(event) {
  event.preventDefault();

  openimage1();


  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {

    index = Math.floor(intersects[0].faceIndex / 2);
    console.log(index);
  }
}

async function openimage1(){
  
  const url = "/list1";
const response = await request(url, {
  credentials: 'same-origin',
  method: 'GET',
  redirect: 'follow',
  headers: { 'Content-Type': 'application/json', },
})

const data =await response.json();

  var temps = "";


  if (index == 0 && middlechange == 1) {

    temps = `<img  src="${filteredData[right1].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();

  }
  if (index == 1 && middlechange == 1) {
    temps = `<img  src="${filteredData[right1].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 2 && middlechange == 1) {
    temps = `<img  src="${filteredData[top1].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 3 && middlechange == 1) {
    temps = `<img  src="${filteredData[bottom1].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 4 && middlechange == 1) {
    temps = `<img  src="${filteredData[right1].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 5 && middlechange == 1) {
    temps = `<img  src="${filteredData[right1].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }

  if (index == 0 && bottomchange == 0) {
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 1 && bottomchange == 0) {
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 2 && bottomchange == 0) {
    temps = `<img  src="${filteredData[top].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 3 && bottomchange == 0) {
    temps = `<img  src="${filteredData[bottom].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 4 && bottomchange == 0) {
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 5 && bottomchange == 0) {
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }

  if (index == 0 && topchange == 2) {
    temps = `<img  src="${filteredData[right2].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 1 && topchange == 2) {
    temps = `<img  src="${filteredData[right2].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 2 && topchange == 2) {
    temps = `<img  src="${filteredData[top2].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 3 && topchange == 2) {
    temps = `<img  src="${filteredData[bottom2].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 4 && topchange == 2) {
    temps = `<img  src="${filteredData[right2].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if (index == 5 && topchange == 2) {
    temps = `<img  src="${filteredData[right2].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`

    document.getElementById("img3").innerHTML = temps;
    openimage();
  }

}


function ffff() {
  var images = document.getElementsByClassName("img1");

  for (const img of images) {

    img.addEventListener('click', function oClick() {

      if (index == 0 && middlechange == 1) {
        setTimeout(myURL, 1500);

        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger1({ right1: parseInt(img.name) });
        }


      }
      if (index == 1 && middlechange == 1) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger11({ right1: parseInt(img.name) });
          // TilesChanger12({ right2: parseInt(img.name) });
        }
      }
      if (index == 2 && middlechange == 1) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger1({ top1: parseInt(img.name) });
          // TilesChanger11({ top1: parseInt(img.name) });
          // TilesChanger12({ top2: parseInt(img.name) });
        }
      }
      if (index == 3 && middlechange == 1) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger1({ bottom1: parseInt(img.name) });
          // TilesChanger11({ bottom1: parseInt(img.name) });
          // TilesChanger12({ bottom2: parseInt(img.name) });
        }
      }
      if (index == 4 && middlechange == 1) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger11({ right1: parseInt(img.name) });
          // TilesChanger12({ right2: parseInt(img.name) });
        }
      }
      if (index == 5 && middlechange == 1) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger11({ right1: parseInt(img.name) });
          // TilesChanger12({ right2: parseInt(img.name) });
        }
      }

      if (index == 0 && bottomchange == 0) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger({ right: parseInt(img.name) });
          // TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }
      if (index == 1 && bottomchange == 0) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger({ right: parseInt(img.name) });
          // TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }
      if (index == 2 && bottomchange == 0) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger({ top: parseInt(img.name) });
          // TilesChanger1({ top1: parseInt(img.name) });
          // TilesChanger2({ top2: parseInt(img.name) });
        }
      }
      if (index == 3 && bottomchange == 0) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger({ bottom: parseInt(img.name) });
          // TilesChanger1({ bottom1: parseInt(img.name) });
          // TilesChanger2({ bottom2: parseInt(img.name) });
        }
      }
      if (index == 4 && bottomchange == 0) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger({ right: parseInt(img.name) });
          // TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }
      if (index == 5 && bottomchange == 0) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          TilesChanger({ right: parseInt(img.name) });
          // TilesChanger1({ right1: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }

      if (index == 0 && topchange == 2) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          // TilesChanger({ right: parseInt(img.name) });
          TilesChanger2({ right2: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }
      if (index == 1 && topchange == 2) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          // TilesChanger({ right: parseInt(img.name) });
          TilesChanger2({ right2: parseInt(img.name) });
          // TilesChanger2({ left2: parseInt(img.name) });
        }
      }
      if (index == 2 && topchange == 2) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          // TilesChanger({ top: parseInt(img.name) });
          TilesChanger2({ top2: parseInt(img.name) });
          // TilesChanger2({ top2: parseInt(img.name) });
        }
      }
      if (index == 3 && topchange == 2) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          // TilesChanger({ bottom: parseInt(img.name) });
          TilesChanger2({ bottom2: parseInt(img.name) });
          // TilesChanger2({ bottom2: parseInt(img.name) });
        }
      }
      if (index == 4 && topchange == 2) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          // TilesChanger({ right: parseInt(img.name) });
          TilesChanger2({ right2: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }
      if (index == 5 && topchange == 2) {
        setTimeout(myURL, 1500);
        document.getElementById('logout1-btn-loader').style.display = "block";

        function myURL() {
          document.getElementById('logout1-btn-loader').style.display = "none";
          // TilesChanger({ right: parseInt(img.name) });
          TilesChanger2({ right2: parseInt(img.name) });
          // TilesChanger2({ right2: parseInt(img.name) });
        }
      }
    });
  }


}
ffff();


const render = () => {

  if (isZooming) {
    const currentDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));

    // Gradually move the camera towards the target distance with zoom speed
    const newDistance = THREE.MathUtils.lerp(currentDistance, targetDistance, zoomSpeed);

    // Calculate the new position of the camera
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const newPosition = new THREE.Vector3().copy(direction).multiplyScalar(-newDistance);

    // Apply the new position to the camera
    camera.position.copy(newPosition);

    // Update the controls target
    controls.target.set(0, 0, 0);

    // Update the controls
    controls.update();

    // Check if the zooming has reached the target distance
    if (Math.abs(newDistance - targetDistance) < 0.1) {
      isZooming = false;
    }
  }
  // renderer.autoClear = false;


  renderer.render(scene, camera);
  renderer.render(scene1, camera);
}



var screen = document.getElementById("screenshot");

screen.addEventListener('click', scr)

function scr() {
  render();

  // Convert the WebGL renderer's DOM element to a data URL
  var dataURL = renderer.domElement.toDataURL('image/png');

  // Create an anchor element to provide the download link
  var link = document.createElement('a');
  link.href = dataURL; // Set the data URL as the href
  link.download = 'webgl_scene.png'; // Set the filename for download
  link.click(); // Simulate a click on the link to trigger the download

}


var print = document.getElementById("printer");

print.addEventListener('click', scr1)

function scr1() {
  render();

  // Convert the WebGL renderer's DOM element to a data URL
  var dataURL = renderer.domElement.toDataURL('image/png');




  // Open a new window for printing
  var printWindow = window.open();
  printWindow.document.open();
  printWindow.document.write('<html><body style="margin: 0;">');
  printWindow.document.write('<img src="' + dataURL + '" style="max-width: 100%; max-height: 100%;">');
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  // Wait for the image to load before printing
  printWindow.addEventListener('load', function () {
    printWindow.print();
    // printWindow.close();
  });
}


const animate = () => {


  controls.update();
  requestAnimationFrame(animate);

  render();

}
animate();


const windowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  reflector.getRenderTarget().setSize(
    window.innerWidth * window.devicePixelRatio,
    window.innerHeight * window.devicePixelRatio)

  renderer.setSize(window.innerWidth, window.innerHeight);

  // composer.setSize( window.innerWidth, window.innerHeight )

  render();
}

window.addEventListener('resize', windowResize, false);

