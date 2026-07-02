import React from 'react';
import { Crown, Sparkles, Check } from 'lucide-react';

export default function PremiumPromo() {
  return (
    <div className="premium-container">
      <Crown size={48} style={{ color: 'var(--accent-gold)', marginBottom: '20px' }} />
      
      <h2 className="premium-title" style={{ fontSize: '28px', marginBottom: '25px' }}>
        Looking for the Premium Stroke Package?
      </h2>

      <div 
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '8px', 
          padding: '30px', 
          textAlign: 'left', 
          maxWidth: '650px',
          margin: '0 auto 30px auto',
          lineHeight: '1.6'
        }}
      >
        <h3 style={{ color: 'var(--accent-gold)', fontSize: '18px', fontWeight: '800', marginBottom: '15px' }}>
          Premium Action Coming Soon
        </h3>
        
        <p style={{ color: 'var(--text-primary)', fontSize: '14px', marginBottom: '15px', fontWeight: '600' }}>
          We're still polishing the bat before the big performance.
        </p>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Our groundsmen are preparing exclusive bowling spells, cover drives, yorkers, and unforgettable cricket moments.
        </p>
      </div>

      <p className="premium-guarantee" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Stay tuned. The ultimate batting masterclasses and pace analysis will load directly onto your screen soon.
      </p>
    </div>
  );
}
