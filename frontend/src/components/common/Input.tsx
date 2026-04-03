import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = "", 
  id,
  ...props 
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  const baseInputStyles = "w-full px-4 py-3 bg-white border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm";
  const errorStyles = error ? "border-rose-500 focus:ring-rose-500/50 focus:border-rose-500" : "";

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-semibold text-slate-700 ml-1"
        >
          {label}
        </label>
      )}
      <input 
        id={inputId}
        className={`${baseInputStyles} ${errorStyles}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose-600 ml-1 mt-1 font-medium animate-slide-down">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
