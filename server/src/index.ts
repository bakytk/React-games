import dotenv from "dotenv";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 15500;
//console.log("PORT", PORT);

import express, { Application } from "express";
const app: Application = express();

import router from "./routes/index";
app.use("/", router);

try {
  app.listen(PORT, async () => {
    console.log(`Server launched.`);
  });
} catch (e) {
  console.error(`Error: ${e.message}`);
}

export default app;
