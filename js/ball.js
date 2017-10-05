var radius = 0.1;

class Ball extends THREE.Mesh {

  constructor(x, z, number = 0, striped = false){
    let textureLoader = new THREE.TextureLoader();
    let map = textureLoader.load(`textures/balls/${number}.png`);

    let geometry = new THREE.SphereGeometry(radius, 16, 16),
    material = new THREE.MeshPhongMaterial({map: map});
    super (geometry, material);

    this.striped = striped;
    this.position.set(x, radius, z);
    scene.add(this);

    this.size = radius*2;
    this.velocity = 0.0;
    this.xD = 0.0, this.zD = 0.0;

    if (number === 0) {
      this.velocity = 1.5;
      this.zD = 1.0;
    }
  }

  move(delta) {
    this.position.x += this.xD * this.velocity * delta;
    this.position.z += this.zD * this.velocity * delta;
    this.velocity = (this.velocity > 0) ? (this.velocity - 0.2 * delta) : 0;
  }

  collide(balls) {
    // --------------------------- Wall collisions ---------------------------
    if (this.position.x >= 1.4 || this.position.x <= -1.4) {
      this.xD *= -1;
      this.position.x = (this.xD < 0) ? 1.39 : -1.39;
    }

    if (this.position.z >= 2.8 || this.position.z <= -2.8) {
      this.zD *= -1;
      this.position.z = (this.zD < 0) ? 2.79 : -2.79;
    }

    // --------------------------- Ball collisions ---------------------------
    // TODO: Work from the ball getting hit instead.
    // TODO: Implement something to work with moving balls hitting eachother.

    let avgX = 0.0, avgZ = 0.0, collideCount = 0, avgVelocity = 0.0;

    for (let b of balls) {
      if (this != b && this.position.distanceTo(b.position) <= this.size) {
        avgX += b.position.x;
        avgZ += b.position.z;
        avgVelocity += b.velocity;
        collideCount++;

        let v = new THREE.Vector2 (
          b.position.x - this.position.x,
          b.position.z - this.position.z
        ).normalize();

        b.xD = v.x;
        b.zD = v.y;

        b.velocity = this.velocity;
      }
    }

    if (collideCount > 0) {
      avgX /= collideCount;
      avgZ /= collideCount;
      avgVelocity /= collideCount;
      collideCount = 0;

      this.position.z;

      let v = new THREE.Vector2 (
        this.position.x - avgX,
        this.position.z - avgZ
      ).normalize();

      this.xD = v.x;
      this.zD = v.y;

      this.velocity = avgVelocity;

      avgX = 0.0;
      avgZ = 0.0;
      avgVelocity = 0.0;
    }

  }
}
