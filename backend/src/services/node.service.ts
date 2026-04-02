import mongoose from "mongoose";
import { NodeRepository } from "../repositories/node.repository";
import { INode } from "../models/node.model";

const nodeRepository = new NodeRepository();

export class NodeService {
  async createNode(name: string, parentId?: string): Promise<INode> {
    return await nodeRepository.create({
      name,
      parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null,
    });
  }

  async getAllNodes(): Promise<INode[]> {
    return await nodeRepository.findAll();
  }
}
