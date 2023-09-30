import axios from "axios";
import express, { NextFunction, Request, Response } from "express";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from "http-proxy-middleware";

const router = express.Router();

export const servers = [
  {
    id: 1,
    host: "localhost",
    port: 3000,
    weight: 1,
  },
  {
    id: 2,
    host: "localhost",
    port: 3000,
    weight: 1,
  },
  // Add more servers here
];

// Proxy middleware configuration
const proxyOptions = {
  target: "",
  changeOrigin: true,
  onProxyReq: (proxyReq: any, req: any) => {
    // Add custom header to request
    proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
  },
  logLevel: "debug",
};

// Next server index
let currIndex = 0;

// Get next server
function getServer() {
  // Round robin
  currIndex = (currIndex + 1) % servers.length;

  return servers[currIndex];
}

// Proxy requests
// router.all("*", (req, res) => {
//   // Get next target server
const target = getServer();
proxyOptions.target = `http://${target.host}:${target.port}`;
console.log(proxyOptions.target);

//   // Forward request
// createProxyMiddleware({
//   target: `http://${target.host}:${target.port}`,
//   changeOrigin: true,
//   headers: {
//     "X-Special-Proxy-Header": "foobar",
//   },
// });
// });

let healthyServers = [];

async function ishealthy(req: Request, res: Response, next: NextFunction) {
  // const data = updateHealthyServers();
  if (healthyServers.length === 0) {
    return res.status(500).send("No healthy servers!");
  }
  next();
}

async function updateHealthyServers() {
  // Check health status
  // ...
  const response = await axios.get(`https://localhost:2000/app`);
  console.log(response);
  return response;
}

router.all(
  "*",
  ishealthy,
  createProxyMiddleware({
    target: `http://${target.host}:${target.port}`,
    changeOrigin: true,
    headers: {
      "X-Special-Proxy-Header": "foobar",
    },
  })
);

export { router as proxyRouter };
