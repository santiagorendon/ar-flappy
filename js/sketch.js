/*jshint esversion: 10 */

// create a variable to hold our world object
var world;
// create a variable to hold our marker
var marker;
var game;

function setup() {
  game = new Game();
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  game.plane = new OBJ({
		asset: 'plane_obj',
    mtl: 'plane_mtl',
		x: 0, y:0, z:0,
    rotationY: -90,
    scaleX: 0.15,
		scaleY: 0.15,
		scaleZ: 0.15
	});
	marker.addChild(game.plane);

  createPipes();
}

class Game { // hold game variables
  constructor() {
    // pipe vars
    this.pipeArray = [];
    this.pipeSpeed = 0.01;
    this.totalPipeHeight = 1;
    this.pipeBoundaryX = 1
  }
}

function createPipes() {
  game.pipeArray.push(new Pipe());
}

function movePipes() {
  for(let i=0; i < game.pipeArray.length; i++) {
    const res = game.pipeArray[i].movePipe();
    if(res === -1) { //pipe disapeared
      marker.remove(game.pipeArray[i]);
      game.pipeArray.splice(i, 1);
      i -= 1;
    }
  }
}

class Pipe {
  constructor() {
    const pipe1Height = 0.4;
    const gap = 0.4;
    this.shape1 = new Cylinder ({
        x: 0,
        y: 0,
        z: 1,
        height: pipe1Height,
        radius: 0.2,
        red: 157,
        green: 230,
        blue: 87
    });
    marker.addChild(this.shape1);
    this.shape2 = new Cylinder ({
        x: 0,
        y: pipe1Height+gap,
        z: 1,
        height: game.totalPipeHeight-gap-pipe1Height,
        radius: 0.2,
        red: 157,
        green: 230,
        blue: 87
    });
    marker.addChild(this.shape2);
  }
  movePipe() {
    if(this.shape1.z < -game.pipeBoundaryX) {
      return -1;
    }
    this.shape1.setZ(this.shape1.getZ() - game.pipeSpeed);
    this.shape2.setZ(this.shape2.getZ() - game.pipeSpeed);
  }
}

function draw() {
  movePipes();

}
