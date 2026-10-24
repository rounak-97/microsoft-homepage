// Carousel

// Find the slides, indicators, and controls.
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playPauseBtn = document.querySelector("#playPauseBtn");

// Track the active slide and autoplay state.
let currentSlide = 0;
let isPlaying = true;
let slideInterval = null;

// Keep the visible slide and active indicator in sync.
function showSlide() {
  // Avoid accessing missing slides or mismatched indicators.
  if (slides.length === 0 || indicators.length !== slides.length) {
    return;
  }

  slides.forEach(function (slide) {
    slide.classList.remove("active");
  });

  indicators.forEach(function (indicator) {
    indicator.classList.remove("active");
  });

  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
}

function nextSlide() {
  currentSlide++;

  // Loop back to the first slide at the end.
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide();
}

function previousSlide() {
  currentSlide--;

  // Loop to the last slide when moving back from the first.
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide();
}

// Connect the navigation controls.
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", previousSlide);

// Start autoplay only when there are multiple slides.
function startSlideshow() {
  // Prevent duplicate timers and skip autoplay for a single slide.
  if (slideInterval !== null || slides.length < 2) {
    return;
  }

  slideInterval = setInterval(nextSlide, 3900);
}

// Begin autoplay on page load.
startSlideshow();

// Let users pause or resume autoplay.
playPauseBtn.addEventListener("click", function () {
  if (isPlaying) {
    clearInterval(slideInterval);
    slideInterval = null;
    isPlaying = false;

    playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
    playPauseBtn.setAttribute("aria-label", "Play slideshow");
  } else {
    startSlideshow();
    isPlaying = true;

    playPauseBtn.innerHTML = '<i class="ri-pause-fill"></i>';
    playPauseBtn.setAttribute("aria-label", "Pause slideshow");
  }
});

// Back-to-top button

// Find the button and help panel.
const backToTop = document.querySelector("#backToTop");
const helpPanel = document.querySelector("#helpPanel");

// Update button visibility when the page scrolls or resizes.
function updateBackToTop() {
  const scrollPosition = Math.max(
    window.scrollY,
    document.documentElement.scrollTop,
    document.body.scrollTop,
  );

  // Show it earlier on mobile because the page is shorter.
  const scrollLimit = window.innerWidth <= 768 ? 300 : 1200;

  // Keep the button from overlapping the open help panel.
  if (scrollPosition > scrollLimit && helpPanel.hidden) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
}

// Recalculate visibility as the page or viewport changes.
window.addEventListener("scroll", updateBackToTop);
document.addEventListener("scroll", updateBackToTop, true);
window.addEventListener("resize", updateBackToTop);

backToTop.addEventListener("click", function () {
  document.body.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Help widget

// Find the help widget controls.
const helpWidget = document.querySelector("#helpWidget");
const helpButton = document.querySelector("#helpButton");
const chatNowButton = document.querySelector("#chatNowButton");
const noThanksButton = document.querySelector("#noThanksButton");

helpButton.addEventListener("click", function () {
  helpPanel.hidden = false;
  helpWidget.classList.add("panel-open");

  // Avoid overlapping the help panel.
  backToTop.style.display = "none";
});

noThanksButton.addEventListener("click", function () {
  helpPanel.hidden = true;
  helpWidget.classList.remove("panel-open");

  // The button can reappear if the page is far enough down.
  updateBackToTop();
});

// Placeholder until live chat is connected.
chatNowButton.addEventListener("click", function () {
  alert("Store Assistant chat will be available here in a future update.");
});

// Mobile navigation

// Find the menu button and navigation links.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector(".nav-links");

// Start with the mobile menu closed.
navLinks.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");

// Toggle the dropdown and keep its state accessible.
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  // Match the icon to the menu state.
  const menuIcon = menuToggle.querySelector("i");
  const isMenuOpen = navLinks.classList.contains("open");

  menuIcon.classList.toggle("ri-menu-line", !isMenuOpen);
  menuIcon.classList.toggle("ri-close-line", isMenuOpen);

  // Announce the expanded state to assistive technology.
  menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
});
