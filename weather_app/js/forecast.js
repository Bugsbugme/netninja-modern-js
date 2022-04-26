const apiKey = "odEAfd5MljUw05LXzhwZOd51zpUFCru3";

// get city information
const getCity = async (city) => {
  const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${apiKey}&q=${city}`;

  const response = await fetch(baseUrl + query);
  const data = await response.json();
  return data[0];
};

// get weather information
const getWeather = async (location) => {
  const baseUrl = `http://dataservice.accuweather.com/currentconditions/v1/${location}`;
  const query = `?apikey=${apiKey}`;

  const response = await fetch(baseUrl + query);
  const data = await response.json();
  return data[0];
};
