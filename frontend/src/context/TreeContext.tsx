import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ITreeNode } from "../types/node";
import * as api from "../services/api.service";

interface TreeContextType {
  tree: ITreeNode[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addNode: (name: string, parentId?: string | null) => Promise<void>;
  renameNode: (id: string, name: string) => Promise<void>;
  deleteNode: (id: string) => Promise<void>;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tree, setTree] = useState<ITreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getTree();
      setTree(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tree data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addNode = async (name: string, parentId: string | null = null) => {
    try {
      await api.createNode({ name, parentId });
      await refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to create node";
      setError(msg);
      throw new Error(msg);
    }
  };

  const renameNode = async (id: string, name: string) => {
    try {
      await api.updateNode(id, { name });
      await refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to update node";
      setError(msg);
      throw new Error(msg);
    }
  };

  const deleteNode = async (id: string) => {
    try {
      await api.deleteNode(id);
      await refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to delete node";
      setError(msg);
      throw new Error(msg);
    }
  };

  return (
    <TreeContext.Provider value={{ 
      tree, 
      loading, 
      error, 
      refresh, 
      addNode, 
      renameNode, 
      deleteNode 
    }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};
