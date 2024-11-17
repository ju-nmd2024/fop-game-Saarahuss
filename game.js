

//position variables

let characterX = 300;
let characterY = 50;
let characterS = 0.3;

let x = 300;
let y = 100;


// game logic variables
let velocityY = 0.2;
let acceleration = 0.2;
let gameTimer = 0;

// game state variables
let state = "start";
let gameState = true;


function setup() {
  createCanvas(600, 650);
}

function gameBackground(){
  background(255,255,255);
 //sea
 push();
 noStroke();
 fill(150,200,240);
 rect(0,400, 700, 260);
 pop();
 // iceberg in background
 push();
 strokeWeight(4);
 stroke(135, 205,235);
 fill(200, 230, 240);
 triangle(15, 400, 110, 110, 209, 398);
 pop();
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
    strokeWeight(4);
    ellipse(x-85 * s,y+296 * s,60 * s,150 * s);
    ellipse(x+145 * s,y+296 * s,60 * s,150 * s);
    //feet
    fill(255,140,0);
    ellipse(x-20 * s,y+470 * s,60 * s,25 * s);
    ellipse(x+80 * s,y+470 * s,60 * s,25 * s);
    //mouth
    ellipse(x+22 * s,y+140 * s,30 * s,20 * s);
    strokeWeight(3);
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
    strokeWeight(5);
    translate(x-20 * s,y+127 * s);
    rotate(3.14);
    arc(0 * s,0 * s,30 * s,20 * s,0 * s,PI);
    pop();
    noFill();
    strokeWeight(5);
    translate(x+66 * s,y+127 * s);
    rotate(3.14);
    arc(0 * s,0 * s,30 * s,20 * s,0 * s,PI);
    push();
  
}

function platform(){
  strokeWeight(1);
    fill(200,250,250);
    ellipse(x + 30, y + 425, 150, 50);
  }

function startScreen(){
  background(255,255,255);
  push();
  fill(150,200,240);
  rect(0,400, 700, 260);
  fill(200,230,240);
  triangle(33, 439, 180, 159, 282, 439);
  triangle(63, 500, 301, 70, 529, 500);
  pop();
  push();
  strokeWeight(5);
  rect(150, 290, 300, 100);
  pop();
  text("Start Game", 170, 350);
  textSize(50);
}
function gameScreen(){
}

function resultScreen(){
  background(150, 200, 240);
  fill(200,230,240);
 
  fill(200, 230, 240);
  rect(150, 290, 300, 100);

  fill(0,0,0);
  text("Result", 170, 350);
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
    resultScreen();
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
        console.log("YOU LOSE - MISSED PLATFORM");
      } else if(velocityY > 5) {
        // LANDED TO HARD
        console.log("YOU LOSE - LANDED TO HARD");
      } else {
        console.log("YOU WIN");
      }
      gameState = false;
      state = resultScreen;
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
  } else if( state === "result"){
    state = "game";
  }

}