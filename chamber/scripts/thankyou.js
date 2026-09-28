/* ============================================
   Lagos Chamber of Commerce — thankyou.js
   Reads the GET query string from join.html and
   displays the required submitted fields.
   ============================================ */

function displayConfirmation() {
  const list = document.getElementById("confirmationList");
  if (!list) return;

  const params = new URLSearchParams(window.location.search);

  const fields = [
    { label: "First name", key: "fname" },
    { label: "Last name", key: "lname" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Business/organization", key: "orgname" },
    { label: "Submitted", key: "timestamp" },
  ];

  list.innerHTML = fields
    .map((field) => {
      const value = params.get(field.key) || "Not provided";
      return `
        <div>
          <dt>${field.label}</dt>
          <dd>${value}</dd>
        </div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", displayConfirmation);
