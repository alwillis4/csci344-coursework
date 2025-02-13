let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
  // sets up your canvas
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  draw5Circles();
  draw5RedSquares();
  draw5CirclesFor();
  drawNCircles(20);
  drawNCirclesFlexible(30, 25, 400, 0);
  drawNCirclesFlexible(4, 100, 100, 200);
  drawNCirclesFlexible(8, 50, 700, 100);
  // draw the grid
  drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
  noFill();
  // fill('red');
  let x = 100;
  let y = 200;
  let d = 50;
  let i = 0;

  while (i < 5) {
    circle(x, y + 50 * i, d); // centerx, centery, radius
    i++;
  }

  //while (y < 100) {
  // y += 10;
  //d += 10;
  //circle(x, y, d);
  //}

  //circle(100, 200, 50); // centerX, centerY, radius
  //circle(100, 250, 50);
  //circle(100, 300, 50);
  //circle(100, 350, 50);
  //circle(100, 400, 50);
}

function draw5CirclesFor() {
  noFill();
  let x = 200; // Different x-position to avoid overlap
  let y = 200;
  let d = 50;

  for (let i = 0; i < 5; i++) {
    circle(x, y + 50 * i, d);
  }
}

function drawNCircles(n) {
  noFill();
  let x = 300; // Different starting x-position
  let y = 100;
  let d = 50;

  for (let i = 0; i < n; i++) {
    circle(x, y + 50 * i, d);
  }
}

function drawNCirclesFlexible(n, size, x, y) {
  noFill();
  for (let i = 0; i < n; i++) {
    circle(x, y + size * i, size);
  }
}

function draw5RedSquares() {
  fill("red");
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}
