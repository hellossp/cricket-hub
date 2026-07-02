import React, { useState } from 'react';
import { BarChart3, ShieldAlert, Award, Compass, Search } from 'lucide-react';
import { cricketStats } from '../data/cricketVideos';

export default function StatsDashboard() {
  const [activeSubTab, setActiveSubTab] = useState('batting');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatsList = () => {
    switch (activeSubTab) {
      case 'bowling':
        return cricketStats.bowling;
      case 'weirdFacts':
        return cricketStats.weirdFacts;
      case 'batting':
      default:
        return cricketStats.batting;
    }
  };

  const filteredStats = getStatsList().filter(stat => {
    const term = searchTerm.toLowerCase();
    const nameMatch = stat.name ? stat.name.toLowerCase().includes(term) : false;
    const metricMatch = stat.metric ? stat.metric.toLowerCase().includes(term) : false;
    const detailMatch = stat.detail ? stat.detail.toLowerCase().includes(term) : false;
    return nameMatch || metricMatch || detailMatch;
  });

  return (
    <div className="stats-dashboard">
      <h2 className="section-title">
        <BarChart3 size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
        Random &amp; Interesting Stats Dashboard
      </h2>
      <p className="stats-header-desc">
        Welcome to the CricketHub Analytics room. Dive deep into physics-defying batting statistics, breakneck speed gun deliveries, and other weird facts analyzed in extreme high-fidelity detail.
        <br /><br />
        You'd only understand these if you have good ball knowledge.
      </p>

      {/* Tabs and Inner Search row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
        <div className="stats-tabs" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
          <button
            className={`stats-tab-btn ${activeSubTab === 'batting' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('batting'); setSearchTerm(''); }}
          >
            Batting Precision
          </button>
          <button
            className={`stats-tab-btn ${activeSubTab === 'bowling' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('bowling'); setSearchTerm(''); }}
          >
            Bowling Seam &amp; Speed
          </button>
          <button
            className={`stats-tab-btn ${activeSubTab === 'weirdFacts' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('weirdFacts'); setSearchTerm(''); }}
          >
            Weird Trivia
          </button>
        </div>

        {/* Mini search filter for stats */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 10px' }}>
          <Search size={14} style={{ color: 'var(--text-muted)', marginRight: '6px' }} />
          <input
            type="text"
            placeholder="Search stats database..."
            style={{ background: 'none', border: 'none', outline: 'none', fontSize: '12px', width: '180px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Display Grid */}
      <div className="stats-grid">
        {filteredStats.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No stats found matching your query. Try searching for "Kohli", "Broad" or "Speed".
          </div>
        ) : (
          filteredStats.map((stat, i) => (
            <div key={i} className="stat-card">

              {/* Metric Title */}
              <div className="stat-metric">{stat.metric}</div>

              {/* Subject name if any */}
              {stat.name && (
                <div className="stat-title">
                  <Award size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-orange)' }} />
                  {stat.name}
                </div>
              )}

              {/* Numerical value */}
              <div className="stat-value">{stat.value}</div>

              {/* Descriptive details */}
              <div className="stat-detail">{stat.detail}</div>
            </div>
          ))
        )}
      </div>

      {/* Graphic mock box */}
      <div
        style={{
          marginTop: '30px',
          background: 'var(--bg-primary)',
          border: '1px dashed var(--accent-orange)',
          borderRadius: '6px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}
      >
        <ShieldAlert size={28} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
            Scientific Accuracy &amp; Laser Speed Guns
          </h4>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            All statistics here are extracted using high-resolution camera angles and audio decibel readings from the middle of the pitch. (Disclaimer: Estimations are highly humorous and modeled on actual cricketer reputations).
          </p>
        </div>
      </div>
    </div>
  );
}
