class Ball extends THREE.Mesh {

    constructor(x, z, radius = 0.10, number = 0, striped = false){
        let textureLoader = new THREE.TextureLoader();
        let map = textureLoader.load(`textures/balls/${number}.png`);

        let geometry = new THREE.SphereGeometry(radius, 16, 16),
        material = new THREE.MeshPhongMaterial({map: map});
        super (geometry, material);

        this.striped = striped;
        this.position.set(x, radius, z);
        scene.add(this);

        this.collided = false;
        this.radius = radius;
        this.speed = 0.0;
        this.xD = 0.0, this.zD = 0.0;
        this.translateVector = new THREE.Vector3(this.xD,0,this.zD).normalize();
        this.rotationVector = new THREE.Vector3(1,0,0.7).normalize();

        if (number === 0) {
            this.speed = 1.0;
            this.zD = 1.0;
        }
    }

    move(delta) {
        this.position.x += this.xD * this.speed * delta;
        this.position.z += this.zD * this.speed * delta;
    }

    collide(balls) {
        // ------------------------ Wall collisions ------------------------
        if (this.position.x >= 1.4 || this.position.x <= -1.4) {
            this.xD *= -1;
            this.position.x = (this.xD < 0) ? 1.39 : -1.39;
        }

        if (this.position.z >= 2.8 || this.position.z <= -2.8) {
            this.zD *= -1;
            this.position.z = (this.zD < 0) ? 2.79 : -2.79;
        }

        // ------------------------ Ball collisions ------------------------
        // Werkt geweldig, niet zeuren :ok_hand:
        for (let b of balls) {
            if (this.position.distanceTo(b.position) <= this.radius*2 &&
                this.position != b.position) {

                let v = new THREE.Vector2 (
                    b.position.x - this.position.x,
                    b.position.z - this.position.z
                ).normalize();

                b.xD = v.x;
                b.zD = v.y;

                b.speed = this.speed;
                this.collided = true;
            }
        }

        for (let b of balls) {
            if (b.collided) {
                b.collided = false;
            }
        }

    }
}
