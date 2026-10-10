import React from 'react';

const RiskGauge = ({ score = 0, level = 'LOW', confidence = 0.9 }) => {
  const normalizedLevel = (level || 'LOW').toUpperCase();
  
  // Circumference calculation for svg circle (r = 54)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorConfig = {
    HIGH: {
      stroke: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.4)',
      bg: 'text-red-500',
      label: 'Critical Danger Detected',
      desc: 'Severe scam or phishing attributes identified. Immediate avoidance advised.',
    },
    MEDIUM: {
      stroke: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.4)',
      bg: 'text-amber-500',
      label: 'Suspicious Anomalies Found',
      desc: 'Multiple risk signals detected. Do not provide information without verification.',
    },
    LOW: {
      stroke: '#10b981',
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'text-emerald-500',
      label: 'Safe / Legitimate Characteristics',
      desc: 'No aggressive scam indicators detected in standard heuristics.',
    },
  }[normalizedLevel] || {
    stroke: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    bg: 'text-emerald-500',
    label: 'Standard',
    desc: '',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 blur-2xl"
        style={{ backgroundColor: colorConfig.stroke }}
      />
      
      {/* Radial SVG Meter */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={colorConfig.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 8px ${colorConfig.glow})`,
            }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-extrabold tracking-tight font-mono text-white">
            {score}
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className={`text-lg font-bold ${colorConfig.bg}`}>
          {colorConfig.label}
        </div>
        <p className="text-xs text-slate-400 max-w-xs mt-1">
          {colorConfig.desc}
        </p>
      </div>

      {/* Confidence metric */}
      {confidence !== undefined && (
        <div className="w-full mt-5 pt-4 border-t border-cyber-border/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>AI & Engine Confidence:</span>
          <span className="text-cyan-400 font-semibold">{Math.round(confidence * 100)}%</span>
        </div>
      )}
    </div>
  );
};

export default RiskGauge;
