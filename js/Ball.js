var shinyWhiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
var sphereGeometry = new THREE.SphereGeometry(0.25, 32, 32);
var sphereMeshW = new THREE.Mesh(sphereGeometry, shinyWhiteMaterial);
sphereGeometry.translate(0,0.3,0);


scene.add(sphereMeshW);

function Ball (x, z, radius) {

    this.position.set(x, z, radius)
    var geometry = new THREE.SphereGeometry(radius, 36, 36);
    var shinyWhiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
    super(geometry, shinyWhiteMaterial);
}
var balls = [

    new Ball(1, 1, 0.3075),
    new Ball(2, 2, 0.3075),
    new Ball(1.5, 1.5, 0.3075)


]

scene.add(balls);