var balls;

class MainScene {
  constructor(scene) {
    var table = new Table(scene);

    var pLight = new THREE.PointLight(0x909070);
    pLight.position.set(0,10,0);

    var aLight = new THREE.AmbientLight(0x404040);
    aLight.position.set(0,0,0);
    scene.add(pLight, aLight);

    var keuGeometry = new THREE.CylinderGeometry(0.025, 0.05, 4, 32, 32);
    var keuMaterial = new THREE.MeshStandardMaterial({ color: 0xfda43a });
    var keuMesh = new THREE.Mesh(keuGeometry, keuMaterial);
    keuGeometry.translate(0, -2, 2);

    keuGeometry.rotateX(90);

    scene.add(keuMesh);

    balls = [
      new Ball(0, -1.5, 0, false),

      new Ball(0, 1.3, 1, false)
    ];

  }

  update(delta) {

    for (let i = 0; i < balls.length; i++) {
      balls[i].move(delta);
      balls[i].collide(balls);
      //balls[i].move(delta);
    }
  }
}
