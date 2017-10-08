var keuMesh, wballS;
class MainScene {
  constructor(scene) {
    this.scene = scene;
    this.table = new Table(scene);
    this.table.drawDebug(scene);

    var pLight = new THREE.PointLight(0x909070);
    pLight.position.set(0,10,0);

    var aLight = new THREE.AmbientLight(0x404040);
    aLight.position.set(0,0,0);
    scene.add(pLight, aLight);

    var keuGeometry = new THREE.CylinderGeometry(0.025, 0.05, 4, 32, 32);
    var keuMaterial = new THREE.MeshStandardMaterial({ color: 0xfda43a });
    var keuMesh = new THREE.Mesh(keuGeometry, keuMaterial);
    keuGeometry.translate(0, -2, 2);


    this.scene.add(keuMesh);

    this.balls = [
      new Ball(0, -1.5,0, false),

      new Ball(0, 1.3, 1, false),

      new Ball(-0.10, 1.5, 2, false),
      new Ball(0.10, 1.5, 3, false),

      new Ball(0, 1.7, 8, false),
      new Ball(0.20, 1.7, 5, false),
      new Ball(-0.20, 1.7, 6, false),

      new Ball(0.30, 1.9, 7, false),
      new Ball(-0.30, 1.9, 4, false),
      new Ball(0.10, 1.9, 9, true),
      new Ball(-0.10, 1.9, 10, true),

      new Ball(0, 2.1, 11, true),
      new Ball(0.40, 2.1, 12, true),
      new Ball(-0.40, 2.1, 13, true),
      new Ball(0.20, 2.1, 14, true),
      new Ball(-0.20, 2.1, 15, true)
    ];

    this.players = [
      new Player(1, false, "Player 1"),
      new Player(2, true, "Player 2")
    ];
    this.speed = 1.0;
  }

  update(delta) {
    this.shoot();
    for (let b of this.balls) {
      b.collide(this.balls, delta);
      b.move(delta);
      b.pocket(this.players, this.table, this.scene);
    }
  }

  shoot() {
    let turnFinished = false;

    document.onkeydown = (e, delta) => {
      e = e || window.event;

      if (turnFinished === true && e.keyCode === 37) { //left
        this.balls[0].direction.rotateAround(
          new THREE.Vector2(0, 0),
          -0.05
        );

        this.balls[0].arrowHelper.setDirection(
          new THREE.Vector3(
            this.balls[0].direction.x,
            0,
            this.balls[0].direction.y
          )
        );
      }
      else if (turnFinished === true && e.keyCode === 39) { //right
        this.balls[0].direction.rotateAround(
          new THREE.Vector2(0, 0),
          0.05
        );

        this.balls[0].arrowHelper.setDirection(
          new THREE.Vector3(
            this.balls[0].direction.x,
            0,
            this.balls[0].direction.y
          )
        );
      }
      if (turnFinished === true && e.keyCode === 38) { //up
        this.speed = (this.speed >= 7) ? 7 : this.speed + 0.2;
      }
      else if (turnFinished === true && e.keyCode === 40) { //down
        this.speed = (this.speed <= 1) ? 1 : this.speed - 0.2;
      }
      else if (turnFinished === true && e.keyCode === 32) { //spaceBar
        this.balls[0].velocity = new THREE.Vector2(
          this.balls[0].direction.x * this.speed,
          this.balls[0].direction.y * this.speed
        );
      }
    }

    document.getElementById("ball-direction").textContent =
      "Direction: Vect2(" + this.balls[0].direction.x +
      ", " + this.balls[0].direction.y + ")";
    document.getElementById("ball-speed").textContent = "Ball speed: " + this.speed;

    for (let b of this.balls) {
      if (b.velocity.x != 0 && b.velocity.y != 0) {
        turnFinished = false;
        break;
      } else {
        turnFinished = true;
      }
    }
  }

}
