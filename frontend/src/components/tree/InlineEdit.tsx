import React, { useState, useRef, useEffect } from "react";

interface InlineEditProps {
  value: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function InlineEdit({ 
  value, 
  onSave, 
  onCancel 
}: InlineEditProps) {
  const [text, setText] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const t = text.trim();
      if (t) onSave(t);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <input
      ref={ref}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKey}
      onBlur={() => {
        const t = text.trim();
        if (t && t !== value) onSave(t);
        else onCancel();
      }}
      className="w-full text-[15px] font-medium text-gray-800 bg-gray-50 border border-blue-400 rounded-md px-2 py-0.5 outline-none ring-2 ring-blue-200 focus:ring-blue-300 transition-all duration-200"
    />
  );
}
