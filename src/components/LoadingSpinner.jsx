import React from 'react';

const LoadingSpinner = ({ text = 'Analyzing content...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', gap: '1rem' }}>
      <div className="spinner" style={{ width: '36px', height: '36px' }}></div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
