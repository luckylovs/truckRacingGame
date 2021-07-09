var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var track,ground;
var trucks, truck1,truck2,truck3,truck4;

var truck1Img,truck2Img,truck3Img,truck4Img
function preload(){
  track = loadImage("track.jpg")
  ground = loadImage("ground.png")
  truck1Img = loadImage("picture1.png")
 truck2Img = loadImage("picture2.png")
 truck3Img = loadImage("picture3.png")
 truck4Img = loadImage("picture4.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}
