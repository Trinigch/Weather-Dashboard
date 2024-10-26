// TODO: Define a City class with name and id properties

// TODO: Complete the HistoryService class

  // TODO: Define a read method that reads from the searchHistory.json file

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

  
  // TODO Define an addCity method that adds a city to the searchHistory.json file

  // BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file


import { readFile, writeFile } from 'fs/promises';

// Clase City con propiedades name e id
export class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// Clase HistoryService
class HistoryService {
  private filePath: string = 'searchHistory.json';

  // Método que lee el archivo searchHistory.json, manejando el error si el archivo no existe
  private async read(): Promise<City[]> {
    try {
      const data = await readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err: any) {
      // Si el archivo no existe, devuelve un array vacío y crea el archivo vacío
      if (err.code === 'ENOENT') {
        await this.write([]); // Crear el archivo vacío
        return [];
      } else {
        throw err; // Si es otro tipo de error, lo lanza
      }
    }
  }
  // Método que escribe el array de ciudades en searchHistory.json
  private async write(cities: City[]): Promise<void> {
    console.log("Método que escribe el array de ciudades en searchHistory.json",JSON.stringify(cities, null, 2))
    await writeFile(this.filePath, JSON.stringify(cities, null, 2)); // Formateado para mejor legibilidad

  }

  // Método que devuelve todas las ciudades del archivo
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // Método que agrega una nueva ciudad al archivo
  async addCity(city: City): Promise<void> {
    const cities = await this.getCities();
    cities.push(city);
    await this.write(cities);
  }
  // Método que elimina una ciudad por su id
  async removeCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}
export default new HistoryService();
