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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  colors = {
    U: [255, 255, 255], // White
    D: [255, 255, 0],   // Yellow
    L: [255, 165, 0],   // Orange
    R: [255, 0, 0],     // Red
    F: [0, 255, 0],     // Green
    B: [0, 0, 255]      // Blue
  };

  // Create the Rubik’s Cube structure
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push(new Cube(x * cubeSize, y * cubeSize, z * cubeSize));
      }
    }
  }
}

let cubes = [];
let cubeSize = 100;
let gridSize = 3;

function draw() {
  background(30);
  orbitControl();


  for (let cube of cubes) {
    cube.update();
    cube.display();
  }
}

class Cube {
  constructor(x, y, z) {
    this.origin = createVector(x, y, z);
    this.pos = this.origin.copy();
  }

  update() {
    let mouse = createVector(mouseX - width / 2, mouseY - height / 2, 0);
    let dir = p5.Vector.sub(this.pos, mouse);
    let distance = dir.mag();

    if (distance < 250) {
      dir.setMag(250 - distance);
    } else {
      dir.setMag(0);
    }

    let target = p5.Vector.add(this.origin, dir);
    this.pos.lerp(target, 0.1);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    stroke(0);

    // Draw faces with correct colors
    drawFace(0, 0, cubeSize / 2, colors.F); // Front
    drawFace(PI, 0, cubeSize / 2, colors.B); // Back
    drawFace(HALF_PI, 0, cubeSize / 2, colors.R); // Right
    drawFace(-HALF_PI, 0, cubeSize / 2, colors.L); // Left
    drawFace(0, -HALF_PI, cubeSize / 2, colors.U); // Up
    drawFace(0, HALF_PI, cubeSize / 2, colors.D); // Down

    pop();
  }
}

// Helper function to draw a cube face
function drawFace(rotX, rotY, translateZ, faceColor) {
  push();
  rotateX(rotX);
  rotateY(rotY);
  translate(0, 0, translateZ);
  fill(faceColor);
  rectMode(CENTER);
  square(0, 0, cubeSize);
  pop();
}