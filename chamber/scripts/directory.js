// ---------- Footer: dynamic year and last modified date ----------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// ---------- Mobile navigation toggle ----------
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// ---------- Member directory: fetch + render ----------
const directoryList = document.getElementById("directory-list");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

const membershipLabels = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Network response was not OK (status ${response.status})`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    directoryList.innerHTML = `<p class="loading">Sorry, the member directory could not be loaded right now.</p>`;
    console.error("Error fetching members.json:", error);
  }
}

function displayMembers(members) {
  directoryList.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
      <div class="member-card-body">
        <span class="member-level level-${member.membership}">${membershipLabels[member.membership]}</span>
        <h3>${member.name}</h3>
        <p>${member.tagline}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a class="website" href="${member.url}" target="_blank" rel="noopener">Visit Website</a>
      </div>
    `;

    directoryList.appendChild(card);
  });
}

// ---------- Grid / list view toggle ----------
gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

function setView(view) {
  if (view === "grid") {
    directoryList.classList.add("grid-view");
    directoryList.classList.remove("list-view");
    gridBtn.classList.add("active");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.classList.remove("active");
    listBtn.setAttribute("aria-pressed", "false");
  } else {
    directoryList.classList.add("list-view");
    directoryList.classList.remove("grid-view");
    listBtn.classList.add("active");
    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.classList.remove("active");
    gridBtn.setAttribute("aria-pressed", "false");
  }
}

getMembers();
