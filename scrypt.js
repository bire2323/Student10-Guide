// Typewriter effect
const textElement = document.getElementById("typewriter");
const text = textElement.textContent;
textElement.textContent = "";
let i = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function type() {
  if (!isDeleting && i < text.length) {
    textElement.textContent = text.substring(0, i + 1);
    i++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && i > 0) {
    textElement.textContent = text.substring(0, i - 1);
    i--;
    setTimeout(type, deletingSpeed);
  } else {
    isDeleting = !isDeleting;
    setTimeout(type, pauseTime);
  }
}
type();

// Smooth scroll + active nav
const navlinks = document.querySelectorAll(".nav-link");
let activeLink = document.querySelector(".nav-link.active");

navlinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    if (activeLink) activeLink.classList.remove("active");
    this.classList.add("active");
    activeLink = this;

    const targetId = this.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Update active nav link on scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navlinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-target") === current) {
      link.classList.add("active");
      activeLink = link;
    }
  });

  // Show/hide back to top button
  const backToTop = document.getElementById("backToTop");
  if (window.pageYOffset > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Back to top functionality
document.getElementById("backToTop").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Quiz functionality
const quizOptions = document.querySelectorAll(".quiz-option");
const quizSubmit = document.getElementById("quiz-submit");
const resultSection = document.getElementById("quiz-result");
const resultText = document.getElementById("result-text");
const resultDetail = document.getElementById("result-detail");

let answers = [];

quizOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Remove selected class from siblings
    const siblings = this.parentNode.querySelectorAll(".quiz-option");
    siblings.forEach((sib) => sib.classList.remove("selected"));

    // Add selected class to clicked option
    this.classList.add("selected");

    // Store answer
    const questionIndex = Array.from(
      document.querySelectorAll(".quiz-question")
    ).indexOf(this.closest(".quiz-question"));
    answers[questionIndex] = this.dataset.value;
  });
});

quizSubmit.addEventListener("click", function () {
  if (answers.length < 3) {
    alert("Please answer all questions!");
    return;
  }

  // Calculate result
  const counts = { natural: 0, social: 0, both: 0 };
  answers.forEach((answer) => counts[answer]++);

  let result, detail;
  if (counts.natural > counts.social && counts.natural > counts.both) {
    result = "Natural Sciences";
    detail =
      "Your analytical mind and interest in the physical world make you a great fit for natural sciences. Consider exploring fields like biology, chemistry, or physics.";
  } else if (counts.social > counts.natural && counts.social > counts.both) {
    result = "Social Sciences";
    detail =
      "Your curiosity about human behavior and society suggests social sciences would be rewarding for you. Look into psychology, sociology, or political science.";
  } else {
    result = "Both!";
    detail =
      "You have balanced interests that could thrive in interdisciplinary fields. Consider areas like behavioral economics, environmental policy, or medical anthropology that combine both sciences.";
  }

  resultText.textContent = result;
  resultDetail.textContent = detail;
  resultSection.style.display = "block";
  resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
});
