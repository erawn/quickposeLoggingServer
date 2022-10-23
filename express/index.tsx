import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import https from "https";
import fs from "fs";

dotenv.config();
const app : Express = express();
app.use(helmet());
const port = process.env.PORT;
//https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326
//https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

interface RequestWithClient extends Request {
  client?: any
}

app.get('/', (req:RequestWithClient, res:Response) => {
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication.');
  }

  return res.send('Hello, world!');
});

https
  .createServer( 
    {
    requestCert: true,
    rejectUnauthorized: false,
    ca: fs.readFileSync('root.crt'),
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
   },
    app
  )
  .listen(port, ()=>{
    console.log('server is runing at port 4000')
  });
