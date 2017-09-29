class Ball extends THREE.Mesh{

    constructor(x, z, radius = 0.09){        
        let geometry = new THREE.SphereGeometry(radius, 12, 12),
            material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        super (geometry, material);

        this.position.set(x, radius, z);
        scene.add(this);
    }

}