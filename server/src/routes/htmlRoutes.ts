import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_, res) => {
    // Envía el archivo index.html ubicado en el directorio público o raíz
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html')); //  'index.html' in folder'client'
  });
export default router;
