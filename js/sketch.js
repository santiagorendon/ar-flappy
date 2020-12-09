// create a variable to hold our world object
var world;

// create a variable to hold our marker
var marker;

var plane
var elevation = 1
var gravity = 0.01

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  plane = new OBJ({
		asset: 'plane_obj',
    mtl: 'plane_mtl',
		x: 0, y:elevation, z:0,
    rotationY: -90,
    scaleX: 0.15,
		scaleY: 0.15,
		scaleZ: 0.15
	});
	marker.addChild(plane);
}


function draw() {

    elevation -= gravity
    plane.setY(elevation)

    if (mouseIsPressed == true){
      elevation += .05
    }
}
