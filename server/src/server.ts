
import dotenv from 'dotenv';
import express from 'express';

import routes from './routes/index.js';
dotenv.config();

// Import the routes
//import routes from './routes/index.ts';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder

//app.use(express.static('client/dist'));  // Serv static files for "dist"
app.use(express.static('/'));
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));



// Servir el archivo index.html para cualquier otra ruta que no sea API
//app.get('*', (_, res) => {
//    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
//  });