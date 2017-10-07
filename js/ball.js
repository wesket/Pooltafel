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

    this.radius = radius;

    this.velocity = new THREE.Vector2(0, 0);

    if (number === 0) {
      this.velocity = new THREE.Vector2(2, 1);
    }
  }

  move(delta) {
    this.position.x += this.velocity.x * delta;
    this.position.z += this.velocity.y * delta;
  }

  collide(balls) {
    // --------------------------- Wall collisions ---------------------------
    if (this.position.x >= 1.4 || this.position.x <= -1.4) {
      this.velocity.x *= -1;
      this.position.x = (this.velocity.x < 0) ? 1.39 : -1.39;
    }

    if (this.position.z >= 2.8 || this.position.z <= -2.8) {
      this.velocity.y *= -1;
      this.position.z = (this.velocity.y < 0) ? 2.79 : -2.79;
    }

    // --------------------------- Ball collisions ---------------------------
    for (let b of balls) {
      if (this.position.distanceTo(b.position) <= this.radius*2 && this != b ) {
        let normal = new THREE.Vector2(
          b.position.x - this.position.x,
          b.position.z - this.position.z
        );
        let unitNormal = normal.normalize();
        let unitTangent = new THREE.Vector2(
          -unitNormal.y,
          unitNormal.x
        );

        let myVelocityN = unitNormal.dot(this.velocity);
        let myVelocityT = unitTangent.dot(this.velocity);
        let otherVelocityN = unitNormal.dot(b.velocity);
        let otherVelocityT = unitTangent.dot(b.velocity);

        let myNewVelocityN = new THREE.Vector2(
          (myVelocityN + 2 * otherVelocityN) / 2,
          (myVelocityN + 2 * otherVelocityN) / 2
        );
        let otherNewVelocityN = new THREE.Vector2(
          (otherVelocityN + 2 * myVelocityN) / 2,
          (otherVelocityN + 2 * myVelocityN) / 2
        );

        myNewVelocityN = new THREE.Vector2(
          myNewVelocityN.x * unitNormal.x,
          myNewVelocityN.y * unitNormal.y
        );
        // myVelocityT = new THREE.Vector2(
        //   myVelocityT.x * unitNormal.x,
        //   myVelocityT.y * unitNormal.y
        // );
        otherNewVelocityN = new THREE.Vector2(
          otherNewVelocityN.x * unitNormal.x,
          otherNewVelocityN.y * unitNormal.y
        );
        // otherVelocityT = new THREE.Vector2(
        //   otherVelocityT.x * unitNormal.x,
        //   otherVelocityT.y * unitNormal.y
        // );

        // myNewVelocityN.multiply(unitNormal);
        // myVelocityT.multiply(unitNormal);
        // otherNewVelocityN.multiply(unitNormal);
        // otherVelocityT.multiply(unitNormal);

        // this.velocity = new THREE.Vector2(
        //   myNewVelocityN.x + myVelocityT.x,
        //   myNewVelocityN.y + myVelocityT.y
        // );
        // b.velocity = new THREE.Vector2(
        //   otherNewVelocityN.x + otherVelocityT.x,
        //   otherNewVelocityN.y + otherVelocityT.y
        // );

        this.velocity.addVectors(myNewVelocityN, myVelocityT);
        b.velocity.addVectors(otherNewVelocityN, otherVelocityT);

        console.log(myVelocityN);
      }
    }


  }
}
