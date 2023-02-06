const { JWT_SECRET } = process.env;

import express from "express";
import cors from "cors";
const router = express.Router();

import bodyParser from "body-parser";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

import { controllers } from "../controllers/index";
import { authenticate } from "../middlewares/auth";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET token");
}
const confirmToken = authenticate(JWT_SECRET);

router.get("/alive", controllers.ping);
router.post("/user", controllers.signup);
router.post("/login", controllers.signin);
router.get("/allUsers", confirmToken, controllers.allUsers);

// router.get("/games", controllers.getGames);
router.post("/deposit", confirmToken, controllers.deposit);
router.post("/spin", confirmToken, controllers.spin);

router.all("/*", controllers.fallback);
router.use((error, _, res, __) => {
  console.error(`Processing err: ${error}`);
  return res.status(500).json({ error: "Processing error." });
});

export default router;
