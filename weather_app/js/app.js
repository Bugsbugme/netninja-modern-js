const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

/* This is an event listener that is listening for a submit event on the form. When the submit event is
triggered, the event is prevented from its default action. The city value is then trimmed and the
form is reset. The updateCity method is then called on the forecast object and the data is passed to
the updateUI function. The city is then stored in local storage. */
cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

/* This is checking if there is a city in local storage. If there is, the forecast is updated with the
city in local storage and the updateUI function is called. */
if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

/**
 * It takes the data object as an argument, and then it updates the UI with the data.
 * @param data - The data object that is returned from the API.
 */
const updateUI = (data) => {
  // console.log(data);
  const { cityDetails, cityWeather } = data;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}, ${cityDetails.Country.ID}</h5>
    <div class="my-3">${cityWeather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${cityWeather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = cityWeather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  /* This is checking if the card has the class of d-none. If it does, it is removed. This is so that
  the card is only shown when there is data to display. */
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
