var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runers, runer1, runer2, runer3,  runer4;

var track,  runer1_img,  runer2_img, runer3_img,runer4_img;

function preload(){
  track = loadImage("images/track.jpg");
  runer1_img = loadImage("images/boy.png");
  runer2_img = loadImage("images/boy.png");
  runer3_img = loadImage("images/boy.png");
  runer4_img = loadImage("images/boy.png");
  ground = loadImage(" images/ground.png");
}

function setup(){
  database = firebase.database();
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 
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

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
  var obstacle = createSprite(400,370,10,40);
  obstacle=loadImage("images/obstacle");
  obstacle.velocityY= -6;
  
  obstacle.scale = 0.3;
  obstacle.lifetime = 70;
  }
  }
