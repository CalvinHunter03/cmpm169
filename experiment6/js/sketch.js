const story = {
  "start": "#[name:#person#][animal:#theAnimal#][importantItem:#item#][performAction:#action#]story#",
  "story": "Part One: Once upon a time, #name# was walking towards the #building# when suddenly there was a noise. #name# decided to check it out and noticed a small #animal#. \"You're not looking too well\", says the #animal#. #name# hadn't had a chance to look himself in the mirror that day, for they were rushed out of their house. Waking up #number# after their alarm, with only #number# minutes to get ready. #morningActivity# and #morningActivity# takes up a lot of time. Once everything was finished, #name# forgot to grab their #importantItem# while they were leaving. Without the #importantItem#, #name# won't be able to #performAction#. We all pray that #name# is able to #performAction# because the #animal# was looking forward to watching them do it. ",
  "person": ["Joe", "Bob", "Gorilla Man"],
  "building": ["office", "bagel store", "climbing gym"],
  "theAnimal": ["cat", "tiger", "walrus"],
  "number": ["1", "2", "10", "20", "15", "50"],
  "morningActivity": ["brushing teeth", "brushing hair", "eating breakfast", "doing 300 push ups", "drawing eyebrows on", "10 minutes of praying to God", "drinking water", "putting shoes on"],
  "item": ["notebook", "wallet", "phone", "keys", "teddy bear", "support blanket", "sunglasses", "keyboard", "ball and chain", "gauntlet", "really heavy hammer", "pc setup"],
  "action": ["save the princess", "jump on the bed", "play minecraft", "listen to music", "get down on all fours and crawl", "hold a normal conversation without thinking about her", "dance"]
}

const myCreation = {
  "start": "#[name:#person#][animal:#theAnimal#][importantItem:#item#][performAction:#action#]story#",
  "story": "Part One: Once upon a time, #name# was walking towards the #building# when suddenly there was a noise. #name# decided to check it out and noticed a small #animal#. \"You're not looking too well\", says the #animal#. #name# hadn't had a chance to look himself in the mirror that day, for they were rushed out of their house. Waking up #number# after their alarm, with only #number# minutes to get ready. #morningActivity# and #morningActivity# takes up a lot of time. Once everything was finished, #name# forgot to grab their #importantItem# while they were leaving. Without the #importantItem#, #name# won't be able to #performAction#. We all pray that #name# is able to #performAction# because the #animal# was looking forward to watching them do it. ",
  "person": ["Joe", "Bob", "Gorilla Man"],
  "building": ["office", "bagel store", "climbing gym"],
  "theAnimal": ["cat", "tiger", "walrus"],
  "number": ["1", "2", "10", "20", "15", "50"],
  "morningActivity": ["brushing teeth", "brushing hair", "eating breakfast", "doing 300 push ups", "drawing eyebrows on", "10 minutes of praying to God", "drinking water", "putting shoes on"],
  "item": ["notebook", "wallet", "phone", "keys", "teddy bear", "support blanket", "sunglasses", "keyboard", "ball and chain", "gauntlet", "really heavy hammer", "pc setup"],
  "action": ["save the princess", "jump on the bed", "play minecraft", "listen to music", "get down on all fours and crawl", "hold a normal conversation without thinking about her", "dance"]
}

let resetButton = document.createElement("button");


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
  canvas.document.querySelector('.scrolling-text');
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();


  grammer = tracery.createGrammar(story);

  result = grammer.flatten("#start#");
  // console.log(result);


  //Reset Button - Create, mouse pressed
  let resetButton = createButton('Refresh');
  resetButton.position(canvasContainer.width() / 3, canvasContainer.height()/4);
  resetButton.mousePressed(resetStory);

  //Input button
  let inputButton = createButton("Input");
  inputButton.position(canvasContainer.width() * 3 / 4, canvasContainer.height() /4)

  };

  function resetStory(){
    window.location.reload();
  }

  function draw() {
    background(220);

    

    rect(canvasContainer.width() / 10, canvasContainer.height() / 15, canvasContainer.width() * 4/5 , canvasContainer.height() * 13/15);
    text(result, canvasContainer.width() / 4, canvasContainer.height() / 4, canvasContainer.width() / 2, canvasContainer.height() / 2);
  }
 

  
  
  