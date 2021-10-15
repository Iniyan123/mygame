var monster1,monster2,monster3,monster4,monster5,monsters;
var monster1Img,monster2Img,monster3Img,monsterImg,monster5Img,monstersImg;
var cloud,cloudImg;
var tree,treeImg;
var Sam, samImg, samA;
var gunImg;
var ground,groundImg;
var attack,attackImg,attackgroup;
var attackm,attackmImg,attackmgroup;
var obstacle;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
monster1Img = loadImage("Monster_1.png");
monster2Img = loadImage("Monster_2.png");
monster3Img = loadImage("Monster_3.png");
monster4Img = loadImage("Monster_4.png");
monster5Img = loadImage("Monster_5.png");
cloudImg = loadImage("Cloud.png");
samA = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
samImg = loadAnimation("Sam standing.png");
groundImg = loadImage("ground.png");
monstersImg  = loadImage("Monster_Soldier.png")
attackImg = loadImage("attack.png")
attackmImg = loadImage("attackm.png")
gunImg = loadImage("Gun.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  Sam = createSprite(70, height-300, 20, 20);
  Sam.addAnimation("standing",samImg);
  Sam.addAnimation("running",samA);
  ground = createSprite(width/2, height+200, width, height)
  ground.addImage(groundImg);
  ground.scale = 3.5;
  ground.depth = Sam.depth;
  Sam.depth+= 1;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  attackgroup = new Group();
  attackmgroup = new Group();
}

function draw() {
  background("lightblue"); 
  if(keyDown(RIGHT_ARROW)){
    gameState=PLAY;
  }
  if(gameState===PLAY){
   ground.velocityX = -4;
   console.log(ground.x)
    Sam.changeAnimation("running");
    Sam.y=height-300;

    if (ground.x < 0){
      ground.x = width/2+500
    }
    spawnClouds();
    spawnObstacles();
    if(keyDown("space")){
      Attack();
    }
    if(attackgroup.isTouching((obstaclesGroup))){
      attackgroup.destroyEach();
      obstaclesGroup.destroyEach();
      score = score+100;
    }
    if(attackmgroup.isTouching(attackgroup)){
      attackgroup.destroyEach();
      attackmgroup.destroyEach();
    }
    if(Sam.isTouching(obstaclesGroup)||Sam.isTouching(attackmgroup)){
      Sam.destroy();
      gameState = END;
    }
  fill("red")  
  textSize(20)  
  text("Score :"+score, width-100, 50)
  } 

  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var cloud = createSprite(width,120,40,10);
    cloud.y = Math.round(random(80,300));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = width/3;
    
    //adjust the depth
    cloud.depth = Sam.depth;
    Sam.depth = Sam.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}


function spawnObstacles() {
  if(frameCount % 200 === 0) {
     obstacle = createSprite(width,height-300,10,40);
    //obstacle.debug = true;
    obstacle.velocityX =-6
    obstacle.addImage(monstersImg);
    //generate random obstacles
   
    if(score===100) {
        obstacle.addImage(monster1Img);
          enemyAttack();
    }
    else if(score===200){
        obstacle.addImage(monster2Img );
        enemyAttack();
    }
    else if(score===300){
       obstacle.addImage(monster3Img);
       enemyAttack();
  }  
    else if(score===400){    
       obstacle.addImage(monster4Img);
       enemyAttack();
    } 
    else if(score===500){
      obstacle.addImage(monster5Img);
      enemyAttack();
    }        
      
  
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function Attack(){
  
     attack = createSprite(Sam.x,Sam.y,40,10);
    attack.addImage(attackImg);
    attack.scale = 0.3;
    attack.velocityX = 10;
    
     //assign lifetime to the variable
    attack.lifetime = width/3;
    
    //adjust the depth
    attack.depth = attack.depth;
    Sam.depth = Sam.depth + 1;
    
    //add each cloud to the group
    attackgroup.add(attack);
  
}
function enemyAttack(){
  for(var i=0;i<6;i++){
  attackm = createSprite((obstacle.x-300)*i,obstacle.y,40,10);
 attackm.addImage(attackmImg);
 attackm.scale = 0.3;
 attackm.velocityX = -10;
 
  //assign lifetime to the variable
 attackm.lifetime = width/3;
 
 
 //add each cloud to the group
 attackmgroup.add(attackm);
  }
}