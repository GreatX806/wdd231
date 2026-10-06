// Discover page: build place cards from the .mjs data module + localStorage visit message
import { places } from "../data/discover.mjs";

// ---------- Place cards ----------
const grid = document.getElementById("discoverGrid");

function buildCard(place, index) {
  const card = document.createElement("article");
  card.className = "place-card";

  // First image is above the fold on mobile, so only the rest are lazy loaded
  const loading = index === 0 ? "eager" : "lazy";

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="images/${place.image}" alt="${place.alt}" width="300" height="200" loading="${loading}">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-btn" type="button" data-place="${place.name}, Lagos">Learn more</button>
  `;
  return card;
}

places.forEach((place, index) => grid.appendChild(buildCard(place, index)));

// "Learn more" opens the place on Google Maps in a new tab
grid.addEventListener("click", (event) => {
  const button = event.target.closest(".learn-btn");
  if (!button) return;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(button.dataset.place)}`;
  window.open(url, "_blank", "noopener");
});

// ---------- Last visit message (localStorage) ----------
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const STORAGE_KEY = "lagosChamberLastVisit";
const messageBox = document.getElementById("visitMessage");
const messageText = document.getElementById("visitText");
const closeButton = document.getElementById("visitClose");

function getVisitMessage() {
  const now = Date.now();
  let lastVisit = null;

  try {
    lastVisit = Number(localStorage.getItem(STORAGE_KEY));
    localStorage.setItem(STORAGE_KEY, String(now));
  } catch (error) {
    console.error("localStorage unavailable:", error);
  }

  // First visit (nothing stored)
  if (!lastVisit) {
    return "Welcome! Let us know if you have any questions.";
  }

  const elapsed = now - lastVisit;

  // Less than one day since the last visit
  if (elapsed < MS_PER_DAY) {
    return "Back so soon! Awesome!";
  }

  const days = Math.floor(elapsed / MS_PER_DAY);
  return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

messageText.textContent = getVisitMessage();
messageBox.hidden = false;

closeButton.addEventListener("click", () => {
  messageBox.hidden = true;
});
