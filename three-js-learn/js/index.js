/*------ - -- -  - - - FLOW ->

Load the scene.
Init the lights.

Use the loader to init the model in the scene.
Set the directional lights target to the model.

Update rotations and manipulations
 - Translate, Rotate, Scale (sort) -

Render the scene

 --- ---- - - - - - - -  - - -*/
let mesh;


let AUTO_ROTATE = true;

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const CAMERA_FOV = 30;

let ANGLES = [0, 1, 2, 3, 4, 5, 6, 7];
let CURRENT_ROTATION_INDEX = 0;

ANGLES = ANGLES.map(el => {
  return el * 22.5;
  // if(el < 4) {
  //   return el * (Math.PI) / 8;
  // } else {
  //   return (el * (Math.PI) / 8);
});

let activeModelInScene;

initCanvas();
// renderer
let renderer = new THREE.WebGLRenderer( { canvas: document.getElementById("canvas"), antialias:true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xefffff, 0.7);
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight , 0.1, 150 );
camera.position.set(16, 8, 16);
scene.add(camera);
// Test material
let material = new THREE.MeshBasicMaterial( { color: 0xfffff, wireframe: true } );
let geometry = new THREE.CubeGeometry( 3, 4, 8, 2, 3, 4 );
mesh = new THREE.Mesh( geometry, material );
//scene.add( mesh );

//Lighting
let ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
directionalLight.position.set(0, 5, 0); // Topdown view.
scene.add( ambientLight );
scene.add( directionalLight );

// lights
 let controls = new THREE.OrbitControls( camera );
 controls.autoRotate = true;
 controls.enablePan = false;
 controls.enableKeys = false;

 controls.enableDamping = true;
 controls.dampingFactor = 0.25;

 controls.minZoom = 30;
 controls.maxZoom = 60;
 controls.minDistance = 35;
 controls.maxDistance = 90;

function rotateYAxisRadians(obj, index) {
  console.log("ANGLES", ANGLES[index]);
  rotateObject(obj, 0, ANGLES[index], 0);
}

function rotateForward() {
  AUTO_ROTATE = false;
  if(!activeModelInScene)
    return;

  CURRENT_ROTATION_INDEX = (++CURRENT_ROTATION_INDEX) % 8 ;
  rotateYAxisRadians(activeModelInScene, CURRENT_ROTATION_INDEX);
  //console.log("Current Rotation Index", CURRENT_ROTATION_INDEX);
}

function rotateBackward() {
  AUTO_ROTATE = false;
  if(!activeModelInScene)
    return;

  CURRENT_ROTATION_INDEX = ((CURRENT_ROTATION_INDEX-1) + 8) % 8;
  rotateYAxisRadians(activeModelInScene, CURRENT_ROTATION_INDEX);
}

 let changeAngle = function(viewAngle) {

   switch(viewAngle) {
     case "top":
       controls.minPolarAngle = -Math.PI / 2;
       controls.maxPolarAngle = -Math.PI / 2;
       break;
     case "front":
       controls.minAzimuthAngle = Math.PI;
       controls.maxAzimuthAngle = Math.PI;
       break;
     case "back":
         controls.minAzimuthAngle = -Math.PI;
         controls.maxAzimuthAngle = -Math.PI;
     break;
     case "left-front":
       controls.minAzimuthAngle = Math.PI / 4;
       controls.maxAzimuthAngle = Math.PI / 4;
       break;
    case "left":
         controls.minAzimuthAngle = Math.PI / 2;
         controls.maxAzimuthAngle = Math.PI / 2;
    break;
     case "right-front":
       controls.minAzimuthAngle = -Math.PI / 4;
       controls.maxAzimuthAngle = -Math.PI / 4;
     break;
     case "left-back":
       controls.minAzimuthAngle = Math.PI / 8;
       controls.maxAzimuthAngle = Math.PI / 8;
       break;
     case "right-back":
       controls.minAzimuthAngle = -Math.PI / 8;
       controls.maxAzimuthAngle = -Math.PI / 8;
     break;
     case "reset":
     default:
         AUTO_ROTATE = true;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI;
        controls.minAzimuthAngle = -Infinity;
        controls.maxAzimuthAngle = Infinity;
     break;
   }
 }

