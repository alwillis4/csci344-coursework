const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // function invocations goes here:

  drawMonster(100, 100, 150, "#0bc9cd", false);
  drawMonster(300, 200, 75, "#8093f1", true);
  drawMonster(100, 325, 100, "#8093f1", false);
  drawMonster(250, 375, 125, "#7fb285", true);
  drawMonster(550, 200, 250, "#7fb285", false);

  drawGrid(canvasWidth, canvasHeight);
}

// function definition goes here:
function drawMonster(x, y, size, color, isSurprised) {
  /**
   * Make face rectangle (x, y, width, height)
   * Two more smaller rectangles (math to x, y, width, height to petion the correctly
   */
  fill(color);
  rect(x, y, size, size);
  fill("white");
  const eyeXleft = x - size / 3;
  const eyeY = x - size / 3;
  const eyeBallWidth = size / 5;
  const pupilWidth = size / 10;

  // left eye
  rect(eyeXleft, eyeY, eyeBallWidth, eyeBallWidth);
  // right eye

  /** Set color to black
   * make two puplis
   * Make the mouth (needs an if else) -- frog mout or suprise mouth
   */
}
