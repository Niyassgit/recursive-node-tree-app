import { Request, Response } from 'express';
import { NodeService } from '../services/node.service';

const nodeService = new NodeService();

export class NodeController {
  async createNode(req: Request, res: Response) {
    try {
      const { name, parentId } = req.body;
      const newNode = await nodeService.createNode(name, parentId);
      res.status(201).json(newNode);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllNodes(req: Request, res: Response) {
    try {
      const nodes = await nodeService.getAllNodes();
      res.status(200).json(nodes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
