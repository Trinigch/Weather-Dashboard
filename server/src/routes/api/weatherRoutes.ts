import { Router } from 'express';
import HistoryService, { City } from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { v4 as uuidv4 } from 'uuid';
 const router = Router();

// TODO: POST Request with city name to retrieve weather data
 
  router.post('/', async (req, res) => {
    try{
        const { city } = req.body;
        if (!city) {
          return res.status(400).json({ error: 'city name is required' });
        }

        const weatherData = await WeatherService.getWeatherForCity(city);

        /* reemplazar por el id de la app*/
        const cityId = uuidv4();

        await HistoryService.addCity(new City(cityId, city));
        return res.json(weatherData);
      }catch (error){
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve weather data' });
      }
    });



  // TODO: GET weather data from city name
  router.get('/history', async (_, res) => {
    const cities = await HistoryService.getCities();
    res.json(cities);
  });
  // TODO: save city to search history


// TODO: GET search history

router.get('/history', async (_, res) => {
  try {
    // Obtener las ciudades del historial de búsqueda
    const cities = await HistoryService.getCities();

    // Enviar la respuesta con el historial
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve search history.' });
  }
});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req, res) => {});

export default router;
