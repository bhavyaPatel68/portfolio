
let car = document.getElementById("ferrari-car");
let invertCar = document.getElementById("invert-ferrari-car");
// performance issue
let ticking = false;

function updateCars() {
  // tracks how far website scrolled down
  let scrollY = window.scrollY;
// moves the top car to the left and rotates it
  car.style.transform =`translateX(-${scrollY * 3}px) rotate(-${scrollY * 0.03}deg)`;
// gets position of bottom car
  const bottomCarLoc = invertCar.getBoundingClientRect();
  // takes height of your screen
  const windowHeight = window.innerHeight;
//figures out how much should be complete depending on how much you have scrolled from 0-1
  let progress = (windowHeight - bottomCarLoc.top) / (windowHeight * 0.6);
//make sure the value is always between 0-1 to represent how much of the animation is done
  progress = Math.min(Math.max(progress, 0), 1);

  // starts the car off the screen to the left
  const startOffset = 1200;
  // calculates how much the car should have its x position moved using the 0-1 progress from earlier
  const xOffset = -startOffset * (1 - progress);
// turns those calculations into actual car movement
  invertCar.style.transform = `translateX(${xOffset}px)`;
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

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", updateCars);