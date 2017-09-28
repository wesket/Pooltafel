class Ball extends THREE.Mesh{

 constructor(x = 0, z = 0, radius = 0.3075){

     let geometry = new THREE.SphereGeometry(0.10, 36, 36),
         material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
     super (geometry, material);

     this.position.set(x,z,radius);
     scene.add(this);



}

}