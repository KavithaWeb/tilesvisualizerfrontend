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
import { commercial, bathroom1, bathroom2 } from '../Mainjavascript/constants.js';
import { request } from '../services/api.service.js';


const canvas = document.querySelector('.commercial');

const scene = new THREE.Scene();

const scene1 = new THREE.Scene();

// scene.fog = new THREE.FogExp2(0xffffff, 0.002);


const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 2;
const far = 4000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 1500);
camera.lookAt(0, 0, 0);
scene.add(camera);


const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera1.position.set(0, 0, 1500);
camera1.lookAt(0, 0, 0);
scene1.add(camera1);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  // alpha:true
});


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0xffffff);
renderer.shadowMap.enabled = true;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 0.6;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const renderer1 = new THREE.WebGLRenderer({

  canvas: canvas,
  // alpha:true
});


renderer1.setSize(window.innerWidth, window.innerHeight);
renderer1.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer1.autoClear = false;
renderer1.setClearColor(0x101000);
renderer1.shadowMap.enabled = true;
// renderer1.outputEncoding = THREE.sRGBEncoding;
// renderer1.toneMapping = THREE.ACESFilmicToneMapping
// renderer1.toneMappingExposure = 2;

renderer.shadowMap.type = THREE.BasicShadowMap;


// let controls = new OrbitControls(camera, renderer.domElement);


// let min = controls.minDistance = 0;
// let max = controls.maxDistance = 2000;
// controls.enableDamping = true;
// controls.dampingFactor = 0.2;

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


// let controls1 = new OrbitControls(camera1, renderer1.domElement);

// controls1.minDistance = 0;
// controls1.maxDistance = 2000;

// controls1.enableDamping = true;
// controls1.dampingFactor = 0.2;



const light30 = new THREE.DirectionalLight(0xffffff, 1);
 light30.position.set(0, 0, -250);
 light30.target.position.set(0, 0, 0);
 light30.castShadow = true;

//  light30.shadow.mapSize.width = 1024;
//  light30.shadow.mapSize.height = 1024;
//  light30.shadow.camera.near = 0.2;
//  light30.shadow.camera.far = 4000;
//  light30.shadow.camera.left = -4000;
//  light30.shadow.camera.right = 4000;
//  light30.shadow.camera.top = 4000;
//  light30.shadow.camera.bottom = -4000;

 scene.add( light30.target );
 scene.add(light30);

light30.target.updateMatrixWorld();


const spotLightHelper31 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper31.position.set(0, 0, 250);
 spotLightHelper31.target.position.set(0, 0, 0);
 spotLightHelper31.castShadow= true
//  spotLightHelper31.shadow.mapSize.width = 1024;
//  spotLightHelper31.shadow.mapSize.height = 1024;
//  spotLightHelper31.shadow.camera.near = 2;
//  spotLightHelper31.shadow.camera.far = 4000;
//  spotLightHelper31.shadow.camera.left = -4000;
//  spotLightHelper31.shadow.camera.right = 4000;
//  spotLightHelper31.shadow.camera.top = 4000;
//  spotLightHelper31.shadow.camera.bottom = -4000;

 scene.add( spotLightHelper31.target );
 scene.add(spotLightHelper31);
// const spotLightHelper31spotLightHelper31 = new THREE.DirectionalLightHelper( spotLightHelper31 );
// scene1.add( spotLightHelper31spotLightHelper31 );
spotLightHelper31.target.updateMatrixWorld();

const spotLightHelper32 = new THREE.DirectionalLight(0xffffff, 2);
 spotLightHelper32.position.set(200, 0, 0);
 spotLightHelper32.target.position.set(0, 0, 0);
 spotLightHelper32.castShadow=true
//  spotLightHelper32.shadow.mapSize.width = 1024;
//  spotLightHelper32.shadow.mapSize.height = 1024;
//  spotLightHelper32.shadow.camera.near = 2;
//  spotLightHelper32.shadow.camera.far = 4000;
//  spotLightHelper32.shadow.camera.left = -4000;
//  spotLightHelper32.shadow.camera.right = 4000;
//  spotLightHelper32.shadow.camera.top = 4000;
//  spotLightHelper32.shadow.camera.bottom = -4000;

 scene.add( spotLightHelper32.target );
 scene.add(spotLightHelper32);
