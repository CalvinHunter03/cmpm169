// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

var tileCount = 50;
var actRandomSeed = 0;

var circleAlpha = 170;
var circleColor;


const VALUE1 = 1;
const VALUE2 = 2;

// Globals
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
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  circleColor = giveMeRandomColor();

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  background(255);

  randomSeed(actRandomSeed);

  stroke(circleColor);
  strokeWeight(mouseY / mouseX);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {


      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      var shiftX = random(mouseX, -mouseX) / 20;
      var shiftY = random(mouseX, -mouseX) / 20;
      
      
      ellipse(posX + shiftX, posY + shiftY, -mouseY / 10, -mouseY / 10);
    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
  circleColor = giveMeRandomColor();
}



function giveMeRandomColor(){
  return color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), circleAlpha);
}