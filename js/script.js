/* =========================================================
   ELEMENTOS
========================================================= */

const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const menuLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");



/* =========================================================
   NAVBAR AO ROLAR
========================================================= */

function handleNavbar() {
  if (window.scrollY > 80) {
    navbar.classList.add("fixed");
  } else {
    navbar.classList.remove("fixed");
  }
}

window.addEventListener("scroll", handleNavbar);

handleNavbar();



/* =========================================================
   MENU MOBILE
========================================================= */

menuToggle.addEventListener("click", () => {

  const isActive = navLinks.classList.toggle("active");

  menuToggle.classList.toggle("active");

  document.body.classList.toggle("menu-open");

  menuToggle.setAttribute(
    "aria-expanded",
    isActive ? "true" : "false"
  );

});


menuLinks.forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});



/* =========================================================
   FECHAR MENU AO REDIMENSIONAR
========================================================= */

window.addEventListener("resize", () => {

  if (window.innerWidth > 850) {

    navLinks.classList.remove("active");

    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

  }

});



/* =========================================================
   ANIMAÇÕES AO ROLAR
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.13,
    rootMargin: "0px 0px -30px 0px"
  }
);


revealElements.forEach((element) => {
  revealObserver.observe(element);
});



/* =========================================================
   FAQ / ACCORDION
========================================================= */

const accordionItems =
  document.querySelectorAll(".accordion-item");


accordionItems.forEach((item) => {

  const button =
    item.querySelector(".accordion-header");

  const content =
    item.querySelector(".accordion-content");


  button.addEventListener("click", () => {

    const isOpen =
      item.classList.contains("active");


    accordionItems.forEach((otherItem) => {

      otherItem.classList.remove("active");

      const otherContent =
        otherItem.querySelector(".accordion-content");

      otherContent.style.maxHeight = null;

    });


    if (!isOpen) {

      item.classList.add("active");

      content.style.maxHeight =
        content.scrollHeight + "px";

    }

  });

});



/* =========================================================
   CONTADORES
========================================================= */

const counters =
  document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

  if (countersStarted) return;

  const numbersSection =
    document.querySelector(".numbers");

  if (!numbersSection) return;


  const sectionPosition =
    numbersSection.getBoundingClientRect().top;

  const screenPosition =
    window.innerHeight * 0.85;


  if (sectionPosition < screenPosition) {

    countersStarted = true;


    counters.forEach((counter) => {

      const target =
        Number(counter.dataset.target);

      const decimal =
        counter.dataset.decimal === "true";

      let current = 0;

      const duration = 1300;

      const fps = 60;

      const totalFrames =
        Math.round(duration / (1000 / fps));

      const increment =
        target / totalFrames;


      const timer = setInterval(() => {

        current += increment;


        if (current >= target) {

          current = target;

          clearInterval(timer);

        }


        if (decimal) {

          counter.textContent =
            current.toFixed(1).replace(".", ",");

        } else {

          counter.textContent =
            Math.floor(current);

        }

      }, 1000 / fps);

    });

  }

}


window.addEventListener(
  "scroll",
  startCounters
);

startCounters();



/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

function handleBackToTop() {

  if (window.scrollY > 650) {

    backToTop.classList.add("visible");

  } else {

    backToTop.classList.remove("visible");

  }

}


window.addEventListener(
  "scroll",
  handleBackToTop
);


backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});



/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const currentYear =
  document.getElementById("currentYear");

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}



/* =========================================================
   SCROLL SUAVE COM COMPENSAÇÃO DO HEADER
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

      const href =
        this.getAttribute("href");


      if (
        !href ||
        href === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(href);


      if (!target) {
        return;
      }


      event.preventDefault();


      const navbarHeight =
        navbar.offsetHeight;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight -
        15;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });



/* =========================================================
   EFEITO LEVE DE PARALLAX NO HERO
========================================================= */

const heroVisual =
  document.querySelector(".hero-visual");


window.addEventListener("scroll", () => {

  if (
    !heroVisual ||
    window.innerWidth <= 850
  ) {
    return;
  }


  const scroll =
    window.scrollY;


  if (scroll < 900) {

    heroVisual.style.transform =
      `translateY(${scroll * 0.035}px)`;

  }

});