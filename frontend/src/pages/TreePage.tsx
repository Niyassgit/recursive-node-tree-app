import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useTree } from "../context/TreeContext";
import NodeRow from "../components/tree/NodeRow";
import AddNodeInput from "../components/tree/AddNodeInput";

export default function TreePage() {
  const { tree, loading, error, addNode, refresh } = useTree();
  const [addingRoot, setAddingRoot] = useState(false);

  const handleAddRoot = async (name: string) => {
    await addNode(name, null);
    setAddingRoot(false);
  };

  if (loading && tree.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-gray-400 animate-in fade-in duration-500">
        <div className="w-9 h-9 border-[3px] border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm font-medium">Loading your tree…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-red-500 animate-in fade-in duration-300">
        <p className="text-sm font-medium">{error}</p>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-50 border border-red-200 text-red-500 rounded-lg hover:bg-red-100 transition-colors shadow-sm"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col gap-6 animate-in slide-in-from-bottom-2 fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Node Tree Manager</h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">Manage your hierarchical data structure with ease</p>
        </div>
        <button
          onClick={() => setAddingRoot(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Root Node
        </button>
      </div>

      {/* Root node input */}
      {addingRoot && (
        <AddNodeInput
          onAdd={handleAddRoot}
          onCancel={() => setAddingRoot(false)}
          placeholder="Root node name…"
        />
      )}

      {/* Tree */}
      <div className="flex flex-col gap-2">
        {tree.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-center animate-in fade-in duration-300">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0" />
            </svg>
            <div>
              <p className="font-semibold text-gray-600">No nodes yet</p>
              <p className="text-sm mt-0.5 text-gray-400">Click "Add Root Node" to get started.</p>
            </div>
          </div>
        ) : (
          tree.map((node) => <NodeRow key={node._id} node={node} depth={0} />)
        )}
      </div>

      {/* Footer */}
      {tree.length > 0 && (
        <p className="text-center text-xs text-gray-400 font-semibold tracking-wider uppercase tabular-nums opacity-60">
          {tree.length} Root node{tree.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
