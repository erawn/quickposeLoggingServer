import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import https from "https";
import fs from "fs";
import cors from 'cors';
import * as level from 'level'


dotenv.config();

//https://github.com/Level/level
//https://github.com/Level/classic-level/issues/50
const db = new level.Level('./db', { valueEncoding: 'json' })

const app : Express = express();
app.use(helmet());
app.use(express.json());


var corsOptions = {
  origin: [/\.vercel\.app$/, /\.ericrawn\.media$/,/\.ericrawn\.graphics$/],
  method: ['POST'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const port = process.env.PORT;
//https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326
//https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

interface RequestWithClient extends Request {
  client?: any
}

app.get('/', cors(corsOptions), (req:RequestWithClient, res:Response) => {
  console.log(req.client.authorized)
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication.');
  }else{
    return res.send('Hello, world!');
  }


});

app.post('/analytics', cors(corsOptions), (req:RequestWithClient, res:Response) => {
  console.log(req.client.authorized)
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication.');
  }else{
    if(req.body){

    }
    return res.status(200);
  }


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
