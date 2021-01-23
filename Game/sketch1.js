var player1;
var player2;
var ball;
var goal1,goal2;
var p1Score,p2Score;
var car10,ballimg;
var ground;

function preload(){
    car1 = loadImage("car10.png");
    ballimg = loadImage("Ball.png")
    backroundimg = loadImage("backround.jpg");
    // wall_hitSound = loadSound('wall_hit.mp3');
    // hitSound = loadSound('hit.mp3');
  }
  
function setup() {    
  createCanvas(displayWidth-20,displayHeight-30);
 
  
  //create a user paddle sprite
  player1 = createSprite(displayWidth-100,displayHeight-50,10,70);
  player1.addImage(car1);
  player1.scale = 0.1;

  ground = createSprite(displayWidth/2,displayHeight - 20,displayWidth,10)
  ground.visible = false;
 
     
  //create a computer paddle sprite
  player2 = createSprite(90,displayHeight/2,10,70);
  player2.addImage(car1);
  player2.scale = 0.1;
  player2.mirrorX(player2.mirrorX() * (-1));
  
  //create the pong ball
  ball = createSprite(displayWidth/2,displayHeight/2,12,12);
  ball.addImage(ballimg);
  ball.scale = 0.035;

  p2Score = 0;
  p1Score = 0;
  gameState = "serve";

}
  
function draw() {  
    
    background(backroundimg);

    player1.velocityX = 0;
    player1.velocityY = 0;
    
    edges = createEdgeSprites();
    //display Scores
    text(p2Score,displayWidth/2-50,20);
    text(p1Score, displayWidth/2+50,20);
    
    player1.collide(ground)
    player2.collide(ground)

    //draw dotted lines
    for (var i = 0; i < displayHeight; i+=20) {
       line(displayWidth/2,i,displayWidth/2,i+10);
    }
  
    if (gameState === "serve") {
      text("Press Space to Serve",displayWidth/2-100,displayHeight/2-50);
    }
  
    if (gameState === "over") {
      text("Game Over!",displayWidth/2-100,displayHeight/2-100);
      text("Press 'R' to Restart",displayWidth/2-100,displayHeight/2-50);
    }
  
    if (keyDown("r")) {
      gameState = "serve";
      p2Score = 0;
      p1Score = 0;
    }
  
  
    //give velocity to the ball when the user presses play
    //assign random velocities later for fun
    if (keyDown("space") && gameState == "serve") {
      ball.velocityX = 5;
      ball.velocityY = 5;
      gameState = "play";
    }
  
    //make the    player1 move with the mouse
    if(keyDown("RIGHT_ARROW")){
      player1.velocityX = 5;
    }

    if(keyDown("LEFT_ARROW")){
      player1.velocityX = -5;
    }

    if(keyDown("UP_ARROW") && player1.y > 10){
      player1.velocityY = -10;
    }
  
    player1.velocityY = player1.velocityY + 0.5;
  
    //make the ball bounce off the user paddle
    if(ball.isTouching(player1)){
      //hitSound.play();
      ball.x = ball.x - 5;
      ball.velocityX = -ball.velocityX;
    }
  
    //make the ball bounce off the computer paddle
    if(ball.isTouching(player2)){
      //hitSound.play();
      ball.x = ball.x + 5;
      ball.velocityX = -ball.velocityX;
    }
  
    //place the ball back in the centre if it crosses the screen
    if(ball.x > displayWidth || ball.x < 0){
      //scoreSound.play();
  
    if (ball.x < 0) {
        p1Score++;
      }
      else {
        p2Score++;
      }
  
      ball.x = displayWidth/2;
      ball.y = displayHeight/2;
      ball.velocityX = 0;
      ball.velocityY = 0;
      gameState = "serve";
  
      if (p2Score=== 5 || p1Score === 5){
        gameState = "over";
      }
    }
  
    //make the ball bounce off the top and bottom walls
    if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
      ball.bounceOff(edges[2]);
      ball.bounceOff(edges[3]);
     // wall_hitSound.play();
    }
  
    //add AI to the computer paddle so that it always hits the ball
    player2.y = ball.y;
    drawSprites();
  }
  
  