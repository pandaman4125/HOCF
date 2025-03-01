async function fetchData() {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_Bm-8G3WnDPvFcbsLX7INMaYkyW1BwN0kVwGnpXE5tHejfQxXBiBelWON_JyNoTdrfru9KaHDjJhP/pub?output=tsv"
  );
  const tsv = await response.text();
  const data = tsv.split("\n").map((row) => row.split("\t").map(cell => cell.trim()));
  console.log('Fetched data:', data);
  return data;
}

async function fetchFileNames() {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbw-AVDxCeE0hG87iFFpVkKDagB_zh73hkdLbMfE-KdvzZkhlILldu_urZ51WtSQYm9DYw/exec"
  );
  const fileNames = await response.json();
  console.log('Fetched file names:', fileNames);
  return fileNames;
}

function convertToViewLink(id) {
  if (!id) return '';
  // const image_link = `https://drive.usercontent.google.com/download?id=${id}&export=view&authuser=0`;
  // const image_link = `https://drive.google.com/file/d/${id}/view`;
  // https://drive.google.com/file/d/1pV0T1vBvAL5ZQn5vaWs0pLY6xBtPV_0O/view
  const image_link = `https://drive.google.com/uc?export=view&id=${id}`;
  console.log('Converted link:', image_link);
  return image_link;
}

function parseData(data, fileNames) {
  const athletes = [];
  const headers = data[0];

  for (let col = 2; col < headers.length; col++) {
    const athlete = {
      name: headers[col],
      sections: [],
    };
    for (let row = 2; row < data.length; row += 5) {
      const text = data[row + 1]?.[col] || "";
      if (text) {
        athlete.sections.push({
          title: data[row]?.[col] || "",
          text: text,
          image1: convertToViewLink(fileNames[data[row + 2]?.[col]] || ""),
          image2: convertToViewLink(fileNames[data[row + 3]?.[col]] || ""),
          images_location: data[row + 4]?.[col] || "",
        });
      }
    }

    athletes.push(athlete);
  }

  return athletes;
}

async function init() {
  const [data, fileNames] = await Promise.all([fetchData(), fetchFileNames()]);
  const athletes = parseData(data, fileNames);
  console.log('Parsed athletes:', athletes);
  renderAthletes(athletes);
}

function renderAthletes(athletes) {
  const container = document.getElementById("athletes-container");
  container.innerHTML = "";

  athletes.forEach((athlete) => {
    const athleteElement = document.createElement("div");
    athleteElement.className = "accordion-item";

    athleteElement.innerHTML = `
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${athlete.name.replace(
              /\s+/g,
              ""
            )}" aria-expanded="false" aria-controls="collapse-${athlete.name.replace(
      /\s+/g,
      ""
    )}">
                <h2 class="accordion-header text-center text-white">${
                  athlete.name
                }</h2>
            </button>
            <div id="collapse-${athlete.name.replace(
              /\s+/g,
              ""
            )}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    ${athlete.sections
                      .map(
                        (section) => `
                        <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
                            <div class="col-xl-4 col-lg-5 text-center text-lg-left text-white">
                                <h4 class="display-5">${section.title}</h4>
                                <p class="lead text-white-50 mb-0">${
                                  section.text
                                }</p>
                            </div>
                            <div class="col-xl-8 col-lg-7">
                                ${
                                  section.image1
                                    ? `<img class="img-fluid float-${section.images_location} mb-3 mb-lg-0" src="${section.image1}" alt="...">`
                                    : ""
                                }
                                ${
                                  section.image2
                                    ? `<img class="img-fluid float-${section.images_location} mb-3 mb-lg-0" src="${section.image2}" alt="...">`
                                    : ""
                                }
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;

    container.appendChild(athleteElement);
  });
}

document.addEventListener("DOMContentLoaded", init);
