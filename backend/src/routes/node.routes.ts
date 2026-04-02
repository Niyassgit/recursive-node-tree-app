import { Router } from "express";
import { NodeController } from "../controllers/node.controller";

const router = Router();
const nodeController = new NodeController();

router.post("/", nodeController.createNode);
router.get("/", nodeController.getAllNodes);
router.get("/tree", nodeController.getTree);
router.patch("/:id", nodeController.updateNode);
router.delete("/:id", nodeController.deleteNode);

export default router;
