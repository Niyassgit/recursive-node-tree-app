import { Router } from "express";
import { NodeController } from "../controllers/node.controller";

const router = Router();
const nodeController = new NodeController();

router.post("/", (req, res) => nodeController.createNode(req, res));
router.get("/", (req, res) => nodeController.getAllNodes(req, res));

export default router;
