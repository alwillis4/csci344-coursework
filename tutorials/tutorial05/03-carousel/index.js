let currentPosition = 0; // tracks the current postion of th carousel
let gap = 10; // gap between the pictures
const slideWidth = 400; //width of each slide

function moveCarousel(direction) {
  // selects everythings with the carousel-item class
  const items = document.querySelectorAll(".carousel-item");
  if (direction == "forward") {
    // minus 2 b/c first 2 slides already showing
    if (currentPosition >= items.length - 2) {
      return false; // stops slide movement
    }
    currentPosition++; // Moves to the next position
  } else {
    // Moves backward  if it is not at the start
    if (currentPosition == 0) {
      return false; // stops slide movement
    }
    currentPosition--; // Moves to the previous position
  }

  const offset = (slideWidth + gap) * currentPosition; // Calculates the translation offset

  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`; // Moves each item on the carousel to the left
  }
}
