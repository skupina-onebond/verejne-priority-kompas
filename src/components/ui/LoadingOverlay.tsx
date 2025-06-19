import React from 'react';

export const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center rounded-lg">
      <img
        src="/CRR-logo.svg"
        alt="Loading"
        className="h-12 w-12 animate-spin"
      />
    </div>
  );
};
