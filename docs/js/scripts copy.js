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
        "https://script.google.com/macros/s/AKfycbw1KZ-IgS0eAOBUtM6ssplP4Vm66ChEPURJ8nuIpLbzZAZi41D-lPZULU-kocQJ5gBsxQ/exec?action=generalData"
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
          gymInfo.textContent = `${row[0]}, ${row[3]}, ${row[1]}, ${row[2]}`;
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
