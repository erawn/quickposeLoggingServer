import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import https from "https";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "redis";

const client = createClient();
client.connect();
const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: [
    /\.vercel\.app$/,
    /\.ericrawn\.media$/,
    /\.ericrawn\.graphics$/,
    /\*/,
  ],
  method: ["GET", "POST", "OPTIONS"],
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//quickpose-git-analytics-erawn.vercel.app/
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
const port = 5001;
const httpPort = process.env.PORT || 5000;
//https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326
//https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

interface RequestWithClient extends Request {
  client?: any;
}
app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});
app.get("/", (req: RequestWithClient, res: Response) => {
  //console.log(req.client.authorized);
  if (!req.client.authorized) {
    return res.send("Hello, world! UNAUTHORIZED");
    return res.status(401).send("Invalid client certificate authentication.");
  } else {
    return res.send("Hello, world!" + req.headers.SSL_Client_Verify);
  }
});

app.post("/analytics", (req: RequestWithClient, res: Response) => {
  console.log(req.client.authorized);

  const data = req.body;
  if (data.projectID != "") {
    client.set(new Date().getTime().toString(), JSON.stringify(data));
    console.log(JSON.stringify(data));
  }

  return res.end(data.projectID);
  // if (!req.client.authorized) {

  //   return res.status(401).send("Invalid client certificate authentication.");
  // } else {
  //   if (req.body) {
  //   }
  //   return res.status(200);
  // }
});
app
  .listen(httpPort, async function () {
    console.log("Example app listening on port", httpPort);
    //await client.connect();
  })
  .on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });
// https
//   .createServer(
//     {
//       cert: fs.readFileSync("/home/erawn65/analyticsCert.pem"),
//       key: fs.readFileSync("/home/erawn65/analyticsKey.pem"),
//     },
//     app
//   )
//   .listen(port, async () => {
//     //await client.connect();
//     console.log("server is runing at port", port);
//   });
