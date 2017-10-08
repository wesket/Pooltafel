class Table {
  constructor(scene) {
    let objLoader = new THREE.OBJLoader();
    let texLoader =  new THREE.TextureLoader();

    let tableMat = new THREE.MeshLambertMaterial({
      map: texLoader.load("textures/laken.png")
    });

    objLoader.load(
      "obj/pooltable.obj",
      function ( object ) {
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = tableMat;
          }
        });
				scene.add( object );
			}
    );

    this.pockets = [
      new THREE.Vector3(1.5, 0, 3),
      new THREE.Vector3(1.5, 0, 0),
      new THREE.Vector3(1.5, 0, -3),
      new THREE.Vector3(-1.5, 0, 3),
      new THREE.Vector3(-1.5, 0, 0),
      new THREE.Vector3(-1.5, 0, -3)
    ];
  }

  drawDebug(scene) {
    let pocketMat = new THREE.MeshBasicMaterial({color: 0xFF0000});
    let pocketGeom = new THREE.BoxGeometry(0.05, 0, 0.05);

    let pockets = [
      new THREE.Mesh(pocketGeom, pocketMat),
      new THREE.Mesh(pocketGeom, pocketMat),
      new THREE.Mesh(pocketGeom, pocketMat),
      new THREE.Mesh(pocketGeom, pocketMat),
      new THREE.Mesh(pocketGeom, pocketMat),
      new THREE.Mesh(pocketGeom, pocketMat)
    ];

    pockets[0].position.set(1.5, 0, 3);
    pockets[1].position.set(1.5, 0, 0);
    pockets[2].position.set(1.5, 0, -3);
    pockets[3].position.set(-1.5, 0, 3);
    pockets[4].position.set(-1.5, 0, 0);
    pockets[5].position.set(-1.5, 0, -3);

    for (let p of pockets) {
      scene.add(p);
    }
  }
}
