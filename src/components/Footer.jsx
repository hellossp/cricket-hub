import React from 'react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Perfect Shots</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Cover Drives</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Straight Drives</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Helicopter Shots</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Pull Shots</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Bowling Styles</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Inswing Delivery</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Outswing Corridor</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Toe-Crushing Yorkers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('videos'); }}>Spin Wizardry</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Analytics &amp; Info</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('stats'); }}>Random Stats</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('stats'); }}>Batting Precision</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('stats'); }}>Speed Gun Leaders</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('premium'); }}>Premium Upgrade</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support &amp; Parody</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('disclaimer'); }} style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>Disclaimer Page</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("parody mock contact"); }}>Content Removal Request</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("cookie preferences mock"); }}>Cookie Preferences</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("terms mock"); }}>Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("ads mock"); }}>Advertise with CricketHub</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <strong>Disclaimer:</strong> This website is a 100% SFW mock application created strictly for parody and UI portfolio styling demonstration.
          No inappropriate content is hosted or linked. The visual layout, color schema, and logo typography are parodies of a popular video site, adapted to showcase
          iconic cricket shots, bowling masterclasses, and light-hearted statistics. All video details represent mock data that links to standard public YouTube highlights.
          <br /><br />
          <em>We respect cricket as much as we respect that plumber, doctor, and the delivery guy.</em>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CricketHub.com - Clean batting, lethal bowling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