// const spotLightHelper32spotLightHelper32 = new THREE.DirectionalLightHelper( spotLightHelper32 );
// scene1.add( spotLightHelper32spotLightHelper32 );
spotLightHelper32.target.updateMatrixWorld();


const spotLightHelper33 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper33.position.set(-200, 0, 0);
 spotLightHelper33.target.position.set(0, 0, 0);
 spotLightHelper33.castShadow=true
//  spotLightHelper33.shadow.mapSize.width = 1024;
//  spotLightHelper33.shadow.mapSize.height = 1024;
//  spotLightHelper33.shadow.camera.near = 2;
//  spotLightHelper33.shadow.camera.far = 4000;
//  spotLightHelper33.shadow.camera.left = -4000;
//  spotLightHelper33.shadow.camera.right = 4000;
//  spotLightHelper33.shadow.camera.top = 4000;
//  spotLightHelper33.shadow.camera.bottom = -4000;

 scene.add( spotLightHelper33.target );
 scene.add(spotLightHelper33);
// const spotLightHelper33spotLightHelper33 = new THREE.DirectionalLightHelper( spotLightHelper33 );
// scene1.add( spotLightHelper33spotLightHelper33 );
spotLightHelper33.target.updateMatrixWorld();


const spotLightHelper34 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper34.position.set(0, 200, 0);
 spotLightHelper34.target.position.set(0, 0, 0);
 spotLightHelper34.castShadow=true
 spotLightHelper34.shadow.mapSize.width = 1024;
 spotLightHelper34.shadow.mapSize.height = 1024;
 spotLightHelper34.shadow.camera.near = 2;
 spotLightHelper34.shadow.camera.far = 2000;
 spotLightHelper34.shadow.camera.left = -2000;
 spotLightHelper34.shadow.camera.right = 2000;
 spotLightHelper34.shadow.camera.top = 2000;
 spotLightHelper34.shadow.camera.bottom = -2000;

 scene.add( spotLightHelper34.target );
 scene.add(spotLightHelper34);
// const spotLightHelper34spotLightHelper34 = new THREE.DirectionalLightHelper( spotLightHelper34 );
// scene1.add( spotLightHelper34spotLightHelper34 );
spotLightHelper34.target.updateMatrixWorld();


const spotLightHelper35 = new THREE.DirectionalLight(0xffffff, 1.4);
 spotLightHelper35.position.set(0, -200, 0);
 spotLightHelper35.target.position.set(0, 0, 0);
 spotLightHelper35.castShadow=true
//  spotLightHelper35.shadow.mapSize.width = 1024;
//  spotLightHelper35.shadow.mapSize.height = 1024;
//  spotLightHelper35.shadow.camera.near = 2;
//  spotLightHelper35.shadow.camera.far = 4000;
//  spotLightHelper35.shadow.camera.left = -4000;
//  spotLightHelper35.shadow.camera.right = 4000;
//  spotLightHelper35.shadow.camera.top = 4000;
//  spotLightHelper35.shadow.camera.bottom = -4000;

 scene.add( spotLightHelper35.target );
 scene.add(spotLightHelper35);
// const spotLightHelper35spotLightHelper35 = new THREE.DirectionalLightHelper( spotLightHelper35 );
// scene1.add( spotLightHelper35spotLightHelper35 );
spotLightHelper35.target.updateMatrixWorld();

// let light30 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
// light30.position.set(20, 100, 10);
// light30.target.position.set(0, 0, 0);
// lightgg.castShadow = true;
// lightgg.shadow.mapSize.width = 1024;
// lightgg.shadow.mapSize.height = 1024;
// lightgg.shadow.camera.near = 2;
// lightgg.shadow.camera.far = 4000;
// lightgg.shadow.camera.left = -4000;
// lightgg.shadow.camera.right = 4000;
// lightgg.shadow.camera.top = 4000;
// lightgg.shadow.camera.bottom = -4000;
// scene.add(lightgg);

// TOP

const light = new THREE.SpotLight(0xffffff, 0.4);
 light.position.set(0, 1200, 0);
