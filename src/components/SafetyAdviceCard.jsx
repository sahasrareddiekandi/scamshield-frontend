import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Lightbulb } from 'lucide-react';

const SafetyAdviceCard = ({ advice = [] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!advice || advice.length === 0) return;
    const text = advice.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">Security Action Recommendations</h3>
            <p className="text-xs text-slate-400">Practical steps to mitigate risk immediately</p>
          </div>
        </div>

        {advice && advice.length > 0 && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500/40 transition"
            title="Copy advice to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Steps'}</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {advice && advice.length > 0 ? (
          advice.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 italic">No specific precautions necessary for this item.</p>
        )}
      </div>
    </div>
  );
};

export default SafetyAdviceCard;
