// Behavior shared by every page: responsive menu + footer dates
export function initPage() {
  const toggle = document.querySelector("#nav-toggle");
  const nav = document.querySelector("#primary-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#last-modified").textContent = document.lastModified;
}
