// Set up the scene, camera, and renderer as global variables.
var count = 0, fps, delta, timer, mainScene, scene, camera, renderer;

init();
animate();

function init() {

  scene = new THREE.Scene();
  aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
  camera.position.set(1, 2, 4);

  // Create a renderer and add it to the DOM.
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0xCCCCFF, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  document.body.appendChild( renderer.domElement );


  // Create orbit controls.
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.userPanSpeed = 0;

  // Create an event listener that resizes the renderer with the browser window.
  window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();

  });

  // Create the scene contents in a separate js file to remove clutter.
  mainScene = new MainScene(scene);
  timer = new THREE.Clock();
}

// Renders the scene and updates the render as needed.
function animate() {
  requestAnimationFrame( animate );

  delta = timer.getDelta();
  fps = Math.trunc(1.0 / delta);

  if (count < 20) {count++;}
  else {
    document.getElementById("fps-display").textContent="FPS: " + fps;
    count = 0;
  }

  mainScene.update(delta);

  // Render the scene.
  renderer.render(scene, camera);
  controls.update();
}
