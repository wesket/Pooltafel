class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.space = false;
  }

  update() {
    document.onkeydown = (e) => {
      e = e || window.event;

      if (e.keyCode === 37) {
        this.left = true;
      }
      if (e.keyCode === 39) {
        this.right = true;
      }
      if (e.keyCode === 38) {
        this.up = true;
      }
      if (e.keyCode === 40) {
        this.down = true;
      }
      if (e.keyCode === 32) {
        this.space = true;
      }
    }

    document.onkeyup = (e) => {
      e = e || window.event;

      if (e.keyCode === 37) {
        this.left = false;
      }
      if (e.keyCode === 39) {
        this.right = false;
      }
      if (e.keyCode === 38) {
        this.up = false;
      }
      if (e.keyCode === 40) {
        this.down = false;
      }
      if (e.keyCode === 32) {
        this.space = false;
      }
    }
  }
}
