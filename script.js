let car = document.getElementById("ferrari-car");
let invertCar = document.getElementById("invert-ferrari-car");
let bottomFerrariCar = document.getElementById("bottom-ferrari-car");
//performance issue
let ticking = false;
function updateCars() {
// tracks how far website scrolled down
let scrollY = window.scrollY;
//moves the top car to the left and rotates it a bit
car.style.transform =`translateX(-${scrollY * 3}px) rotate(-${scrollY * 0.03}deg)`;
// gets position of bottom car
const bottomCarLoc = invertCar.getBoundingClientRect();
// takes height of your screen
const windowHeight = window.innerHeight;
//figures out how much should be complete depending on how much you have scrolled from 0-1
let progress = (windowHeight - bottomCarLoc.top) / (windowHeight * 2);
//make sure the value is always between 0-1 to represent how much of the animation is done
progress = Math.min(Math.max(progress, 0), 1);
// starts the car off the screen to the left
const startOffset = 2000;
// finds out where the right side of the screen is including the width of the car
const endOffset = window.innerWidth + 900;
//calculates how much the car should have its x position moved using the 0-1 progress from earlier
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
//performance enhances the website making sure multiple animation frames arent happening at the same time
function handleScroll() {
if (!ticking) {
requestAnimationFrame(updateCars);
ticking = true;
  }
}
// does the functions
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", updateCars);

//light mode
let lightmode = localStorage.getItem('lightmode')
const themeToggle = document.getElementById('theme-toggle')
const themeIcon = document.getElementById('theme-icon')
//function to do the work later
const enableLightmode = () => {
  document.body.classList.add('light-mode')
  themeIcon.src = "assets/darkIcon.svg"
  themeIcon.alt = "Switch to dark mode"
  localStorage.setItem('lightmode', 'active')
}
//function to do the work later
const disableLightmode = () => {
  document.body.classList.remove('light-mode')
  themeIcon.src = "assets/lightIcon.svg"
  themeIcon.alt = "Switch to light mode"
  localStorage.setItem('lightmode', null)
}

//font size changer
let largeFont = localStorage.getItem('largeFont')
const fontToggle = document.getElementById('font-toggle')
//function to do the work later
const enableLargeFont = () => {
  document.body.classList.add('font-large')
  localStorage.setItem('largeFont', 'active')
}
//function to do the work later
const disableLargeFont = () => {
  document.body.classList.remove('font-large')
  localStorage.setItem('largeFont', null)
}
//uses the functions to change font
if (largeFont === "active") enableLargeFont()
fontToggle.addEventListener("click", () => {
  largeFont = localStorage.getItem('largeFont')
  largeFont !== "active" ? enableLargeFont() : disableLargeFont()
})

// uses the functions to change color scheme
if (lightmode === "active") enableLightmode()
themeToggle.addEventListener("click", () => {
  lightmode = localStorage.getItem('lightmode')
  lightmode !== "active" ? enableLightmode() : disableLightmode()
})

// working email system
emailjs.init("oihFrGir6DXIRAf3v");
function sendMail(){
  let parms = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    subject: document.getElementById("contactSubject").value,
    message: document.getElementById("contactMessage").value,
  };

  emailjs.send("service_aitnooa", "template_mt7xnyo", parms)
    .then(function () {
      alert("Message sent. Thank you for reaching out.");
      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactSubject").value = "";
      document.getElementById("contactMessage").value = "";
    })
    .catch(function (error) {
      alert("Something went wrong — please try again or email me directly.");
      console.error("EmailJS error:", error);
    });
}