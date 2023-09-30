import express from "express";
import axios from "axios";
import { servers } from "./proxy";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = [];

  // Loop through servers and health check each
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i];
    // console.log(server.host, server.port);
    try {
      const response = await axios.get(
        `http://${server.host}:${server.port}/app/`
      );
      // Check status
      if (response.status === 200) {
        results.push({
          id: server.id,
          status: "passing",
        });
      } else {
        results.push({
          id: server.id,
          status: "failing",
        });
      }
    } catch (error) {
      results.push({
        id: server.id,
        status: "failing",
      });
    }
  }

  // Return summarized results
  res.json(results);
});

export { router as healthRouter };
