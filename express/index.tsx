import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import https from "https";
import fs from "fs";
import cors from "cors";
import bodyParser = require("body-parser");
import { v4 as uuidv4 } from "uuid";
dotenv.config();
import { createClient } from "redis";

const client = createClient();

const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// var corsOptions = {
//   origin: [
//     /\.vercel\.app$/,
//     /\.ericrawn\.media$/,
//     /\.ericrawn\.graphics$/,
//     /\*/,
//   ],
//   method: ["POST"],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors(corsOptions));
const port = process.env.PORT;
//https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326
//https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

interface RequestWithClient extends Request {
  client?: any;
}

app.get("/", (req: RequestWithClient, res: Response) => {
  //console.log(req.client.authorized);
  if (!req.client.authorized) {
    return res.status(401).send("Invalid client certificate authentication.");
  } else {
    return res.send("Hello, world!");
  }
});

app.post("/analytics", async (req: RequestWithClient, res: Response) => {
  //console.log(req.client.authorized);

  const data = req.body;
  if (data.projectID != "") {
    client.set(new Date().getTime().toString(), JSON.stringify(data));
  }

  return res.status(200);
  // if (!req.client.authorized) {

  //   return res.status(401).send("Invalid client certificate authentication.");
  // } else {
  //   if (req.body) {
  //   }
  //   return res.status(200);
  // }
});
// app.listen(4000, async function () {
//   //console.log("Example app listening on port 4000.");
//   await client.connect();
// });
https
  .createServer(
    {
      requestCert: true,
      rejectUnauthorized: true,
      cert: fs.readFileSync("/home/erawn65/analyticsCert.pem"),
    },
    app
  )
  .listen(port, async () => {
    await client.connect();
    console.log("server is runing at port", port);
  });
