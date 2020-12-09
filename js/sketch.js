/*jshint esversion: 10 */

// create a variable to hold our world object
var world;
// create a variable to hold our marker
var marker;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  plane = new OBJ({
		asset: 'plane_obj',
    mtl: 'plane_mtl',
		x: 0, y:0, z:0,
    rotationY: -90,
    scaleX: 0.15,
		scaleY: 0.15,
		scaleZ: 0.15
	});
	marker.addChild(plane);

  pipe1 = new Pipe();
}

class Pipe {
  constructor() {
    this.shape = new Cylinder ({
        x: 0,
        y: 0,
        z: 0.9,
        height: 1,
        radius: 0.2,
        red: 157,
        green: 230,
        blue: 87
    });
    marker.addChild(this.shape);
  }
}

function draw() {


}
