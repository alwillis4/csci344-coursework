function color1() {
  // target the element with the id of square1
  // and change its background color...
  document.getElementById("square1").style.backgroundColor = "red";
}

function color2() {
  // target the element with the id of square2
  // and change its background color...
  document.getElementById("square2").style.backgroundColor = "blue";
}

function color3() {
  // TODO
  document.getElementById("square3").style.backgroundColor = "green";
}

function color4() {
  // TODO
  document.getElementById("square4").style.backgroundColor = "yellow";
}

function color5() {
  // TODO
  document.getElementById("square5").style.backgroundColor = "purple";
}

function color6() {
  // TODO
  document.getElementById("square6").style.backgroundColor = "orange";
}
document.getElementById("square1").addEventListener("click", color1);
document.getElementById("square2").addEventListener("click", color2);
document.getElementById("square3").addEventListener("click", color3);
document.getElementById("square4").addEventListener("click", color4);
document.getElementById("square5").addEventListener("click", color5);
document.getElementById("square6").addEventListener("click", color6);
