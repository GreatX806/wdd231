import { initPage } from "./shared.js";

initPage();

const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");

const fields = [
  ["fname", "First name"],
  ["lname", "Last name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["bizname", "Business name"],
  ["category", "Category"],
  ["area", "Area"],
  ["description", "Description"],
  ["timestamp", "Submitted"]
];

const submitted = fields.filter(([key]) => params.get(key));

if (submitted.length === 0) {
  summary.innerHTML = `<p class="status">No form details were found. <a href="contact.html">Go to the listing form</a>.</p>`;
} else {
  submitted.forEach(([key, label]) => {
    let value = params.get(key);
    if (key === "timestamp") {
      value = new Date(value).toLocaleString("en-NG", { dateStyle: "long", timeStyle: "short" });
    }

    const row = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value; // textContent keeps user input safe
    row.append(term, detail);
    summary.append(row);
  });
}
