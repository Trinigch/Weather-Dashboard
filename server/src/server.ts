
import dotenv from 'dotenv';


import routes from './routes/index.js';
dotenv.config();

// Import the routes
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
//import TipService from './service/TipService.js';
//import FeedbackService from './service/FeedbackService.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Serve static files of entire client dist folder
app.use(express.static('../client/dist'));

// This view route is a GET route for the home page
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

//import routes from './routes/index.ts';
// TODO: Implement middleware for parsing JSON and urlencoded form data
// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));



// Servir el archivo index.html para cualquier otra ruta que no sea API
//app.get('*', (_, res) => {
//    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
//  });