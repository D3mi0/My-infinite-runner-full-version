var score = 0
var play = 2
var end = 1
var start = 0
var gamestate = start



function preload(){
spaceImg = loadImage("space.jpg")
sickbeats = loadSound("portal.mp3")
//loading ship stages
shipstage1Img = loadImage("stage 1.png")
shipstage2Img = loadImage("stage 2.png")
shipstage3Img = loadImage ("stage 3.png")
//loading enemies
enemy1 = loadImage("enemy1.png")
enemy2 = loadImage("enemy2.png")
enemy3 = loadImage("enemy3.png")
//loading coins
coinImg = loadImage("coin.png")
//loading try again image
tryagainImg = loadImage("try.png")
//load tutorial image
helpImg = loadImage("help.png")
}

function setup() {
 sickbeats.loop()
 createCanvas(windowWidth, windowHeight)
 //moving backround
 space = createSprite(800, 260)
 space.addImage(spaceImg, "space.jpg")
 space.scale=1
 space.velocityX = -45

 //spaceship creation
 ship = createSprite(100, 300)
 ship.addImage(shipstage1Img, "stage 1.png")
 ship.scale=3
 ship.rotation=90
 //creating groups
 enemiesGroup = createGroup()
 bulletGroup = createGroup()
 coinGroup = createGroup()
 beamGroup = createGroup()
 //restart image
 tryagain = createSprite(windowWidth/2+10, windowHeight/2-80)
 tryagain.addImage(tryagainImg)
 //help image
 help = createSprite(windowWidth/2, windowHeight/2+30)
 help.addImage(helpImg)
 help.scale=0.4
 
 score = 0
}

function draw() {
 background(255)
 

 if (gamestate === start){
  space.velocityX=0
  space.visible=false
  help.visible=true
  tryagain.visible=false
  ship.visible=false
  textSize(20)
  text("PRESS SPACE TO START, CONTROL SHIP HEIGHT WITH MOUSE", windowWidth/2-300, windowHeight/2+80)

  if (keyWentDown("SPACE")){
   gamestate = play
  }
 }



 //showing the score
 textSize(30)
 text("Score: " + score, windowWidth/2-50, windowHeight-6)
 
 if (gamestate === play){
 //cue the EPIC MUSIC

 //resetting from tutorial mode
 help.visible=false
 ship.visible=true
 space.visible=true
 space.velocityX = -45-score*3


 tryagain.visible = false
 tryagain.scale = 2

 if (space.x < 580){
 space.x = space.width/2
 }
  
 ship.y=World.mouseY
 
 if (bulletGroup.isTouching(ship)){
    ship.lifetime=-1
    ship.visible=false
    gamestate = end
        
    }
 
 if(ship.isTouching(coinGroup)){
   score=score+1
   coinGroup.destroyEach()

 }


 if (mouseWentDown("leftButton")){
   lazarBeam()
 }

 if (beamGroup.isTouching(enemiesGroup)){
   space.velocityX=0
   fill("orange")
   text("YOU WIN!",windowWidth/2-60,windowHeight/2)
   enemiesGroup.destroyEach()   
   coinsGroup.destroyEach()
   beamGroup.destroyEach()
 }

 

 spawnCoins()
 spawnEnemies()
 
}

else if (gamestate === end){
    space.velocityX = 0
    tryagain.visible = true

    if (mousePressedOver(tryagain)){
       console.log("game reset")
       reset()
   
   }
   
 }



drawSprites()
}

function spawnEnemies(){
 //spawning enemies
 if (frameCount % 22-score === 0){
   var enemy = createSprite(windowWidth - 120, 200, 30, 30)
  //spawn random enemies
  var rand = Math.round(random(1, 3))
  switch(rand){
   case 1:enemy.addImage(enemy1)
           break
    case 2:enemy.addImage(enemy2)
           break
    case 3:enemy.addImage(enemy3)
           break    
    default: break
  }
  //add each obstacle to a group
  enemiesGroup.add(enemy)
  enemy.scale = 0.5
  enemy.lifetime = 21
  enemy.y = ship.y
  enemy.rotation=270
  

  bullet=createSprite(enemy.x, enemy.y, 30, 10)
  bullet.velocityX = -40-score*3
  bullet.shapeColor = "green"
  bulletGroup.add(bullet)
    
  

 }

 

}


function spawnCoins(){
  //spawning coins
  if (frameCount % 80 === 0){
  var coin = createSprite(windowWidth - 100, 200)
  coin.velocityX = -30-score*2
  coin.y = Math.round(random(0, windowHeight - 50))
  coin.addImage(coinImg)
  coin.scale = 0.3
  coinGroup.add(coin)
  coin.lifetime=100
  }




}

function reset(){
  gamestate = play
  score = 0
  enemiesGroup.destroyEach()
  coinGroup.destroyEach()
  ship.lifetime=1000000
  ship.visible=true
  space.velocityX= -45
}


function lazarBeam(){
 if (score>=4){
  beam = createSprite(ship.x + 50, ship.y, 20, 20)
  beam.velocityX = 200
  beam.shapeColor = "blue"
  beamGroup.add(beam)

  }



}