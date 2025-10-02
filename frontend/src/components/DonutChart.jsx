import React from 'react';

const DonutChart = ({ 
  percentage, 
  size = 100, 
  strokeWidth = 8, 
  color = '#ef4444', 
  backgroundColor = '#374151',
  label = '',
  showPercentage = true 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (percentage / 100) * circumference;
  const gap = circumference - dash;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dasharray 1s ease-in-out',
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showPercentage && (
          <span className="text-lg font-bold text-white">
            {Math.round(percentage)}%
          </span>
        )}
        {label && (
          <span className="text-xs text-gray-400 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default DonutChart;