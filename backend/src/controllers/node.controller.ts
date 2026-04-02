import { NextFunction, Request, Response } from "express";
import { NodeService } from "../services/node.service";
import { BadRequestError } from "../utils/errors";

const nodeService = new NodeService();

export class NodeController {
  createNode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, parentId } = req.body;

      if (!name) {
        throw new BadRequestError("Node name is required");
      }

      const newNode = await nodeService.createNode(name, parentId);
      res.status(201).json({
        success: true,
        data: newNode,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllNodes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nodes = await nodeService.getAllNodes();
      res.status(200).json({
        success: true,
        data: nodes,
      });
    } catch (error) {
      next(error);
    }
  };
}
