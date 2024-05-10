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
import { Reflector } from 'https://threejs.org/examples/jsm/objects/Reflector.js'
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://threejs.org/examples/jsm/loaders/DRACOLoader.js";
import { BackSide, DoubleSide } from 'three';

import { kitchen, bathroom1, bathroom2, kitchenplane } from '../Mainjavascript/constants.js';
import { request } from '../services/api.service.js';
const canvas = document.querySelector('.kitchen1');

const scene = new THREE.Scene();
// THREE.ColorManagement.enabled = false;

const scene1 = new THREE.Scene();



const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 4000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 415);
camera.lookAt(0, 0, 0)

scene.add(camera);


const renderer = new THREE.WebGLRenderer({
antialias:true,
  canvas: canvas,
  alpha: true
 
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);

renderer.setClearColor( 0x000000);
renderer.shadowMap.enabled=true;
renderer.autoClear = false;
// renderer.toneMappingExposure = 0.8;
// renderer.toneMapping = THREE.LinearToneMapping
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.shadowMap.needsUpdate = true;
// THREE.ColorManagement.legacyMode = true


let controls = new OrbitControls(camera, renderer.domElement);


let min = controls.minDistance = 0;
let max = controls.maxDistance = 410;
controls.enableDamping = true;
controls.dampingFactor = 0.2;

setTimeout(rotate, 8000);

function rotate() {
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
}


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

// TOP


const light30 = new THREE.DirectionalLight(0xffffff, 1);
 light30.position.set(0, 0, -250);
 light30.target.position.set(0, 0, 0);
 light30.castShadow= true

 scene.add( light30.target );
 scene.add(light30);
// const spotLightHelper30 = new THREE.SpotLightHelper( light30 );
// scene1.add( spotLightHelper30 );
light30.target.updateMatrixWorld();


const spotLightHelper31 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper31.position.set(0, 0, 250);
 spotLightHelper31.target.position.set(0, 0, 0);
 spotLightHelper31.castShadow= true

 scene.add( spotLightHelper31.target );
 scene.add(spotLightHelper31);
// const spotLightHelper31spotLightHelper31 = new THREE.DirectionalLightHelper( spotLightHelper31 );
// scene1.add( spotLightHelper31spotLightHelper31 );
spotLightHelper31.target.updateMatrixWorld();

const spotLightHelper32 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper32.position.set(200, 0, 0);
 spotLightHelper32.target.position.set(0, 0, 0);
 spotLightHelper32.castShadow=true

 scene.add( spotLightHelper32.target );
 scene.add(spotLightHelper32);
// const spotLightHelper32spotLightHelper32 = new THREE.DirectionalLightHelper( spotLightHelper32 );
// scene1.add( spotLightHelper32spotLightHelper32 );
spotLightHelper32.target.updateMatrixWorld();


const spotLightHelper33 = new THREE.DirectionalLight(0xffffff, 1);
 spotLightHelper33.position.set(-200, 0, 0);
 spotLightHelper33.target.position.set(0, 0, 0);
 spotLightHelper33.castShadow=true

 scene.add( spotLightHelper33.target );
 scene.add(spotLightHelper33);
// const spotLightHelper33spotLightHelper33 = new THREE.DirectionalLightHelper( spotLightHelper33 );
// scene1.add( spotLightHelper33spotLightHelper33 );
spotLightHelper33.target.updateMatrixWorld();


const spotLightHelper34 = new THREE.DirectionalLight(0xffffff, 1.1);
 spotLightHelper34.position.set(0, 200, 0);
 spotLightHelper34.target.position.set(0, 0, 0);
 spotLightHelper34.castShadow=true

 scene.add( spotLightHelper34.target );
 scene.add(spotLightHelper34);
// const spotLightHelper34spotLightHelper34 = new THREE.DirectionalLightHelper( spotLightHelper34 );
// scene1.add( spotLightHelper34spotLightHelper34 );
spotLightHelper34.target.updateMatrixWorld();


const spotLightHelper35 = new THREE.DirectionalLight(0xffffff, 1.2);
 spotLightHelper35.position.set(0, -200, 0);
 spotLightHelper35.target.position.set(0, 0, 0);
 spotLightHelper35.castShadow=true

 scene.add( spotLightHelper35.target );
 scene.add(spotLightHelper35);
// const spotLightHelper35spotLightHelper35 = new THREE.DirectionalLightHelper( spotLightHelper35 );
// scene1.add( spotLightHelper35spotLightHelper35 );
spotLightHelper35.target.updateMatrixWorld();

// const g = new THREE.SpotLight(0xffffff, 0.6);
//  g.position.set(-80, 380, 0);
// //  g.target.position.set(-800, 150, 0);
// g.castShadow = true;
// g.shadow.mapSize.width = 1024
// g.shadow.mapSize.height = 1024

// g.shadow.camera.near = 0.1
// g.shadow.camera.far = 4000
// g.shadow.camera.fov = 60

// scene.add( g );


// const spotLightHelper1 = new THREE.SpotLightHelper( light );
// scene1.add( spotLightHelper1 );

// TOP

const light = new THREE.SpotLight(0xffffff, 0.6);
 light.position.set(0, 1200, 0);
//  light.target.position.set(-800, 150, 0)


scene1.add( light );


// const spotLightHelper1 = new THREE.SpotLightHelper( light );
// scene1.add( spotLightHelper1 );

// BOTTOM

const light1 = new THREE.SpotLight(0xffffff,0.4);
 light1.position.set(0, -900, 50);

scene1.add( light1 );
// const spotLightHelper2 = new THREE.SpotLightHelper( light1 );
// scene1.add( spotLightHelper2 );

// RIGHT

const light2 = new THREE.SpotLight(0xffffff,0.5);
 light2.position.set(1200, 220, 0);
 light2.target.position.set(-900, 190, 0);

 

 scene1.add( light2.target );
 scene1.add(light2);
// const spotLightHelper2 = new THREE.SpotLightHelper( light2 );
// scene1.add( spotLightHelper2 );
light2.target.updateMatrixWorld();

// LEFT

const light3 = new THREE.SpotLight(0xffffff,1);
 light3.position.set(-1200, -80, -110);
 light3.target.position.set(800, -80, 0);
 light3.castShadow=true


 scene1.add( light3.target );
 scene1.add(light3);
// const spotLightHelper3 = new THREE.SpotLightHelper( light3 );
// scene1.add( spotLightHelper3 );
light3.target.updateMatrixWorld();

// BACK

const light4 = new THREE.SpotLight(0xffffff, 0.8);
 light4.position.set(-30, -20, 1100);
 light4.target.position.set(-100, 110, -350);


 scene1.add( light4.target );
 scene1.add(light4);
// const spotLightHelper4 = new THREE.SpotLightHelper( light4 );
// scene1.add( spotLightHelper4 );
light4.target.updateMatrixWorld();


// const hemiLight = new THREE.AmbientLight(0xffffff, 1);
// scene1.add(hemiLight);
// const light50 = new THREE.SpotLight(0xffffff, 0.8);
//  light50.position.set(-600, -400, -100);
//  light50.target.position.set(-600, 110, -350);


//  scene1.add( light50.target );
//  scene1.add(light50);
// // const spotLightHelper50 = new THREE.SpotLightHelper( light50 );
// // scene1.add( spotLightHelper50 );
// light50.target.updateMatrixWorld();
// FLUSH

// var light5 = new THREE.SpotLight(0xffffff, 0.4);
// light5.position.set(300, -110, 60);
// light5.target.position.set(500, -90, 50);
// light5.castShadow=true;
// // const helper1 = new THREE.SpotLightHelper( light5, 15 );
// // scene1.add( helper1 );
// scene1.add(light5);
// light5.target.updateMatrixWorld();


// var lightshower = new THREE.SpotLight(0xffffff, 0.1);
// lightshower.position.set(70, -60, 0);
// lightshower.target.position.set(500, -50, 70);
// // lightshower.castShadow=true;
// // const helper2 = new THREE.SpotLightHelper( lightshower, 15 );
// // scene1.add( helper2 );
// scene1.add(lightshower);
// lightshower.target.updateMatrixWorld();

// var lightshower = new THREE.SpotLight(0xFFB6C1, 0.2);
// lightshower.position.set(20, -50, 0);
// lightshower.target.position.set(500, -120, 170);
// lightshower.castShadow=true;
// // const helper2 = new THREE.SpotLightHelper( lightshower, 15 );
// // scene1.add( helper2 );
// scene1.add(lightshower);
// lightshower.target.updateMatrixWorld();

// // HANGER

// var light6 = new THREE.SpotLight(0xffffff, 2);
// light6.position.set(210, 0, -180);
// light6.target.position.set(500, 50, -390);
// // const helper2 = new THREE.SpotLightHelper( light6, 10 );
// // scene1.add( helper2 );
// scene1.add(light6);
// light6.target.updateMatrixWorld();

// const lightb = new THREE.PointLight( 0xffffff, 0.1 ); light.position.set( 0, 0, 0 ); scene1.add( lightb );
// // HANGER

// var light15 = new THREE.SpotLight(0xffffff, 2);
// light15.position.set(180, 20, -165);
// light15.target.position.set(500, 110, -400);
// // const helper15 = new THREE.SpotLightHelper( light15, 10 );
// // scene1.add( helper15 );

// scene1.add(light15);
// light15.target.updateMatrixWorld();

// // HAND SHOWER

var light7 = new THREE.SpotLight(0xffffff,0.1);
light7.position.set(0, 100, 100);
light7.target.position.set(0, -200, 150);

// const helper3 = new THREE.SpotLightHelper( light7, 10 );
// scene1.add( helper3 );


light7.shadow.camera.far = 3000
light7.shadow.camera.fov = 60
scene1.add(light7);
light7.target.updateMatrixWorld();

// // SHOWER

// var light20 = new THREE.SpotLight(0xffffff, 4);
// light20.position.set(90, 130, 110);
// light20.target.position.set(500, 600, 350);

// // const helper20 = new THREE.SpotLightHelper( light20, 10 );
// // scene1.add( helper20 );
// light20.castShadow = true;

// scene1.add(light20);
// light20.target.updateMatrixWorld();

// // TAP

// var light8 = new THREE.SpotLight(0xC0C0C0, 0.1);
// light8.position.set(160, 0,40);
// light8.target.position.set(0, 0, -70);

// // const helper4 = new THREE.SpotLightHelper( light8, 10 );
// // scene1.add( helper4 );
// scene1.add(light8);
// light8.target.updateMatrixWorld();


// // var light21 = new THREE.SpotLight(0xffffff, 0.1);
// // light21.position.set(0, 0, -290);
// // light21.target.position.set(0, -100, -290);

// // // const helper21 = new THREE.SpotLightHelper( light21, 10 );
// // // scene1.add( helper21 );
// // 
// // scene1.add(light21);
// // light21.target.updateMatrixWorld();

// // DOOR

var light9 = new THREE.SpotLight(0xffffff, 0.6);
light9.position.set(-180, 0, 100);
light9.target.position.set(-400, 0, 200);
// const helper9 = new THREE.SpotLightHelper( light9, 10 );
// scene1.add( helper9 );
scene1.add(light9);
light9.target.updateMatrixWorld();



let right = kitchenplane.right;
let left = kitchenplane.left;
let top = kitchenplane.top;
let bottom = kitchenplane.bottom;
let back = kitchenplane.back;
let front = kitchenplane.front;




let loader = new THREE.TextureLoader();

let imageload = []; 

let page = 0;
const size = 18;
let data = [];
let loadedIds = [];
let filteredData=[];
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

function renderData(start) {
    const container = document.getElementById("tiles");
    filteredData = data.filter((item) => item.tiles === "tilesimages" );
    let html = "";

    const attachedData1 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03576_b.jpg", id:"11", tiles: "tilesimages" };
    const newData1 = attachedData1;
  
    const attachedData2 = { fileUrl: "https://jabez-tiles.s3.ap-south-1.amazonaws.com/PW03470_b.jpg", id:"12", tiles: "tilesimages" };
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

////////////////////////////////

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
      texture.repeat.set(5, 5);
    }

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

  
  const cubeGeometry = new THREE.BoxGeometry(1460, 890, 1250);

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
    skyBox.position.set(0 ,57 ,0);
    skyBox.castShadow = true;
    skyBox.receiveShadow = true;
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
  
  // Add event listeners to the rotation buttons
  const rotate45Button = document.getElementById('rotate45Button');
  
  const rotate90Button = document.getElementById('rotate90Button');
  
  const rotate135Button = document.getElementById('rotate135Button');
  
  const rotate180Button = document.getElementById('rotate180Button');
  
  rotate45Button.addEventListener('click', () => {
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
  
}



function TilesChanger3(obj = {}) {

  var imageload2 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Blur-PNG-Picture.png'}?not-from-cache-please`)
  var imageload3 = loader.load(`${'https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-04-24 203442.png'}?not-from-cache-please`)
    const material1 = new THREE.MeshBasicMaterial({ map: imageload2, side: BackSide, transparent: true, opacity: 0.7 });
    const material2 = new THREE.MeshBasicMaterial({ map: imageload3, side: BackSide, transparent: true, opacity: 0.08 });

let materialarray = [material1, material2];


const cubeGeometry3 = new THREE.BoxGeometry(1459, 889, 1249);

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

const edges = new THREE.EdgesGeometry( cubeGeometry3 );
  const line = new THREE.LineSegments( edges, new THREE.LineDashedMaterial({
    color: 0x808080,
    dashSize: 0.1,
    gapSize: 0.05
}));
line.position.set(0 ,57 ,0);
  scene.add( line );


const skyBox3 = new THREE.Mesh(cubeGeometry3, materialarray);
console.log(material1);
skyBox3.position.set(0 ,57 ,0);
skyBox3.castShadow= true;
skyBox3.receiveShadow= true;

  scene.add(skyBox3);

}
TilesChanger3();

// let circleGeo1 = new THREE.SphereGeometry(20,60);
// let circleMat1 = new THREE.MeshBasicMaterial({color:0xDAA520});
// let circle1 = new THREE.Mesh(circleGeo1, circleMat1);
// circle1.position.set(150 ,205 ,255);
// // circle1.layers.enable(1)
// scene.add(circle1);


// let circleGeo2 = new THREE.SphereGeometry(20,60);
// let circleMat2 = new THREE.MeshBasicMaterial({color:0xDAA520});
// let circle2 = new THREE.Mesh(circleGeo2, circleMat2);
// circle2.position.set(150 ,200 ,-100);
// // circle2.layers.enable(1)
// scene.add(circle2);



var geometry = new THREE.PlaneGeometry(338, 615);

// create a texture loader
var textureLoader = new THREE.TextureLoader();

// load the texture
textureLoader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-09 134730.png', function(texturei) {
  // create a material with the texture


  
  var materiali = new THREE.MeshBasicMaterial({ map: texturei });

  // create the mesh using the geometry and material
  var mesh = new THREE.Mesh(geometry, materiali);
  mesh.position.set(-213 ,-84 ,-400);
  // add the mesh to the scene
  scene1.add(mesh);
});
// scene


