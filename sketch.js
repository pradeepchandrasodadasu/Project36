var dog,sadDog,happyDog;
var fedThePet,addFood;
var foodObj;
var database;
var feed,add;
var lastFed,fedTime;
var food =  [];
var index = 0;

function preload(){
  sadDog=loadImage("images/Dog.png");
  happyDog=loadImage("images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Pet");
  feed.position(700,95);
  feed.mousePressed(fedThePet);

  add = createButton("Add Food");
  add.position(800,95);
  add.mousePressed(addFood);

  fedTime = createElement("h5");

  foodObj = new Food();
  foodObj.getFoodStock();

}

function draw() {
  background(46,139,87);

  foodObj.display();

  database.ref("hour").on("value",function (time){
    lastFed = time.val();
    console.log(lastFed);
  });
  if(lastFed !== undefined){ 
    fill("red");
    textSize(15);
    
    if(lastFed > 12){
      calc_time = lastFed-12
      text("last fed: "+ calc_time+" PM",500,65);
    }else if(lastFed < 12){
      text("last fed: "+ lastFed +" AM",500,65);
    }else{
      //hour value is 12pm
      text("last fed: "+ lastFed +" PM",500,65);
    }
  }

  drawSprites();
}

//function to read food Stock
function fedThePet(){
  dog.addImage(happyDog);

  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);
  database.ref("/").update({
  hour : hour()
  })

}


//function to add food in stock
function addFood(){

  foodObj.updateFoodStock(foodObj.foodStock+1);

}
