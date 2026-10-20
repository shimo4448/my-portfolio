document.addEventListener("DOMContentLoaded", function () {

  const yearElement = document.getElementById("year");

  if (yearElement) {
      yearElement.textContent = "© " + new Date().getFullYear();
  }

  const navbar = document.getElementById("portfolioNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
          if (
              navbar &&
              navbar.classList.contains("show") &&
              window.bootstrap
          ) {
              bootstrap.Collapse.getOrCreateInstance(navbar).hide();
          }
      });
  });

  const revealElements = document.querySelectorAll(
      ".section-title, .about-panel, .focus-panel, " +
      ".tool-card, .work-card, .project-note, " +
      ".education-timeline, .contact-panel"
  );

  revealElements.forEach(function (element) {
      element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
          function (entries, observer) {
              entries.forEach(function (entry) {
                  if (entry.isIntersecting) {
                      entry.target.classList.add("visible");
                      observer.unobserve(entry.target);
                  }
              });
          },
          {
              threshold: 0.12
          }
      );

      revealElements.forEach(function (element) {
          revealObserver.observe(element);
      });
  } else {
      revealElements.forEach(function (element) {
          element.classList.add("visible");
      });
  }

  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
      let currentId = "home";

      sections.forEach(function (section) {
          if (window.scrollY >= section.offsetTop - 160) {
              currentId = section.id;
          }
      });

      navLinks.forEach(function (link) {
          const isActive =
              link.getAttribute("href") === "#" + currentId;

          link.classList.toggle("active", isActive);
      });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

});