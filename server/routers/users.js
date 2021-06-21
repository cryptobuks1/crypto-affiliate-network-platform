import express from "express";
import upload from "../middleware/upload";
const router = express.Router();

import profileController from "../controllers/profileController";
import uploadController from "../controllers/uploadController";
import requestMoneyController from "../controllers/requestMoneyController";

router.get("/profile", profileController);
router.post("/upload", upload.array("files", 10), uploadController);
router.post("/request-money", requestMoneyController);

export default router;
