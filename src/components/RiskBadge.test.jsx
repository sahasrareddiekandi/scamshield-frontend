import { describe, it, expect } from 'vitest';
import React from 'react';
import RiskBadge from './RiskBadge';

describe('RiskBadge Component', () => {
  it('renders High Risk indicator', () => {
    const badge = RiskBadge({ level: 'HIGH' });
    expect(badge).toBeDefined();
    expect(badge.props.className).toContain('text-red-400');
  });

  it('renders Medium Risk indicator', () => {
    const badge = RiskBadge({ level: 'MEDIUM' });
    expect(badge).toBeDefined();
    expect(badge.props.className).toContain('text-amber-400');
  });

  it('renders Low Risk indicator by default', () => {
    const badge = RiskBadge({ level: 'LOW' });
    expect(badge).toBeDefined();
    expect(badge.props.className).toContain('text-emerald-400');
  });
});
