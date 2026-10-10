import { initPage } from "./shared.js";

initPage();

// Record when the form was submitted
const timestamp = document.querySelector("#timestamp");
document.querySelector("#listing-form").addEventListener("submit", () => {
  timestamp.value = new Date().toISOString();
});

// Live character counter for the description box
const description = document.querySelector("#description");
const counter = document.querySelector("#description-count");

description.addEventListener("input", () => {
  counter.textContent = `${description.value.length} / ${description.maxLength} characters`;
});
