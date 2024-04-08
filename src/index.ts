import 'dotenv/config'
import express, { Express, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";

const app: Express = express();
const port = process.env.SERVERPORT || 5001;

var corsOptions = {
  origin: "*"
};
app.use(cors<Request>(corsOptions));

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});