changeAngle("reset");
// axes
let axes = new THREE.AxisHelper();
axes.scale.set(1, 1, 1);

//loadObjectFromUrl('models/rings/mdr001.obj');

scene.add(axes);
setCameraFOV(CAMERA_FOV);

let windowHeight = canvas.height;

// Event Listeners
// -----------------------------------------------------------------------------
window.addEventListener("resize" , onWindowResize, false);
function onWindowResize( event ) {

    console.log("Current Camera FOV:" , camera.fov);
    let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
    console.log("TAN FOV", tanFOV);
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    setCameraFOV(CAMERA_FOV);
    camera.updateProjectionMatrix();
    camera.lookAt( scene.position );
    render();
}

// ------ Method for initalizing canvas
function initCanvas() {

  let canvas = document.createElement("canvas");
  canvas.id = "canvas";

  let canvasContainer = document.getElementById("canvas-container");
  canvasContainer.appendChild(canvas);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
}

// ---------- Methods for manipulating the scene

function addModelToScene(model) { //TODO: Add the model to the scene
  removeActiveModelFromScene();
  activeModelInScene = model;
  return model;
}

function removeModelFromScene() { //TODO: Remove the model from the scene
  scene.remove(activeModelInScene);
}

function changeSceneColour() {
  renderer.setClearColor( 0xffffff, 0.5 );
}

function toggleWireframe() {
  activeModelInScene.traverse(obj => {
    if(obj.isMesh) {
      obj.material.wireframe = !obj.material.wireframe;
      obj.material.wireframeLinewidth = 0.7;
    }
  });
}

function unlockRotation() { //TODO: Lock the rotation of the models.
  changeAngle("reset");
}

let yAxisLock = false;
let xAxisLock = false;

function toggleLockYAxis() { //TODO: toggle the y axix rotation
  if(!yAxisLock) {
    yAxisLock = true;
    console.log("locking y axis");
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
  } else {
    console.log("unlocking y axis");

    yAxisLock = false;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
  }
}

function toggleLockXAxis() { // TODO: toggle the x axis rotation

  if(!xAxisLock) {
    console.log("locking x axis");
    xAxisLock = true;
    controls.minAzimuthAngle = -Math.PI;
    controls.maxAzimuthAngle = -Math.PI;
  } else {
    console.log("unlocking x axis");
    xAxisLock = false;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
  }
}


//Need to make sure there is a cap on the FOV values
function setCameraFOV(newFOV) { //TODO: Change the camera's field of view
  camera.fov = newFOV;
  camera.updateProjectionMatrix();
  camera.lookAt( scene.position );
}

function setCameraDistance() {

}

function setSceneBackgroundColor(newColour) { //Change the scene colour
  scene.background = newColour;
}

function changeModelMaterial() { //TODO: Change the colour of the ring to gold silver or rose gold.
//To decide whether to change the whole material or just change the color of the material
}

function renderModel(model, wireframeOn) {

}

function setMaterialColor(object, color) {
  console.log(`Changing color from: ${object.material.color} to new colour: ${color}`);
  object.material.color = new THREE.color(color);
}

function toggleRotation() {
    AUTO_ROTATE = !AUTO_ROTATE;
    controls.autoRotate = AUTO_ROTATE;
}

function resetRotation() {
  AUTO_ROTATE = true;
  controls.autoRotate = true;
}

function loadObjectFromUrl(url) {
  // instantiate a loader
  let loader = new THREE.OBJLoader();
  // load a resource
  loader.load(
  	// resource URL
  	url,
  	// onLoad callback
  	(object) => {
      if(activeModelInScene) {
        scene.remove(activeModelInScene);
      }
      activeModelInScene = object;
      activeModelInScene.matrixAutoUpdate = true;
      activeModelInScene.matrixWorldNeedsUpdate = true;

      scene.add(activeModelInScene);
  	},
    //Whislt loading call back
  	function ( xhr ) {
  		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  	},
    //Error callback
  	function( err ) {
  		console.log( 'An error happened' );
  	}
  );
}

//setInterval(() => rotateForward(activeModelInScene), 2000);

