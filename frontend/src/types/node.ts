export interface NodeType {
  _id: string;
  name: string;
  parentId: string | null;
  children?: NodeType[];
}