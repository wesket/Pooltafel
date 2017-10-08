class Ball extends THREE.Mesh {

  constructor(x, z, number = 0, striped = false, radius = 0.09){
    let textureLoader = new THREE.TextureLoader();
    let map = textureLoader.load(`textures/balls/${number}.png`);

    let geometry = new THREE.SphereGeometry(radius, 16, 16),
    material = new THREE.MeshPhongMaterial({map: map});
    super (geometry, material);

    this.shootSpeed = 1.0;
    this.number = number;
    this.striped = striped;
    this.position.set(x, radius, z);
    this.radius = radius;
    this.velocity = new THREE.Vector2(0, 0);
    this.direction = new THREE.Vector2(0, 1);

    this.arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(
        this.direction.x,
        0,
        this.direction.y
      ),
      this.position,
      2,
      0xFF00FF
    );

    if (this.number === 0) {
      scene.add( this.arrowHelper );
    }

    scene.add(this);
  }

  pocket(players, table, scene, mainScene) {
    for (let p of table.pockets) {
      if (this.position.distanceTo(p) <= 0.3) {
        this.position.set(0, -100, 0);
        this.velocity.set(0, 0);

        if (this.number === 8) {
          mainScene.gameOver = true;
        }
        else if (this.number != 0) {
          players[0].addScore(this, scene);
          players[1].addScore(this, scene);
        }
      }
    }
  }

  move(delta) {
    this.arrowHelper.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );

    this.position.x += this.velocity.x * delta;
    this.position.z += this.velocity.y * delta;

    this.velocity.divideScalar(1 + 0.8 * delta);

    if ((this.velocity.x > -0.03 && this.velocity.x < 0.03) &&
        (this.velocity.y > -0.03 && this.velocity.y < 0.03)) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }

  collide(balls, delta) {
    // --------------------------- Wall collisions ---------------------------
    if (this.position.x >= 1.4 || this.position.x <= -1.4) {
      this.velocity.x *= -1;
      this.position.x = (this.position.x >= 1.4) ? 1.39 : -1.39;
    }

    if (this.position.z >= 2.9 || this.position.z <= -2.9) {
      this.velocity.y *= -1;
      this.position.z = (this.position.z >= 2.9) ? 2.89 : -2.89;
    }

    // --------------------------- Ball collisions ---------------------------
    for (let b of balls) {
      let distance = this.position.distanceTo(b.position);
      let newDistance = new THREE.Vector3(
        this.position.x + this.velocity.x * delta,
        this.position.y,
        this.position.z + this.velocity.y * delta
      );
      newDistance = newDistance.distanceTo(b.position);

      if (distance <= this.radius*2 && this != b && newDistance < distance) {
        let normal = new THREE.Vector2(
          b.position.x - this.position.x,
          b.position.z - this.position.z
        );
        let unitNormal = normal.normalize();
        let unitTangent = new THREE.Vector2(-unitNormal.y, unitNormal.x);

        let myNormalScalar = unitNormal.dot(this.velocity);
        let myTangentScalar = unitTangent.dot(this.velocity);
        let otherNormalScalar = unitNormal.dot(b.velocity);
        let otherTangentScalar = unitTangent.dot(b.velocity);

        let myNewNormalScalar = otherNormalScalar;
        let otherNewNormalScalar = myNormalScalar;

        let myNormal = new THREE.Vector2(
          myNewNormalScalar * unitNormal.x,
          myNewNormalScalar * unitNormal.y
        );
        let myTangent = new THREE.Vector2(
          myTangentScalar * unitTangent.x,
          myTangentScalar * unitTangent.y
        );
        let otherNormal = new THREE.Vector2(
          otherNewNormalScalar * unitNormal.x,
          otherNewNormalScalar * unitNormal.y
        );
        let otherTangent = new THREE.Vector2(
          otherTangentScalar * unitTangent.x,
          otherTangentScalar * unitTangent.y
        );

        this.velocity = new THREE.Vector2(
          myNormal.x + myTangent.x,
          myNormal.y + myTangent.y
        );
        b.velocity = new THREE.Vector2(
          otherNormal.x + otherTangent.x,
          otherNormal.y + otherTangent.y
        );
      }
    }
  }
}
