import React from 'react';

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
      </div>
    </footer>
  );
};

export default Footer;
