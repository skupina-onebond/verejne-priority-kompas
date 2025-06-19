import React from "react";

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <img
        src="/CRR-logo.svg" 
        alt="Loading"
        className="w-16 h-16 animate-spin"
      />
      <span className="text-white text-sm">Generuji analýzu...</span>
    </div>
  );
};
