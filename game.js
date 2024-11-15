//position variables
const speed = 5 ;
let characterX = 800;
let characterY = 100;
let characterS = 0.8;

// game logic variables
let velocityY = 0.2;
let acceleration = 0.2;

// game state variables
let gameState = true;

function setup() {
  createCanvas(700, 650);
  
}

function gameBackground(){

  push();
  clear();
 background(200,230,240);
 //sea
 noStroke();
 fill(150,200,240);
 rect(0,400, 700, 260);
 //platform
 fill(210,250,250);
 ellipse(330, 525, 150, 50);
 // iceberg in background
 strokeWeight(4);
 stroke(135, 205,235);
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
character(characterX, characterY, characterS);



function draw() { 

  gameBackground();
  scale(0.4);
  character(characterX, characterY, characterS);
   
  
  if(gameState === true){
    //gravity logic
    characterY = characterY + velocityY;
    velocityY = velocityY + acceleration;

    // decrease velocity pressing middle button

    if(keyIsDown(32)){
      velocityY = velocityY - 0.5;
    }
  
    // left movement
    if(keyIsDown(37)){
      characterX = characterX - speed;
    }

    // right movement
    if(keyIsDown (39)){
      characterX = characterX + speed;
    }
    //position of landing
    if(characterY > 900){
      gameState = false;
      console.log("Game Over"); 
      
    }
    
    
  }
} 




 
 











