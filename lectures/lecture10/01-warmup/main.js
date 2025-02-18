let canvasWidth = document.documentElement.clientWidth - 10;
let canvasHeight = document.documentElement.clientHeight - 10;

// in p5.js, the function runs on page load:
function setup() {
  rectMode(CENTER);
  createCanvas(canvasWidth, canvasHeight);
}

// in p5.js, special event handler that listens for click events:
function mouseClicked() {
  let randomSize = random(50, 150);
  let isRectangle = random() < 0.5; // 50% chance of drawing a rectangle

  if (isRectangle) {
    fill(randomColor());
    rect(mouseX, mouseY, randomSize, randomSize);
  } else {
    drawBullseye(mouseX, mouseY);
  }
  // in p5.js, mouseX and mouseY are
  // built-in global variabls that track the
  // current position of your mouse.
}

// in p5.js, special event handler that listens for drag events:
function mouseDragged() {
  let randomSize = random(1, 150);
  let isRectangle = random() < 0.5; // 50% chance of drawing a rectangle

  fill(randomColor());
  if (isRectangle) {
    rect(mouseX, mouseY, randomSize, randomSize);
  } else {
    circle(mouseX, mouseY, randomSize);
  }
}

function drawBullseye(x, y) {
  let layers = int(random(3, 6)); // Random number of rings (between 3 and 5)
  for (let i = layers; i > 0; i--) {
    fill(randomColor());
    circle(x, y, i * 30); // Decreasing size for bullseye effect
  }
}

function randomColor() {
  return color(random(255), random(255), random(255));
}

/**
 * Challenges:
 * 1. As you click / drag, can the circles have different colors and sizes?
 *      * Try using the Math.random() function
 * 2. Can you make the click / drag sometimes make circles and sometimes make rectangles
 *      * Sample rectangle function invocation: rect(mouseX, mouseY, 100, 100);
 * 3. Can you make each click create a bulleye of different colors?
 *      * Hint: make sure you draw the bigger circles before you draw the smaller circles.
 */
