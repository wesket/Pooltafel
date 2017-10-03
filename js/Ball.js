class Ball extends THREE.Mesh{

    constructor(x, z, radius = 0.09){
        var ballTexture = new THREE.ImageUtils.loadTexture("textures/lava.png");

        let geometry = new THREE.SphereGeometry(radius, 12, 12),
            material = new THREE.MeshPhongMaterial({map: ballTexture});
        super (geometry, material);

        var direction = new THREE.Vector3(0,0,0);
        var turnAxis = new THREE.Vector3(0,0,0);

        this.position.set(x, radius, z);
        scene.add(this);
    }

    collideBall(){
        // Wall colissions
        if (this.position.x >= 1.4 || this.position.x <= -1.4) {
            this.direction.x *= -1;
        }

        if (this.position.z >= 2.9 || this.position.z <= -2.9) {
            this.direction.z *= -1;
        }
    }

    moveBall(){
        this.position.x += this.direction.x;
        this.position.z += this.direction.z;
    }
}
