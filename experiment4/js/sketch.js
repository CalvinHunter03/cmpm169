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

  // Use the createCapture() function to access the device's
  // camera and start capturing video.
  capture = createCapture(VIDEO);

  // Make the capture frame half of the canvas.
  capture.size(canvasContainer.width(), canvasContainer.height());

  // Use capture.hide() to remove the p5.Element object made
  // using createCapture(). The video will instead be rendered as
  // an image in draw().
  capture.hide();
}


function draw() {
  // Set the background to gray.

  background(51);

  // Draw the resulting video capture on the canvas
  // with the invert filter applied.
  image(capture, 0, 0, canvasContainer.width(), canvasContainer.height());
//   filter(INVERT);

//Bottom Camera
blend(capture,
  0, 0, canvasContainer.width(), canvasContainer.height() / 2, 
0, 0, canvasContainer.width(), canvasContainer.height()/2, 
EXCLUSION);

    filter(BLUR, 10);
    //filter(DILATE, 3);


  /*


      blend(capture, 0, 0, canvasContainer.width(), canvasContainer.height(), ); 


    */


    

    //Bottom Camera
    blend(capture,
       0, 0, canvasContainer.width(), canvasContainer.height(), 
    80, canvasContainer.height() / 2, canvasContainer.width() - 160, canvasContainer.height()/2, 
    BLEND);




  
    // rotate(sin(3* PI/4));    
    // rotate(degrees(-PI/4));

       
      //top right rotate 45 degree inward screen

    push();
    translate(canvasContainer.width() * 7/8, 15);
    rotate(radians(45));
    blend(capture, 
      0, 0, canvasContainer.width(), canvasContainer.height(), 
    0, 0, canvasContainer.width() * 1/6, canvasContainer.height() * 1/4 + 50 , 
    BLEND);

    pop();


    //https://stackoverflow.com/questions/45388765/how-to-rotate-image-in-p5-js
    
    // translate(width / 2, height / 2);
    // rotate(PI / 180 * 45);
    // imageMode(CENTER);
    // image(img, 0, 0, 150, 150);

    //top left rotate 45 degree inward screen

    push();
    translate(0,canvasContainer.height() / 4);
    rotate(radians(-45));
  blend(capture, 
      0, 0, canvasContainer.width(), canvasContainer.height(), 
    0, 0, canvasContainer.width() * 1/5, canvasContainer.height() * 1/4 + 50 , 
    BLEND);

    pop(); 

    //inner left normal degrees
    blend(capture, 
      0, 0, canvasContainer.width(), canvasContainer.height(), 
    canvasContainer.width() * 1/5, canvasContainer.height() * 1/3.5, canvasContainer.width() * 1/4, canvasContainer.height() * 1/4 , 
    BLEND);

    //inner right normal degrees
    blend(capture, 
      0, 0, canvasContainer.width(), canvasContainer.height(), 
    canvasContainer.width() * 2.7/5, canvasContainer.height() * 1/3.5, canvasContainer.width() * 1/4, canvasContainer.height() * 1/4 , 
    BLEND);

    //left filter
    push();
    translate(0, canvasContainer.height() / 2);
    blend(capture, canvasContainer.width()/20, canvasContainer.height() / 2, canvasContainer.width() / 4, canvasContainer.height() / 2, 
    0, 0, canvasContainer.width() / 4, canvasContainer.height() / 2, EXCLUSION); 
    // filter(BLUR, 10);
    pop();

    push();
    translate(canvasContainer.width() * 9 / 12, canvasContainer.height() / 2);
    blend(capture, canvasContainer.width() * 9/12, canvasContainer.height() / 2, canvasContainer.width() / 4, canvasContainer.height() / 2, 
    0, 0, canvasContainer.width() / 2, canvasContainer.height() / 2, EXCLUSION); 

    pop();



    
    

}

  

 