//  light.target.position.set(-800, 150, 0)
light.castShadow = true;
camera.add(light)
scene1.add( light );


// const spotLightHelper1 = new THREE.SpotLightHelper( light );
// scene1.add( spotLightHelper1 );

// BOTTOM

const light1 = new THREE.SpotLight(0xffffff,0.2);
 light1.position.set(0, -1000, 50);
 light1.castShadow = true
scene1.add( light1 );
// const spotLightHelper2 = new THREE.SpotLightHelper( light1 );
// scene1.add( spotLightHelper2 );

// RIGHT

const light2 = new THREE.SpotLight(0xffffff,0.3);
 light2.position.set(1500, 220, 0);
 light2.target.position.set(-900, 190, 0);

 

 scene1.add( light2.target );
 scene1.add(light2);
// const spotLightHelper2 = new THREE.SpotLightHelper( light2 );
// scene1.add( spotLightHelper2 );
light2.target.updateMatrixWorld();

// LEFT

const light3 = new THREE.SpotLight(0xffffff,0.3);
 light3.position.set(-1200, -80, -110);
 light3.target.position.set(800, -80, 0);
 light3.castShadow=true


 scene1.add( light3.target );
 scene1.add(light3);
// const spotLightHelper3 = new THREE.SpotLightHelper( light3 );
// scene1.add( spotLightHelper3 );
light3.target.updateMatrixWorld();

// BACK

const light4 = new THREE.SpotLight(0xffffff, 0.5);
 light4.position.set(-30, -20, 1100);
 light4.target.position.set(-100, 110, -350);


 scene1.add( light4.target );
 scene1.add(light4);
// const spotLightHelper4 = new THREE.SpotLightHelper( light4 );
// scene1.add( spotLightHelper4 );
light4.target.updateMatrixWorld();




var light20 = new THREE.SpotLight(0xffffff, 0.1);
light20.position.set(200, 200, 110);
light20.target.position.set(800, 600, 350);

// const helper20 = new THREE.SpotLightHelper( light20, 10 );
// scene1.add( helper20 );
light20.castShadow = true;

scene1.add(light20);
light20.target.updateMatrixWorld();


var light9 = new THREE.SpotLight(0xffffff, 0.3);
light9.position.set(-370, 0, 250);
light9.target.position.set(-400, 0, 250);
// const helper9 = new THREE.SpotLightHelper( light9, 10 );
// scene1.add( helper9 );
scene1.add(light9);
light9.target.updateMatrixWorld();
// var light9 = new THREE.SpotLight(0xffffff, 0.6);
// light9.position.set(0, 0, 100);
// light9.target.position.set(-400, 0, 280);
// // const helper9 = new THREE.SpotLightHelper( light9, 10 );
// // scene1.add( helper9 );
// scene1.add(light9);
// light9.target.updateMatrixWorld();




let right = commercial.right;
let left = commercial.left;
let top = commercial.top;
let bottom = commercial.bottom;
let back = commercial.back;
let front = commercial.front;


let loader = new THREE.TextureLoader();


let imageload = []; 

let page = 0;
const size = 18;
let data = [];
let loadedIds = [];
let filteredData = [];
async function fetchMoreData(start) {
  const url = `/users?page=${page}&size=${size}`;
  const response = await request(url, {
    credentials: 'same-origin',
    method: 'GET',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/json', },
  });
    const newData = await response.json();
    data = [...data, ...newData];
    renderData(start);
    page++;
}

