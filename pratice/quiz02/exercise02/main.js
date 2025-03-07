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
  rectMode(CENTER); // Centered rectangles
  fill(color);
  rect(x, y, size, size, 20); // Face with rounded corners

  // Eye calculations
  let eyeSize = size / 5;
  let pupilSize = size / 10;
  let eyeOffsetX = size / 4;
  let eyeOffsetY = size / 6;

  // Draw eyes
  fill("white");
  rect(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  rect(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);

  // Draw pupils
  fill("black");
  rect(x - eyeOffsetX, y - eyeOffsetY, pupilSize, pupilSize);
  rect(x + eyeOffsetX, y - eyeOffsetY, pupilSize, pupilSize);

  // Draw the mouth
  fill("black");
  if (isSurprised) {
    rect(x, y + size / 6, size / 6, size / 6); // Square mouth for surprised face
  } else {
    rect(x, y + size / 6, size / 3, size / 10); // Regular rectangular mouth
  }
}
