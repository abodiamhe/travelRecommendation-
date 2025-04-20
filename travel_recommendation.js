//Select html elements
const searchButton = document.getElementById("search-button");
const search = document.getElementById("search");
const clearButton = document.getElementById("clear-button");
let resultDiv = document.querySelector(".result-container");

//Function trigger when user click on the search button and extract the user entered value
function userInput() {
  const searchValue = search.value.trim();

  if (searchValue === "") {
    //Do nothing when no value is enter
    return;
  }
  const searchLowerCase = searchValue.toLowerCase();
  const userInput = wordPluralize(searchLowerCase);

  fetch("travel_recommendation_api.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const object = data[userInput];
      resultDiv.innerHTML = "";

      const lineAbove = document.createElement("div");
      lineAbove.classList.add("line-above");
      resultDiv.appendChild(lineAbove);

      if (object) {
        object.forEach((element) => {
          if (element.cities) {
            element.cities.forEach((city) => {
              displaySearch(city);
            });
          } else {
            displaySearch(element);
          }
        });
      }
    })
    .catch((err) => console.error("Failed to fetch data", err));
}

function clearResult() {
  resultDiv.innerHTML = "";
}

function wordPluralize(text) {
  const word = text.slice(-1);
  if (word === "s") {
    return text;
  }
  if (text === "country") {
    return "countries";
  }
  return text + "s";
}

function displaySearch(element) {
  // search.value = "";
  const searchResult = document.createElement("div");
  searchResult.classList.add("search-result");
  searchResult.innerHTML = `
        <img class="search-result-image" src="${element.imageUrl}" alt="${element.name}" />
        <div class="search-result-description">
          <h3>${element.name}</h3>
          <p>${element.description}</p>
          <button class="cta hero-btc">Visit</button>
        </div>`;

  resultDiv.appendChild(searchResult);
}

searchButton.addEventListener("click", userInput);
clearButton.addEventListener("click", clearResult);

document.addEventListener("keypress", (event) => {
  // event.preventDefault();
  if (event.key === "Enter") {
    searchButton.click();
  }
});

const options = {
  timeZone: "America/New_York",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const newYorkTime = new Date().toLocaleTimeString("en-US", options);
// console.log("Current time in New York:", newYorkTime);


//https://abodiamhe.github.io/travelRecommendation-/
//https://github.com/abodiamhe/travelRecommendation-