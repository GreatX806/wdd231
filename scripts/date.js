const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastmodified").textContent =
    `Last Modification: ${document.lastModified}`;