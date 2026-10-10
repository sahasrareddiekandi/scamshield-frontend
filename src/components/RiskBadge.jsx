import React from 'react';
<<<<<<< HEAD

const RiskBadge = ({ riskLevel }) => {
  const level = (riskLevel || 'LOW').toUpperCase();
  
  let badgeClass = 'badge-low';
  let icon = '✓';

  if (level === 'MEDIUM') {
    badgeClass = 'badge-medium';
    icon = '⚠';
  } else if (level === 'HIGH') {
    badgeClass = 'badge-high';
    icon = '🚨';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span>{icon}</span> {level} RISK
=======
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

const RiskBadge = ({ level, size = 'md' }) => {
  const normalized = (level || 'LOW').toUpperCase();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-semibold px-2.5 py-1',
    lg: 'text-sm font-bold px-3.5 py-1.5',
  };

  if (normalized === 'HIGH') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 shadow-cyber-danger ${sizeClasses[size]}`}>
        <ShieldAlert className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        <span>HIGH RISK</span>
      </span>
    );
  }

  if (normalized === 'MEDIUM') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-cyber-warning ${sizeClasses[size]}`}>
        <AlertTriangle className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        <span>MEDIUM RISK</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-cyber-safe ${sizeClasses[size]}`}>
      <ShieldCheck className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>LOW RISK</span>
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
    </span>
  );
};

export default RiskBadge;
