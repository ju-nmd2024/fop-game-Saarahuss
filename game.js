

//position variables

let characterX = 300;
let characterY = 50;
let characterS = 0.3;

let cloudX = 100;
let cloudY = 100;

let x = 300;
let y = 100;


// game logic variables
let velocityY = 0.2;
let acceleration = 0.2;
let gameTimer = 0;

// game state variables
let state = "start";
let gameState = false;


function setup() {
  createCanvas(600, 650);
}

function gameBackground(){
  background(150,210,240);
  push();
  noStroke();
  cloud(cloudX - 50, cloudY - 50);
  cloud(cloudX + 90, cloudY + 50);
  cloud(cloudX + 300, cloudY);
  cloud(cloudX + 450, cloudY + 200);
  sea();
  pop();
  mountain();
  
  

}
function character(x,y,s) {
  
    //bodyshape
    fill(30,40,53);
    strokeWeight(4);
    ellipse(x+30 * s,y+310 * s,290 * s,350 * s);
    ellipse(x+30 * s,y+120 * s,260 * s,190 * s);
    push();
    noStroke();
    fill(255,255,255);
    ellipse(x+30 * s,y+330 * s,200 * s,300 * s);
    ellipse(x+28 * s,y+130 * s,210 * s,150 * s);
    pop();
    //arms
    strokeWeight(3);
    ellipse(x-85 * s,y+296 * s,60 * s,150 * s);
    ellipse(x+145 * s,y+296 * s,60 * s,150 * s);
    //feet
    fill(255,140,0);
    ellipse(x-20 * s,y+470 * s,60 * s,25 * s);
    ellipse(x+80 * s,y+470 * s,60 * s,25 * s);
    //mouth
    ellipse(x+22 * s,y+140 * s,30 * s,20 * s);
    strokeWeight(0.5);
    line(x+9 * s,y+140 * s,x+37 * s,y+140 * s);
    //cheeks
    push();
    noStroke();
    fill(255,182,193);
    ellipse(x-40 * s,y+140 * s,30 * s,30 * s);
    ellipse(x+80 * s,y+140 * s,30 * s,30 * s);
    pop();
    //eyes
    push();
    noFill();
    strokeWeight(2);
    translate(x-20 * s,y+127 * s);
    rotate(3.14);
    arc(0 * s,0 * s,30 * s,20 * s,0 * s,PI);
    pop();
    noFill();
    strokeWeight(2);
    translate(x+66 * s,y+127 * s);
    rotate(3.14);
    arc(0 * s,0 * s,30 * s,20 * s,0 * s,PI);
    push();
  
}
function platform(){
  strokeWeight(4);
    fill(200,250,250);
    ellipse(x + 30, y + 425, 150, 50);
  }
function mountain(){
  strokeWeight(4);
  fill(240,250,250);
  triangle(x-280, y+298, x-120, y+59, x-18, y+298);
  triangle(x-237, y+298, x+1, y-30, x+229, y+298);
}
function sea(){
  fill(0,100,150);
  rect(0,400, 700, 260);
}
function cloud(cloudX, cloudY){
  push();
  noStroke();
  fill(255,255,255);
  ellipse(cloudX, cloudY, 70, 40);
  ellipse(cloudX, cloudY, 40, 70);
  pop();
}

function startScreen(){
  background(150,210,240);
  cloud(cloudX - 50, cloudY - 50);
  cloud(cloudX + 90, cloudY + 50);
  cloud(cloudX + 300, cloudY);
  cloud(cloudX + 450, cloudY + 200);
  mountain();
  sea();
  push();
  strokeWeight(5);
  fill(255,255,255);
  rect(x-150, y+190, 300, 100);
  textSize(40);
  stroke(0,100,150);
  fill(210, 240, 240);
  text("Start Game", x-100, y+250);
  pop();
}
function gameScreen(){
}

function victoryScreen(){
  background(150, 200, 240);
  cloud(cloudX - 50, cloudY - 50);
  cloud(cloudX + 90, cloudY + 50);
  cloud(cloudX + 300, cloudY);
  cloud(cloudX + 450, cloudY + 200);
  sea();
  mountain();
  fill(255,255,255);
  rect(x-150, y+190, 300, 100);
  push();
  strokeWeight(5);
  textSize(40);
  stroke(0, 100, 150);
  fill(210, 240, 240);
  text("VICTORY", x-100, y+250);
  pop();
}

function gameOverscreen(){
  background(150, 200, 240);
  cloud(cloudX - 50, cloudY - 50);
  cloud(cloudX + 90, cloudY + 50);
  cloud(cloudX + 300, cloudY);
  cloud(cloudX + 450, cloudY + 200);
  sea();
  mountain();
  fill(255, 255, 255);
  rect(x-150, y+190, 300, 100);
  push();
  strokeWeight(5);
  textSize(40);
  stroke(0, 100, 150);
  fill(210, 240, 240);
  text("Game Over", x-100, y+250);
  pop();
}

function resetGame(){
  characterY = 100;
  velocityY = 0.2;
  gameState = true;
  gameTimer = 0;
}

function draw() { 

  if(state === "start"){
    startScreen();
  } else if(state === "game"){
    gameScreen();
    gameBackground();
    platform();
    character(characterX,characterY, characterS);

    gameTimer = gameTimer + 1;
    if(gameTimer >= 500){
      gameTimer = 0;
      state = "result";
    }
  } else if(state === "result"){
    victoryScreen();
  } else if(state === "lose"){
    gameOverscreen();
  }

  if(gameState === true){
    //gravity logic
    characterY = characterY + velocityY;
    velocityY = velocityY + acceleration;

    // decrease velocity pressing middle button 

    if(keyIsDown(32)){
      velocityY = velocityY - 0.9;
    }
  
    // left movement
    if(keyIsDown(37)){
      characterX = characterX - 5;
    }

    // right movement
    if(keyIsDown (39)){
      characterX = characterX + 5;
    }
    //position of landing
    if(characterY > 370 && gameState === true){
      if(characterX < 255 || characterX > 405){
        // out of platform bounds
        state = "lose";
        gameState = false;
      } else if(velocityY > 5) {
        // LANDED TO HARD
        state = "lose";
        gameState = false;
      } else {
        state = "result";
        gameState = false;
      }
    }
  } 
  }
function mouseClicked(){
  if (state === "start"){
    characterX = 310;
    characterY = 50;
    velocityY = 5;
    state = "game";
    gameState = true;
  } else if(state === "result" || state === "lose"){
    resetGame();
    state = "game";
  }
  }  