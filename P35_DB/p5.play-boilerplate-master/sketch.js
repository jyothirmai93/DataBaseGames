var balloon, db;
var ball_db_loc;  // for reffering location of ball in db
var position;


function preload(){
  bg = loadImage('pro-C35 images/Hot Air Ballon-01.png')
  balloonImg = loadImage('pro-C35 images/Hot Air Ballon-02.png')
}
function setup(){
  createCanvas(1400,900);

  //create data base
  db = firebase.database();
  console.log(db);

  //create sprite
  balloon = createSprite(50,200,20,20);
  balloon.addImage(balloonImg);

  // linking nodes or childs in db
  ball_db_loc = db.ref('balloon/position');
  ball_db_loc.on("value", readPosition, showError);
}

function draw(){
  background(bg);
  
  textSize(25);
  strokeWeight(4);
  stroke('black');
  fill('red');
  text('Press arrows to move hot air ballon', 200, 50 );

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    //balloon.scale += 0.01
    
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }
  
  drawSprites();
  
}


function showError(){
  console.log("Error in writing to the database");
}

function readPosition(data){
  //getting position from data and updating in local
  position = data.val();
  console.log(position.x);

  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(a,b){
  // changing x, y childs in db (which are in json format)
  ball_db_loc.set({
    'x': position.x + a,
    'y': position.y + b
  })
}

