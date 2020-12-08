// create a variable to hold our world object
var world;

// create a variable to hold our marker
var marker;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  // create some geometry to add to our marker
  // the marker is 1 meter x 1 meter, with the origin at the center
  // the x-axis runs left and right
  // -0.5, 0, -0.5 is the top left corner
  // var littleCube1 = new Box({
  //   x:-0.5, y:0.25, z:-0.5,
  //   red:255, green:0, blue:0,
  //   width:0.5, height:0.5, depth:0.5
  // });
  // marker.addChild( littleCube1 );

  // flappyBird = new OBJ({
	// 	asset: 'flappy_bird',
	// 	x:-0.5, y:0.25, z:0.5,
  //   scaleX: 100,
	// 	scaleY: 100,
	// 	scaleZ: 100,
	// });
	// marker.addChild(flappyBird);

  enemyPlane = new OBJ({
		asset: 'plane_obj',
    mtl: 'plane_mtl',
		x: 0, y:0, z:0,
    rotationY: -90,
    scaleX: 0.15,
		scaleY: 0.15,
		scaleZ: 0.15
	});
	marker.addChild(enemyPlane);

  // var littleCube2 = new Box({
  //   x:0.5, y:0.25, z:-0.5,
  //   red:0, green:255, blue:0,
  //   width:0.5, height:0.5, depth:0.5
  // });
  // marker.addChild( littleCube2 );

  // var littleCube3 = new Box({
  //   x:-0.5, y:0.25, z:0.5,
  //   red:0, green:0, blue:255,
  //   width:0.5, height:0.5, depth:0.5
  // });
  // marker.addChild( littleCube3 );
  //
  // var littleCube4 = new Box({
  //   x:0.5, y:0.25, z:0.5,
  //   red:128, green:128, blue:128,
  //   width:0.5, height:0.5, depth:0.5
  // });
  // marker.addChild( littleCube4 );
  //
  // var littleCube5 = new Box({
  //   x:0, y:1, z:0,
  //   red:255, green:128, blue:0,
  //   width:0.5, height:0.5, depth:0.5
  // });
  // marker.addChild( littleCube5 );

}


function draw() {



}
