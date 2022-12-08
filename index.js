import express from 'express';
import { getPath } from './utils/getPath.js';
const app = express();
const port = process.env.PORT || 3000;

const __dirname = getPath(import.meta.url);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
