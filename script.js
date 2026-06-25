let car = document.getElementById("ferrari-car");
let invertCar = document.getElementById("invert-ferrari-car");

let ticking = false;

function updateCars() {
  let scrollY = window.scrollY;

  car.style.transform =
    `translateX(-${scrollY * 3}px) rotate(-${scrollY * 0.03}deg)`;

  const bottomCarLoc = invertCar.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  let progress = (windowHeight - bottomCarLoc.top) / (windowHeight * 0.6);
  progress = Math.min(Math.max(progress, 0), 1);

  const startOffset = 1200;
  const xOffset = -startOffset * (1 - progress);
  invertCar.style.transform = `translateX(${xOffset}px)`;

  ticking = false;
}

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(updateCars);
    ticking = true;
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", updateCars);