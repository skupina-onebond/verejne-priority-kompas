import React from 'react';

interface BarometerProps {
  score: number; // 0-99
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const Barometer = ({ score, size = 'md', showLabel = true }: BarometerProps) => {
  const clampedScore = Math.max(0, Math.min(99, score));

  const getZoneInfo = (score: number) => {
    if (score >= 71) {
      return {
        color: '#ef4444',
        bgColor: '#fef2f2',
        textColor: '#dc2626',
        label: 'Vysoké riziko'
      };
    } else if (score >= 41) {
      return {
        color: '#f59e0b',
        bgColor: '#fffbeb',
        textColor: '#d97706',
        label: 'Střední riziko'
      };
    } else {
      return {
        color: '#10b981',
        bgColor: '#ecfdf5',
        textColor: '#059669',
        label: 'Nízké riziko'
      };
    }
  };

  const zoneInfo = getZoneInfo(clampedScore);

  const sizes = {
    sm: { width: 80, height: 50, strokeWidth: 4, fontSize: 'text-xs' },
    md: { width: 120, height: 75, strokeWidth: 6, fontSize: 'text-sm' },
    lg: { width: 160, height: 100, strokeWidth: 8, fontSize: 'text-base' }
  };

  const { width, height, strokeWidth, fontSize } = sizes[size];
  const radius = (Math.min(width, height * 2) - strokeWidth) / 2;
  const centerX = width / 2;
  const centerY = height - 10;

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  // Define zones as angle segments
  const zones = [
    { from: 270, to: 330, color: '#10b981', range: [0, 40] },
    { from: 330, to: 30, color: '#f59e0b', range: [41, 70] },
    { from: 30, to: 90, color: '#ef4444', range: [71, 100] }
  ];

  // Compute angle based on score (mapped linearly across total 180deg arc)
  const angle = 270 + (clampedScore / 100) * 180;
  const needleEnd = polarToCartesian(centerX, centerY, radius - 10, angle);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          {/* Draw background gray arc */}
          <path
            d={createArcPath(270, 90)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Draw only active zone based on score */}
          {zones.map(({ from, to, color, range }) => {
            const [min, max] = range;
            if (clampedScore < min) return null;

            const segmentStart = from;
            const segmentEnd = clampedScore >= max
              ? to
              : from + ((to > from ? to - from : 360 - from + to) * ((clampedScore - min) / (max - min)));

            return (
              <path
                key={color}
                d={createArcPath(segmentStart, segmentEnd)}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            );
          })}

          {/* Needle */}
          <line
            x1={centerX}
            y1={centerY}
            x2={needleEnd.x}
            y2={needleEnd.y}
            stroke="#1f2937"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r={4}
            fill="#1f2937"
          />
        </svg>

        {/* Score text */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ${fontSize}`}>
          <div className="font-bold text-slate-900">{clampedScore}%</div>
        </div>
      </div>

      {showLabel && (
        <div className="mt-2 text-center">
          <div
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: zoneInfo.bgColor,
              color: zoneInfo.textColor,
              borderColor: zoneInfo.color + '40'
            }}
          >
            {zoneInfo.label}
          </div>
        </div>
      )}
    </div>
  );
};
