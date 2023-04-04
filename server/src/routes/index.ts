import { Router } from "express";
import { participationHandler } from "../controllers/participationController";
import { listJotcRequests, createJotc } from "../controllers/jotcController";
import { authenticateHandler, tokenHandler } from "../controllers/authController";

const router = Router();

router.post( "/validate-participation", participationHandler);
router.post( "/jotc-requests",          createJotc);
router.get(  "/jotc-requests",          listJotcRequests);
router.post( "/authenticate",           authenticateHandler);
router.post( "/validate-token",         tokenHandler);

export default router;
