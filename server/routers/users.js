import express from "express";
import upload from "../middleware/upload";
const router = express.Router();

import profileController from "../controllers/users/profileController";
import uploadController from "../controllers/users/uploadController";
import requestMoneyController from "../controllers/users/requestMoneyController";
import myReferralsController from "../controllers/users/myReferralsController";

router.get("/profile", profileController);
router.post("/upload", upload.array("files", 10), uploadController);
router.post("/request-money", requestMoneyController);
router.get("/my-referrals", myReferralsController);

export default router;
