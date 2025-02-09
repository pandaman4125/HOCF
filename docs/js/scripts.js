/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );

  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      // Check if the clicked item is not the dropdown toggle for "About Us"
      if (responsiveNavItem.getAttribute("href") !== "#aboutDropdown") {
        if (window.getComputedStyle(navbarToggler).display !== "none") {
          navbarToggler.click();
        }
      }
    });
  });

  async function fetchAndDisplayData() {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyHBtDryEI8y8h2ggHfihs6nBX-KsZUFLgMZDxN2Ld0o1dXpEDMQ6yA3GzAbFjy1kzNGQ/exec"
      );
      const values = await response.json();
      if (values.length) {
        document.querySelector("#sheetRow1").textContent = `${values[0][0]}`;
        document.querySelector("#sheetRow1v").textContent = `${values[0][1]}`;
        document.querySelector("#sheetRow2").textContent = `${values[1][0]}`;
        document.querySelector("#sheetRow2v").textContent = `${values[1][1]}`;
        document.querySelector("#sheetRow3").textContent = `${values[2][0]}`;
        document.querySelector("#sheetRow3v").textContent = `${values[2][1]}`;
        document.querySelector("#sheetRow4").textContent = `${values[3][0]}`;
        document.querySelector("#sheetRow4v").textContent = `${values[3][1]}`;
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
    }
  }
  fetchAndDisplayData();
});
