const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);
  return {
    cityDetails: cityDetails,
    cityWeather: cityWeather,
  };
};

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});

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

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
