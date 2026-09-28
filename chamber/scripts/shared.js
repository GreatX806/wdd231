const yearElement = document.querySelector("#year");
const modifiedElement = document.querySelector("#last-modified");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
  modifiedElement.textContent = document.lastModified;
}

const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}
