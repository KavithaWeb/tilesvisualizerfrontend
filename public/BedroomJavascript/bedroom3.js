import * as THREE from '/three/build/three.module.js';

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
import { Reflector } from 'https://threejs.org/examples/jsm/objects/Reflector.js'
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://threejs.org/examples/jsm/loaders/DRACOLoader.js";
import { BackSide, DoubleSide } from 'three';

import { livingroom, bathroom1, bathroom2, bedroom } from '../Mainjavascript/constants.js';
import { request } from '../services/api.service.js';


const canvas = document.querySelector('.bedroom3');

const scene = new THREE.Scene();

const scene1 = new THREE.Scene();

const fov = 40;
const aspect = window.innerWidth / window.innerHeight;
const near = 1.5;
const far = 4000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 1100);
// camera.lookAt(0, 0, 0);
scene.add(camera);

const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera1.position.set(0, 0, 1100);
// camera.lookAt(0, 0, 0);

scene1.add(camera1);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  // alpha:true
});


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor( 0x101000, 0);
renderer.shadowMap.enabled=true;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 0.8;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const renderer1 = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  // alpha:true
});

// scene1.onBeforeRender = function() {
//   renderer1.outputEncoding = THREE.sRGBEncoding;
// };

// // Set the tone mapping and exposure only for scene2
// scene1.onAfterRender = function() {
//   renderer1.toneMapping = THREE.ACESFilmicToneMapping;
//   renderer1.toneMappingExposure = 0.8;
// };

renderer1.setSize(window.innerWidth, window.innerHeight);

renderer1.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer1.autoClear = false;
renderer1.setClearColor( 0x101000, 0);
renderer1.shadowMap.enabled=true;
// renderer1.outputEncoding = THREE.sRGBEncoding;
// renderer1.toneMapping = THREE.ACESFilmicToneMapping
// renderer1.toneMappingExposure = 0.2;

renderer1.shadowMap.type = THREE.PCFSoftShadowMap;

let controls = new OrbitControls(camera, renderer.domElement);


 controls.minDistance = 0;
 controls.maxDistance = 1100;
controls.enableDamping = true;
controls.dampingFactor = 0.2;

// setTimeout(rotate, 14000);

// function rotate() {
//   controls.autoRotate = true;
//   controls.autoRotateSpeed = 0.8;
// }