function renderData(start) {
    const container = document.getElementById("tiles");
     filteredData = data.filter((item) => item.tiles === "tilesimages" );
    let html = "";

    const attachedData1 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03576_b.jpg", id:"11", tiles: "tilesimages" };
    const newData1 = attachedData1;
  
    const attachedData2 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/FERRO-LIGHT-GREY.jpg", id:"12", tiles: "tilesimages" };
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


let gapValue = 0.003; 
 // Default gap value
let skyBox;
let repeatX = 3; // Default X repeat value
let repeatY = 5; // Default Y repeat value
let applyChessLayout = false; 
////////////////////////////////
function TilesChanger(obj = {}) {
 
  let materialside = [];


 materialside.push(defaultMaterial22);






  imageload.forEach((texture, ii) => {
 
    if (texture.id)  {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    }

console.log(texture.id);


    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.BackSide, roughness: 0.76, metalness: 0.9 });
  

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

  
  const cubeGeometry = new THREE.BoxGeometry(2500, 1020, 1800);

  right = obj?.right || right
  left = obj?.left || left
  top = obj?.top || top
  bottom = obj?.bottom || bottom
  back = obj?.back || back
  front = obj?.front || front

const groups = [
  { start: 0, count: 6, materialIndex: right },
  { start: 6, count: 6, materialIndex: left },
  { start: 12, count: 6, materialIndex: top },
  { start: 18, count: 6, materialIndex: bottom },
  { start: 24, count: 6, materialIndex: right },
  { start: 30, count: 6, materialIndex: right }
];

cubeGeometry.groups = groups;



if (!skyBox) {
  skyBox = new THREE.Mesh(cubeGeometry, materialside);
  skyBox.position.set(0 ,90 ,0);
  skyBox.castShadow=false;
skyBox.receiveShadow=true;
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
    const material1 = new THREE.MeshBasicMaterial({ map: imageload2, side: BackSide, transparent: true, opacity: 0.5 });
    const material2 = new THREE.MeshBasicMaterial({ map: imageload3, side: BackSide, transparent: true, opacity: 0.08 });

let materialarray = [material1, material2];

const cubeGeometry2 = new THREE.BoxGeometry(2499, 1018, 1798);


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
//     dashSize: 0.1,
//     gapSize: 0.05
// }));
// line.position.set(0 ,35 ,0);
//   scene.add( line );


let skyBox2 = new THREE.Mesh(cubeGeometry2, materialarray);
console.log(material1);
skyBox2.position.set(0 ,90 ,0);
// skyBox2.castShadow= true;
skyBox2.receiveShadow= true;

scene.add(skyBox2);
}
TilesChanger2();


// let circleGeo1 = new THREE.SphereGeometry(120,120);
// let circleMat1 = new THREE.MeshPhysicalMaterial({  clearcoat : 0.8,
//     ior : 1.15,
//     specularIntensity : 0.6,
//     roughness : 0.0,
//     thickness : 0.5,
//     transmission : 1.0,
//     sheen : 0.0, side:THREE.DoubleSide});
// let circle1 = new THREE.Mesh(circleGeo1, circleMat1);
// circle1.position.set(0, 0, 0);

// scene.add(circle1);


// let circleGeo6 = new THREE.SphereGeometry(22,60);
// let circleMat6 = new THREE.MeshBasicMaterial({color:0xFFD700, side:THREE.DoubleSide});
// let circle6 = new THREE.Mesh(circleGeo6, circleMat6);
// circle6.position.set(695 ,360 ,0);
// circle6.layers.enable(1)
// scene.add(circle6);

// let circleGeo7 = new THREE.SphereGeometry(20,70);
// let circleMat7 = new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide});
// let circle7 = new THREE.Mesh(circleGeo7, circleMat7);
// circle7.position.set(515 ,130 ,370);
// circle7.layers.set(1)
// scene.add(circle7);


// var geometry7 = new THREE.PlaneGeometry(450, 500);


// var textureLoader7 = new THREE.TextureLoader();


// textureLoader7.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-08 140207.png', function(texturei7) {

//   var materiali7 = new THREE.MeshBasicMaterial({ map: texturei7});

//   var mesh7 = new THREE.Mesh(geometry7, materiali7);
//   mesh7.position.set(0 ,50 ,620);

//   mesh7.rotation.y = Math.PI / -1;
//   scene.add(mesh7);
// });


var textureLoader8 = new THREE.TextureLoader();
var tex = textureLoader8.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/0c0166801828bc6b6d35792a7d738d3b.jpg');
let circleGeo2 = new THREE.PlaneGeometry(450,1020);
let circleMat2 = new THREE.MeshBasicMaterial({map:tex});
let circle2 = new THREE.Mesh(circleGeo2, circleMat2);
circle2.position.set(-1020 ,90 ,-890);

// circle2.rotation.y = Math.PI / 1;
scene.add(circle2);


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
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
dracoLoader.setDecoderConfig({ type: 'js' }); 
var gltfloader = new GLTFLoader();
gltfloader.setDRACOLoader(dracoLoader)


gltfloader.load('./cosmatics/chair.glb', function (gltf6) {

  const model6 = gltf6.scene;

  model6.rotation.y = Math.PI / 2;
model6.scale.set(2900, 2700, 2900);
model6.position.set(-1000, -420, -200);
  scene1.add(model6);
  model6.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;
    
      //      child.material.metalness = 0.2;
      // child.material.roughness = 1;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });
});


gltfloader.load('./cosmatics/chair.glb', function (gltf9) {

  const model9 = gltf9.scene;

  model9.rotation.y = Math.PI / 2;
  model9.scale.set(2900, 2700, 2900);
  model9.position.set(-1000, -420, 200);
  scene1.add(model9);
  model9.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;
    
    //        child.material.metalness = 0.13;
    //   child.material.roughness = 0.8;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });
});


gltfloader.load('./cosmatics/chair.glb', function (gltf8) {

  const model8 = gltf8.scene;

  // model8.rotation.y = Math.PI / 1;
  model8.scale.set(2900, 2700, 2900);
  model8.position.set(50, -420, -460);
  scene1.add(model8);
  model8.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;
    
      //      child.material.metalness = 0.1;
      // child.material.roughness = 0.6;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });

});



gltfloader.load('./cosmatics/main table.glb', function (gltf5) {

  const model5 = gltf5.scene;

  model5.rotation.y = Math.PI / 2;
  model5.scale.set(1600, 2200, 1600);
  model5.position.set(-600, -430, 0);
  scene1.add(model5);
  model5.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;
    
 
           child.material.metalness = 0;
      child.material.roughness =0.3;

      child.material.needsUpdate = true;
    }
  });
});


