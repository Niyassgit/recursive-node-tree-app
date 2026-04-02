import Node, { INode } from "../models/node.model";

export class NodeRepository {
  async create(data: Partial<INode>): Promise<INode> {
    const node = new Node(data);
    return await node.save();
  }

  async findAll(): Promise<INode[]> {
    return await Node.find().sort({ createdAt: 1 });
  }

  async findById(id: string): Promise<INode | null> {
    return await Node.findById(id);
  }

  async deleteMany(filter: any): Promise<void> {
    await Node.deleteMany(filter);
  }

  async deleteById(id: string): Promise<void> {
    await Node.findByIdAndDelete(id);
  }
}
