
import React from 'react';

interface ScoreGaugeProps {
  label: string;
  score: number;
  colorClass: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ label, score, colorClass }) => {
  const percentage = Math.round(score * 100);
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={colorClass}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium tracking-wider uppercase text-gray-400">{label}</span>
    </div>
  );
};

export default ScoreGauge;
