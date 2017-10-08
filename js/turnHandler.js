class TurnHandler {
  constructor() {

  }

  update(players) {
    for (let p of players) {
      if (p.finished && p.shot && p.myTurn && p.score === p.oldScore) {
        this.switchPlayer(players);
        p.shot = false;
        p.finished = false;
        p.oldScore = p.score;
      }
      if (p.finished && p.ready && p.shot && p.myTurn && p.pocketWhite) {
        this.switchPlayer(players);
        p.shot = false;
        p.finished = false;
        p.oldScore = p.score;
        p.pocketWhite = false;
      }
      if (p.finished && p.ready && p.shot && p.myTurn && p.score > p.oldScore) {
        p.shot = false;
        p.finished = false;
        p.oldScore = p.score;
      }
      if (p.finished && p.ready && p.shot && p.myTurn && p.pocketBlack) {
        p.shot = false;
        p.finished = false;
        if (p.score === 7) {
          p.score++;
        } else {
          p.lost = true;
        }
        p.pocketBlack = false;
      }
    }
  }

  switchPlayer(players) {
    if (players[0].myTurn === true) {
      players[0].myTurn = false;
      players[1].myTurn = true;
    } else if (players[1].myTurn === true) {
      players[1].myTurn = false;
      players[0].myTurn = true;
    }
  }
}
