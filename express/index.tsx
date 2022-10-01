import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import https from "https";
import fs from "fs";

dotenv.config();
const app: Express = express();
app.use(helmet());
const port = process.env.PORT;
//https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326
//https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
https
  .createServer( 
    {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
   },
    app
  )
  .listen(4000, ()=>{
    console.log('server is runing at port 4000')
  });
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});