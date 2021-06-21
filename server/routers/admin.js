import express from "express";
const router = express.Router();

import isAdminController from "../controllers/admin/isAdminController";
import getRequestsController from "../controllers/admin/getRequestsController";

router.get("/", isAdminController);
router.get("/requests", getRequestsController);

export default router;
