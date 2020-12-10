var spaceShip, spaceShipImg, spaceBG, spaceBGImg, barrier1, barrier2, meteorImg, meteoroid, meteoroidGroup, coin, coinImg, coinGroup, restartButton, restartImg, score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  spaceBGImg = loadImage("spaceBG-2.jpg");
  spaceShipImg = loadImage("spaceShip.png");
  meteorImg = loadImage("meteoroid.jpg");
  coinImg = loadImage("coins.PNG");
  restartImg = loadImage("restart.png");
}

function setup() {
createCanvas(800,600);
spaceBG = createSprite(400,300,1,1);
spaceBG.velocityX = -5;
spaceBG.addImage("spaceBG", spaceBGImg);
spaceShip = createSprite(30,300,10,10);
spaceShip.addImage("spaceShip", spaceShipImg);
spaceShip.scale = 0.05;
barrier1 = createSprite(400,150,800,5);
barrier1.visible = false;
barrier2 = createSprite(400,450,800,5);
barrier2.visible = false;
  
score = 0;
  
restartButton = createSprite(400,200,50,50);
  restartButton.addImage("restart",restartImg);
  restartButton.scale = 0.5;
  restartButton.visible = false;
  
meteoroidGroup = new Group();
  coinGroup = new Group();

}

function draw() {  
  background("black");
  drawSprites();

  if(spaceBG.x < 0){
    spaceBG.x = spaceBG.width/2;
  }
  if(gameState === PLAY){
    text("Score: " + score, 350,50);
    
  spaceShip.collide(barrier1);
  spaceShip.collide(barrier2);
  
  if(keyDown("up") && spaceShip.y >= 250){
    spaceShip.velocityY = -5;
  }
  if(keyDown("down") && spaceShip.y <= 350){
    spaceShip.velocityY = 5;
  }
  if(keyDown("right") && spaceShip.x <= 300){
    spaceShip.x = spaceShip.x + 10;
  }
  if(keyDown("left")){
    spaceShip.x = spaceShip.x - 10;
  }
  if(keyDown("space")){
    spaceShip.setVelocity(0,0);
  }
  spawnMeteors();
  spawnCoins();
    
  if(spaceShip.isTouching(meteoroidGroup)){
    gameState = END;
  }
  if(spaceShip.isTouching(coinGroup)){
    coin.destroy();
    score = score + 10;
    }
  }
  else if(gameState === END){
    meteroidGroup.destroyEach();
    coinGroup.destroyEach();
    spaceBG.setVelocity(0,0);
    spaceShip.setVelocity(0,0);
    restartButton.visible = true;
    if(mousePressedOver(restartButton)){
      gameState = PLAY;
      restartButton.visible = false;
      score = 0;
    }
  }
  

  }

function spawnMeteors(){
  if(frameCount%80 == 0){
    meteoroid = createSprite(801,random(200,400),100,100 );
    meteoroid.velocityX = -8;
    meteoroid.lifetime = 400;
    meteoroid.addImage("meteoroid",meteorImg);
    meteoroid.scale = 0.075;
    meteoroidGroup.add(meteoroid);

  }
  

  
}
function spawnCoins(){
  if(frameCount%100 == 0){
    for(var i = 801; i >= 700; i=i-45){
    for(var j = Math.round(random(200,300)); j <= 400; j=j+30){
      coin = createSprite(i,j,10,10);
      coin.velocityX = -10;
      coin.addImage("coinImage",coinImg);
      coin.scale = 0.025;
      coinGroup.add(coin);
    }
    }
  }
}
