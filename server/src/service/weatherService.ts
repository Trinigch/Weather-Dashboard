import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temp: number;
  description: string;
  constructor(temp:number, description:string){
    this.temp = temp;
    this.description = description;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties

   private baseURL: string = process.env.API_BASE_URL || 'https://api.openweathermap.org';
   private apiKey: string = process.env.API_KEY || '0dcc283654b17745f23e1fd03a04ae60';
   private name: string = "name";
   
  // TODO: Create fetchLocationData method

  private async fetchLocationData(query: string): Promise<any> {

    
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    const data = await response.json();
    return data[0];
  }

  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
    private destructureLocationData(locationData: any): Coordinates {
    return { lat: locationData.lat, lon: locationData.lon };
  }
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
 //   private buildGeocodeQuery(): string {
//    return `${this.baseURL}/geo/1.0/direct?q=${this.name}&appid=${this.apiKey}`;
//  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
    private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.name);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
    private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) : Weather {
      const temperature = response.main.temp;
      const description = response.weather[0].description;
      return new Weather(temperature, description);
   }


  // TODO: Complete buildForecastArray method
   //private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  //  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
//      const forecast = weatherData.map((data) => {
 //       return new Weather(data.main.temp, data.weather[0].description);
  //    });
  //    return [currentWeather, ...forecast];

  // }
  // TODO: Complete getWeatherForCity method
   //async getWeatherForCity(city: string) {
    async getWeatherForCity(city: string): Promise<Weather> {
      this.name = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates);
      return this.parseCurrentWeather(weatherData);
    }
  }

export default new WeatherService();
