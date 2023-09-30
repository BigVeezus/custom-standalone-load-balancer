import express, { Request, Response } from "express";

const app = express();

app.get("/app", (req: Request, res: Response) => {
  res.send(`Hello from server! Host: Host 1`);
});

app.listen(3000, () => {
  console.log("Backend server running on port 3000");
});
