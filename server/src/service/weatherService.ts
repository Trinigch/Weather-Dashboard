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
  iconDescription: string;
  tempF: number;
  humidity: number;
  windSpeed:number;


  constructor(city: string, date: string, icon:string, iconDescription: string, tempF: number, humidity: number, windSpeed:number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
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
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  private async fetchWeatherData(coordinates: Coordinates){
    const response = await fetch(this.buildWeatherQuery(coordinates));
    let res = await response.json();
    let currentWeather: Weather= this.parseCurrentWeather(res);
    let forcastArray: Weather[]=  this.buildForecastArray(currentWeather,res.list)
    return forcastArray
  
  }
  /* [object, [object]]*/

  private parseCurrentWeather(response: any): Weather {
    let  currentWeather = response.list[0];
    const city = this.cityName;
    const date = new Date(currentWeather.dt * 1000).toLocaleDateString();  // Convierte el timestamp a fecha
    const icon = currentWeather.weather[0].icon;
    const description = currentWeather.weather[0].description;
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed= currentWeather.wind.speed;
  let currentData= new Weather(city, date ,icon,description, temperature, humidity ,windSpeed );
    return currentData
  }
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
let weatherArray : Weather[] = [currentWeather];
let filterForcast = weatherData.filter((data:any)=> {
  return data.dt_txt.includes("12:00:00");
})
for(const day of filterForcast){
  weatherArray.push(
    new Weather(
      this.cityName, 
      new Date(day.dt * 1000).toLocaleDateString(),
      day.weather[0].icon,
      day.weather[0].description,
      day.main.temp,
      day.main.humidity,
      day.wind.speed
       )
     )
    }
return weatherArray    
  }

  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);

    return  weatherData
  }
}

export default new WeatherService();