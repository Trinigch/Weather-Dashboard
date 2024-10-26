import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  city: string;
  date: string;
  icon:string;
  description: string;
  temp: number;
  humidity: number;
  windSpeed:number;


  constructor(city: string, date: string, icon:string, description: string, temp: number, humidity: number, windSpeed:number, ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.temp = temp;
    this.humidity = humidity;
    this.windSpeed=windSpeed;
  }
}

class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.apiKey = process.env.API_KEY || '0dcc283654b17745f23e1fd03a04ae60';

    if (!this.baseURL || !this.apiKey) {
      throw new Error('API base URL or API key is missing.');
    }
  }

  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(
      `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
    );
 
     if (!response.ok){
      throw new Error ("failed");
    }
    const data = await response.json();
   
    return data[0]
  }

  private destructureLocationData(locationData: any): Coordinates {
    return { lat: locationData.lat, lon: locationData.lon };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }

  private parseCurrentWeather(response: any): Weather {

    const city = response.name;
    const date = new Date(response.dt * 1000).toLocaleDateString();  // Convierte el timestamp a fecha
    const icon = response.icon;
    const description = response.weather[0].description;
    const temperature = response.main.temp;
    const humidity = response.main.humidity;
    const windSpeed= response.wind.speed;
  
    return new Weather(city, date ,icon,description, temperature, humidity ,windSpeed );
  }

  async getWeatherForCity(city: string): Promise<Weather> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();