import React from "react";

interface RiskBarometerCircleProps {
  score: number; // 0–100
  size?: number; // veľkosť v px
}

export const RiskBarometerCircle: React.FC<RiskBarometerCircleProps> = ({
  score,
  size = 100,
}) => {
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (100 - score) / 100; // čím menší, tým zelenší

  const getColor = () => {
    if (score <= 40) return "#16a34a"; // zelená
    if (score <= 70) return "#facc15"; // žltá
    return "#dc2626"; // červená
  };

  return (
    <div className="relative w-fit h-fit">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={6}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * progress}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-semibold text-slate-900">
        <span className="text-2xl">{score}</span>
        <span className="text-[8px] tracking-wide">Závažnost</span>
      </div>
    </div>
  );
};
