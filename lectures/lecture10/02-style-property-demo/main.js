//const changecolor = () => {
// document.querySelector("btn").style.backgroundColor = "color";
// };

function changeColor(selector, color) {
  console.log(selector, color);
  const el = document.querySelector(selector);
  if (el.style.backgroundColor === color) {
    el.style.backgroundColor = "white";
  } else {
    el.style.backgroundColor = color;
  }
}

function reset() {
  document.querySelector("#section1").style.backgroundColor = "tranparent";
  document.querySelector("#section2").style.backgroundColor = "tranparent";
  document.querySelector("#section3").style.backgroundColor = "tranparent";
  document.querySelector("#section4").style.backgroundColor = "tranparent";
}
