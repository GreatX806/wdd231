import { initPage } from "./shared.js";
import { getBusinesses } from "./data.js";
import { directoryCard } from "./cards.js";
import { getFavorites, toggleFavorite, getFilters, saveFilters, clearFilters } from "./storage.js";
import { setupModal, openBusinessModal } from "./modal.js";

initPage();
setupModal();

const results = document.querySelector("#results");
const resultCount = document.querySelector("#result-count");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const areaSelect = document.querySelector("#area");
const favoritesButton = document.querySelector("#favorites-only");
const resetButton = document.querySelector("#reset");

let businesses = [];
let filters = getFilters();

function fillSelect(select, values) {
  select.insertAdjacentHTML(
    "beforeend",
    values.map((value) => `<option value="${value}">${value}</option>`).join("")
  );
}

// Show saved filter values in the controls
function syncControls() {
  searchInput.value = filters.search;
  categorySelect.value = filters.category;
  areaSelect.value = filters.area;
  favoritesButton.setAttribute("aria-pressed", filters.favoritesOnly);
}

function getVisibleBusinesses() {
  const term = filters.search.trim().toLowerCase();
  const favorites = getFavorites();

  return businesses.filter((business) => {
    const text = `${business.name} ${business.description} ${business.category} ${business.area}`.toLowerCase();
    return (
      (filters.category === "all" || business.category === filters.category) &&
      (filters.area === "all" || business.area === filters.area) &&
      (!filters.favoritesOnly || favorites.includes(business.id)) &&
      (term === "" || text.includes(term))
    );
  });
}

function render(focusId) {
  const favorites = getFavorites();
  const visible = getVisibleBusinesses();

  resultCount.textContent = `Showing ${visible.length} of ${businesses.length} businesses`;
  results.innerHTML = visible.length
    ? visible.map((business) => directoryCard(business, favorites.includes(business.id))).join("")
    : `<p class="status">No businesses match your filters. Try clearing the search or choosing a different area.</p>`;

  if (focusId) results.querySelector(`[data-fav="${focusId}"]`)?.focus();
}

function updateFilters(changes) {
  filters = { ...filters, ...changes };
  saveFilters(filters);
  render();
}

searchInput.addEventListener("input", () => updateFilters({ search: searchInput.value }));
categorySelect.addEventListener("change", () => updateFilters({ category: categorySelect.value }));
areaSelect.addEventListener("change", () => updateFilters({ area: areaSelect.value }));

favoritesButton.addEventListener("click", () => {
  const favoritesOnly = favoritesButton.getAttribute("aria-pressed") !== "true";
  favoritesButton.setAttribute("aria-pressed", favoritesOnly);
  updateFilters({ favoritesOnly });
});

resetButton.addEventListener("click", () => {
  filters = clearFilters();
  syncControls();
  render();
});

// One listener handles every card button
results.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-details]");
  const favoriteButton = event.target.closest("[data-fav]");

  if (detailsButton) {
    const business = businesses.find((item) => item.id === Number(detailsButton.dataset.details));
    openBusinessModal(business, detailsButton);
  }

  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.fav);
    toggleFavorite(id);
    render(id);
  }
});

async function init() {
  businesses = await getBusinesses();

  if (businesses.length === 0) {
    resultCount.textContent = "";
    results.innerHTML = `<p class="status">Sorry, the directory could not be loaded right now. Please try again later.</p>`;
    return;
  }

  fillSelect(categorySelect, [...new Set(businesses.map((business) => business.category))].sort());
  fillSelect(areaSelect, [...new Set(businesses.map((business) => business.area))].sort());
  syncControls();
  render();
}

init();
