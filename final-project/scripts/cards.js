// Card templates built with template literals
import { categoryImages } from "./data.js";

function cardTop(business) {
  const image = categoryImages[business.category];
  return `
    <img src="images/${image.file}" alt="${image.alt}" width="400" height="260" loading="lazy">
    <div class="biz-body">
      <p class="biz-category">${business.category}</p>
      <h3>${business.name}</h3>
      <ul class="biz-meta">
        <li><span class="meta-label">Area</span> ${business.area}</li>
        <li><span class="meta-label">Rating</span> ${business.rating.toFixed(1)} / 5</li>
        <li><span class="meta-label">Phone</span> <a href="tel:${business.phone.replace(/\s+/g, "")}">${business.phone}</a></li>
      </ul>`;
}

// Directory card: details + save buttons
export function directoryCard(business, isFavorite) {
  return `
  <article class="biz-card">
    ${cardTop(business)}
      <div class="biz-actions">
        <button type="button" class="btn" data-details="${business.id}">View details</button>
        <button type="button" class="btn btn-outline" data-fav="${business.id}" aria-pressed="${isFavorite}">${isFavorite ? "Saved" : "Save"}</button>
      </div>
    </div>
  </article>`;
}

// Home page card: link to the directory
export function featuredCard(business) {
  return `
  <article class="biz-card">
    ${cardTop(business)}
      <div class="biz-actions">
        <a class="btn btn-outline" href="businesses.html">Find in directory</a>
      </div>
    </div>
  </article>`;
}