document.addEventListener('DOMContentLoaded', function() {
  var fullscreenBtn = document.getElementById('fullscreen-btn');


  // Go fullscreen when the button is clicked
  fullscreenBtn.addEventListener('click', function() {
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



let controls1 = new OrbitControls(camera1, renderer1.domElement);


controls1.minDistance = 0;
controls1.maxDistance = 1100;

controls1.enableDamping = true;
controls1.dampingFactor = 0.2;
// controls1.autoRotate = true;
// controls1.autoRotateSpeed = 4.0;

// setTimeout(rotate1, 14000);

// function rotate1() {
//   controls1.autoRotate = true;
//   controls1.autoRotateSpeed = 0.8;
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


function smoothZoom1(zoomAmount) {
  if (isZooming) return; // Prevent multiple zoom actions at once

  isZooming = true;

  // Calculate the target distance after applying the zoom
  targetDistance += zoomAmount;

  // Restrict the target distance within the minDistance and maxDistance for controls1
  targetDistance = THREE.MathUtils.clamp(targetDistance, controls1.minDistance, controls1.maxDistance);
}


// Example usage: Add event listeners to zoom in and out buttons
const zoomInButton = document.getElementById('zoom-in-button');
zoomInButton.addEventListener('click', () => {
  smoothZoom(-80);
  smoothZoom1(-80); // Adjust the zoom level as per your requirements
});

const zoomOutButton = document.getElementById('zoom-out-button');
zoomOutButton.addEventListener('click', () => {
  smoothZoom(80);
  smoothZoom1(80); // Adjust the zoom level as per your requirements
});


// /// Variables for smooth zooming
// let isZooming = false;
// let targetDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
// const zoomSpeed = 0.5; // Adjust the speed of zooming

// // Function to handle smooth zooming
// function smoothZoom(zoomAmount) {
//   if (isZooming) return; // Prevent multiple zoom actions at once

//   isZooming = true;

//   // Calculate the target distance after applying the zoom
//   targetDistance += zoomAmount;

//   // Restrict the target distance within the minDistance and maxDistance
//   targetDistance = THREE.MathUtils.clamp(targetDistance, controls.minDistance, controls.maxDistance);
// }


// // Example usage: Add event listeners to zoom in and out buttons
// const zoomInButton = document.getElementById('zoom-in-button');
// zoomInButton.addEventListener('click', () => {
//   smoothZoom(-80); // Adjust the zoom level as per your requirements
// });

// const zoomOutButton = document.getElementById('zoom-out-button');
// zoomOutButton.addEventListener('click', () => {
//   smoothZoom(80); // Adjust the zoom level as per your requirements
// });


const light30 = new THREE.DirectionalLight(0xffffff, 1);
 light30.position.set(0, 0, -250);
 light30.target.position.set(0, 0, 0);
 light30.castShadow = true;

//  light30.shadow.camera.near = 0.1;
//  light30.shadow.camera.far = 100;
//  light30.shadow.mapSize.width = 1024;
//  light30.shadow.mapSize.height = 1024;
//  light30.shadow.bias = -0.002;

 scene.add( light30.target );
 scene.add(light30);
// const spotLightHelper30 = new THREE.SpotLightHelper( light30 );
// scene1.add( spotLightHelper30 );
light30.target.updateMatrixWorld();


const spotLightHelper31 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper31.position.set(0, 0, 250);
 spotLightHelper31.target.position.set(0, 0, 0);
 spotLightHelper31.castShadow= true
//  spotLightHelper31.shadow.mapSize.width = 2048;
//  spotLightHelper31.shadow.mapSize.height = 2048;
//  spotLightHelper31.shadow.bias = -0.0001;

 scene.add( spotLightHelper31.target );
 scene.add(spotLightHelper31);
// const spotLightHelper31spotLightHelper31 = new THREE.DirectionalLightHelper( spotLightHelper31 );
// scene1.add( spotLightHelper31spotLightHelper31 );
spotLightHelper31.target.updateMatrixWorld();

const spotLightHelper32 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper32.position.set(200, 0, 0);
 spotLightHelper32.target.position.set(0, 0, 0);
 spotLightHelper32.castShadow=true
 
//  spotLightHelper32.shadow.mapSize.width = 2048;
//  spotLightHelper32.shadow.mapSize.height = 2048;
//  spotLightHelper32.shadow.bias = -0.0001;
 scene.add( spotLightHelper32.target );
 scene.add(spotLightHelper32);
// const spotLightHelper32spotLightHelper32 = new THREE.DirectionalLightHelper( spotLightHelper32 );
// scene1.add( spotLightHelper32spotLightHelper32 );
spotLightHelper32.target.updateMatrixWorld();


const spotLightHelper33 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper33.position.set(-200, 0, 0);
 spotLightHelper33.target.position.set(0, 0, 0);
 spotLightHelper33.castShadow=true
 
//  spotLightHelper33.shadow.mapSize.width = 2048;
//  spotLightHelper33.shadow.mapSize.height = 2048;
//  spotLightHelper33.shadow.bias = -0.0001;
 scene.add( spotLightHelper33.target );
 scene.add(spotLightHelper33);
// const spotLightHelper33spotLightHelper33 = new THREE.DirectionalLightHelper( spotLightHelper33 );
// scene1.add( spotLightHelper33spotLightHelper33 );
spotLightHelper33.target.updateMatrixWorld();


const spotLightHelper34 = new THREE.DirectionalLight(0xffffff, 1.1);
 spotLightHelper34.position.set(0, 200, 0);
 spotLightHelper34.target.position.set(0, 0, 0);
 spotLightHelper34.castShadow=true

//  spotLightHelper34.shadow.mapSize.width = 2048;
//  spotLightHelper34.shadow.mapSize.height = 2048;
//  spotLightHelper34.shadow.bias = -0.0001;
 scene.add( spotLightHelper34.target );
 scene.add(spotLightHelper34);
// const spotLightHelper34spotLightHelper34 = new THREE.DirectionalLightHelper( spotLightHelper34 );
// scene1.add( spotLightHelper34spotLightHelper34 );
spotLightHelper34.target.updateMatrixWorld();


const spotLightHelper35 = new THREE.DirectionalLight(0xffffff, 1.4);
 spotLightHelper35.position.set(0, -200, 0);
 spotLightHelper35.target.position.set(0, 0, 0);
 spotLightHelper35.castShadow=true
 
//  spotLightHelper35.shadow.mapSize.width = 2048;
//  spotLightHelper35.shadow.mapSize.height = 2048;
//  spotLightHelper35.shadow.bias = -0.0001;
 scene.add( spotLightHelper35.target );
 scene.add(spotLightHelper35);
// const spotLightHelper35spotLightHelper35 = new THREE.DirectionalLightHelper( spotLightHelper35 );
// scene1.add( spotLightHelper35spotLightHelper35 );
spotLightHelper35.target.updateMatrixWorld();



// TOP

const light = new THREE.SpotLight(0xffffff, 0.6);
 light.position.set(0, 1600, 0);
//  light.target.position.set(-800, 150, 0)

camera.add(light)
scene1.add( light );


// const spotLightHelper1 = new THREE.SpotLightHelper( light );
// scene1.add( spotLightHelper1 );

// BOTTOM

const light1 = new THREE.SpotLight(0xffffff,0.2);
 light1.position.set(0, -1200, 50);

scene1.add( light1 );
// const spotLightHelper2 = new THREE.SpotLightHelper( light1 );
// scene1.add( spotLightHelper2 );

// RIGHT

const light2 = new THREE.SpotLight(0xffffff,0.2);
 light2.position.set(1500, 220, 0);
 light2.target.position.set(-900, 190, 0);

 

 scene1.add( light2.target );
 scene1.add(light2);
// const spotLightHelper2 = new THREE.SpotLightHelper( light2 );
// scene1.add( spotLightHelper2 );
light2.target.updateMatrixWorld();

// LEFT

const light3 = new THREE.SpotLight(0xffffff,0.2);
 light3.position.set(-1500, -80, -110);
 light3.target.position.set(800, -80, 0);
 light3.castShadow=true


 scene1.add( light3.target );
 scene1.add(light3);
// const spotLightHelper3 = new THREE.SpotLightHelper( light3 );
// scene1.add( spotLightHelper3 );
light3.target.updateMatrixWorld();

// BACK

const light4 = new THREE.SpotLight(0xffffff, 0.2);
 light4.position.set(-30, -20, 1550);
 light4.target.position.set(-100, 110, -350);


 scene1.add( light4.target );
 scene1.add(light4);
// const spotLightHelper4 = new THREE.SpotLightHelper( light4 );
// scene1.add( spotLightHelper4 );
light4.target.updateMatrixWorld();


// var light20 = new THREE.SpotLight(0xffffff, 0.01);
// light20.position.set(-40, 0, 0);
// light20.target.position.set(0, 0, 200);

// // const helper20 = new THREE.SpotLightHelper( light20, 10 );
// // scene1.add( helper20 );
// light20.castShadow = true;

// scene1.add(light20);
// light20.target.updateMatrixWorld();




let right = bedroom.right;
let left = bedroom.left;
let top = bedroom.top;
let bottom = bedroom.bottom;
let back = bedroom.back;
let front = bedroom.front;


let loader = new THREE.TextureLoader();

let imageload = []; 

let page = 0;
const size = 18;
let data = [];
let loadedIds = [];

async function fetchMoreData(start) {
  const url = `/users?page=${page}&size=${size}`;
  const response = await request(url, {
    credentials: 'same-origin',
    method: 'GET',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/json', },
  });
    const newData = await response.json();
    newData.sort((a, b) => new Date(b.uploadTimestamp) - new Date(a.uploadTimestamp));
    data = [...data, ...newData];
    renderData(start);
    page++;
}
let filteredData = [];
function renderData(start) {
    const container = document.getElementById("tiles");
    filteredData = data.filter((item) => item.tiles === "tilesimages" );
    let html = "";

    const attachedData1 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/joshua-bartell-6vvIBTvL90A-unsplash.jpg", id:"11", tiles: "tilesimages" };
    const newData1 = attachedData1;
  
    const attachedData2 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03540_b.jpg", id:"12", tiles: "tilesimages" };
    const newData2 = attachedData2;
  
    // Replace existing data in filteredData[0] and filteredData[1] with the new array
    // filteredData[0] = newData;
  
    filteredData[1] = newData1;
  
    filteredData[2] = newData2;

    for (let i = start; i < filteredData.length && i < start + size; i++) {
        const item = filteredData[i];     
       html += `<input class="stop" type="checkbox" name="imageIds" value="${item.fileUrl}"><button  onclick="tileselect()" class="img1" name="${i}"><img class="img2" src="${item.fileUrl}" width="190" height="110"><h6>APPLY DESIGN</h6></button>`;
     
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

ffff();

}

var butts = document.getElementById("vvv");

butts.addEventListener('click', onClickeds);

function onClickeds(){
    const start = page * size;
    fetchMoreData(start);
  
}
fetchMoreData(1);



// // var defaultTexture1 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03576_b.jpg'}?not-from-cache-please`);
// var defaultTexture22 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/ceiling4.jpg'}?not-from-cache-please`);
// // var defaultTexture3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03575_b.jpg'}?not-from-cache-please`);

// // Set texture wrap properties for default textures
// // defaultTexture1.wrapS = THREE.RepeatWrapping;
// // defaultTexture1.wrapT = THREE.RepeatWrapping;
// // defaultTexture1.repeat.set(5, 5);

// defaultTexture22.wrapS = THREE.RepeatWrapping;
// defaultTexture22.wrapT = THREE.RepeatWrapping;
// defaultTexture22.repeat.set(1, 1);

// // defaultTexture3.wrapS = THREE.RepeatWrapping;
// // defaultTexture3.wrapT = THREE.RepeatWrapping;
// // defaultTexture3.repeat.set(3, 5);

// // Create default materials using the default textures
// // const defaultMaterial1 = new THREE.MeshStandardMaterial({ map: defaultTexture1, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
// const defaultMaterial22 = new THREE.MeshStandardMaterial({ map: defaultTexture22, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
// // const defaultMaterial3 = new THREE.MeshStandardMaterial({ map: defaultTexture3, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });


// // Set texture wrap and gap properties for default materials
// const defaultWrapS = THREE.RepeatWrapping;
// const defaultWrapT = THREE.RepeatWrapping;
// const defaultGap = 0.003;
// const defaultGapColor = new THREE.Color('lightgrey');

// // defaultMaterial1.map.wrapS = defaultWrapS;
// // defaultMaterial1.map.wrapT = defaultWrapT;
// // defaultMaterial1.map.repeat.set(5, 5);

// defaultMaterial22.map.wrapS = defaultWrapS;
// defaultMaterial22.map.wrapT = defaultWrapT;
// defaultMaterial22.map.repeat.set(1, 1);

// // defaultMaterial3.map.wrapS = defaultWrapS;
// // defaultMaterial3.map.wrapT = defaultWrapT;
// // defaultMaterial3.map.repeat.set(3, 5);

// let skyBox;
// ////////////////////////////////
// function TilesChanger(obj = {}) {
 
//   let materialside = [];


//  // defaultMaterial1.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial1.onBeforeCompile);


//  defaultMaterial22.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial22.onBeforeCompile);


//  // defaultMaterial3.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial3.onBeforeCompile);

//  // Add the default materials to the materialside array
//  // materialside.push(defaultMaterial1);
//  materialside.push(defaultMaterial22);
//  // materialside.push(defaultMaterial3);

//   imageload.forEach((texture, ii) => {
//     if (texture.id) {
//       texture.wrapS = THREE.RepeatWrapping;
//       texture.wrapT = THREE.RepeatWrapping;
//       texture.repeat.set(4, 5);
//     } 

//     const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.BackSide, roughness: 0.76, metalness: 0.7 });

//     const gap = 0.003;
//     const gapColor = new THREE.Color('lightgrey');
//     material.onBeforeCompile = setMaterialShaderProperties(gap, gapColor, material.onBeforeCompile);
//     materialside.push(material);
//   });

//   // Helper function to set material shader properties
//   function setMaterialShaderProperties(gap, gapColor, _onBeforeCompile) {
//     return shader => {
//       shader.uniforms.gap = { value: gap };
//       shader.uniforms.gapColor = { value: gapColor };
//       shader.fragmentShader = `
//         uniform float gap;
//         uniform vec3 gapColor;
//       ` + shader.fragmentShader;

//       shader.fragmentShader = shader.fragmentShader.replace(
//         '#include <map_fragment>',
//         `
//         vec4 texelColor = texture2D(map, vUv);
//         vec2 cUv = abs(fract(vUv) - 0.5);
//         float gapLimit = 0.5 - gap;
//         vec2 fe = fwidth(vUv);
//         float e = length(fe) * 0.5;
//         float s = smoothstep(gapLimit - e, gapLimit + e, max(cUv.x, cUv.y));
        
//         texelColor = mix(texelColor, vec4(gapColor, 1.0), s);
//         diffuseColor *= texelColor;
//         `
//       );

//       return shader;
//     };
//   }

   
//   const cubeGeometry = new THREE.BoxGeometry(1520, 1070, 2500);

//   // const edges = new THREE.EdgesGeometry( cubeGeometry );
//   // const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10, side:DoubleSide }));
//   // scene.add( line );
  

//   right = obj?.right || right
//   left = obj?.left || left
//   top = obj?.top || top
//   bottom = obj?.bottom || bottom
//   back = obj?.back || back
//   front = obj?.front || front


// const groups = [
//   { start: 0, count: 6, materialIndex: right },
//   { start: 6, count: 6, materialIndex: right },
//   { start: 12, count: 6, materialIndex: top },
//   { start: 18, count: 6, materialIndex: bottom },
//   { start: 24, count: 6, materialIndex: right },
//   { start: 30, count: 6, materialIndex: right }
// ];

// cubeGeometry.groups = groups;

// if (!skyBox) {
//   skyBox = new THREE.Mesh(cubeGeometry, materialside);
//   skyBox.position.set(0 ,90 ,0);
//   skyBox.castShadow=true
// skyBox.receiveShadow=true
//   scene.add(skyBox);
// }

// else {
//   skyBox.geometry = cubeGeometry;

//   skyBox.material = materialside;

// }


// }





  
// function TilesChanger2(obj = {}) {
  
//   var imageload2 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Blur-PNG-Picture.png'}?not-from-cache-please`)
//   var imageload3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-04-24 203442.png'}?not-from-cache-please`)
//     const material1 = new THREE.MeshBasicMaterial({ map: imageload2, side: BackSide, transparent: true, opacity: 0.7 });
//     const material2 = new THREE.MeshBasicMaterial({ map: imageload3, side: BackSide, transparent: true, opacity: 0.08 });

// let materialarray = [material1, material2];


// const cubeGeometry2 = new THREE.BoxGeometry(1519, 1069, 2499);


// const groups = [
//   { start: 0, count: 6, materialIndex: 0 },
//   { start: 0, count: 6, materialIndex: 1 },
//   { start: 6, count: 6, materialIndex: 0 },
//   { start: 6, count: 6, materialIndex: 1 },
//   // { start: 12, count: 6, materialIndex: 0 },
//   // { start: 18, count: 6, materialIndex: 0 },
//   { start: 24, count: 6, materialIndex: 0 },
//   { start: 24, count: 6, materialIndex: 1 },
//   { start: 30, count: 6, materialIndex: 0 },
//   { start: 30, count: 6, materialIndex: 1 }
// ];

// cubeGeometry2.groups = groups;


// // const edges = new THREE.EdgesGeometry( cubeGeometry2 );
// //   const line = new THREE.LineSegments( edges, new THREE.LineDashedMaterial({
// //     color: new THREE.Color().setHSL(0, 0, 0.45),
// //     dashSize: 1,
// //     gapSize: 0
// // }));
// // line.position.set(0 ,90 ,0);
// //   scene.add( line );

// let skyBox2 = new THREE.Mesh(cubeGeometry2, materialarray);
// console.log(materialarray);
// skyBox2.position.set(0 ,90 ,0);
// skyBox2.castShadow= true;
// skyBox2.receiveShadow= true;

// scene.add(skyBox2);
// }
// TilesChanger2();









// var defaultTexture1 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03576_b.jpg'}?not-from-cache-please`);
var defaultTexture22 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/ceiling4.jpg'}?not-from-cache-please`);
// var defaultTexture3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03575_b.jpg'}?not-from-cache-please`);

// Set texture wrap properties for default textures
// defaultTexture1.wrapS = THREE.RepeatWrapping;
// defaultTexture1.wrapT = THREE.RepeatWrapping;
// defaultTexture1.repeat.set(5, 5);

defaultTexture22.wrapS = THREE.RepeatWrapping;
defaultTexture22.wrapT = THREE.RepeatWrapping;
defaultTexture22.repeat.set(1, 1);

// defaultTexture3.wrapS = THREE.RepeatWrapping;
// defaultTexture3.wrapT = THREE.RepeatWrapping;
// defaultTexture3.repeat.set(3, 5);

// Create default materials using the default textures
// const defaultMaterial1 = new THREE.MeshStandardMaterial({ map: defaultTexture1, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
const defaultMaterial22 = new THREE.MeshStandardMaterial({ map: defaultTexture22, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
// const defaultMaterial3 = new THREE.MeshStandardMaterial({ map: defaultTexture3, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });


// Set texture wrap and gap properties for default materials
const defaultWrapS = THREE.RepeatWrapping;
const defaultWrapT = THREE.RepeatWrapping;
const defaultGap = 0.003;
const defaultGapColor = new THREE.Color('lightgrey');

// defaultMaterial1.map.wrapS = defaultWrapS;
// defaultMaterial1.map.wrapT = defaultWrapT;
// defaultMaterial1.map.repeat.set(5, 5);

defaultMaterial22.map.wrapS = defaultWrapS;
defaultMaterial22.map.wrapT = defaultWrapT;
defaultMaterial22.map.repeat.set(1, 1);

// defaultMaterial3.map.wrapS = defaultWrapS;
// defaultMaterial3.map.wrapT = defaultWrapT;
// defaultMaterial3.map.repeat.set(3, 5);

let gapValue = 0.003; 
 // Default gap value
let skyBox;
let repeatX = 3; // Default X repeat value
let repeatY = 5; // Default Y repeat value
let applyChessLayout = false; 
////////////////////////////////
function TilesChanger(obj = {}) {
 
  let materialside = [];


 // defaultMaterial1.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial1.onBeforeCompile);


 defaultMaterial22.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial22.onBeforeCompile);


 // defaultMaterial3.onBeforeCompile = setMaterialShaderProperties(defaultGap, defaultGapColor, defaultMaterial3.onBeforeCompile);

 // Add the default materials to the materialside array
 // materialside.push(defaultMaterial1);
 materialside.push(defaultMaterial22);
 // materialside.push(defaultMaterial3);

  imageload.forEach((texture, ii) => {
    if (texture.id) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
    } 

    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.BackSide, roughness: 0.76, metalness: 0.7 });

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
   
  const cubeGeometry = new THREE.BoxGeometry(2050, 1400, 2445);

  // const edges = new THREE.EdgesGeometry( cubeGeometry );
  // const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10, side:DoubleSide }));
  // scene.add( line );
  

  right = obj?.right || right
  left = obj?.left || left
  top = obj?.top || top
  bottom = obj?.bottom || bottom
  back = obj?.back || back
  front = obj?.front || front


const groups = [
  { start: 0, count: 6, materialIndex: right },
  { start: 6, count: 6, materialIndex: right },
  { start: 12, count: 6, materialIndex: top },
  { start: 18, count: 6, materialIndex: bottom },
  { start: 24, count: 6, materialIndex: right },
  { start: 30, count: 6, materialIndex: right }
];

cubeGeometry.groups = groups;

if (!skyBox) {
  skyBox = new THREE.Mesh(cubeGeometry, materialside);
  skyBox.position.set(0 ,132 ,0);
  skyBox.castShadow=true
skyBox.receiveShadow=true
  scene.add(skyBox);
}

else {
  skyBox.geometry = cubeGeometry;

  skyBox.material = materialside;

}

// function updateRepeatValues() {
//   if (skyBox) {
//     skyBox.material.forEach(material => {
//       const texture = material.map;
//       console.log(texture);
//       if (texture.id == 4) {
//         texture.repeat.set(1, 1);
//       } else {
//         texture.repeat.set(repeatX, repeatY);
//         texture.needsUpdate = true; // Notify Three.js that the texture has been updated
//       }
//     });

//     renderer.render(scene, camera);
//   }
// }



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


  
function TilesChanger2(obj = {}) {
  
  var imageload2 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Blur-PNG-Picture.png'}?not-from-cache-please`)
  var imageload3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-04-24 203442.png'}?not-from-cache-please`)
    const material1 = new THREE.MeshBasicMaterial({ map: imageload2, side: BackSide, transparent: true, opacity: 0.7 });
    const material2 = new THREE.MeshBasicMaterial({ map: imageload3, side: BackSide, transparent: true, opacity: 0.08 });

let materialarray = [material1, material2];


const cubeGeometry2 = new THREE.BoxGeometry(2049, 1399, 2444);


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

cubeGeometry2.groups = groups;


// const edges = new THREE.EdgesGeometry( cubeGeometry2 );
//   const line = new THREE.LineSegments( edges, new THREE.LineDashedMaterial({
//     color: new THREE.Color().setHSL(0, 0, 0.45),
//     dashSize: 1,
//     gapSize: 0
// }));
// line.position.set(0 ,90 ,0);
//   scene.add( line );

let skyBox2 = new THREE.Mesh(cubeGeometry2, materialarray);
console.log(materialarray);
skyBox2.position.set(0 ,132 ,0);
skyBox2.castShadow= true;
skyBox2.receiveShadow= true;

scene.add(skyBox2);
}

TilesChanger2();








var textureLoader8 = new THREE.TextureLoader();
var tex = textureLoader8.load('./bedroom/aluminium-1.jpg');
let circleGeo2 = new THREE.PlaneGeometry(950,850);
let circleMat2 = new THREE.MeshBasicMaterial({map:tex});
let circle2 = new THREE.Mesh(circleGeo2, circleMat2);
circle2.position.set(0 ,220 ,-1145);

// circle2.rotation.y = Math.PI / 1;
scene.add(circle2);

// var textureLoader9 = new THREE.TextureLoader();
// var tex1 = textureLoader9.load('./bedroom/Screenshot 2023-08-04 144522.png');
// let circleGeo3 = new THREE.PlaneGeometry(350,1300);
// let circleMat3 = new THREE.MeshBasicMaterial({map:tex1});
// let circle3 = new THREE.Mesh(circleGeo3, circleMat3);
// circle3.position.set(842 ,100 ,-1200);

// // circle3.rotation.y = Math.PI / 1;
// scene.add(circle3);



// var geometry5 = new THREE.PlaneGeometry(700, 700);

// // create a texture loader
// var textureLoader5 = new THREE.TextureLoader();

// // // load the texture
// textureLoader5.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-08 140207.png', function(texturei5) {
//   // create a material with the texture
//   var materiali5 = new THREE.MeshBasicMaterial({ map: texturei5 });

//   // create the mesh using the geometry and material
//   var mesh5 = new THREE.Mesh(geometry5, materiali5);
//   mesh5.position.set(200 ,280 ,-860);
//   // add the mesh to the scene
// //   mesh5.rotation.y = Math.PI / -1;
//   scene.add(mesh5);
// });


// let circleGeo1 = new THREE.SphereGeometry(35,60);
// let circleMat1 = new THREE.MeshBasicMaterial({color:0xFFD700, side:THREE.DoubleSide});
// let circle1 = new THREE.Mesh(circleGeo1, circleMat1);
// circle1.position.set(-540, -35, -845);
// circle1.layers.enable(1)
// scene.add(circle1);


// let circleGeo6 = new THREE.SphereGeometry(35,60);
// let circleMat6 = new THREE.MeshBasicMaterial({color:0xFFD700, side:THREE.DoubleSide});
// let circle6 = new THREE.Mesh(circleGeo6, circleMat6);
// circle6.position.set(350, -35, -845);
// circle6.layers.enable(1)
// scene.add(circle6);

var geometry7 = new THREE.PlaneGeometry(500, 950);

// create a texture loader
var textureLoader7 = new THREE.TextureLoader();

// load the texture
textureLoader7.load('./bedroom/Screenshot 2023-08-03 130657.png', function(texturei7) {
  // create a material with the texture
  var materiali7 = new THREE.MeshBasicMaterial({ map: texturei7});

  // create the mesh using the geometry and material
  var mesh7 = new THREE.Mesh(geometry7, materiali7);
  mesh7.position.set(0 ,-100 ,1220);
  // add the mesh to the scene
  mesh7.rotation.y = Math.PI / -1;
  scene.add(mesh7);
});
// set(-7 ,90 ,-346);
// let circleGeo1 = new THREE.SphereGeometry(15,60);
// let circleMat1 = new THREE.MeshBasicMaterial({color:0xFFD700, side:THREE.DoubleSide});
// let circle1 = new THREE.Mesh(circleGeo1, circleMat1);
// circle1.position.set(-160 ,205 ,-325);
// circle1.layers.enable(1)
// scene.add(circle1);

// var textureLoader8 = new THREE.TextureLoader();
// var tex = textureLoader8.load('livingroom/kisspng-yellow-computer-icons-clip-art-yellow-triangle-image-transparent-png-5ab1c101f0e410.4480517115215987219867-removebg-preview.png');
// let circleGeo2 = new THREE.PlaneGeometry(70,150);
// let circleMat2 = new THREE.MeshBasicMaterial({map:tex, transparent:true});
// let circle2 = new THREE.Mesh(circleGeo2, circleMat2);
// circle2.position.set(710 ,180 ,25);
// circle2.layers.set(1)
// circle2.rotation.y = Math.PI / -2;
// scene.add(circle2);


// var textureLoader9 = new THREE.TextureLoader();
// var tex1 = textureLoader9.load('livingroom/kisspng-yellow-computer-icons-clip-art-yellow-triangle-image-transparent-png-5ab1c101f0e410.4480517115215987219867-removebg-preview.png');
// let circleGeo3 = new THREE.PlaneGeometry(70,150);

// let circleMat = new THREE.MeshBasicMaterial({map:tex1, transparent:true}) 
// let circle = new THREE.Mesh(circleGeo3, circleMat);
// circle.position.set(-490 ,190 ,-620);
// circle.scale.setX(1);
// circle.layers.set(1)
// scene.add(circle);


// let circleGeo4 = new THREE.CircleGeometry(85,60);
// let circleMat4 = new THREE.MeshBasicMaterial({color:0x000000, side:THREE.DoubleSide})    
// let circle4 = new THREE.Mesh(circleGeo4, circleMat4);
// circle4.position.set(-7 ,90 ,-346);
// circle4.scale.setX(1);

// scene.add(circle4);

     

        // // scene1.add(reflector.clone());
        // var composer = new EffectComposer(renderer);   
        // const renderScene = new RenderPass(scene, camera);
        // composer.addPass(renderScene);
      
        // const params = {
        //   exposure: 2,
        //   strength:0.5,
        //   threshold: 0,
        //   radius: 0.2
        // };
        // const bloomPass = new UnrealBloomPass(
        //   new THREE.Vector2(window.innerWidth, window.innerHeight),
        //   1.8,
        //   0.4,
        //   0.85
        // );

        // bloomPass.threshold = params.threshold;
        // bloomPass.strength = params.strength;
        // bloomPass.radius = params.radius;
        // bloomPass.renderToScreen = true;
     
        
        
        // composer.renderToScreen = false;
        // // composer.setSize(window.innerWidth, window.innerHeight);
        // composer.addPass(bloomPass);
        
        
        // const finalPass = new ShaderPass(
        //   new THREE.ShaderMaterial({
        //     uniforms: {
        //       baseTexture: { value: null },
        //       bloomTexture: { value: composer.renderTarget2.texture }
        //     },
        //     vertexShader: `
        //     varying vec2 vUv;
        //     void main() {
        //       vUv = uv;
        //       gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        //     }`,
        //     fragmentShader: `
        //     uniform sampler2D baseTexture;
        //     uniform sampler2D bloomTexture;
        //     varying vec2 vUv;
        //     void main() {
        //       gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );            
        //     }
        //     `,
        //     defines: {}
        //   }),
        //   "baseTexture"
        // );
        // finalPass.needsSwap = false;

        // const finalComposer = new EffectComposer(renderer);
  
        // finalComposer.addPass(renderScene);
 
        // finalComposer.addPass(finalPass);


        
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/js/libs/draco/')

var gltfloader = new GLTFLoader();
gltfloader.setDRACOLoader(dracoLoader)


// gltfloader.load('./bedroom/tropical_bedroom.glb', function (gltf6) {

//   const model6 = gltf6.scene;

//   // model6.rotation.y = Math.PI / -1;
//   model6.scale.set(4, 4, 4);
//   model6.position.set(-2670, -970, 1540);
//   scene1.add(model6);
//   model6.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//         //    child.material.metalness = 0.4;
//       // child.material.roughness = 0.8;
//       // child.material.color = new THREE.Color(0xFFFFFF);
//       child.material.needsUpdate = true;
//     }
//   });

// });


gltfloader.load('./bedroom/minimalistic_modern_bedroom.glb', function (gltf6) {

    const model6 = gltf6.scene;
  
    // model6.rotation.y = Math.PI / -1;
    model6.scale.set(400, 400, 400);
    model6.position.set(-0, 109, 0);
    scene1.add(model6);
    model6.traverse(function(child) {
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
          //    child.material.metalness = 0.4;
        // child.material.roughness = 0.8;
        // child.material.color = new THREE.Color(0xFFFFFF);
        child.material.needsUpdate = true;
      }
    });
  
  });


// gltfloader.load('bedroom/decoration table.glb', function (gltf9) {

//   const model9 = gltf9.scene;

//   model9.rotation.y = Math.PI / 1;
//   model9.scale.set(5300, 5000, 5000);
//   model9.position.set(-50, -330, -500);
//   scene1.add(model9);
//   model9.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//            child.material.metalness = 0.3;
//       // child.material.roughness = 0.2;
//       // child.material.color = new THREE.Color(0xFFFFFF);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/scene (4).glb', function (gltf8) {

//   const model8 = gltf8.scene;

//   model8.rotation.y = Math.PI / 1;
//   model8.scale.set(5500, 6500, 6000);
//   model8.position.set(-100, -310, -395);
//   scene1.add(model8);
//   model8.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//            child.material.metalness = 0.1;
//       // child.material.roughness = 2;
//       // child.material.color = new THREE.Color(0xFFFFFF);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/chairbed.glb', function (gltf7) {

//   const model7 = gltf7.scene;

//   // model7.rotation.y = Math.PI / 1;
//   model7.scale.set(4000, 3500, 4000);
//   model7.position.set(350, -260, 600);
//   scene1.add(model7);
//   model7.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//            child.material.metalness = 0;
//       // child.material.roughness = 0.9;
//       // child.material.color = new THREE.Color(0xD3D3D3);
//       child.material.needsUpdate = true;
//     }
//   });

// });

// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/curtain.glb', function (gltf5) {

//   const model5 = gltf5.scene;

//   model5.rotation.y = Math.PI / -1;
//   model5.scale.set(1650, 1800, 1500);
//   model5.position.set(-680, -350, 160);
//   scene1.add(model5);
//   model5.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       //      child.material.metalness = 0.6;
//       // child.material.roughness =0.9;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/table brn1.glb', function (gltf10) {

//   const model10 = gltf10.scene;

//   model10.rotation.y = Math.PI / -1;
//   model10.scale.set(6000, 6000, 5000);
//   model10.position.set(590, -350, -500);
//   scene1.add(model10);
//   model10.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//       //      child.material.metalness = 0.4;
//       // child.material.roughness = 0.7;
//       child.material.color = new THREE.Color(0xFFFFFF);
//       child.material.needsUpdate = true;
//     }
//   });
// });

// // gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/doorbed.glb', function (gltf11) {

// //   const model11 = gltf11.scene;

// //   model11.rotation.y = Math.PI / -2;
// //   model11.scale.set(450, 450, 450);
// //   model11.position.set(950, -300, -1260);
// //   scene1.add(model11);
// //   model11.traverse(function(child) {
// //     if (child.isMesh) {
// //       // child.castShadow = true;
// //       // child.receiveShadow = true;
 
// //            child.material.metalness = 0.5;
     
 
// //       child.material.needsUpdate = true;
// //     }
// //   });
// // });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/table 5.glb', function (gltf12) {

//   const model12 = gltf12.scene;

//   model12.rotation.y = Math.PI / -2;
//   model12.scale.set(2300, 2300, 2300);
//   model12.position.set(585, -410, -550);
//   scene1.add(model12);
//   model12.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//            child.material.metalness = 0;
//       child.material.roughness = 2;
//       // child.material.color = new THREE.Color(0xFFFFFF);
//       child.material.needsUpdate = true;
//     }
//   });

// });

// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/table brn 2.glb', function (gltf13) {

//   const model13 = gltf13.scene;

//   model13.rotation.y = Math.PI / -2;
//   model13.scale.set(6000, 6000, 5000);
//   model13.position.set(-730, -350, 0);
//   scene1.add(model13);
//   model13.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//       // child.material.metalness = 0.4;
//       // child.material.roughness = 0.9;
//       child.material.color = new THREE.Color(0xFFFFFF);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// // gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/antique_wall_clock.glb', function (gltf13) {

// //   const model13 = gltf13.scene;

// //   // model13.rotation.y = Math.PI / 1;
// //   model13.scale.set(550, 550, 550);
// //   model13.position.set(-80, 290, -920);
// //   scene1.add(model13);
// //   model13.traverse(function(child) {
// //     if (child.isMesh) {
// //       // child.castShadow = true;
// //       // child.receiveShadow = true;
// //            child.material.metalness = 0.5;
// //       // child.material.roughness =0.9;
// //       child.material.color = new THREE.Color(0xF4A460);
// //       child.material.needsUpdate = true;
// //     }
// //   });

// // });

// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/lamp 3.glb', function (gltf14) {

//   const model14 = gltf14.scene;

//   model14.rotation.y = Math.PI / 2;
//   model14.scale.set(750, 750, 750);
//   model14.position.set(50, -400, -820);
//   scene1.add(model14);
//   model14.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//            child.material.metalness = 0;
//       // child.material.roughness =0.4;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/lamp 3.glb', function (gltf15) {

//   const model15 = gltf15.scene;

//   model15.rotation.y = Math.PI / 2;
//   model15.scale.set(750, 750, 750);
//   model15.position.set(-850, -400, -820);
//   scene1.add(model15);
//   model15.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       child.material.metalness = 0.3;
//       // child.material.roughness =0.9;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });

// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/photo frame 1.glb', function (gltf16) {

//   const model16 = gltf16.scene;

//   model16.rotation.y = Math.PI / -2;
//   model16.scale.set(3000, 1000, 1000);
//   model16.position.set(400, 100, 1050);
//   scene1.add(model16);
//   model16.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       //      child.material.metalness = 0;
//       // child.material.roughness =0.9;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/photo frame 2.glb', function (gltf17) {

//   const model17 = gltf17.scene;

//   model17.rotation.y = Math.PI / -2;
//   model17.scale.set(1000, 1000, 1000);
//   model17.position.set(400, 100, 1150);
//   scene1.add(model17);
//   model17.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       //      child.material.metalness = 0;
//       // child.material.roughness =0.9;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });

var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();

renderer.domElement.addEventListener('dblclick', onClick, false);
var index = 0;
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

var middlechange;

document.getElementById('middletile').addEventListener('click', middletile);

function middletile(){
  var middle = document.getElementById('middletile').value;
middlechange = middle;
bottomchange = 1;

}

var bottomchange;

document.getElementById('floortile').addEventListener('click', floortile);

function floortile(){
  var tops = document.getElementById('floortile').value;
  bottomchange = tops;
  middlechange = 2;

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
  // var temp1 = "";
  
  if(index == 0 && middlechange == 1){


    temps = `<img  src="${filteredData[right].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
   
  }
  if(index == 1 && middlechange == 1){
    temps = `<img  src="${filteredData[right].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if(index == 2 && middlechange == 1){
    temps = `<img  src="${filteredData[top].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  // if(index == 3 && middlechange == 1){
  //    temps = `<img  src="${filteredData[bottom].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
  //   document.getElementById("img3").innerHTML = temps;
  //   openimage();
  // }
  if(index == 4 && middlechange == 1){
    temps = `<img  src="${filteredData[right].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if(index == 5 && middlechange == 1){
    temps = `<img  src="${filteredData[right].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }

  if(index == 3 && bottomchange == 0){
    temps = `<img  src="${filteredData[bottom].fileUrl}" width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }

}


function ffff(){

var images = document.getElementsByClassName("img1");
for (const img of images) {
  img.addEventListener('click', function onClick() {
    if(index == 0 && middlechange == 1){
      setTimeout(myURL, 1500);

      document.getElementById('logout1-btn-loader').style.display = "block";
  
   function myURL() {
    document.getElementById('logout1-btn-loader').style.display = "none";
    TilesChanger({ right: parseInt(img.name) });
   }
     
        
     }
     if(index == 1 && middlechange == 1){
       setTimeout(myURL, 1500);
      document.getElementById('logout1-btn-loader').style.display = "block";
  
   function myURL() {
    document.getElementById('logout1-btn-loader').style.display = "none";
        TilesChanger({ right: parseInt(img.name) });
        // TilesChanger1({ right1: parseInt(img.name) });
        // TilesChanger2({ right2: parseInt(img.name) });
   }
     }
     if(index == 2 && middlechange == 1){
       setTimeout(myURL, 1500);
      document.getElementById('logout1-btn-loader').style.display = "block";
  
   function myURL() {
    document.getElementById('logout1-btn-loader').style.display = "none";
        TilesChanger({ top: parseInt(img.name) });
        // TilesChanger1({ top1: parseInt(img.name) });
        // TilesChanger2({ top2: parseInt(img.name) });
   }
     }
  //    if(index == 3 && middlechange == 1){
  //      setTimeout(myURL, 1500);
  //     document.getElementById('logout1-btn-loader').style.display = "block";
  
  //  function myURL() {
  //   document.getElementById('logout1-btn-loader').style.display = "none";
  //       TilesChanger({ bottom: parseInt(img.name) });
  //       // TilesChanger1({ bottom1: parseInt(img.name) });
  //       // TilesChanger2({ bottom2: parseInt(img.name) });
  //  }
  //   }
     if(index == 4 && middlechange == 1){
       setTimeout(myURL, 1500);
      document.getElementById('logout1-btn-loader').style.display = "block";
  
   function myURL() {
    document.getElementById('logout1-btn-loader').style.display = "none";
        TilesChanger({ right: parseInt(img.name) });
        // TilesChanger1({ right1: parseInt(img.name) });
        // TilesChanger2({ right2: parseInt(img.name) });
   }
     }
     if(index == 5 && middlechange == 1){
       setTimeout(myURL, 1500);
      document.getElementById('logout1-btn-loader').style.display = "block";
  
   function myURL() {
    document.getElementById('logout1-btn-loader').style.display = "none";
        TilesChanger({ right: parseInt(img.name) });
        // TilesChanger1({ right1: parseInt(img.name) });
        // TilesChanger2({ right2: parseInt(img.name) });
   }
     }


   if(index == 3 && bottomchange == 0){
     setTimeout(myURL, 1500);
      document.getElementById('logout1-btn-loader').style.display = "block";
  
   function myURL() {
    document.getElementById('logout1-btn-loader').style.display = "none";
      TilesChanger({ bottom: parseInt(img.name) });
      // TilesChanger({ bottom1: parseInt(img.name) });
      // TilesChanger2({ bottom2: parseInt(img.name) });
   }
  }


  });
}
// const render = () => {

}
  
ffff();

 
  
  
// }
  
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

  if (isZooming) {
    const currentDistance = camera1.position.distanceTo(new THREE.Vector3(0, 0, 0));

    // Gradually move the camera towards the target distance with zoom speed
    const newDistance = THREE.MathUtils.lerp(currentDistance, targetDistance, zoomSpeed);

    // Calculate the new position of the camera
    const direction = new THREE.Vector3();
    camera1.getWorldDirection(direction);
    const newPosition = new THREE.Vector3().copy(direction).multiplyScalar(-newDistance);

    // Apply the new position to the camera
    camera1.position.copy(newPosition);

    // Update the controls target
    controls.target.set(0, 0, 0);

    // Update the controls
    controls1.update();

    // Check if the zooming has reached the target distance
    if (Math.abs(newDistance - targetDistance) < 0.1) {
      isZooming = false;
    }
  }


//   renderer.autoClear = false;
//   renderer.clear();
 
//   renderer.setClearColor(0x000000, 1);
//   camera.layers.set(1);
//   composer.render();

//   renderer.clearDepth();
//   camera.layers.set(0);

//   renderer.setClearColor(0x303030, 1);

//    finalComposer.render();
//   // render();


//   renderer1.clearDepth();
//   camera1.layers.set(0);

renderer.render(scene, camera);
  renderer.render(scene1, camera);

}
render();





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
  controls1.update();
  requestAnimationFrame(animate);
  render();

}
animate();



const windowResize = () => {


  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
 


  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer1.setSize(window.innerWidth, window.innerHeight);
  composer.setSize( window.innerWidth, window.innerHeight )

  render();
}

window.addEventListener('resize', windowResize, false);

