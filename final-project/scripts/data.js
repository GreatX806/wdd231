// Data access: fetch the local JSON file with async/await and try...catch
const DATA_URL = "data/businesses.json";

// Image and alt text used for each business category
export const categoryImages = {
  "Food & Drink": { file: "cat-food.webp", alt: "Illustration of a steaming bowl of food" },
  "Fashion & Beauty": { file: "cat-fashion.webp", alt: "Illustration of a dress on a hanger" },
  "Technology": { file: "cat-tech.webp", alt: "Illustration of a laptop showing lines of code" },
  "Health & Wellness": { file: "cat-health.webp", alt: "Illustration of a red medical cross" },
  "Logistics & Transport": { file: "cat-logistics.webp", alt: "Illustration of a delivery truck" },
  "Professional Services": { file: "cat-professional.webp", alt: "Illustration of a briefcase" }
};

export async function getBusinesses() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not load businesses:", error);
    return [];
  }
}