gltfloader.load('./cosmatics/chair.glb', function (gltf10) {

  const model10 = gltf10.scene;

  model10.rotation.y = Math.PI / -2;
  model10.scale.set(2900, 2700, 2900);
  model10.position.set(800, -420, 0);
  scene1.add(model10);
  model10.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;
    
    //        child.material.metalness = 0.2;
    //   child.material.roughness = 0.9;
      // child.material.color = new THREE.Color(0xD3D3D3);
      child.material.needsUpdate = true;
    }
  });
});




gltfloader.load('./cosmatics/frame.glb', function (gltf25) {

  const model25 = gltf25.scene;

  model25.rotation.y = Math.PI / -2;
  model25.scale.set(2500, 2500, 2500);
  model25.position.set(1038, -310, 365);
  scene1.add(model25);
  model25.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;

 
           child.material.metalness = 0.6;
    //   child.material.roughness =0.9;
      // child.material.color = new THREE.Color(0xC0C0C0);
      child.material.needsUpdate = true;
    }
  });
});
// // gltfloader.load('.cosmatics/olddoor1.glb', function (gltf11) {

// //   const model11 = gltf11.scene;

// //   model11.rotation.y = Math.PI / 2;
// //   model11.scale.set(300, 300, 300);
// //   model11.position.set(-720, -410, 0);
// //   scene1.add(model11);
// //   model11.traverse(function(child) {
// //     if (child.isMesh) {
//       // child.castShadow = true;
// //       // child.receiveShadow = true;
 
// //            child.material.metalness = 0.9;
// //       // child.material.roughness = 1;
// //       // child.material.color = new THREE.Color(0xC0C0C0);
// //       child.material.needsUpdate = true;
// //     }
// //   });
// // });


// // gltfloader.load('.cosmatics/door.glb', function (gltf11) {

// //     const model11 = gltf11.scene;
  
// //     model11.rotation.y = Math.PI / 1;
// //     model11.scale.set(3.2, 3.2, 3.2);
// //     model11.position.set(-720, -80, 0);
// //     scene1.add(model11);
// //     model11.traverse(function(child) {
// //       if (child.isMesh) {
//         // child.castShadow = true;
// //         // child.receiveShadow = true;
   
// //             //  child.material.metalness = 0.6;
// //         // child.material.roughness = 0.3;
// //         // child.material.color = new THREE.Color(0xC0C0C0);
// //         child.material.needsUpdate = true;
// //       }
// //     });
// //   });


