import express from 'express';
import path from 'node:path';
import fs from 'node:fs';

const route = express.Router();

let archivoJson = undefined;

const pathFile = path.resolve('./resources/starwar.json');
fs.readFile(pathFile, { encoding: 'utf8' }, (err, data) => {
  if (!err) {
    archivoJson = JSON.parse(data);
  } else {
    archivoJson = null;
  }
});

route.get('/', (req, res) => {
  const { homeworld, species } = req.query;
  let data = archivoJson;

  if (homeworld) {
    data = data.filter(personaje => personaje.homeworld === homeworld);
  }

  if (species) {
    data = data.filter(personaje => personaje.species === species);
  }

  res.render('home', { data }); 
});

export default route;