var keuMesh, wballS;
class MainScene {
  constructor(scene) {
    this.scene = scene;

    this.table = new Table(scene);

    var pLight = new THREE.PointLight(0x909070);
    pLight.position.set(0,10,0);

    var aLight = new THREE.AmbientLight(0x404040);
    aLight.position.set(0,0,0);
    scene.add(pLight, aLight);

		var keuGeometry = new THREE.CylinderGeometry(0.025, 0.05, 4, 32, 32),
			keuMaterial = new THREE.MeshStandardMaterial({ color: 0xfda43a }),
			keuMesh = new THREE.Mesh(keuGeometry, keuMaterial);
		keuMesh.position.y= 0.3;
		keuMesh.rotateX(Math.PI/2);
		keuMesh.position.z -=3.6;
		keuMesh.rotateX(0.1);


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
      new Player(1, false, "Player 1", true),
      new Player(2, true, "Player 2")
    ];
    this.speed = 1.0;
    this.gameOver = false;
    this.turnFinished = false;
    this.playerTurn = 0;
  }

  update(delta, input) {
    if (!this.gameOver) {
      for (let b of this.balls) {
        if (b.velocity.x != 0 && b.velocity.y != 0) {
          this.turnFinished = false;
          break;
        } else {
          this.turnFinished = true;
        }
      }
      for (let b of this.balls) {
        b.collide(this.balls, delta);
        b.move(delta);
        b.pocket(this.players, this.table, this.scene, this);
      }

      for (let p of this.players) {
        p.displayStats();
        if (p.myTurn) {
          p.ready = this.turnFinished;
          p.shootBall(input, this.balls);
        }
      }
    }
    else {
      document.getElementById("game-over-div").style.visibility = "visible";

      let s = (this.players[0].score > this.players[1].score) ?
        this.players[0].name : this.players[1].name;

      document.getElementById("player-win").textContent = s + " wins!";
    }

  }
}