gltfloader.load('./cosmatics/cupboard.glb', function (gltf12) {

  const model12 = gltf12.scene;

  model12.rotation.y = Math.PI / -2;
  model12.scale.set(2000, 2500, 2000);
  model12.position.set(1200, -410, 160);
  scene1.add(model12);
  model12.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
           child.material.metalness = 0;
      child.material.roughness = 0.3;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });

});

gltfloader.load('./cosmatics/cupboard 2.glb', function (gltf13) {

  const model13 = gltf13.scene;

  model13.rotation.y = Math.PI / -2;
  model13.scale.set(2000, 2480, 2000);
  model13.position.set(600, -410, 160);
  scene1.add(model13);
  model13.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
 
           child.material.metalness = 0;
      child.material.roughness =0.9;
      // child.material.color = new THREE.Color(0xC0C0C0);
      child.material.needsUpdate = true;
    }
  });
});


gltfloader.load('./cosmatics/book.glb', function (gltf13) {

  const model13 = gltf13.scene;

  // model13.rotation.y = Math.PI / 1;
  model13.scale.set(3000, 3000, 3000);
  model13.position.set(200, -540, -610);
  scene1.add(model13);
  model13.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
 
          //  child.material.metalness = 0.3;
      // child.material.roughness =0.9;
      // child.material.color = new THREE.Color(0xA52A2A);
      child.material.needsUpdate = true;
    }
  });
});

gltfloader.load('./cosmatics/book.glb', function (gltf18) {

  const model18 = gltf18.scene;

  model18.rotation.y = Math.PI / 2;
  model18.scale.set(3000, 3000, 3000);
  model18.position.set(-580, -540, 100);
  scene1.add(model18);
  model18.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
           child.material.metalness = 0.1;
      // child.material.roughness = 2;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });

});


// // gltfloader.load('.cosmatics/bulbs 2.glb', function (gltf14) {

// //   const model14 = gltf14.scene;

// //   model14.rotation.y = Math.PI / 1;
// //   model14.scale.set(2000, 2000, 2000);
// //   model14.position.set(450, -320, -640);
// //   scene1.add(model14);
// //   model14.traverse(function(child) {
// //     if (child.isMesh) {
// //       child.castShadow = true;
// //       child.receiveShadow = true;
 
// //       //      child.material.metalness = 0;
// //       // child.material.roughness =0.9;
// //       // child.material.color = new THREE.Color(0xC0C0C0);
// //       child.material.needsUpdate = true;
// //     }
// //   });

// // });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/wall plant 2.glb', function (gltf15) {

//   const model15 = gltf15.scene;

//   model15.rotation.y = Math.PI / 1;
//   model15.scale.set(400, 360, 400);
//   model15.position.set(-430, 180, -700);
//   scene1.add(model15);
//   model15.traverse(function(child) {
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

// // gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/uploads_files_3427637_Lamp.gltf', function (gltf16) {

// //   const model16 = gltf16.scene;

// //   // model16.rotation.y = Math.PI / 1;
// //   model16.scale.set(380, 380, 380);
// //   model16.position.set(-690, 270, -610);
// //   scene1.add(model16);
// //   model16.traverse(function(child) {
// //     if (child.isMesh) {
// //       // child.castShadow = true;
// //       // child.receiveShadow = true;
// //            child.material.metalness = 0.7;
// //       child.material.roughness =0.5;
// //       child.material.color = new THREE.Color(0xD2691E);
// //       child.material.needsUpdate = true;
// //     }
// //   });
// // });

// gltfloader.load('.cosmatics/uploads_files_3427637_Lamp.gltf', function (gltf17) {

//   const model17 = gltf17.scene;

//   model17.rotation.y = Math.PI / -2;
//   model17.scale.set(380, 380, 380);
//   model17.position.set(720, 270, 0);
//   scene1.add(model17);
//   model17.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//       child.material.metalness = 0.7;
//       child.material.roughness =0.5;
//       child.material.color = new THREE.Color(0xD2691E);
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
  img.addEventListener('click', function oClick() {

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
  // controls.update();
  // controls1.update();
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

