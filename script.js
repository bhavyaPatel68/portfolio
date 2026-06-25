    let car = document.getElementById("ferrari-car");

    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;

      car.style.transform =
        `translateX(-${scrollY * 3}px) rotate(-${scrollY * 0.03}deg)`;
    });