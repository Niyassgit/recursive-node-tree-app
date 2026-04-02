import { Router } from "express";
import { NodeController } from "../controllers/node.controller";

const router = Router();
const nodeController = new NodeController();

router.post("/", nodeController.createNode);
router.get("/", nodeController.getAllNodes);

export default router;
