class Ball extends THREE.Mesh{

    constructor(x, z, radius = 0.10, number = 0, striped = false){

        let textureLoader = new THREE.TextureLoader();
        let map = null;
        if (number !== 0)
            map = textureLoader.load(`textures/balls/${number}.png`);

        let geometry = new THREE.SphereGeometry(radius, 12, 12),
            material = new THREE.MeshPhongMaterial(number === 0 ? { color: 0xffffff } : {
                map: map
            });
        super (geometry, material);

        this.striped = striped;
        this.position.set(x, radius, z);
        scene.add(this);


    }

}