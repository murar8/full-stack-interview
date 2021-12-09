import "dotenv/config";

import express from "express";

import db from "./helpers/db";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Web app started at "http://localhost:${port}"`);
});

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});
