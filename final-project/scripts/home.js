import { initPage } from "./shared.js";
import { getBusinesses } from "./data.js";
import { featuredCard } from "./cards.js";

initPage();

const stats = document.querySelector("#stats");
const featured = document.querySelector("#featured");

async function init() {
  const businesses = await getBusinesses();

  if (businesses.length === 0) {
    stats.innerHTML = "";
    featured.innerHTML = `<p class="status">Sorry, the directory could not be loaded right now. Please try again later.</p>`;
    return;
  }

  // Directory facts calculated with reduce and Set
  const averageRating = businesses.reduce((sum, business) => sum + business.rating, 0) / businesses.length;
  const categoryCount = new Set(businesses.map((business) => business.category)).size;
  const areaCount = new Set(businesses.map((business) => business.area)).size;

  stats.innerHTML = [
    [businesses.length, "Businesses"],
    [categoryCount, "Categories"],
    [areaCount, "Areas of Lagos"],
    [averageRating.toFixed(1), "Average rating"]
  ]
    .map(([value, label]) => `<li><span class="stat-value">${value}</span><span class="stat-label">${label}</span></li>`)
    .join("");

  // Four highest-rated businesses
  const topRated = [...businesses].sort((a, b) => b.rating - a.rating).slice(0, 4);
  featured.innerHTML = topRated.map(featuredCard).join("");
}

init();
