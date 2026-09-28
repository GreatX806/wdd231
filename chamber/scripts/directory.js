const directory = document.querySelector("#directory-list");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

function setView(view) {
  const isGrid = view === "grid";

  directory.classList.toggle("grid-view", isGrid);
  directory.classList.toggle("list-view", !isGrid);

  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);

  gridButton.setAttribute("aria-pressed", String(isGrid));
  listButton.setAttribute("aria-pressed", String(!isGrid));

  localStorage.setItem("directoryView", view);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

function membershipName(level) {
  if (level === 3) return "Gold Member";
  if (level === 2) return "Silver Member";
  return "Member";
}

function createMemberCard(member) {
  const article = document.createElement("article");
  article.className = "member-card";

  const image = document.createElement("img");
  image.src = `atlantic-logistics.svg`; 
  image.alt = `${member.name} logo`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  const heading = document.createElement("h2");
  heading.textContent = member.name;

  const address = document.createElement("p");
  address.textContent = member.address;

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const website = document.createElement("p");
  const link = document.createElement("a");
  link.href = member.website;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Visit Website";
  website.appendChild(link);

  const level = document.createElement("span");
  level.className = "member-level";
  level.textContent = membershipName(member.membershipLevel);

  article.append(image, heading, address, phone, website, level);
  return article;
}

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Unable to load members.json: ${response.status}`);
    }

    const data = await response.json();

    directory.innerHTML = "";

    data.members.forEach((member) => {
      directory.appendChild(createMemberCard(member));
    });
  } catch (error) {
    console.error(error);
    directory.innerHTML = `
      <p class="error-message">
        The member directory could not be loaded. Please check the data file
        and make sure you are running the project through Live Server.
      </p>
    `;
  }
}

const savedView = localStorage.getItem("directoryView");
setView(savedView === "list" ? "list" : "grid");
loadMembers();
