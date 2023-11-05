import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import http from "http";
// import input from "./data/open-ai.json";


const instance: Express = express();
instance.set("trust proxy", 1);

instance.use(express.json());
instance.use(cors());


/* try {
  const doc = yaml.load(fs.readFileSync('src/data/openapi.yaml', 'utf8'));
  // console.log(doc);
  const jsonData = JSON.stringify(doc);
  // console.log(jsonData);
  fs.writeFileSync('src/data/input_file.json', jsonData, 'utf8');
} catch (e) {
  console.log(e);
} */
instance.use("/", require('./routes/comparer').default);



export default http.createServer(instance);