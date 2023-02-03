import dotenv from "dotenv";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 15500;
console.log("PORT", PORT);

import express, { Application } from "express";
const app: Application = express();

//import router from "./routes.js";
//app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
});

export default app;
