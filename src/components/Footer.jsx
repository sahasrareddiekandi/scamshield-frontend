import React from 'react';
<<<<<<< HEAD

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} ScamShield Risk-Analysis Platform. Educational & Threat-Prevention Security Tool.
        </p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          ScamShield provides transparent probability-based risk scoring. It does not replace official law enforcement or financial verification.
        </p>
=======
import { Shield, Sparkles, Terminal, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-cyber-border bg-cyber-darker text-slate-400 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white text-base">SCAMSHIELD THREAT DEFENSE</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              Enterprise-grade risk analysis platform engineered to protect organizations and individuals against modern social-engineering, credential harvesting, and deceptive URL exploits.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Rule-Engine v2.4
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Google Gemini AI
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-400 hover:text-cyan-400 transition cursor-default">Message Risk Heuristics</span></li>
              <li><span className="text-slate-400 hover:text-cyan-400 transition cursor-default">URL Structure Telemetry</span></li>
              <li><span className="text-slate-400 hover:text-cyan-400 transition cursor-default">Gemini Linguistic AI</span></li>
              <li><span className="text-slate-400 hover:text-cyan-400 transition cursor-default">Phishing Signatures Database</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Security Protocol
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Zero credential retention. Content evaluated strictly in-flight with tokenized cryptographic hashes.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Spring Boot 3 • React 18 • MySQL • Redis
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-cyber-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} ScamShield Defense Platform. Built for security vigilance.
          </div>
          <div className="font-mono text-slate-400">
            SHA-256 Protected • High-Resilience Architecture
          </div>
        </div>
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
      </div>
    </footer>
  );
};

export default Footer;
