import fs from "fs";
import https from "https";
import { proxyRouter } from "./routes/proxy";
import { healthRouter } from "./routes/health";
import express from "express";

const app = express();

const options = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

app.use("/app", proxyRouter);
app.use("/health", healthRouter);

https.createServer(options, app).listen(2000, () => {
  console.log("Load balancer started on port 2000");
});
