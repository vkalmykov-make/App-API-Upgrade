import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import http from "http";
const yaml = require('js-yaml');
const fs = require('fs');

dotenv.config();

const instance: Express = express();

instance.use(express.json());
instance.use(cors());

instance.get('/', (req: Request, res: Response) => {
  res.send('Hello World From the Typescript Server!')
});

const port = process.env.PORT || 8000;

instance.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


try {
  const doc = yaml.load(fs.readFileSync('src/data/openapi.yaml', 'utf8'));
  // console.log(doc);
  const jsonData = JSON.stringify(doc);
  console.log(jsonData);
  fs.writeFileSync('src/data/input_file.json', jsonData, 'utf8');
} catch (e) {
  console.log(e);
}

// Read the Yaml file
//const data = fs.readFileSync('src/data/openapi.yaml', 'utf8');

//Convert Yml object to JSON
//const yamlData = yaml.load(data);

//Write JSON to Yml
//const jsonData = JSON.stringify(yamlData);
// fs.writeFileSync('src/data/input_file.json', jsonData, 'utf8');