var geometry1 = new THREE.PlaneGeometry(170, 290);

// create a texture loader
var textureLoader1 = new THREE.TextureLoader();

// load the texture
textureLoader1.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-09 135833.png', function(texturei1) {
  // create a material with the texture
  var materiali1 = new THREE.MeshBasicMaterial({ map: texturei1});

  // create the mesh using the geometry and material
  var mesh1 = new THREE.Mesh(geometry1, materiali1);
  mesh1.position.set(-464 ,5 ,-395);
 
  scene1.add(mesh1);
});



var geometry2 = new THREE.PlaneGeometry(240, 300);

// create a texture loader
var textureLoader2 = new THREE.TextureLoader();

// load the texture
textureLoader2.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-09 145255.png', function(texturei2) {
  // create a material with the texture
  var materiali2 = new THREE.MeshBasicMaterial({ map: texturei2});

  // create the mesh using the geometry and material
  var mesh2 = new THREE.Mesh(geometry2, materiali2);
  mesh2.position.set(476 ,-275 ,25);
  mesh2.rotation.y = Math.PI / -2;
  scene1.add(mesh2);
});


var geometry5 = new THREE.PlaneGeometry(300, 400);

// create a texture loader
var textureLoader5 = new THREE.TextureLoader();

// load the texture
textureLoader5.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-08 140207.png', function(texturei5) {
  // create a material with the texture
  var materiali5 = new THREE.MeshBasicMaterial({ map: texturei5 });

  // create the mesh using the geometry and material
  var mesh5 = new THREE.Mesh(geometry5, materiali5);
  mesh5.position.set(400 ,180 ,-620);
  // add the mesh to the scene
  scene.add(mesh5);
});



