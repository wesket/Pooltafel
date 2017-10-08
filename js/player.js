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
	function applyRules() {
		let player = players[0];
		let otherPlay = players[1];
		let ownPut = false;
		let otherPut = false;
		let balls = player.PuttedBalls;
		if (balls.length > 0) {
			if (player.BallType === 0) {
				for (let i = 0; i < balls.length; i++) {
					switch (balls[i].type) {
						case 1:
							player.BallType = 1;
							otherPlay.BallType = 2;
							break;
						case 2:
							player.BallType = 2;
							otherPlay.BallType = 1;
							break;
					}
					if (balls[i].type !== 0 && balls[i].type !== 8)
						break;
				}
			}
			if (player.BallType !== 0) {
				for (let i = 0; i < balls.length; i++) {
					switch (balls[i].type) {
						case 0:
							switchPlayer();
							break;
						case 8:
							if (player.Score >= 7) {
								switchPlayer();
							}
							else
								alert(player.Name + " Wins");

							break;
						case 1:
							if (player.BallType === 1) {
								updateScore(currentPlayer, 1);
								ownPut = true;
							}
							else if (otherPlay.BallType === 1) {
								updateScore(otherPlayer, 1);
								otherPut = true;
							}
							break;
						case 2:
							if (player.BallType === 2) {
								updateScore(currentPlayer, 1);
								ownPut = true;
							}
							else if (otherPlay.BallType === 2) {
								updateScore(otherPlayer, 1);
								otherPut = true;
							}
							break;
					}
				}
			}
		}
		if ((otherPut && !ownPut) || !ownPut)
			switchPlayer();
		if (collisionCount === 0 && balls.length === 0)
			switchPlayer();
	}

	function switchPlayer() {
		if (currentPlayer === 0) {
			currentPlayer = 1;
			otherPlayer = 0;
		}
		else if (currentPlayer === 1) {
			currentPlayer = 0;
			otherPlayer = 1;
		}

	}

	function updateScore(playerNr, score) {
		var player = players[playerNr];
		player.BallsPut(score);
		for (var i = 0; i < players.length; i++) {
			player.BallsPut(score);
		}
	}
}
