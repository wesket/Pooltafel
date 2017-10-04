class MainScene {
  constructor(scene) {
    var table = new Table(scene);

    var pLight = new THREE.PointLight(0x909070);
    pLight.position.set(0,10,0);

    var aLight = new THREE.AmbientLight(0x404040);
    aLight.position.set(0,0,0);
    scene.add(pLight, aLight);
  }
}