var geometry6 = new THREE.PlaneGeometry(1250, 325);

// create a texture loader
var textureLoader6 = new THREE.TextureLoader();

// load the texture
textureLoader6.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-10 144538.png', function(texturei6) {
  // create a material with the texture
  var materiali6 = new THREE.MeshBasicMaterial({ map: texturei6});

  // create the mesh using the geometry and material
  var mesh6 = new THREE.Mesh(geometry6, materiali6);
  mesh6.position.set(728 ,337 ,0);
  mesh6.rotation.y = Math.PI / -2;
  // mesh6.layers.set(1);
  scene.add(mesh6);
});

var geometry7 = new THREE.PlaneGeometry(450, 500);

// create a texture loader
var textureLoader7 = new THREE.TextureLoader();

// load the texture
textureLoader7.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/Screenshot 2023-05-08 140207.png', function(texturei7) {
  // create a material with the texture
  var materiali7 = new THREE.MeshBasicMaterial({ map: texturei7 });

  // create the mesh using the geometry and material
  var mesh7 = new THREE.Mesh(geometry7, materiali7);
  mesh7.position.set(-220 ,180 ,620);
  // add the mesh to the scene
  mesh7.rotation.y = Math.PI / -1;
  scene.add(mesh7);
});
var geometry8 = new THREE.PlaneGeometry(500, 13);


  var materiali8 = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

  // create the mesh using the geometry and material
  var mesh8 = new THREE.Mesh(geometry8, materiali8);
  mesh8.position.set(726 ,162 ,-375);
  // add the mesh to the scene
  mesh8.layers.set(1)
  mesh8.rotation.y = Math.PI / -2;
  scene.add(mesh8);

  var geometry9 = new THREE.PlaneGeometry(500, 13);


  var materiali9 = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

  // create the mesh using the geometry and material
  var mesh9 = new THREE.Mesh(geometry9, materiali9);
  mesh9.position.set(726 ,162 ,375);
  // add the mesh to the scene
  mesh9.layers.set(1)
  mesh9.rotation.y = Math.PI / -2;
  scene.add(mesh9);

