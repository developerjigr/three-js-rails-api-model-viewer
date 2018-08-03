// All objects, regardless of their distance from the camera, appear the same size,
// even as the window is resized.
// WestLangley

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const CAMERA_FOV = 99;

let activeModelInScene;

initCanvas();
// renderer
let renderer = new THREE.WebGLRenderer( { canvas: document.getElementById("canvas"), antialias:true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffeded);
// scene
let scene = new THREE.Scene();

// camera
let camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight , 0.1, 1000 );
camera.position.set(16, 8, 16);
scene.add(camera);

// material
var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
var geometry = new THREE.CubeGeometry( 3, 4, 8, 2, 3, 4 );

// mesh
mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// axes
var axes = new THREE.AxisHelper();
axes.scale.set(1, 1, 1);
scene.add(axes);
setCameraFOV(CAMERA_FOV);

// scene.remove(axes);
// render scene
this.render();

// remember these initial values
//cameraDistance = (distanceBetweenPlayers / 2 / aspectRatio) / Tan(fieldOfView / 2);

var windowHeight = canvas.height;

// Event Listeners
// -----------------------------------------------------------------------------
window.addEventListener("resize" , onWindowResize, false);
function onWindowResize( event ) {
// camera.updateProjectionMatrix();
    console.log("Current Camera FOV:" , camera.fov);

    let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
    console.log("TAN FOV", tanFOV);
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    setCameraFOV(CAMERA_FOV);

    camera.updateProjectionMatrix();
    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}

function onCanvasResize( ) {
// camera.updateProjectionMatrix();
    console.log("Current Camera FOV:" , camera.fov);

    let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
    console.log("TAN FOV", tanFOV);
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    setCameraFOV(CAMERA_FOV);

    camera.updateProjectionMatrix();
    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}


(function animate() {

  //  requestAnimationFrame( animate );
    render();

})();

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
  //Add code here to remove the activeModelInScene
}

function loadModel(modelId, modelFileLocation) { //TODO: from either file name or the model id

}

function toggleSplitScreen() { //TODO: Toggle for two screens showing and singe showing.
//Have two models render side by side
}

function toggleLights() {

}

function switchOnLights(lightsArray) {

}

function lockRotation() { //TODO: Lock the rotation of the models.

}

function toggleLockYAxisLock() { //TODO: toggle the y axix rotation

}

function toggleLockXAxisLock() { // TODO: toggle the x axis rotation

}

function setCameraFOV(newFOV) { //TODO: Change the camera's field of view
//Need to make sure there is a cap on the FOV values
//tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
// camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerWidth / window.innerHeight ));
camera.fov = newFOV;
camera.updateProjectionMatrix();

camera.lookAt( mesh.position );

}

function setCameraDistance() {

}

function moveCamera(){

}

function lerpVector3() { //For smooth movement

}

function setSceneBackgroundColor() { //Change the scene colour

}

function changeModelMaterial() { //TODO: Change the colour of the ring to gold silver or rose gold.
//To decide whether to change the whole material or just change the color of the material
}

function render() {
  //mesh.rotation.y += 0.01;
  renderer.render(scene, camera );
}

function renderModel(model, wireframeOn) {

}

function setMaterialColor(object, color) {
  console.log(`Changing color from: ${object.material.color} to new colour: ${color}`);
  object.material.color = new THREE.color(color);
}

onCanvasResize();

var mesh = null;
// function initMesh() {
//     var loader = new THREE.JSONLoader();
//     loader.load('./models/rings/marmelab-logo.json', function(geometry) {
//         mesh = new THREE.Mesh(geometry);
//         scene.add(mesh);
//     });
// }

function initEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {

  });
}

var loader = new THREE.OBJLoader();

// load a resource
loader.load(
  // resource URL
  'models/rings/5.obj',
  // called when resource is loaded
  function ( object ) {
    scene.add( object );
    render();
  },
  // called when loading is in progresses
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
    console.log( 'An error happened' );
  }
);
