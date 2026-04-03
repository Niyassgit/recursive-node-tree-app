import React, { useState, useRef, useEffect } from "react";

interface AddNodeInputProps {
  onAdd: (name: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export default function AddNodeInput({ 
  onAdd, 
  onCancel, 
  placeholder = "Node name…" 
}: AddNodeInputProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    ref.current?.focus(); 
  }, []);

  const submit = () => {
    const t = value.trim();
    if (t) { 
      onAdd(t); 
      setValue(""); 
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
    else if (e.key === "Escape") onCancel();
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-white border border-dashed border-blue-400 rounded-xl animate-in fade-in slide-in-from-top-1 duration-200">
      <input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        className="flex-1 min-w-0 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
      />
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Add
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
