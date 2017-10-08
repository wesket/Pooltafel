class Player {
  constructor(playernum, striped, name, turn = false) {
    this.score = 0;
    this.playernum = playernum;
    this.striped = striped;
    this.name = name;
    this.turn = turn;
  }

  displayStats() {
    //TODO: Implement score display on HUD.
  }

  addScore(ball, scene) {
    if (ball.striped === this.striped) {
      this.score++;
    }
  }
}
