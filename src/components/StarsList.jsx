import React, { useState } from 'react';
import { User, Heart, Award, Search, Eye } from 'lucide-react';
import { cricketStarsList } from '../data/cricketVideos';

export default function StarsList({ onStarClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStars = cricketStarsList.filter(star => 
    star.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    star.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '10px 0' }}>
      <div className="category-filter-bar">
        <h3 className="section-title">Explore Your Favourite Stars</h3>
        
        {/* Inner Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 12px' }}>
          <Search size={14} style={{ color: 'var(--text-muted)', marginRight: '6px' }} />
          <input
            type="text"
            placeholder="Search stars..."
            style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', width: '200px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
        Meet the elite timing artists and swing specialists. Click on any star to view their textbook drives, devastating bowling spells, and clutch moments.
      </p>

      {/* Grid Layout of Stars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredStars.map((star, i) => (
          <div
            key={i}
            onClick={() => onStarClick(star.query)}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            className="category-card-hover"
          >
            {/* Rank badge */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                fontSize: '10px',
                fontWeight: '700',
                color: 'var(--accent-orange)',
                backgroundColor: 'rgba(255, 153, 0, 0.12)',
                border: '1px solid rgba(255, 153, 0, 0.3)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              Rank #{star.rank}
            </div>

            {/* Avatar Circle */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-orange) 0%, #d87000 100%)',
                color: '#000',
                fontSize: '28px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px auto 16px auto',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              {star.avatar}
            </div>

            {/* Star Name */}
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>
              {star.name}
            </h4>

            {/* Actual Name Tag */}
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {star.query}
            </p>

            {/* Stats Summary row */}
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Eye size={12} style={{ color: 'var(--text-muted)' }} />
                <span>{star.views}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Heart size={12} fill="var(--rating-green)" color="var(--rating-green)" />
                <span style={{ color: 'var(--rating-green)', fontWeight: '700' }}>{star.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
