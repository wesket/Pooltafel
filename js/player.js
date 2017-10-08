class Player {
  constructor(playernum, striped, name) {
    this.score = 0;
    this.playernum = playernum;
    this.striped = striped;
    this.name = name;
  }

  displayStats() {
    //TODO: Implement score display on HUD.
  }

  addScore(ball, scene) {
    if (ball.striped === this.striped) {
      this.score++;
      if (this.score < 7 && ball.number === 8) {
        this.score = -99;
      }
    }
  }

  shootBall() {
    
  }
}
