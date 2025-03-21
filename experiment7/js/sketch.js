
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

function draw() {
  
  
}

function convertToListElement(listElement){

  let tempListElement = document.createElement("li");
  tempListElement.innerHTML = listElement;

  return tempListElement;
}

function compareTheseTWo(jsonIngredientList, userSearchList){

  let num = 0;
  for(let ingredient of jsonIngredientList){
    for(let userIngredient of userSearchList){
      if(ingredient === userIngredient){
        num++;
      }
    }
  }
  if(num === userSearchList.length){
    return true;
  }
  return false;
}

function displayRecipeNameSet(theSet){

  const tempArray = Array.from(theSet);
  for(let i = 0; i < theSet.size; i++){
    let tempElement = document.createElement("li");
    tempElement.innerHTML = tempArray[i];
    rightDiv.append(tempElement);
  }
}

function convertIngredient(ingredient){
  ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let newIngredient = ingredient.toLowerCase();
  return newIngredient;
}

let ingredientSet = new Set();

let recipeNameSet = new Set();
let searchList = [];
let recipeNameList = [];

let searchListDisplay = document.createElement("div");
let rightDiv = document.getElementById("right-div");

// INGREIDENT INPUT
let ingredientInput = document.createElement("input");
ingredientInput.innerHTML = "Enter One Ingredient";
ingredientInput.type = "text";

//ADD TO SEARCH BUTTON
let addToSearchButton = document.createElement("button");
addToSearchButton.innerHTML = "Add to search list";
addToSearchButton.addEventListener("click", () => {
  if(ingredientInput.value != ""){
    let tempListElement = convertToListElement(ingredientInput.value);
  searchListDisplay.append(tempListElement);
  searchList.push(ingredientInput.value);
  ingredientInput.value = "";
  }
})

//CLEAR LIST BUTTON
let clearListButton = document.createElement("button");
clearListButton.innerHTML = "Clear";
clearListButton.addEventListener("click", () => {
  searchListDisplay.innerHTML = "";
  searchList = [];
  rightDiv.innerHTML = "";
})


//SEARCH BUTTON
let searchButton = document.createElement("button");
searchButton.innerHTML = "Search";
searchButton.addEventListener("click", () => {
  fetch('./Recipe/recipes_images.json')
    .then(response => response.json())
    .then(json => {
      for(let i = 0; i < json.recipes.length; i++){
        if(json.recipes[i].tags && json.recipes[i].tags.ingredient){          
          let num = 0;
          for(let ingredient of json.recipes[i].tags.ingredient){
            for(let userIngredient of searchList){
              let tempIng = convertIngredient(ingredient);
              let tempUserIng = convertIngredient(userIngredient)
              if(tempIng === tempUserIng){
                num++;
              }
            }
          }
          if(num === searchList.length && json.recipes[i].title){
            recipeNameSet.add(json.recipes[i].title);
          }
      } 
    }
    displayRecipeNameSet(recipeNameSet);
    console.log(recipeNameSet)
})
    .catch(error => console.error('Fetch error inside search button', error))
})

/*
https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
const str = "Crème Brûlée"
str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
*/



let ingredientText = document.createElement("h1");
ingredientText.innerHTML = "Enter One Ingredient";

let theCanvas = document.getElementById("canvas-container");

let appendList = [ingredientText, ingredientInput, addToSearchButton, clearListButton, searchListDisplay, searchButton];

for(let element of appendList){
  theCanvas.append(element);
}

// for(let i = 0; i < appendList.length; i++){
//   theCanvas.append(appendList[i]);
// } 




fetch('./Recipe/recipes_images.json')
  .then(response => response.json()) // Convert to JSON
  .then(json => {
    for(let i = 0; i < json.recipes.length; i++){
      if(json.recipes[i].tags && json.recipes[i].tags.simple_cooking){
        for(let j = 0; j < json.recipes[i].tags.simple_cooking.length; j++){


          ingredientSet.add(json.recipes[i].tags.simple_cooking[j]);
        }
      }
    }

    const sortedArray = Array.from(ingredientSet).sort();
    console.log(sortedArray);
  })
  .catch(error => console.error('Fetch error:', error));


  