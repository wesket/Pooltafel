class Room {
  constructor(scene) {
    let objLoader = new THREE.OBJLoader();
    let texLoader =  new THREE.TextureLoader();

    // Floor
    let floorTex = texLoader.load( "textures/floor.png", function ( floorTex ) {
      floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
      floorTex.offset.set( 0, 0 );
    } );

    let floorMat = new THREE.MeshLambertMaterial({map: floorTex});

    objLoader.load(
      "obj/floor.obj",
      function ( object ) {
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = floorMat;
          }
        });
				scene.add( object );
			}
    );

    // Walls
    let wallTex = texLoader.load( "textures/wall.png", function ( wallTex ) {
      wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
      wallTex.offset.set( 0, 0 );
    } );

    let wallMat = new THREE.MeshLambertMaterial({map: wallTex});

    objLoader.load(
      "obj/wall.obj",
      function ( object ) {
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = wallMat;
          }
        });
				scene.add( object );
			}
    );

    // Walls
    let ceilingTex = texLoader.load( "textures/ceiling.png", function ( ceilingTex ) {
      ceilingTex.wrapS = ceilingTex.wrapT = THREE.RepeatWrapping;
      ceilingTex.offset.set( 0, 0 );
    } );

    let ceilingMat = new THREE.MeshLambertMaterial({map: ceilingTex});

    objLoader.load(
      "obj/ceiling.obj",
      function ( object ) {
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = ceilingMat;
          }
        });
				scene.add( object );
			}
    );

  }
}
