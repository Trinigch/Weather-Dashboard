
import { readFile, writeFile } from 'fs/promises';
// TODO: Define a City class with name and id properties
class  City {
  id: string;
  name: string;
  constructor(id: string, name: string){
    this.id= id;
    this.name= name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() : Promise<City[]>{
    const data= await readFile('searchHistory.json', 'utf8');
    return JSON.parse(data);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await writeFile('searchHistory.json', JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
    async addCity(city: City): Promise<void> {
    const cities = await this.getCities();
    cities.push(city);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
