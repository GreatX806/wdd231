/* ============================================
   Lagos Chamber of Commerce — chamber.js
   Home page behavior: nav, events, weather, spotlights
   ============================================ */

// ---------- Mobile nav toggle ----------
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ---------- Footer ----------
function setupFooter() {
  const yearEl = document.getElementById("currentYear");
  const modifiedEl = document.getElementById("lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modifiedEl) {
    modifiedEl.textContent = `Last updated: ${document.lastModified}`;
  }
}

// ---------- Current events ----------
// Static for now; swap for a fetch('data/events.json') the same way
// displaySpotlights() below reads members.json, if you want it data-driven.
const upcomingEvents = [
  {
    day: "14",
    month: "Oct",
    title: "Chamber Business Mixer",
    meta: "6:00 PM · Eko Convention Centre, Victoria Island",
  },
  {
    day: "22",
    month: "Oct",
    title: "Small Business Grant Workshop",
    meta: "10:00 AM · Chamber Offices, Marina Road",
  },
  {
    day: "05",
    month: "Nov",
    title: "Annual Trade Expo",
    meta: "9:00 AM · Landmark Centre, Lekki",
  },
];

function displayEvents() {
  const list = document.getElementById("eventList");
  if (!list) return;

  list.innerHTML = upcomingEvents
    .map(
      (event) => `
      <li>
        <div class="event-date">
          <span class="day">${event.day}</span>
          <span class="month">${event.month}</span>
        </div>
        <div>
          <p class="event-title">${event.title}</p>
          <p class="event-meta">${event.meta}</p>
        </div>
      </li>`
    )
    .join("");
}

// ---------- Weather (OpenWeatherMap) ----------
// Get a free API key at https://openweathermap.org/api and paste it below.
const WEATHER_API_KEY = "c58cb30f8bd78f33b6149e88073b5463";
const WEATHER_LAT = 6.5244; // Lagos, NG
const WEATHER_LON = 3.3792;

async function displayWeather() {
  const nowEl = document.getElementById("weatherNow");
  const forecastEl = document.getElementById("weatherForecast");
  if (!nowEl || !forecastEl) return;

  if (!WEATHER_API_KEY || WEATHER_API_KEY.startsWith("YOUR_")) {
    nowEl.innerHTML = `<p class="weather-status">Add your OpenWeatherMap API key in chamber.js to load live weather.</p>`;
    return;
  }

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Weather request failed");
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    // Current conditions
    const temp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    nowEl.innerHTML = `
      <span class="weather-temp">${temp}&deg;C</span>
      <span class="weather-desc">${description}</span>
    `;

    // Pick one entry per day near midday for a 3-day outlook
    const dailyPicks = forecast.list.filter((entry) =>
      entry.dt_txt.includes("12:00:00")
    );

    forecastEl.innerHTML = dailyPicks
      .slice(0, 3)
      .map((entry) => {
        const date = new Date(entry.dt_txt);
        const label = date.toLocaleDateString("en-US", { weekday: "short" });
        const dayTemp = Math.round(entry.main.temp);
        return `
          <div class="forecast-day">
            <span class="label">${label}</span>
            <span class="temp">${dayTemp}&deg;C</span>
          </div>`;
      })
      .join("");
  } catch (error) {
    console.error(error);
    nowEl.innerHTML = `<p class="weather-status">Weather is unavailable right now. Please check back later.</p>`;
  }
}

// ---------- Member spotlights ----------
async function displaySpotlights() {
  const grid = document.getElementById("spotlightGrid");
  if (!grid) return;

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Member data request failed");

    const data = await response.json();
    const eligible = data.members.filter(
      (member) => member.level === "Gold" || member.level === "Silver"
    );

    const chosen = pickRandom(eligible, 3);
    grid.innerHTML = chosen.map(spotlightCardHTML).join("");
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<p class="weather-status">Member spotlights are unavailable right now.</p>`;
  }
}

function pickRandom(array, count) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function initials(name) {
  return name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function spotlightCardHTML(member) {
  return `
    <div class="spotlight-card">
      <span class="logo" aria-hidden="true">${initials(member.name)}</span>
      <span class="membership-badge">${member.level} member</span>
      <h3>${member.name}</h3>
      <address>
        ${member.address}<br />
        ${member.phone}
      </address>
      <a class="card-link" href="${member.website}" target="_blank" rel="noopener">Visit website</a>
    </div>`;
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupFooter();
  displayEvents();
  displayWeather();
  displaySpotlights();
});
