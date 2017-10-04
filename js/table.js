class Table {
  constructor(scene) {
    var loader = new THREE.OBJLoader();
    loader.load(
      "obj/pooltable.obj",
      function ( object ) {
				scene.add( object );
			}
    );
  }
}
