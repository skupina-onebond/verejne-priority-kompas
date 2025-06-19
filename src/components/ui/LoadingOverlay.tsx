import React from 'react';

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
      <img
        src="/CRR-logo.svg"
        alt="Loading"
        className="h-12 w-12 animate-spin"
      />
    </div>
  );
};
