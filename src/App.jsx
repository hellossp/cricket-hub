import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoCard from './components/VideoCard';
import VideoPlayerModal from './components/VideoPlayerModal';
import StatsDashboard from './components/StatsDashboard';
import PremiumPromo from './components/PremiumPromo';
import DisclaimerPage from './components/DisclaimerPage';
import StarsList from './components/StarsList';
import { cricketVideos, cricketStarsList } from './data/cricketVideos';
import { Play, TrendingUp, Sparkles, Filter, Video, Compass, HelpCircle, Lock, Upload } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Hash-based browser Back/Forward navigation synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hashStr = window.location.hash.substring(1);
      const params = new URLSearchParams(hashStr);
      
      const tab = params.get('tab') || 'home';
      const search = params.get('search') || '';
      const subcat = params.get('subcat') || 'All';
      const videoId = params.get('video') || null;

      setActiveTab(prev => (prev !== tab ? tab : prev));
      setSearchQuery(prev => (prev !== search ? search : prev));
      setSelectedSubCategory(prev => (prev !== subcat ? subcat : prev));
      
      if (videoId) {
        const videoObj = cricketVideos.find(v => v.id === videoId);
        setSelectedVideo(prev => (prev?.id !== videoId ? (videoObj || null) : prev));
      } else {
        setSelectedVideo(prev => (prev !== null ? null : prev));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial run to sync URL parameters on initial mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Sync state variables back to browser URL hash (push history states)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('tab', activeTab);
    if (searchQuery) params.set('search', searchQuery);
    if (selectedSubCategory !== 'All') params.set('subcat', selectedSubCategory);
    if (selectedVideo) params.set('video', selectedVideo.id);

    const newHash = '#' + params.toString();
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }, [activeTab, searchQuery, selectedSubCategory, selectedVideo]);

  // Scroll to top on tab transitions, search queries, or sub-category filters
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, searchQuery, selectedSubCategory]);

  // Available SubCategories mapping
  const subCategoriesList = useMemo(() => {
    const list = new Set();
    cricketVideos.forEach(v => {
      if (v.subCategory) list.add(v.subCategory);
    });
    return ['All', ...Array.from(list)];
  }, []);

  // Filter videos based on Search Query and Sub-Category filter
  const filteredVideos = useMemo(() => {
    return cricketVideos.filter(video => {
      // Search matching
      const matchesSearch = searchQuery
        ? video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          video.uploader.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Category matching
      const matchesCategory = selectedSubCategory === 'All' || video.subCategory === selectedSubCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedSubCategory]);

  // Group videos for Home page displays
  const perfectShots = useMemo(() => cricketVideos.filter(v => v.category === 'Perfect Shots'), []);
  const bowlingStyles = useMemo(() => cricketVideos.filter(v => v.category === 'Bowling Styles'), []);
  const specialMoments = useMemo(() => cricketVideos.filter(v => v.category === 'Special Moments'), []);

  // Calculate related videos when a video is being played
  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];
    // Videos of the same category, excluding active video
    const primaryRelated = cricketVideos.filter(
      v => v.category === selectedVideo.category && v.id !== selectedVideo.id
    );
    // Pad with other videos if we have too few
    if (primaryRelated.length < 4) {
      const remaining = cricketVideos.filter(v => v.id !== selectedVideo.id && !primaryRelated.includes(v));
      return [...primaryRelated, ...remaining].slice(0, 5);
    }
    return primaryRelated.slice(0, 5);
  }, [selectedVideo]);

  // Handle Category click on Categories page
  const handleCategoryCardClick = (subCatName) => {
    setSelectedSubCategory(subCatName);
    setSearchQuery('');
    setActiveTab('videos');
  };

  const handleStarClick = (starQuery) => {
    setSearchQuery(starQuery);
    setSelectedSubCategory('All');
    setActiveTab('videos');
  };

  const renderSidebar = () => (
    <div className="sidebar-column">
      <h4 className="sidebar-title">Explore Your Favourite Stars</h4>
      <ul className="sidebar-list">
        {cricketStarsList.map((star, i) => (
          <li key={i}>
            <span className="sidebar-link" onClick={() => handleStarClick(star.query)}>
              <span>{star.name}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Rank #{star.rank}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header component */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
        onAuthClick={() => setAuthModalOpen(true)}
        onUploadClick={() => setUploadModalOpen(true)}
      />

      {/* Main Container */}
      <main className="container" style={{ flex: '1 0 auto', padding: '20px 20px 40px 20px' }}>
        
        {/* Search Query info banner if search is active */}
        {searchQuery && (
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '12px 20px',
              borderRadius: '4px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Showing results for: <strong style={{ color: 'var(--accent-orange)' }}>"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={{ fontSize: '12px', color: 'var(--accent-orange)', fontWeight: '700' }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* --- TAB CONTENT SWITCHER --- */}

        {/* 1. HOME TAB */}
        {activeTab === 'home' && (
          <div>
            {/* Parody Hero Banner */}
            <div className="hero-banner">
              <div className="hero-content">
                <h2>
                  The World's Largest Library of <span>Textbook Timing</span>
                </h2>
                <p>
                  Explore thousands of high-fidelity, verified SFW highlight clips. Watch gorgeous cover drives, unplayable inswingers, and historic cricketing moments in full-fidelity player mockups.
                </p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => setActiveTab('videos')}>
                    Explore Videos
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('premium')}>
                    Try Premium
                  </button>
                </div>
              </div>
            </div>

            <div className="layout-with-sidebar">
              <div className="main-column">
                {/* Quick Link categories row */}
                <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '20px', scrollbarWidth: 'none' }}>
                  {['Cover Drive', 'Yorker', 'Leg Spin', 'Last Ball Sixes', 'Spectacular Catches'].map(catName => (
                    <button
                      key={catName}
                      onClick={() => handleCategoryCardClick(catName)}
                      style={{
                        backgroundColor: '#1b1b1b',
                        border: '1px solid #333',
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '700',
                        whiteSpace: 'nowrap'
                      }}
                      className="category-btn-pill"
                    >
                      {catName}
                    </button>
                  ))}
                </div>

                {/* Section 1: Perfect Shots */}
                <section className="video-section">
                  <div className="category-filter-bar">
                    <h3 className="section-title">Perfect Shots Compilation</h3>
                    <button
                      onClick={() => { setSelectedSubCategory('All'); setActiveTab('videos'); }}
                      style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: '700' }}
                    >
                      View All Shots
                    </button>
                  </div>
                  <div className="video-grid">
                    {perfectShots.slice(0, 4).map(video => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onVideoClick={setSelectedVideo}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 2: Bowling Styles */}
                <section className="video-section">
                  <div className="category-filter-bar">
                    <h3 className="section-title">Bowling Styles &amp; Seam Masterclass</h3>
                    <button
                      onClick={() => { setSelectedSubCategory('All'); setActiveTab('videos'); }}
                      style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: '700' }}
                    >
                      View All Bowling
                    </button>
                  </div>
                  <div className="video-grid">
                    {bowlingStyles.slice(0, 4).map(video => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onVideoClick={setSelectedVideo}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 3: Special Moments */}
                <section className="video-section">
                  <div className="category-filter-bar">
                    <h3 className="section-title">Special &amp; Iconic Moments</h3>
                    <button
                      onClick={() => { setSelectedSubCategory('All'); setActiveTab('videos'); }}
                      style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: '700' }}
                    >
                      View All Moments
                    </button>
                  </div>
                  <div className="video-grid">
                    {specialMoments.slice(0, 4).map(video => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onVideoClick={setSelectedVideo}
                      />
                    ))}
                  </div>
                </section>

                {/* Stats Preview Card */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px',
                    marginTop: '20px'
                  }}
                >
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-logo)', fontSize: '22px', marginBottom: '8px', color: '#fff' }}>
                      Want Random and Interesting Cricket Stats?
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '650px' }}>
                      Did you know Dhoni's stumping is twice as fast as the blink of an eye? Explore our complete data-driven analytics deck for funny and intriguing cricket facts.
                    </p>
                  </div>
                  <button className="btn-primary" onClick={() => setActiveTab('stats')}>
                    View Stats Dashboard
                  </button>
                </div>
              </div>
              {renderSidebar()}
            </div>
          </div>
        )}

        {/* 2. VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="layout-with-sidebar">
            <div className="main-column">
              {/* Filter pills bar */}
              <div className="category-filter-bar" style={{ flexWrap: 'wrap', gap: '15px' }}>
                <h3 className="section-title">
                  {selectedSubCategory === 'All' ? 'All Videos' : `${selectedSubCategory} Clips`}
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '10px', fontWeight: 'normal' }}>
                    ({filteredVideos.length} clips found)
                  </span>
                </h3>
                <div className="category-tags">
                  {subCategoriesList.map((subCat) => (
                    <button
                      key={subCat}
                      className={`category-tag ${selectedSubCategory === subCat ? 'active' : ''}`}
                      onClick={() => setSelectedSubCategory(subCat)}
                    >
                      {subCat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Grid */}
              {filteredVideos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                  <h3>No video clips match your search query or filters.</h3>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Try exploring other categories or clearing your search term.</p>
                  <button
                    className="btn-primary"
                    style={{ marginTop: '20px' }}
                    onClick={() => { setSearchQuery(''); setSelectedSubCategory('All'); }}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="video-grid">
                  {filteredVideos.map(video => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onVideoClick={setSelectedVideo}
                    />
                  ))}
                </div>
              )}
            </div>
            {renderSidebar()}
          </div>
        )}

        {/* 3. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div>
            <h3 className="section-title" style={{ marginBottom: '20px' }}>Explore Categories</h3>
            <div className="video-grid">
              {[
                { name: 'Cover Drive', count: '1,240 clips', desc: 'Aesthetic front-foot driving compilation.', videoId: '7_8yJ3fJc8w' },
                { name: 'Straight Drive', count: '942 clips', desc: 'Symmetrical textbook timing straight down the pitch.', videoId: 'c-uG4u9t_o4' },
                { name: 'Helicopter Shot', count: '310 clips', desc: 'Wrist-rolling aerial strikes for yorker delivery destruction.', videoId: 'Wc0yXyR7E1s' },
                { name: 'Pull Shot', count: '542 clips', desc: 'Crushing short balls for boundary clear-outs.', videoId: 'E2o7_rX9f1c' },
                { name: 'Inswing', count: '740 clips', desc: 'Devastating inswinging yorkers breaking base wood.', videoId: 'w768rR-b_s8' },
                { name: 'Outswing', count: '621 clips', desc: 'Classical seam movements exploring the corridor of uncertainty.', videoId: 'tU7p0_mFvOw' },
                { name: 'Yorker', count: '891 clips', desc: 'Laser-guided delivery sequences crushing toe bones.', videoId: 's8v_V3P92-k' },
                { name: 'Leg Spin', count: '450 clips', desc: 'Wizard-class drift and spin adjustments.', videoId: '4_4rL8H1s2A' },
                { name: 'Spectacular Catches', count: '1,102 clips', desc: 'Flying boundaries and gravity-defying catches.', videoId: 'c-4s5wY-y5o' },
                { name: 'Last Ball Sixes', count: '640 clips', desc: 'High-tension final-delivery winning sweeps.', videoId: 'E6gN_tL3Hk0' },
                { name: 'Funny Moments', count: '1,421 clips', desc: 'Hilarious miscommunications, collisions, and referee banter.', videoId: 'pD_R8oF3-pM' }
              ].map((categoryItem, i) => {
                const bgThumb = `https://img.youtube.com/vi/${categoryItem.videoId}/hqdefault.jpg`;
                return (
                  <div
                    key={i}
                    onClick={() => handleCategoryCardClick(categoryItem.name)}
                    style={{
                      height: '180px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)'
                    }}
                    className="category-card-hover"
                  >
                    <img
                      src={bgThumb}
                      alt={categoryItem.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.45' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '16px'
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-logo)', fontSize: '18px', fontWeight: '800', color: 'var(--accent-orange)' }}>
                        {categoryItem.name}
                      </h4>
                      <p style={{ fontSize: '11px', color: '#fff', fontWeight: '600', marginTop: '2px' }}>
                        {categoryItem.count}
                      </p>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.3' }}>
                        {categoryItem.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. STATS TAB */}
        {activeTab === 'stats' && <StatsDashboard />}

        {/* 5. PREMIUM TAB */}
        {activeTab === 'premium' && <PremiumPromo />}

        {/* 6. DISCLAIMER TAB */}
        {activeTab === 'disclaimer' && <DisclaimerPage />}

        {/* 7. STARS TAB */}
        {activeTab === 'stars' && <StarsList onStarClick={handleStarClick} />}

      </main>

      {/* Footer component */}
      <Footer setActiveTab={setActiveTab} />

      {/* Video Details Modal Overlay */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          relatedVideos={relatedVideos}
          onVideoClick={setSelectedVideo}
          onTagClick={(tag) => {
            setSearchQuery(tag);
            setSelectedSubCategory('All');
            setActiveTab('videos');
          }}
        />
      )}

      {/* Custom Auth Modal */}
      {authModalOpen && (
        <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '420px', 
              padding: '35px', 
              textAlign: 'center', 
              border: '1px solid var(--accent-orange)',
              boxShadow: '0 0 25px rgba(255, 153, 0, 0.25)',
              alignSelf: 'center',
              borderRadius: '6px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(255, 153, 0, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--accent-orange)',
                  marginBottom: '10px'
                }}
              >
                <Lock size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-logo)', fontSize: '22px', fontWeight: '800', color: '#fff' }}>
                Account Restricted
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '8px 0 15px 0' }}>
                For your constant pleasure, we will not implement any authentication.
              </p>
              <button 
                className="btn-primary" 
                onClick={() => setAuthModalOpen(false)}
                style={{ padding: '10px 24px', width: '100%', borderRadius: '4px', fontWeight: '700' }}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Upload Modal */}
      {uploadModalOpen && (
        <div className="modal-overlay" onClick={() => setUploadModalOpen(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '420px', 
              padding: '35px', 
              textAlign: 'center', 
              border: '1px solid var(--accent-orange)',
              boxShadow: '0 0 25px rgba(255, 153, 0, 0.25)',
              alignSelf: 'center',
              borderRadius: '6px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(255, 153, 0, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--accent-orange)',
                  marginBottom: '10px'
                }}
              >
                <Upload size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-logo)', fontSize: '22px', fontWeight: '800', color: '#fff' }}>
                Upload restricted
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '8px 0 15px 0' }}>
                Upload Feature Coming Soon: Put your amateur cover drive clips to the test!
              </p>
              <button 
                className="btn-primary" 
                onClick={() => setUploadModalOpen(false)}
                style={{ padding: '10px 24px', width: '100%', borderRadius: '4px', fontWeight: '700' }}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
