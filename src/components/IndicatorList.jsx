import React from 'react';
import { AlertCircle, AlertOctagon, Info } from 'lucide-react';
import RiskBadge from './RiskBadge';

const IndicatorList = ({ indicators = [] }) => {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="p-6 bg-cyber-card/60 border border-cyber-border rounded-xl text-center">
        <Info className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
        <p className="text-slate-300 font-medium">Zero Malicious Signatures Triggered</p>
        <p className="text-xs text-slate-500 mt-1">No indicators matched scam patterns or suspicious traits.</p>
      </div>
    );
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'HIGH':
        return <AlertOctagon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />;
      case 'MEDIUM':
        return <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="space-y-3">
      {indicators.map((ind, index) => (
        <div
          key={index}
          className="p-4 bg-cyber-card/70 border border-cyber-border rounded-xl hover:border-slate-700 transition flex items-start gap-3.5"
        >
          {getSeverityIcon(ind.severity)}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                {ind.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  +{ind.weight} pts
                </span>
                <RiskBadge level={ind.severity} size="sm" />
              </div>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {ind.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndicatorList;
