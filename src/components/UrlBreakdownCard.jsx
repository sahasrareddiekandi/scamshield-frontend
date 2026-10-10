import React from 'react';
import { Globe, Lock, Unlock, Server, AlertTriangle, Hash, Link2, Check } from 'lucide-react';

const UrlBreakdownCard = ({ urlDetails }) => {
  if (!urlDetails) return null;

  return (
    <div className="p-6 bg-cyber-card/80 border border-cyber-border rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-slate-800 text-cyan-400 rounded-lg">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-base">URL Technical Breakdown</h3>
          <p className="text-xs text-slate-400">Deep structural protocol & destination telemetry</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {/* Protocol */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            {urlDetails.https ? (
              <Lock className="w-4 h-4 text-emerald-400" />
            ) : (
              <Unlock className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-xs text-slate-400">Protocol:</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${urlDetails.https ? 'text-emerald-400' : 'text-amber-400'}`}>
            {urlDetails.protocol ? urlDetails.protocol.toUpperCase() : 'UNKNOWN'}
          </span>
        </div>

        {/* Host / Domain */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Host Type:</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${urlDetails.ipAddress ? 'text-red-400' : 'text-slate-200'}`}>
            {urlDetails.ipAddress ? 'Direct IP (High Risk)' : 'Domain Name'}
          </span>
        </div>

        {/* URL Length */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Character Length:</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${urlDetails.urlLength > 75 ? 'text-amber-400' : 'text-slate-200'}`}>
            {urlDetails.urlLength} chars
          </span>
        </div>

        {/* Suspicious TLD */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">TLD Reputation:</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${urlDetails.hasSuspiciousTld ? 'text-red-400' : 'text-emerald-400'}`}>
            {urlDetails.hasSuspiciousTld ? 'High-Abuse TLD' : 'Standard / Clean'}
          </span>
        </div>

        {/* Subdomains */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Subdomain Depth:</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${urlDetails.subdomainCount >= 3 ? 'text-amber-400' : 'text-slate-200'}`}>
            {urlDetails.subdomainCount} levels
          </span>
        </div>

        {/* Special Characters */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Obfuscation Chars:</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${urlDetails.hasSpecialCharacters ? 'text-red-400' : 'text-emerald-400'}`}>
            {urlDetails.hasSpecialCharacters ? 'Detected (@ or ---)' : 'None'}
          </span>
        </div>
      </div>

      {/* Keywords discovered */}
      {urlDetails.detectedKeywords && urlDetails.detectedKeywords.length > 0 && (
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 mb-1.5 font-mono">Sensitized Keywords Located in Path/Query:</div>
          <div className="flex flex-wrap gap-1.5">
            {urlDetails.detectedKeywords.map((kw, i) => (
              <span key={i} className="text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                "{kw}"
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlBreakdownCard;
