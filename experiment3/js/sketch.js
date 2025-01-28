// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
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
}




let trees = []; // Array to store all growing trees

function draw() {
  background(200, 225, 255); // Light blue sky

  // Draw and update all trees
  for (let i = trees.length - 1; i >= 0; i--) {
    let tree = trees[i];
    tree.update();
    tree.show();
    if (tree.isDead()) {
      trees.splice(i, 1); // Remove dead tree
    }
  }
}

// Plant a seed when the mouse is clicked
function mousePressed() {
  trees.push(new Tree(mouseX, mouseY));
}

// Tree class
class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.branches = [];
    this.growthStage = 0; // 0 = seed, 1 = growing trunk, 2 = growing branches, 3 = grown, 4 = withering
    this.lifeTimer = 0; // Timer for life stages
    this.maxLife = 500; // Total lifespan before dying
    this.trunkHeight = 0; // Current trunk height
    this.maxTrunkHeight = random(50, 150); // Maximum height of the trunk
    this.trunkShrivelRate = random(0.5, 1.5); // Rate at which the trunk shrinks
  }

  update() {
    if (this.growthStage === 0) {
      // Seed stage: transition to growing trunk
      this.lifeTimer++;
      if (this.lifeTimer > 30) {
        this.growthStage = 1;
        this.lifeTimer = 0;
      }
    } else if (this.growthStage === 1) {
      // Growing trunk stage
      this.trunkHeight += 2; // Incrementally grow the trunk
      if (this.trunkHeight >= this.maxTrunkHeight) {
        this.growthStage = 2; // Transition to growing branches
      }
    } else if (this.growthStage === 2) {
      // Growing branches stage
      if (this.lifeTimer % 10 === 0 && this.branches.length < 50) {
        let angle = random(PI / 6, 5 * PI / 6); // Branch angles
        let length = random(30, 100); // Random branch length
        let branchX = this.x;
        let branchY = this.y - this.trunkHeight; // Branches start at the top of the trunk
        this.branches.push(new Branch(branchX, branchY, angle, length));
      }
      this.lifeTimer++;
      if (this.branches.length >= 50) {
        this.growthStage = 3;
        this.lifeTimer = 0;
      }
    } else if (this.growthStage === 3) {
      // Grown stage: transition to withering
      this.lifeTimer++;
      if (this.lifeTimer > 200) {
        this.growthStage = 4;
        this.lifeTimer = 0;
      }
    } else if (this.growthStage === 4) {
      // Withering stage: shrink branches and trunk
      for (let branch of this.branches) {
        branch.shrivel();
        if(branch.length <= 0){
          this.branches.pop();
        }
      }
      if(this.branches.length <= 0){
              this.trunkHeight = max(0, this.trunkHeight - this.trunkShrivelRate); // Shrink the trunk

      }
    }
  }

  show() {
    if (this.growthStage === 0) {
      fill(100, 50, 0);
      ellipse(this.x, this.y, 10); // Draw seed
    } else {
      // Draw trunk
      stroke(100, 50, 0);
      strokeWeight(5);
      line(this.x, this.y, this.x, this.y - this.trunkHeight);

      // Draw branches
      for (let branch of this.branches) {
        branch.show();
      }
    }
  }

  isDead() {
    return (
      this.growthStage === 4 &&
      this.trunkHeight <= 0 &&
      this.branches.every((b) => b.length <= 0)
    );
  }
}

// Branch class
class Branch {
  constructor(x, y, angle, length) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.originalLength = length;
    this.shrivelRate = random(0.1, 0.5);
  }

  show() {
    let endX = this.x + cos(this.angle) * this.length;
    let endY = this.y - sin(this.angle) * this.length; // Grow upwards
    stroke(0, 200, 30);
    strokeWeight(2);
    line(this.x, this.y, endX, endY);
  }

  shrivel() {
    this.length = max(0, this.length - this.shrivelRate);
  }
}
