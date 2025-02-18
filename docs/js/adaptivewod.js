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

  async function fetchAndDisplaySchedule() {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw1KZ-IgS0eAOBUtM6ssplP4Vm66ChEPURJ8nuIpLbzZAZi41D-lPZULU-kocQJ5gBsxQ/exec?action=adaptiveWodData"
      );
      const data = await response.json();
      const scheduleContainer = document.getElementById("schedule-container");

      // Group data by state
      const groupedData = data.reduce((acc, row) => {
        const state = row[4];
        if (!acc[state]) {
          acc[state] = [];
        }
        acc[state].push(row);
        return acc;
      }, {});

      // Create sections for each state
      for (const [state, rows] of Object.entries(groupedData)) {
        const stateSection = document.createElement("div");
        stateSection.classList.add("state-section", "mb-4");

        const stateHeader = document.createElement("h3");
        stateHeader.classList.add("text-white");
        stateHeader.textContent = state;
        stateSection.appendChild(stateHeader);

        const listGroup = document.createElement("ul");
        listGroup.classList.add("list-group");

        rows.forEach((row) => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "bg-dark", "text-white");

          const gymInfo = document.createElement("p");
          gymInfo.classList.add("mb-1");

          // Format date and time
          const date = new Date(row[1]);
          const formattedDate = date.toLocaleDateString();

          gymInfo.textContent = `${row[0]}, ${row[3]}, ${formattedDate}, ${row[2]}`;
          listItem.appendChild(gymInfo);

          listGroup.appendChild(listItem);
        });

        stateSection.appendChild(listGroup);
        scheduleContainer.appendChild(stateSection);
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  }
  fetchAndDisplaySchedule();
});
