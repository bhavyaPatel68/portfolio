let car = document.getElementById("ferrari-car");
let invertCar = document.getElementById("invert-ferrari-car");
let bottomFerrariCar = document.getElementById("bottom-ferrari-car");
// performance issue
let ticking = false;
function updateCars() {
// tracks how far website scrolled down
let scrollY = window.scrollY;
// moves the top car to the left and rotates it a bit
car.style.transform =`translateX(-${scrollY * 3}px) rotate(-${scrollY * 0.03}deg)`;
// gets position of bottom car
const bottomCarLoc = invertCar.getBoundingClientRect();
// takes height of your screen
const windowHeight = window.innerHeight;
//figures out how much should be complete depending on how much you have scrolled from 0-1
let progress = (windowHeight - bottomCarLoc.top) / (windowHeight * 1.2);
//make sure the value is always between 0-1 to represent how much of the animation is done
progress = Math.min(Math.max(progress, 0), 1);
// starts the car off the screen to the left
const startOffset = 2000;
// finds out where the right side of the screen is including the width of the car
const endOffset = window.innerWidth + 900;
// calculates how much the car should have its x position moved using the 0-1 progress from earlier
const xOffset = -startOffset + (startOffset + endOffset) * progress;
// turns those calculations into actual car movement
invertCar.style.transform = `translateX(${xOffset}px)`;

//same code but for the bottom one and inverted to go from right to left/middle
const maxScroll = document.body.scrollHeight - windowHeight;
let bottomCarProgress = scrollY / maxScroll;
bottomCarProgress = Math.min(Math.max(bottomCarProgress, 0), 1);
const bottomCarXOffset =4000 * (1 - bottomCarProgress);
bottomFerrariCar.style.transform = `translateX(${bottomCarXOffset}px)`;

// ready for next frame
ticking = false;
}
// performance enhances the website making sure multiple animation frames arent happening at the same time
function handleScroll() {
if (!ticking) {
requestAnimationFrame(updateCars);
ticking = true;
  }
}
// contact form text removal
document.getElementById("contactForm").addEventListener("submit", function (e) {
//stops page from reloading
e.preventDefault();
// clears the textboxes
document.getElementById("contactName").value = "";
document.getElementById("contactSubject").value = "";
document.getElementById("contactMessage").value = "";
});
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", updateCars);

// light mode
const themeToggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "dark";
}
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "Dark" : "Light";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});