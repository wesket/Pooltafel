class Player {
  constructor(playernum, striped, name, myTurn = false) {
    this.score = 0;
    this.oldScore = 0;
    this.playernum = playernum;
    this.striped = striped;
    this.name = name;
    this.myTurn = myTurn;
    this.lost = false;
    this.pocketWhite = false;
    this.pocketBlack = false;
    this.shot = false;
    this.finished = false;
    this.ready = false;
  }

  displayStats() {
    document.getElementById("score-p" + this.playernum).textContent = "Score: " + this.score;
  }

  addScore(ball, scene) {
    if (this.shot && ball.number === 8) {
      this.pocketBlack = true;
    }
    if (this.shot && ball.number === 0) {
      this.pocketWhite = true;
    }
    if (ball.striped === this.striped) {
      this.score++;
    }
  }

  shootBall(input, balls) {
    for (let b of balls) {
      if (b.velocity.x != 0 && b.velocity.y != 0) {
        this.ready = false;
        break;
      } else {
        if (this.shot) {
          this.finished = true;
        }
        this.ready = true;
      }
    }
    
    // Left
    if (input.left && this.ready) {
      balls[0].direction.rotateAround(new THREE.Vector2(0, 0), -0.025);
    }
    // Right
    if (input.right && this.ready) {
      balls[0].direction.rotateAround(new THREE.Vector2(0, 0), 0.025);
    }
    balls[0].arrowHelper.setDirection(new THREE.Vector3(
      balls[0].direction.x,
      0,
      balls[0].direction.y
    ));

    // Up
    if (input.up && this.ready) {
      balls[0].shootSpeed = (balls[0].shootSpeed >= 7) ? 7 : balls[0].shootSpeed + 0.1;
    }
    // Down
    if (input.down && this.ready) {
      balls[0].shootSpeed = (balls[0].shootSpeed <= 1) ? 1 : balls[0].shootSpeed - 0.1;
    }

    // Space
    if (input.space && this.ready) {
      this.shot = true;
      balls[0].velocity = new THREE.Vector2(
        balls[0].direction.x * balls[0].shootSpeed,
        balls[0].direction.y * balls[0].shootSpeed
      );
    }

    // Reset the position of the white ball after it's pocketed.
    if (this.ready && balls[0].position.y < 0) {
      balls[0].position.x = 0;
      balls[0].position.y = balls[0].radius;
      balls[0].position.z = -1.5;
    }

    document.getElementById("ball-direction").textContent =
      "Direction: Vect2(" + balls[0].direction.x +
      ", " + balls[0].direction.y + ")";
    document.getElementById("ball-speed").textContent = "Ball speed: " + balls[0].shootSpeed;
  }

}
