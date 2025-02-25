function toggleMenu() {
  const nav = document.querySelector("#nav-links"); // Selects the navigation links
  const button = document.querySelector("#menu-toggle"); // Selects the menu button

  // Toggle the 'active' class for both elements
  nav.classList.toggle("active");
  button.classList.toggle("active");
}
