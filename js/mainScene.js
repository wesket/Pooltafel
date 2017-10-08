var keuMesh, wballS;
class MainScene {
  constructor(scene) {
    this.scene = scene;
    let textureLoader = new THREE.TextureLoader();

    this.table = new Table(scene);
    this.room = new Room(scene);

    var pLight = new THREE.PointLight(0x909070, 1, 50);
    pLight.position.set(0,3,0);
    pLight.castShadow = true;

    var aLight = new THREE.AmbientLight(0x101010);
    aLight.position.set(0,0,0);
    scene.add(pLight, aLight);

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

    this.turnHandler = new TurnHandler();

    this.players = [
      new Player(1, false, "Player 1", true),
      new Player(2, true, "Player 2")
    ];
    this.speed = 1.0;
    this.gameOver = false;
  }

  update(delta, input) {
    this.turnHandler.update(this.players);

    if (!this.gameOver) {
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
          document.getElementById("turn-display").textContent =
            p.name + "'s Turn!";
        }
        if (p.lost || p.score === 8) {
          this.gameOver = true;
        }
      }
    }
    else {
      document.getElementById("game-over-div").style.visibility = "visible";

      let s = "";
      if (this.players[0].lost || this.players[1].score === 8) {
        s = this.players[1].name;
      }
      else if (this.players[1].lost || this.players[0].score === 8) {
        s = this.players[0].name;
      }

      document.getElementById("player-win").textContent = s + " wins!";
    }

  }
}
