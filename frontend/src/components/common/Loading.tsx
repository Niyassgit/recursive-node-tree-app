import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  fullScreen = false, 
  size = 'md', 
  text = "Loading..." 
}) => {
  const sizeMap = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const containerBase = "flex flex-col items-center justify-center gap-4 animate-fade-in";
  const containerFullScreen = "fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm";

  return (
    <div className={`${containerBase} ${fullScreen ? containerFullScreen : "py-8"}`}>
      <div 
        className={`${sizeMap[size]} border-t-indigo-500 border-indigo-200/20 rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
