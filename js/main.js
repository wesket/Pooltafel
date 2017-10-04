// Set up the scene, camera, and renderer as global variables.
var mainScene, scene, camera, renderer;

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
}

// Renders the scene and updates the render as needed.
function animate() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    mainScene.update();

    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
}
