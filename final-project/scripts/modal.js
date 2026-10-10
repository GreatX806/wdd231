// Accessible modal built on the native <dialog> element
let opener = null;

export function setupModal() {
  const dialog = document.querySelector("#business-dialog");
  const closeButton = document.querySelector("#dialog-close");

  closeButton.addEventListener("click", () => dialog.close());

  // Clicking the dimmed backdrop closes the dialog
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Return focus to the button that opened the dialog
  dialog.addEventListener("close", () => opener?.focus());
}

export function openBusinessModal(business, openerButton) {
  const dialog = document.querySelector("#business-dialog");
  opener = openerButton;

  document.querySelector("#dialog-title").textContent = business.name;
  document.querySelector("#dialog-body").innerHTML = `
    <p>${business.description}</p>
    <dl class="detail-list">
      <div><dt>Category</dt><dd>${business.category}</dd></div>
      <div><dt>Area</dt><dd>${business.area}</dd></div>
      <div><dt>Address</dt><dd>${business.address}</dd></div>
      <div><dt>Phone</dt><dd><a href="tel:${business.phone.replace(/\s+/g, "")}">${business.phone}</a></dd></div>
      <div><dt>Opening hours</dt><dd>${business.hours}</dd></div>
      <div><dt>Rating</dt><dd>${business.rating.toFixed(1)} / 5</dd></div>
      <div><dt>Established</dt><dd>${business.established}</dd></div>
    </dl>`;

  dialog.showModal();
}
