var galaxia, galaxiaImg;
var nave, naveImg;
var bullets = 70;
var score = 0;
var life = 3;
var gameState = "play"

function preload(){
  galaxiaImg = loadImage("fondo.jpeg");
  naveImg = loadImage("nave.png");
  enemigo1 = loadImage("enemigo1.png");
  enemigo2 = loadImage("enemigo2.png");
 
}

function setup(){
  createCanvas(600,700);

  galaxia = createSprite(300,300);
  galaxia.addImage("galax",galaxiaImg);
  galaxia.velocityY = 1;
  
  nave = createSprite(200,625,50,50);
  nave.scale = 0.2;
  nave.addImage("nav", naveImg);

  bulletGroup = new Group();
  enemyGroup = new Group();
}

function draw(){
  background(0);
  if (gameState === "play") {

    if(life===0){
      gameState = "lost"
      
    }

    if(score==10){
      gameState = "won"
      //winning.play();
    }

    if(keyDown("left_arrow")){
      nave.x = nave.x - 3;
    }
    
    if(keyDown("right_arrow")){
      nave.x = nave.x + 3;
    }
    
    if(keyDown("up_arrow")){
      nave.y = nave.y - 1;
    }
    
    if(galaxia.y > 400){
      galaxia.y = 300
    }

if(keyWentDown("space")){
   
    bullet = createSprite(nave.x,650,10,20);
    
    bullet.shapeColor = "magenta";
    bullet.velocityY = -20
    
    bulletGroup.add(bullet)
  
    nave.depth = bullet.depth;
    nave.depth = nave.depth+2;
  
    bullets = bullets-1
  //explosionSound.play();
}

if(bullets==0){
  gameState = "bullet"
  //lose.play();
    
}


  for(var i=0;i<enemyGroup.length;i++){     
      
  if(enemyGroup[i].isTouching(bulletGroup)){
       enemyGroup[i].destroy()
       bulletGroup.destroyEach()
       //explosionSound.play();

       score = score+2
       } 
 
 }

for(var i=0;i<enemyGroup.length;i++){     
      
  if(enemyGroup[i].isTouching(nave)){
       enemyGroup[i].destroy()
      
      life=life-1
       } 
 
 }
    enemyF();

    
    drawSprites();

    textSize(20)
    fill("white")
    text("Puntuación = " + score,460,30);
    text("Balas = " + bullets,500,60);
    text("Vidas = " + life,510,90);

    if(gameState == "lost"){
  
      textSize(100)
      fill("red")
      text("Perdiste",100,300)
      enemyGroup.destroyEach();
      nave.destroy();
    
    }
    
  }


    else if(gameState == "won"){
      background("green");
      textSize(70);
      fill("yellow");
      text("Eres un genio, destruiste al rival",100,300);
      enemyGroup.destroyEach();
      nave.destroy();
    
    }
    
    
    else if(gameState == "bullet"){
     
      textSize(70)
      fill("yellow")
      text("¡Te quedaste sin balas!",100,300)
      enemyGroup.destroyEach();
      nave.destroy();
      bulletGroup.destroyEach();
    
    }
  }


 
  
  


function enemyF() {

    if (frameCount % 60 === 0){
      var enemy = createSprite(random(10,580));
      enemy.scale = 0.08;
      enemy.velocityY = 6;
      
       //generar obstáculos al azar
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: enemy.addImage(enemigo1);
                 break;
         case 2: enemy.addImage(enemigo2);
                 break;
         default: break;
       }
       enemyGroup.add(enemy);
        }
}

