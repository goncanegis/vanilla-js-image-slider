"use strict";

// Slider variables
const numOfSlidesOnScreen = 4;
const spaceBetweenSlides = 20;
const sliderMargin = 50;

// Selectors
// Select wrapper
const wrapper = document.querySelector(".wrapper");
// Select slider container
const slider = document.querySelector(".slider");
// Select all slides
const slides = Array.from(document.querySelectorAll(".slide"));
// select next slide button
const prevBtn = document.querySelector(".btn-prev");
// select next slide button
const nextBtn = document.querySelector(".btn-next");

const windowWidth = window.innerWidth;
let totalWidthOfSlides = 0;
// Current slide counter
let currentSlideIndex = 0;
// maximum number of slides
let lastSlideIndex = slides.length - 1;
const sliderWidth = windowWidth - sliderMargin * 2;
const spacing = spaceBetweenSlides * (numOfSlidesOnScreen - 1);

const slideWidth = (sliderWidth - spacing) / numOfSlidesOnScreen;

let slidePosX = 0;
let slidePosY = 0;

// Set slider width
slider.style.width = sliderWidth + "px";

const handleClick = (e) => {
  if (e.target.classList.contains("slide")) {
    // if active slide is clicked, reset to default
    if (e.target.classList.contains("active")) {
      slides.forEach((slide, index) => {
        slide.classList.remove("active");
        slide.classList.remove("hidden");
      });
    } else {
      // if clicked slide is not active, set clicked slide to active and set other slides to hidden
      const clickedSlide = e.target;
      clickedSlide.classList.add("active");
      clickedSlide.classList.remove("hidden");

      slides.forEach((slide, index) => {
        if (slide !== clickedSlide) {
          slide.classList.remove("active");
          slide.classList.add("hidden");
        }
      });
    }
  } else return;
};

// Add click event listener to each slide
slider.addEventListener("click", handleClick);

// loop through slides and set each slide's translateX
slides.forEach((slide, index) => {
  slide.style.width = `${slideWidth}px`;

  if (!slide.classList.contains("active")) {
    slide.style.transform = `translateX(${
      index * (slideWidth + spaceBetweenSlides)
    }px)`;
  } else {
    slide.style.transform = `translateX(0px)`;
  }

  // Add slide width and spaces to total width
  totalWidthOfSlides +=
    windowWidth / numOfSlidesOnScreen +
    (numOfSlidesOnScreen - 1) * spaceBetweenSlides;
});

// Set wrapper width
wrapper.style.width = totalWidthOfSlides + "px";

// add event listener and navigation functionality
nextBtn.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (currentSlideIndex === lastSlideIndex) {
    currentSlideIndex = 0;
  } else {
    currentSlideIndex++;
  }

  handleTranslate(currentSlideIndex);
});

// add event listener and navigation functionality
prevBtn.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (currentSlideIndex === 0) {
    currentSlideIndex = lastSlideIndex;
  } else {
    currentSlideIndex--;
  }

  handleTranslate(currentSlideIndex);
});

const handleTranslate = (slideIndex) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${
      100 * (index - slideIndex)
    }%) translateX(${index * spaceBetweenSlides}px)`;
  });
};

const onWindowResize = () => {
  // Find window width
  const windowWidth = window.innerWidth;
  const sliderWidth = windowWidth - sliderMargin * 2;
  const slideWidth = (sliderWidth - spacing) / numOfSlidesOnScreen;

  // Update slider width
  slider.style.width = windowWidth - sliderMargin * 2 + "px";

  // Select all slides
  const slides = Array.from(document.querySelectorAll(".slide"));

  totalWidthOfSlides = 0;

  // loop through slides and set each slide's translateX
  slides.forEach((slide, index) => {
    slide.style.width = `${slideWidth}px`;

    if (!slide.classList.contains("active")) {
      slide.style.transform = `translateX(${
        index * (slideWidth + spaceBetweenSlides)
      }px)`;
    } else {
      slide.style.transform = `translateX(0px)`;
    }

    // Add slide width and spaces to total width
    totalWidthOfSlides +=
      windowWidth / numOfSlidesOnScreen +
      (numOfSlidesOnScreen - 1) * spaceBetweenSlides;
  });

  // Select wrapper
  const wrapper = document.querySelector(".wrapper");
  // Set wrapper width
  wrapper.style.width = totalWidthOfSlides + "px";
};

window.addEventListener("resize", onWindowResize);
