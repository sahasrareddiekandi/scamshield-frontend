import React from 'react';

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
    </span>
  );
};

export default RiskBadge;
