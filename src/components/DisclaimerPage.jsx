import React from 'react';
import { HelpCircle, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div
      style={{
        maxWidth: '850px',
        margin: '40px auto',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '40px 30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '25px' }}>
        <AlertTriangle size={32} style={{ color: 'var(--accent-orange)' }} />
        <h2 style={{ fontFamily: 'var(--font-logo)', fontSize: '26px', fontWeight: '800' }}>
          Official Disclaimer &amp; Humorous Parody Notice
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
        
        <div style={{ background: '#1c1204', borderLeft: '4px solid var(--accent-orange)', padding: '15px', borderRadius: '4px', color: 'var(--text-primary)' }}>
          <strong>Attention:</strong> This website is 100% SFW (Safe For Work). It contains only video links, statistics, and discussions about the sport of cricket.
        </div>

        <p>
          This web application, <strong>CricketHub</strong>, is a comedic parody created exclusively for design modeling, portfolio presentation, and web styling demonstration. It mimics the visual architecture, navigation systems, coloring parameters (black background, light-grey text, and orange-wrapped search/logo structures) of a highly recognizable video streaming platform.
        </p>

        <p>
          Please note the following specifications of this mockup:
        </p>

        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li>
            <strong>Mock Data System:</strong> All view counters, subscriber counts, date tags, and comments listed under the items are simulated data sets initialized within the codebase to mimic a busy social hub.
          </li>
          <li>
            <strong>Interactive Comments:</strong> Users can post mock comments, which are appended dynamically into a local memory state. Comments are not uploaded to any remote database.
          </li>
          <li>
            <strong>Standard Streaming Media:</strong> No video files are hosted on CricketHub. The player details modal utilizes standard `iframe` embeds to display public cricket highlights directly from YouTube.
          </li>
          <li>
            <strong>Parody Premium Accounts:</strong> The CricketHub Premium checkout flow is a simulator. No payment credentials or personal information are requested or stored, and all trials are unlocked free of charge.
          </li>
        </ul>

        <div 
          style={{ 
            marginTop: '20px', 
            paddingTop: '20px', 
            borderTop: '1px solid var(--border-color)', 
            textAlign: 'center', 
            fontSize: '16px', 
            color: '#fff', 
            fontWeight: '600',
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Heart size={18} fill="var(--accent-orange)" color="var(--accent-orange)" />
          We respect cricket as much as we respect that plumber, doctor, and the delivery guy.
        </div>
      </div>
    </div>
  );
}
