/* It takes a city name as an argument, then it returns an object containing the city details and the
city weather. */
class Forecast {
  constructor() {
    this.apiKey = "odEAfd5MljUw05LXzhwZOd51zpUFCru3";
    this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
  }

  /**
   * The updateCity function takes a city name as an argument, and returns an object containing the city
   * details and the city weather.
   * @param city - The city name
   * @returns An object with two properties: cityDetails and cityWeather.
   */
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const cityWeather = await this.getWeather(cityDetails.Key);
    return {
      cityDetails: cityDetails,
      cityWeather: cityWeather,
    };
  }

  /**
   * The getCity function takes a city name as an argument, and returns the data from the API call.
   * @param city - The name of the city you want to get the weather for.
   * @returns The data is being returned as an object.
   */
  async getCity(city) {
    const query = `?apikey=${this.apiKey}&q=${city}`;

    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }

  /**
   * It takes a location as a parameter, then it creates a query string, then it fetches the data from
   * the API, then it returns the data.
   * @param location - The location you want to get the weather for.
   * @returns The data is being returned as an object.
   */
  async getWeather(location) {
    const query = `${location}?apikey=${this.apiKey}`;

    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}
