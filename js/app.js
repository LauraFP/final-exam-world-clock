// Save 2 elements in variables we will use later:

const main = document.getElementsByTagName("main")[0];
const addButton = document.getElementById("addButton");

// Array with 5 main cities of our world clock:
const cities = [
  { place: "Madrid", diff: 0 },
  { place: "Londres", diff: -1 },
  { place: "Los Ángeles", diff: -9 },
  { place: "Nueva York", diff: -6 },
  { place: "Sídney", diff: +8 }
];

// Create "add button" functionality:
addButton.addEventListener("click", function () {
  // With these 2 prompts we save a new city and hour difference in our precious array:
  var place = prompt("Write city name:");
  var hours = prompt("Hours difference?");
  cities.push({ place: place, diff: hours });
})

// Function that creates new full timezone with details:
function addTimezone(city) {
  // Define the city hour taking into account the hour difference
  const date =
    city.diff > 0 ? new Date(Date.now() + city.diff * 3.6e6) : city.diff < 0 ? new Date(Date.now() - city.diff * 3.6e6) : new Date();
  // Create the new time zone div
  var newTimezone = document.createElement("div");
  newTimezone.classList.add("main__time-div");
  // Create the new data container (div) where we will store the info and the city name
  var timezoneData = document.createElement("div");
  timezoneData.classList.add("main__time-div__data");
  // Hour difference:
  var timezoneInfo = document.createElement("h4");
  timezoneInfo.classList.add("main__time-div__data__hour-difference");
  var infoData = document.createTextNode(`${new Date().getDay() === date.getDay() ? "Hoy" : new Date().getDay() < date.getDay() ? "Mañana" : "Ayer"}, ${city.diff >= 0 ? "+" : ""}${city.diff}H`);
  timezoneInfo.appendChild(infoData);
  // City name:
  var timezoneCity = document.createElement("h2");
  timezoneCity.classList.add("main__time-div__data__city");
  var cityContent = document.createTextNode(city.place);
  // City hour:
  var timezoneHour = document.createElement("div");
  timezoneHour.classList.add("main__time-div__hour");
  var hourContent = document.createTextNode(`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`);
  // Introduce all we've created inside our main section of the html
  timezoneHour.appendChild(hourContent);
  timezoneData.appendChild(timezoneInfo);
  timezoneData.appendChild(timezoneCity);
  timezoneCity.appendChild(cityContent);
  newTimezone.appendChild(timezoneData);
  newTimezone.appendChild(timezoneHour);
  main.appendChild(newTimezone);
}

// Function to clean the "main" section and run the previous function
// for each city we have in the "cities" array:
function showTimezones() {
  main.innerHTML = "";
  cities.forEach(function (city) {
    addTimezone(city);
  });
}

// Execute the showTimezones function every 500 miliseconds:
window.onload = function () {
  setInterval(showTimezones, 500);
};
