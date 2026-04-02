import mongoose from "mongoose";
import { NodeRepository } from "../repositories/node.repository";
import { INode } from "../models/node.model";

const nodeRepository = new NodeRepository();

interface ITreeNode extends Omit<INode, "parentId"> {
  parentId: mongoose.Types.ObjectId | string | null;
  children: ITreeNode[];
}

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

  async updateNode(
    id: string,
    name?: string,
    parentId?: string,
  ): Promise<INode | null> {
    const updateData: Partial<INode> = {};
    if (name) updateData.name = name;
    if (parentId !== undefined) {
      updateData.parentId = parentId
        ? new mongoose.Types.ObjectId(parentId)
        : null;
    }
    return await nodeRepository.updateById(id, updateData);
  }

  async deleteNode(id: string): Promise<void> {
    const deleteRecursive = async (nodeId: string) => {
      const children = await nodeRepository.findAllChildren(nodeId);
      for (const child of children) {
        await deleteRecursive(child._id.toString());
      }
      await nodeRepository.deleteById(nodeId);
    };

    await deleteRecursive(id);
  }

  async getTree(): Promise<ITreeNode[]> {
    const allNodes = await nodeRepository.findAll();
    const nodeMap: Record<string, ITreeNode> = {};
    const tree: ITreeNode[] = [];

    allNodes.forEach((node) => {
      nodeMap[node._id.toString()] = {
        ...(node.toObject() as ITreeNode),
        children: [],
      };
    });

    allNodes.forEach((node) => {
      const nodeWithChildren = nodeMap[node._id.toString()];
      if (node.parentId) {
        const parentIdStr = node.parentId.toString();
        if (nodeMap[parentIdStr]) {
          nodeMap[parentIdStr].children.push(nodeWithChildren);
        } else {
          tree.push(nodeWithChildren);
        }
      } else {
        tree.push(nodeWithChildren);
      }
    });

    return tree;
  }
}
