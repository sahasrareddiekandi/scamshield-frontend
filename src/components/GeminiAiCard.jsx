import React from 'react';
import { Sparkles, Brain, CheckCircle2, ShieldCheck } from 'lucide-react';

const GeminiAiCard = ({ geminiUsed, summary, techniques = [] }) => {
  return (
    <div className="p-6 bg-cyber-card/90 border border-cyan-500/30 rounded-2xl relative overflow-hidden shadow-cyber-cyan">
      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-500 text-white rounded-lg shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-base">Google Gemini Threat Intelligence</h3>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                geminiUsed 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {geminiUsed ? 'Gemini 1.5 Flash Active' : 'Rule-Engine Direct Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-400">Contextual linguistic & psychological threat analysis</p>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Brain className="w-3.5 h-3.5" />
          <span>SYNTHESIZED THREAT EVALUATION</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {summary || 'Analysis complete. Content has been cross-referenced against known attack patterns.'}
        </p>
      </div>

      {/* Social Engineering Techniques */}
      {techniques && techniques.length > 0 && (
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Identified Social-Engineering Techniques:
          </div>
          <div className="space-y-2">
            {techniques.map((tech, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAiCard;