function rotateObject(obj,degreeX=0, degreeY=0, degreeZ=0){
   degreeX = (degreeX * Math.PI)/180;
   degreeY = (degreeY * Math.PI)/180;
   degreeZ = (degreeZ * Math.PI)/180;
   obj.rotateX(degreeX);
   obj.rotateY(degreeY);
   obj.rotateZ(degreeZ);
}


let render = function() {
//  console.log("rendering");
  if(AUTO_ROTATE) {
    controls.update();
  }
  //rotateForward();
  requestAnimationFrame(render);
  renderer.render(scene, camera);

}

function loadRings() {
  Adapter.getRings().then(resp => {
  let rings = resp.rings;

  for(let ring in rings) {

    let nav_card_holder = document.getElementById("nav-ring-card-container");
    let card_action_button = document.createElement("a");
    card_action_button.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect");
    card_action_button.innerText = `View ${rings[ring].model}`;
    card_action_button.addEventListener("click", e => {
      e.preventDefault();
      console.log("showing ring", rings[ring]);
      let title = document.getElementById("ring-title");
      let model = document.getElementById("ring-model-id");
      let description = document.getElementById("ring-description");

      title.innerText = rings[ring].name;
      model.innerText = rings[ring].model;
      description.innerText = rings[ring].description;

      loadObjectFromUrl(`${rings[ring].model_url}`)

    }); //End of action button event listener
    nav_card_holder.appendChild(card_action_button);

    // console.log("Printing ring", rings[ring]);

    //
    // let card_container = document.createElement("div");
    // card_container.setAttribute("class", "card-square mdl-card mdl-shadow--2dp");
    //
    // // let card_media = div.createElement("div");
    // // card__media.setAttribute("class", "mdl-card__media");
    // // card_media.innerHTML = `<img src='${@ring.image_url}' alt=''/>`
    //
    // let card_header = document.createElement("div");
    // card_header.setAttribute("class", "mdl-card__title");
    // card_header.setAttribute("style", `background: url('${rings[ring].image_url}') bottom right 15% no-repeat #46B6AC;`);
    // card_header.innerHTML = `<h1 class="mdl-card__title-text">${rings[ring].name}</h1>`
    //
    // let card_body_text = document.createElement("div");
    // card_body_text.setAttribute("class", "mdl-card__supporting-text");
    // card_body_text.innerHTML = `<p>${rings[ring].model}</p> <p>${rings[ring].description}</p>`
    //
    // let card_actions_container = document.createElement("div");
    // card_actions_container.setAttribute("class", "mdl-card__actions mdl-card--border");
    // let card_action_button = document.createElement("a");
    // card_action_button.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect");
    // card_action_button.innerText = "View";
    // card_action_button.addEventListener("click", e => {
    //   e.preventDefault();
    //   console.log("showing ring", rings[ring]);
    //   //displayRing(ring);
    // }); //End of action button event listener
    //
    // card_actions_container.appendChild(card_action_button);
    //
    // card_container.append(card_header, card_body_text, card_actions_container);
    // nav_card_holder.appendChild(card_container);

  }
});

}


document.addEventListener("DOMContentLoaded", () => {
  //Add the buttons
  let btnToggleAutoRotate = document.getElementById("btn-toggle-rotation");
  let btnToggleWireframe = document.getElementById("btn-toggle-wireframe");
  let btnChangeSceneColor = document.getElementById("btn-change-scene-color");

  let btnYAxisLock = document.getElementById("btn-lock-axis-y");
  let btnXAxisLock = document.getElementById("btn-lock-axis-x");

  btnToggleAutoRotate.addEventListener("click", (e) => {
    e.preventDefault();
    toggleRotation();
  });

  btnToggleWireframe.addEventListener("click", (e) => {
    e.preventDefault();
    toggleWireframe();
  });

  btnChangeSceneColor.addEventListener("click", (e) => {
    e.preventDefault();
    changeSceneColour();
  });

  btnXAxisLock.addEventListener("click", (e) => {
    e.preventDefault();
    toggleLockXAxis();
  });

  btnYAxisLock.addEventListener("click", (e) => {
    e.preventDefault();
    toggleLockYAxis();
  });

  loadRings();

});



render();
//onCanvasResize();
