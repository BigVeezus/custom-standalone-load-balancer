import fs from "fs";
import https from "https";

const options = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

https.createServer(options).listen(443, () => {
  console.log("Load balancer started on port 443");
});
