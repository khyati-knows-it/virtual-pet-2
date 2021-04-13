//Create variables here
var dogImage, happydogImage, milkImage;
var database, foodS, foodStock, feed, lastFed, fedTime, addFood, foodObj;

function preload(){
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(900, 500);
  foodObj = new Food();

  dog = createSprite(550,250,30,30);
  dog.scale=0.3;
  dog.addImage("dogImg", dogImage);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime=database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);
  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
    console.log(lastFed);
  })
  displayLastFed();
  foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage("dogImg",happydogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function displayLastFed(){
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    console.log("inside: "+lastFed);
    text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : " +lastFed + " AM", 350, 30);
  }
}




