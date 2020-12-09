/*jshint esversion: 10 */

// create a variable to hold our world object
var world;
// create a variable to hold our marker
var marker;
var game;

var plane;
var elevation = 1;
var gravity = 0.01;
var gameOverPlane;
var flapSound, dieSound, pointSound;
var state;

function preload(){
  flapSound = loadSound("assets/sounds/flap.mp3")
  dieSound = loadSound("assets/sounds/die.mp3")
  pointSound = loadSound("assets/sounds/point.mp3")
}
function setup() {
  game = new Game();
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  game.plane = new OBJ({
    asset: 'plane_obj',
    mtl: 'plane_mtl',
    x: 0,
    y: 0,
    z: 0,
    rotationY: -90,
    scaleX: game.planeScale,
    scaleY: game.planeScale,
    scaleZ: game.planeScale
  });
  marker.addChild(game.plane);
}

class Game { // hold game variables
  constructor() {
    // plane variables
    this.planeScale = 0.15;
    // pipe vars
    this.pipeArray = [];
    this.pipeSpeed = 0.01;
    this.totalPipeHeight = 1.2;
    this.pipeBoundaryX = 1.5;
    this.counter = 0; //counter to keep track of pipe creation
    this.interval = 110;
    this.pipeGap = 0.45;
  }
}

function movePipes() {
  for (let i = 0; i < game.pipeArray.length; i++) {
    const currentPipe = game.pipeArray[i];
    const res = currentPipe.move();
    if (res === -1) { //pipe disapeared
      marker.remove(currentPipe.shape1);
      marker.remove(currentPipe.shape2);
      game.pipeArray.splice(i, 1);
      i -= 1;
    }
    // check for collision
    collisionDetection(currentPipe.shape1);
    collisionDetection(currentPipe.shape2);
  }
}

function collisionDetection(pipe) {
  const rightOfPlane = game.plane.getZ() + 0.15 < pipe.getZ() - pipe.radius;
  const leftOfPlane = game.plane.getZ() - 0.16 > pipe.getZ() + pipe.radius;
  const topOfPlane = game.plane.getY() + 0.08 < pipe.getY() - (pipe.height / 2);
  const bottomOfPlane = game.plane.getY() - 0.07 > pipe.getY() + (pipe.height / 2);
  if (!rightOfPlane && !leftOfPlane && !topOfPlane && !bottomOfPlane) {
    console.log("collision");
  }
}

class Pipe {
  constructor() {
    const pipe1Height = random(0.025, game.totalPipeHeight - game.pipeGap - 0.025);
    this.shape1 = new Cylinder({
      x: 0,
      y: pipe1Height * 0.5,
      z: game.pipeBoundaryX,
      height: pipe1Height,
      radius: 0.2,
      red: 157,
      green: 230,
      blue: 87
    });
    marker.addChild(this.shape1);
    const heightPipe2 = game.totalPipeHeight - game.pipeGap - pipe1Height;
    this.shape2 = new Cylinder({
      x: 0,
      y: pipe1Height + game.pipeGap + (heightPipe2 * 0.5),
      z: game.pipeBoundaryX,
      height: heightPipe2,
      radius: 0.2,
      red: 157,
      green: 230,
      blue: 87
    });
    marker.addChild(this.shape2);
  }
  move() {
    if (this.shape1.z < -game.pipeBoundaryX) {
      return -1;
    }
    this.shape1.setZ(this.shape1.getZ() - game.pipeSpeed);
    this.shape2.setZ(this.shape2.getZ() - game.pipeSpeed);
  }
}
// debugging only
// function keyPressed() {
//   if (keyCode === 87) { // up
//     game.plane.setY(game.plane.getY()+0.025);
//   } else if (keyCode === 83) { // down
//     game.plane.setY(game.plane.getY()-0.025);
//   } else if (keyCode === 65) { //left
//     game.plane.setZ(game.plane.getZ()-0.025);
//   } else if (keyCode === 68) { //left
//     game.plane.setZ(game.plane.getZ()+0.025);
//   }
// }

function movePlane() {
  if (keyIsPressed) {
    if (keyCode === 87) { // up
      game.plane.setY(game.plane.getY() + 0.015);
    } else if (keyCode === 83) { // down
      game.plane.setY(game.plane.getY() - 0.015);
    } else if (keyCode === 65) { //left
      game.plane.setZ(game.plane.getZ() - 0.015);
    } else if (keyCode === 68) { //left
      game.plane.setZ(game.plane.getZ() + 0.015);
    }
  }
}

function draw() {
  game.counter += 1;
  if (game.counter > game.interval) {
    game.counter = 0;
    game.pipeArray.push(new Pipe()); //create pipe
  }
  movePlane(); // only for debugging
  elevation -= gravity;
  plane.setY(elevation);
  flyPlane();
  movePipes();

function flyPlane() {
  if (mouseIsPressed == true) {
    elevation += 0.05;
    if (!flapSound.isPlaying()  && state != 'over'){
      flapSound.play()
    }
  }
  if (elevation <= 0){
    gameOver();
  }
}

function gameOver(){
  if (!dieSound.isPlaying() && state != 'over' ){
    dieSound.play()
  }
  state = 'over';

  gameOverPlane = new Plane({
    x: 0,
    y: 0.7,
    z: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 0,
    rotationY: -90,
    side: 'double'
  });
  marker.add(gameOverPlane);
  gameOverPlane.tag.setAttribute('text',
  'value: ' + ('Game over') + '; color: rgb(0,255,); align: center;');
  marker.remove(plane)
}