var composer = new EffectComposer(renderer);   
        const renderScene = new RenderPass(scene, camera);
        composer.addPass(renderScene);
      
        const params = {
          exposure: 2,
          strength: 0.6,
          threshold: 0,
          radius: 0
        };
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          1.2,
          0.4,
          0.85
        );

        bloomPass.threshold = params.threshold;
        bloomPass.strength = params.strength;
        bloomPass.radius = params.radius;
        bloomPass.renderToScreen = true;
     
        
        
        composer.renderToScreen = false;
        // composer.setSize(window.innerWidth, window.innerHeight);
        composer.addPass(bloomPass);
        
        
        const finalPass = new ShaderPass(
          new THREE.ShaderMaterial({
            uniforms: {
              baseTexture: { value: null },
              bloomTexture: { value: composer.renderTarget2.texture }
            },
            vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`,
            fragmentShader: `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
            varying vec2 vUv;
            void main() {
              gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );            
            }
            `,
            defines: {}
          }),
          "baseTexture"
        );
        finalPass.needsSwap = false;

        const finalComposer = new EffectComposer(renderer);
  
        finalComposer.addPass(renderScene);
 
        finalComposer.addPass(finalPass);


const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/js/libs/draco/')

var gltfloader = new GLTFLoader();
gltfloader.setDRACOLoader(dracoLoader)


gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/kitchenset.glb', function (gltf6) {

  const model6 = gltf6.scene;

  model6.rotation.y = Math.PI / -2;
  model6.scale.set(7300, 7900, 7300);
  model6.position.set(370, -390, -155);
  scene1.add(model6);
  model6.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
           child.material.metalness = 0;
      child.material.roughness = 0.9;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });

});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/kitchen table 2.glb', function (gltf8) {

  const model8 = gltf8.scene;

  model8.rotation.y = Math.PI / -2;
  model8.scale.set(6500, 7950, 6300);
  model8.position.set(300, -390, -80);
  scene1.add(model8);
  model8.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
      
      child.material.metalness = 0.5;
      child.material.roughness = 0.8;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });

});


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/kitchentable1.glb', function (gltf7) {

//   const model7 = gltf7.scene;

//   model7.rotation.y = Math.PI / -2;
//   model7.scale.set(6320, 6920, 6320);
//   model7.position.set(300, -390, 10);
//   scene1.add(model7);
//   model7.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
//            child.material.metalness = 0.7;
//       child.material.roughness = 0.3;
//       // child.material.color = new THREE.Color(0xDAA520);
//       child.material.needsUpdate = true;
//     }
//   });

// });

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/shelf new.glb', function (gltf5) {

  const model5 = gltf5.scene;

  model5.rotation.y = Math.PI / -2;
  model5.scale.set(7840, 7000, 7840);
  model5.position.set(380, -270, -150);
  scene1.add(model5);
  model5.traverse(function(child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
 
           child.material.metalness = 0.6;
      child.material.roughness =0.9;
      // child.material.color = new THREE.Color(0xC0C0C0);
      child.material.needsUpdate = true;
    }
  });

});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/kitchendoor.glb', function (gltf4) {

  const model4 = gltf4.scene;

  model4.rotation.y = Math.PI / -2;
  model4.scale.set(7000, 8500, 7000);
  model4.position.set(420, -380, -320);
  scene1.add(model4);
  model4.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
 
      //      child.material.metalness = 0.3;
      // child.material.roughness = 1;
      // child.material.color = new THREE.Color(0xC0C0C0);
      child.material.needsUpdate = true;
    }
  });

});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/jar.glb', function (gltf3) {

  const model3 = gltf3.scene;

  model3.rotation.y = Math.PI / 1;
  model3.scale.set(4000, 3700, 4000);
  model3.position.set(-600, -390, 500);
  scene1.add(model3);
  model3.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
 
           child.material.metalness = 0.4;
      child.material.roughness = 0.7;
      // child.material.color = new THREE.Color(0xC0C0C0);
      child.material.needsUpdate = true;
    }
  });

});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/drought.glb', function (gltf2) {

  const model2 = gltf2.scene;

  model2.rotation.y = Math.PI / -2;
  model2.scale.set(8200, 7200, 8200);
  model2.position.set(350, -290, -155);
  scene1.add(model2);
  model2.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
 
           child.material.metalness = 0.7;
      child.material.roughness =0.24;
      child.material.color = new THREE.Color(0xFFF8DC);
      child.material.needsUpdate = true;
    }
  });

});

gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/jar3.glb', function (gltf1) {

  const model1 = gltf1.scene;

  model1.rotation.y = Math.PI / -2;
  model1.scale.set(1400, 1900, 1400);
  model1.position.set(590, -130, -530);
  scene1.add(model1);
  model1.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
   
    
           child.material.metalness = 0.5;
      child.material.roughness = 0.2;
      // child.material.color = new THREE.Color(0xFFFFFF);
      child.material.needsUpdate = true;
    }
  });

});


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/bulb.glb', function (gltf5) {

//   const model5 = gltf5.scene;

//   model5.rotation.y = Math.PI / -2;
//   model5.scale.set(1100, 1100, 1100);
//   model5.position.set(150, 240, -180);
//   scene1.add(model5);
//   model5.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       //      child.material.metalness = 0.8;
//       // child.material.roughness =0.5;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });


// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/bulb.glb', function (gltf5) {

//   const model5 = gltf5.scene;

//   model5.rotation.y = Math.PI / -2;
//   model5.scale.set(1100, 1100, 1100);
//   model5.position.set(150, 240, 180);
//   scene1.add(model5);
//   model5.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       //      child.material.metalness = 0.6;
//       // child.material.roughness =0.6;
//       // child.material.color = new THREE.Color(0xC0C0C0);
//       child.material.needsUpdate = true;
//     }
//   });

// });

// gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/blender.glb', function (gltf0) {

//   const model0 = gltf0.scene;

//   model0.rotation.y = Math.PI / -2;
//   model0.scale.set(50, 50, 50);
//   model0.position.set(600, -125, 460);
//   scene1.add(model0);
//   model0.traverse(function(child) {
//     if (child.isMesh) {
//       // child.castShadow = true;
//       // child.receiveShadow = true;
 
//       //      child.material.metalness = 0.7;
//       // child.material.roughness =0.24;
     
//       child.material.needsUpdate = true;
//     }
//   });

// });


gltfloader.load('https://jabez-tiles.s3.ap-south-1.amazonaws.com/chicken_plate.glb', function (gltf5) {

  const model5 = gltf5.scene;

  model5.rotation.y = Math.PI / -2;
  model5.scale.set(300, 300, 300);
  model5.position.set(100, -125, 380);
  scene1.add(model5);
  model5.traverse(function(child) {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
 
      //      child.material.metalness = 0.6;
      // child.material.roughness =0.6;
      // child.material.color = new THREE.Color(0xC0C0C0);
      child.material.needsUpdate = true;
    }
  });

});

var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();

var index=0;

// var middlechange;


// document.getElementById('middletile').addEventListener('click', middletile);

// function middletile(){
//   var middle = document.getElementById('middletile').value;
// middlechange = middle;
// bottomchange = 1;
// topchange = 0;
// }

// var bottomchange;

// document.getElementById('bottomtile').addEventListener('click', bottomtile);

// function bottomtile(){
//   var bottoms = document.getElementById('bottomtile').value;
//   bottomchange = bottoms;

//   topchange = 0;
// }

// var topchange;

// document.getElementById('toptile').addEventListener('click', toptile);

// function toptile(){
//   var tops = document.getElementById('toptile').value;
//   topchange = tops;

//   bottomchange = 1;
// }


// document.getElementById('floortile').addEventListener('click', floortile);

// function floortile(){
//   var tops = document.getElementById('floortile').value;
//   bottomchange = tops;

//   topchange = 0;
// }

renderer.domElement.addEventListener('dblclick', onClick, false);

function onClick(event) {
  event.preventDefault();
 
  openimage1();
 
  // openNav();
 
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



    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
   
  }
  if(index == 1 && middlechange == 1){
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if(index == 2 && middlechange == 1){
    temps = `<img  src="${filteredData[top].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  // if(index == 3 && middlechange == 1){
  //    temps = `<img  src="${filteredData[bottom].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
  //   document.getElementById("img3").innerHTML = temps;
  //   openimage();
  // }
  if(index == 4 && middlechange == 1){
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }
  if(index == 5 && middlechange == 1){
    temps = `<img  src="${filteredData[right].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
    document.getElementById("img3").innerHTML = temps;
    openimage();
  }

  if(index == 3 && bottomchange == 0){
    temps = `<img  src="${filteredData[bottom].fileUrl}"  width="90" height="90" alt="Snow" style=" z-index: 4; float:right; margin-right:20px; padding:0px; border: 4px solid white;" >`
  
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


  renderer.autoClear = false;


  renderer.autoClear = false;
  renderer.clear();
 
  renderer.setClearColor(0x000000, 1);
  camera.layers.set(1);
  composer.render();

  renderer.clearDepth();
  camera.layers.set(0);

  renderer.setClearColor(0x303030, 1);
   finalComposer.render();
 

   renderer.clearDepth();
   camera.layers.set(0);
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
  
                      
  renderer.setSize(window.innerWidth, window.innerHeight);

  composer.setSize( window.innerWidth, window.innerHeight )
  render();
  // render();
}

window.addEventListener('resize', windowResize, false);

