import React, { useState } from 'react';
import { Search, Upload, Flame, Award, HelpCircle, User, Globe, Trophy } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, setSearchQuery, onAuthClick, onUploadClick }) {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActiveTab('videos');
  };

  const handleLogoClick = () => {
    setLocalSearch('');
    setSearchQuery('');
    setActiveTab('home');
  };

  return (
    <header className="header-wrapper">
      <div className="container">
        {/* Top Header Row */}
        <div className="header-top">
          {/* Logo */}
          <div onClick={handleLogoClick} style={{ cursor: 'pointer' }} className="logo-container">
            <span className="logo-white">Cricket</span>
            <span className="logo-orange-box">hub</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="search-bar-container">
            <input
              type="text"
              placeholder="Search 142,352 high quality cricket videos..."
              className="search-input"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button type="submit" className="search-button">
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>

          {/* Header Action Items */}
          <div className="header-actions">
            <button className="btn-premium-pill" onClick={() => setActiveTab('premium')}>
              <Trophy size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              Premium
            </button>
            <button className="btn-upload" onClick={onUploadClick}>
              <Upload size={14} />
              <span>Upload</span>
            </button>
            <button className="btn-login" onClick={onAuthClick}>Log In</button>
            <span style={{ color: '#444' }}>|</span>
            <button className="btn-login" onClick={onAuthClick}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Header */}
      <div className="header-nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <button
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => { setActiveTab('home'); setSearchQuery(''); setLocalSearch(''); }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                Videos
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('categories')}
              >
                Categories
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'stars' ? 'active' : ''}`}
                onClick={() => setActiveTab('stars')}
              >
                Stars
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                Stats &amp; Analysis
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'premium' ? 'active' : ''}`}
                onClick={() => setActiveTab('premium')}
              >
                Premium
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
