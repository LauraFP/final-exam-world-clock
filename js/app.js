
const main = document.getElementsByTagName("main")[0];
const addButton = document.getElementById("addButton");

const cities = [
  { place: "Madrid", diff: 0 },
  { place: "Londres", diff: -1 },
  { place: "Los Ángeles", diff: -9 },
  { place: "Nueva York", diff: -6 },
  { place: "Sídney", diff: +8 }
];

addButton.addEventListener("click", function () {
  var place = prompt("Write city name:");
  var hours = prompt("Hours difference?");
  cities.push({ place: place, diff: hours });
})


function addTimezone(city) {
  const date =
    city.diff > 0 ? new Date(Date.now() + city.diff * 3.6e6) : city.diff < 0 ? new Date(Date.now() - city.diff * 3.6e6) : new Date();

  var newTimezone = document.createElement("div");
  newTimezone.classList.add("main__time-div");

  var timezoneData = document.createElement("div");
  timezoneData.classList.add("main__time-div__data");

  var timezoneInfo = document.createElement("h4");
  timezoneInfo.classList.add("main__time-div__data__hour-difference");
  var infoData = document.createTextNode(`${new Date().getDay() === date.getDay() ? "Hoy" : new Date().getDay() < date.getDay() ? "Mañana" : "Ayer"}, ${city.diff >= 0 ? "+" : ""}${city.diff}H`);
  timezoneInfo.appendChild(infoData);

  var timezoneCity = document.createElement("h2");
  timezoneCity.classList.add("main__time-div__data__city");
  var cityContent = document.createTextNode(city.place);


  var timezoneHour = document.createElement("div");
  timezoneHour.classList.add("main__time-div__hour");
  var hourContent = document.createTextNode(`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`);

  timezoneHour.appendChild(hourContent);
  timezoneData.appendChild(timezoneInfo);
  timezoneData.appendChild(timezoneCity);
  timezoneCity.appendChild(cityContent);
  newTimezone.appendChild(timezoneData);
  newTimezone.appendChild(timezoneHour);
  main.appendChild(newTimezone);
}

function showTimezones() {
  main.innerHTML = "";
  cities.forEach(function (city) {
    addTimezone(city);
  });
}

window.onload = function () {
  setInterval(showTimezones, 500);
};
