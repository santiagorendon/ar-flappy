// create a variable to hold our world object
var world;

// create a variable to hold our marker
var marker;

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
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker('hiro');

  plane = new OBJ({
    asset: 'plane_obj',
    mtl: 'plane_mtl',
    x: 0,
    y: elevation,
    z: 0,
    rotationY: -90,
    scaleX: 0.15,
    scaleY: 0.15,
    scaleZ: 0.15
  });
  marker.addChild(plane);
}


function draw() {
  elevation -= gravity;
  plane.setY(elevation);
  flyPlane();
}

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
