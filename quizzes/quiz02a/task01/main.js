// your function here
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
