import fs from "fs";
import https from "https";
import { proxyRouter } from "./routes/proxy";
import express from "express";

const app = express();

const options = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

app.use("/app", proxyRouter);

https.createServer(options, app).listen(2000, () => {
  console.log("Load balancer started on port 2000");
});
