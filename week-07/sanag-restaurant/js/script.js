/* ============================================================
   Sanag Restaurant — JavaScript
   ============================================================ */

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.style.boxShadow = window.scrollY > 50
    ? '0 4px 15px rgba(0,0,0,0.15)'
    : '0 2px 5px rgba(0,0,0,0.05)';
});

// Weather API - Minneapolis
async function getWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=44.98&longitude=-93.27&current_weather=true&temperature_unit=fahrenheit'
    );
    const data = await res.json();
    const temp = data.current_weather.temperature;
    document.getElementById('weatherText').textContent =
      `Minneapolis is currently ${temp}°F — perfect weather to dine in! 🌤️`;
  } catch (err) {
    document.getElementById('weatherText').textContent = 'Weather unavailable';
  }
}

getWeather();

// Chef's Special — TheMealDB API
const specialImg = document.querySelector("#special-img");
const specialTitle = document.querySelector("#special-title");
const specialDesc = document.querySelector("#special-desc");
const loadSpecialBtn = document.querySelector("#load-special-btn");

async function fetchChefSpecial() {
  try {
    specialTitle.textContent = "Loading...";
    specialDesc.textContent = "Please wait while we load today's special...";

    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    if (!response.ok) throw new Error("Failed to fetch from server!");

    const data = await response.json();
    const meal = data.meals[0];

    specialImg.src = meal.strMealThumb;
    specialTitle.textContent = meal.strMeal;
    specialDesc.textContent = `Category: ${meal.strCategory} | Origin: ${meal.strArea}`;

  } catch (error) {
    console.error("Error:", error);
    specialTitle.textContent = "Could not load special";
    specialDesc.textContent = "Please check your internet and try again.";
  }
}

fetchChefSpecial();
loadSpecialBtn.addEventListener("click", fetchChefSpecial);

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  document.getElementById('formStatus').textContent =
    `Thank you, ${name}! We'll get back to you soon. 🍽️`;
  e.target.reset();
});