var balls;

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

    keuGeometry.rotateX(90);

    scene.add(keuMesh);

    balls = [
        new Ball(0, -1.5, 0.10,0, false),

        new Ball(0, 1.3, 0.10, 1, false),

        new Ball(-0.10, 1.5, 0.10, 2, false),
        new Ball(0.10, 1.5, 0.10, 3, false),

        new Ball(0, 1.7, 0.10, 8, false),
        new Ball(0.20, 1.7, 0.10, 5, false),
        new Ball(-0.20, 1.7, 0.10, 6, false),

        new Ball(0.30, 1.9, 0.10, 7, false),
        new Ball(-0.30, 1.9, 0.10, 4, false),
        new Ball(0.10, 1.9,0.10,  9, true),
        new Ball(-0.10, 1.9, 0.10, 10, true),

        new Ball(0, 2.1, 0.10, 11, true),
        new Ball(0.40, 2.1, 0.10, 12, true),
        new Ball(-0.40, 2.1, 0.10, 13, true),
        new Ball(0.20, 2.1, 0.10, 14, true),
        new Ball(-0.20, 2.1, 0.10, 15, true)
    ];

  }

  update(delta) {

      for (let i = 0; i < balls.length; i++) {
          balls[i].move(delta);
          balls[i].collide(balls);
      }
  }
}
