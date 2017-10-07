var balls;
var keuMesh;
var wballS;
class MainScene {
  constructor(scene) {
    var table = new Table(scene);

    var pLight = new THREE.PointLight(0x909070);
    pLight.position.set(0,10,0);

    var aLight = new THREE.AmbientLight(0x404040);
    aLight.position.set(0,0,0);
    scene.add(pLight, aLight);

    var keuGeometry = new THREE.CylinderGeometry(0.025, 0.05, 4, 32, 32),
        keuMaterial = new THREE.MeshStandardMaterial({ color: 0xfda43a }),
        keuMesh = new THREE.Mesh(keuGeometry, keuMaterial);
    keuGeometry.translate(0, -2, 2);


    scene.add(keuMesh);

    balls = [
        new Ball(0, -1.5, 0.10, 0, false),
        new Ball(0.1, 1.3, 0.10, 1, false),
        new Ball(-0.1, 1.3, 0.10, 2, false)
    ];

  }

  update(delta) {

      for (let i = 0; i < balls.length; i++) {
          balls[i].move(delta);
          balls[i].collide(balls);
      }
  }
}
