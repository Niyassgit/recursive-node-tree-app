import { useState } from "react";
import type { ITreeNode } from "../../types/node";
import { useTree } from "../../context/TreeContext";
import InlineEdit from "./InlineEdit";
import AddNodeInput from "./AddNodeInput";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";

interface NodeRowProps {
  node: ITreeNode;
  depth?: number;
}

const DEPTH_BORDERS = [
  "border-l-blue-500",
  "border-l-violet-500",
  "border-l-cyan-500",
  "border-l-amber-500",
  "border-l-emerald-500",
];

export default function NodeRow({ 
  node, 
  depth = 0 
}: NodeRowProps) {
  const { addNode, renameNode, deleteNode } = useTree();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const hasChildren = (node.children?.length ?? 0) > 0;
  const accentBorder = DEPTH_BORDERS[depth % DEPTH_BORDERS.length];

  const handleAdd = async (name: string) => {
    await addNode(name, node._id);
    setAdding(false);
    setExpanded(true);
  };

  const handleRename = async (name: string) => {
    await renameNode(node._id, name);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${node.name}"?`)) {
      setDeleting(true);
      try {
        await deleteNode(node._id);
      } catch {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-300">
      {/* Row */}
      <div
        className={[
          "group flex items-center gap-2 px-3 py-3 min-h-[52px]",
          "bg-white border border-gray-200 rounded-xl shadow-sm",
          "border-l-[3px]", accentBorder,
          "transition-all duration-150",
          "hover:shadow-md hover:border-gray-300",
          expanded ? "rounded-b-none" : "",
          deleting ? "opacity-40 pointer-events-none" : "",
        ].join(" ")}
      >
        {/* Chevron toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className={[
            "flex items-center justify-center w-6 h-6 rounded-md flex-shrink-0 transition-colors duration-150",
            hasChildren || adding
              ? "text-gray-400 hover:bg-blue-50 hover:text-blue-500 cursor-pointer"
              : "text-gray-200 cursor-default",
          ].join(" ")}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <ChevronRight
            size={14}
            strokeWidth={2.5}
            className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          />
        </button>

        {/* Name / Inline edit */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <InlineEdit
              value={node.name}
              onSave={handleRename}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <span
              className="block text-[15px] font-medium text-gray-800 truncate cursor-text select-none hover:text-blue-600 transition-colors"
              onDoubleClick={() => setEditing(true)}
            >
              {node.name}
            </span>
          )}
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            title="Rename"
            className="flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => { setAdding(true); setExpanded(true); }}
            title="Add child"
            className="flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:bg-green-50 hover:text-green-500 transition-colors"
          >
            <Plus size={13} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleDelete}
            title="Delete"
            disabled={deleting}
            className="flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Children */}
      {expanded && (
        <div className="flex flex-col gap-1.5 mt-1.5 pl-7 ml-5 border-l-2 border-gray-100 animate-in slide-in-from-top-1 duration-200">
          {node.children?.map((child) => (
            <NodeRow key={child._id} node={child} depth={depth + 1} />
          ))}
          {adding && (
            <AddNodeInput
              onAdd={handleAdd}
              onCancel={() => setAdding(false)}
              placeholder="Child node name…"
            />
          )}
        </div>
      )}
    </div>
  );
}
