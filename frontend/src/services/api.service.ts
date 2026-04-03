import axios from "axios";
import type { INode, ITreeNode, CreateNodeData, UpdateNodeData } from "../types/node";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTree = async (): Promise<ITreeNode[]> => {
  const response = await api.get("/tree");
  return response.data.data;
};

export const createNode = async (data: CreateNodeData): Promise<INode> => {
  const response = await api.post("/", data);
  return response.data.data;
};

export const updateNode = async (id: string, data: UpdateNodeData): Promise<INode> => {
  const response = await api.patch(`/${id}`, data);
  return response.data.data;
};

export const deleteNode = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

export default api;
