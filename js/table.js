class Table {
  constructor(scene) {
    var loader = new THREE.OBJLoader();
    var texLoader =  new THREE.TextureLoader();

    var tableMat = new THREE.MeshLambertMaterial({
      map: texLoader.load("textures/laken.png")
    });

    

    loader.load(
      "obj/pooltable.obj",
      function ( object ) {

        // Load in a new material for the obj.
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = tableMat;
          }

        });

				scene.add( object );
			}
    );
  }
}
