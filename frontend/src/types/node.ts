export interface INode {
  _id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ITreeNode extends INode {
  children: ITreeNode[];
}

export interface CreateNodeData {
  name: string;
  parentId?: string | null;
}

export interface UpdateNodeData {
  name?: string;
  parentId?: string | null;
}