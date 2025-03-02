let personList = [];
let buildingList = [];
let animalList = [];
let numberList = [];
let morningActivityList = [];
let itemList = [];
let actionList = [];

const defaultPersonList = ["Joe", "Bob", "Gorilla Man"];
const defaultBuildingList = ["office", "bagel store", "climbing gym"]
const defaultAnimalList = ["cat", "tiger", "walrus"]
const defaultNumberList = ["1", "2", "10", "20", "15", "50"]
const defaultMorningActivityList = ["brushing teeth", "brushing hair", "eating breakfast", "doing 300 push ups", "drawing eyebrows on", "10 minutes of praying to God", "drinking water", "putting shoes on"]
const defaultItemList = ["notebook", "wallet", "phone", "keys", "teddy bear", "support blanket", "sunglasses", "keyboard", "ball and chain", "gauntlet", "really heavy hammer", "pc setup"]
const defaultActionList = ["save the princess", "jump on the bed", "play minecraft", "listen to music", "get down on all fours and crawl", "hold a normal conversation without thinking about her", "dance"]

const story = {
  "start": "#[name:#person#][animal:#theAnimal#][importantItem:#item#][performAction:#action#]story#",
  "story": "Part One: Once upon a time, #name# was walking towards the #building# when suddenly there was a noise. #name# decided to check it out and noticed a small #animal#. \"You're not looking too well\", says the #animal#. #name# hadn't had a chance to look himself in the mirror that day, for they were rushed out of their house. Waking up #number# after their alarm, with only #number# minutes to get ready. #morningActivity# and #morningActivity# takes up a lot of time. Once everything was finished, #name# forgot to grab their #importantItem# while they were leaving. Without the #importantItem#, #name# won't be able to #performAction#. We all pray that #name# is able to #performAction# because the #animal# was looking forward to watching them do it. ",
  "person": personList,
  "building": buildingList,
  "theAnimal": animalList,
  "number": numberList,
  "morningActivity": morningActivityList,
  "item": itemList,
  "action": actionList
}

const myCreation = {
  "start": "#[name:#person#][animal:#theAnimal#][importantItem:#item#][performAction:#action#]story#",
  "story": "Part One: Once upon a time, #name# was walking towards the #building# when suddenly there was a noise. #name# decided to check it out and noticed a small #animal#. \"You're not looking too well\", says the #animal#. #name# hadn't had a chance to look himself in the mirror that day, for they were rushed out of their house. Waking up #number# after their alarm, with only #number# minutes to get ready. #morningActivity# and #morningActivity# takes up a lot of time. Once everything was finished, #name# forgot to grab their #importantItem# while they were leaving. Without the #importantItem#, #name# won't be able to #performAction#. We all pray that #name# is able to #performAction# because the #animal# was looking forward to watching them do it. ",
  "person": defaultPersonList,
  "building": defaultBuildingList,
  "theAnimal": defaultAnimalList,
  "number": defaultNumberList,
  "morningActivity": defaultMorningActivityList,
  "item": defaultItemList,
  "action": defaultActionList
}

let grammer;
let result;

let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  //canvas.document.querySelector('.scrolling-text');
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();


  grammer = tracery.createGrammar(myCreation);

  result = grammer.flatten("#start#");
  // console.log(result);

  //Reset Button - Create, mouse pressed
  let resetButton = createButton('Reset');
  resetButton.position(canvasContainer.width() / 3, canvasContainer.height()/4);
  resetButton.mousePressed(resetStory);

  //personAdd
  // let personAddButton = createButton("Add Person");
  // personAddButton.position(canvasContainer.width() / 2, canvasContainer.height()/2)



  let personButton = createButton('Add Person');
  personButton.position(canvasContainer.width() / 20, canvasContainer.height() / 7);
  personButton.mousePressed(addPersonPlease);
  
  let buildingButton = createButton('Add Establishment')
  buildingButton.position(canvasContainer.width()/20, canvasContainer.height() * 2/7)
  buildingButton.mousePressed(addBuildingPlease);

  let animalButton = createButton('Add Animal');
  animalButton.position(canvasContainer.width()/20, canvasContainer.height()*3/7);
  animalButton.mousePressed(addAnimalPlease);

  let numberButton = createButton('Add Number');
  numberButton.position(canvasContainer.width()/20, canvasContainer.height()*4/8);
  numberButton.mousePressed(addNumberPlease);

  let morningActivityButton = createButton('Add Morning Activity');
  morningActivityButton.position(canvasContainer.width()/20, canvasContainer.height()*5/8);
  morningActivityButton.mousePressed(addMorningActivityPlease)

  let itemButton = createButton('Add Item');
  itemButton.position(canvasContainer.width()/20, canvasContainer.height()*6/8);
  itemButton.mousePressed(addItemPlease);

  let actionButton = createButton('Add Action');
  actionButton.position(canvasContainer.width()/20, canvasContainer.height()*7/8);
  actionButton.mousePressed(addActionPlease);

  };

  function addPersonPlease(){
    let person = prompt("Enter a person's name, only one.");
    defaultPersonList.push(person);
  }

  function addBuildingPlease(){
    let building = prompt("Enter an establishment / building");
    defaultBuildingList.push(building);
  }

  function addAnimalPlease(){
    let animal = prompt("Enter an animal");
    defaultAnimalList.push(animal);
  }

  function addNumberPlease(){
    let number = prompt("Enter a number");
    defaultNumberList.push(number);
  }

  function addMorningActivityPlease(){
    let ma = prompt("Enter a morning activity");
    defaultMorningActivityList.push(ma);
  }

  function addItemPlease(){
    let item = prompt("Enter an item");
    defaultItemList.push(item);
  }

  function addActionPlease(){
    let action = prompt("Enter an action");
    defaultActionList.push(action);
  }

  function resetStory(){
    window.location.reload();
  }

  

  function draw() {
    background(220);

    

    rect(canvasContainer.width() / 10, canvasContainer.height() / 15, canvasContainer.width() * 4/5 , canvasContainer.height() * 13/15);
    text(result, canvasContainer.width() / 4, canvasContainer.height() / 4, canvasContainer.width() / 2, canvasContainer.height() / 2);
  }
 

  
  
  