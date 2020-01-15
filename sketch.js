let video;
let poseNet;
var mycanvas;
var screenMode;
var noseX = 0;
var noseY = 0;
var eyelX = 0;
var eyelY = 0;
var eyerX = 0;
var eyerY = 0;
var blank, controls, tyson, septum, sunglasses, cigarette, mask, earrings;
var naso, occhio;

function preload() {
  blank = loadImage('assets/blank.png');
  controls = loadImage('assets/controls.png');
  tyson = loadImage('assets/tyson1.png');
  septum = loadImage('assets/septum1.png');
  sunglasses = loadImage('assets/sunglasses.png');
  cigarette = loadImage('assets/cigarette.png');
  mask = loadImage('assets/mask.png');
  earrings = loadImage('assets/earrings.png')

}

function setup() {
  mycanvas = createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // 0 naso - 1 occhio sinistro - 2 occhio destro - 3 orecchio sinistro - 4 orecchio destro
  if (poses.length > 0) {
    var nX = poses[0].pose.keypoints[0].position.x;
    var nY = poses[0].pose.keypoints[0].position.y;
    var e1X = poses[0].pose.keypoints[1].position.x;
    var e1Y = poses[0].pose.keypoints[1].position.y;
    var e2X = poses[0].pose.keypoints[2].position.x;
    var e2Y = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, e1X, 0.5);
    eyelY = lerp(eyelY, e1Y, 0.5);
    eyerX = lerp(eyerX, e2X, 0.5);
    eyerY = lerp(eyerY, e2Y, 0.5);
  }
}

function draw() {
  background('tomato')

  naso = blank;
  occhio = blank;

  if (keyIsDown(LEFT_ARROW)) { //carnival
    naso = mask;
    occhio = earrings;
    screenMode = 'carnival'
  }

  if (keyIsDown(RIGHT_ARROW)) { //texan
    naso = sunglasses
    occhio = cigarette
    screenMode = 'texan'
  }

  if (keyIsDown(UP_ARROW)) { //tyson
    naso = septum
    occhio = tyson
    screenMode = 'tyson'
  }



  image(video, windowWidth / 2 - 320, windowHeight / 3 - 280);
  image(controls, windowWidth / 2 - 200, windowHeight / 3 * 2 - 50, 400, 300)
  translate(windowWidth / 2 - 320, windowHeight / 2 - 630)

  push()
    translate(windowWidth / 5 * 2, windowHeight / 4 + 50)
    textSize(windowWidth/50)
    fill(255)
    textFont('Rock Salt')
    textAlign(LEFT)
    text('use the arrows as\nin the instructions\nto dress up',0,0)
  pop()
  push()
    translate(-windowWidth / 20, windowHeight/1.2)
    textSize(windowWidth/50)
    fill(255)
    textFont('Rock Salt')
    textAlign(RIGHT)
    text('click and hold the\nleft, up or right\narrow and click\nTAB to take a\nscreenshot ',10,10)
  pop()

  push()
    translate(0, windowHeight / 2 - 240)
    imageMode(CENTER)
    image(naso, noseX, noseY, 300, 225)
    image(occhio, eyelX, eyelY, 300, 225)
  pop()
}

function keyPressed() {
  if (keyCode === TAB) {
    saveCanvas(mycanvas,screenMode,"png");
  }
}
