import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ScoreCircleProps {
  score: number;
  size?: number; // napr. 32, 56, ...
}

export const ScoreCircle = ({ score, size = 56 }: ScoreCircleProps) => {
  const radius = (size / 2) - 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const color = score <= 40 ? '#22c55e' : score <= 70 ? '#f97316' : '#ef4444'; // green, orange, red
  const fontSize = size <= 32 ? '0.6rem' : '0.75rem';
  const strokeWidth = size <= 32 ? 4 : 6;

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <svg width={size} height={size} className="cursor-help">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fontSize={fontSize}
              fontWeight="bold"
              fill="#1f2937"
            >
              {score}
            </text>
          </svg>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          align="center"
          className="bg-[#215197] text-white text-xs px-2 py-1 rounded shadow-md z-50"
        >
          Závažnost
          <Tooltip.Arrow className="fill-[#215197]" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
