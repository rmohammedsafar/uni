import React from 'react';

export default function Hero({ onExplorePrograms, onApplyNow }) {
  return (
    <section className="hero-section">
      <div className="hero-badge">
        <span>🏛️ VERITAS • SAPIENTIA • VIRTUS</span>
      </div>

      <h1 className="hero-title">
        WORLD-CLASS ACCREDITED DEGREES
      </h1>

      <p className="hero-desc">
        Join over 15,000 international students pursuing top-tier digital degrees from the USA. Designed specifically for theoretical, analytical, and digital mastery with zero physical laboratory requirements.
      </p>

      <div className="hero-cta-group">
        <a href="#programs" className="btn btn-gold" onClick={onExplorePrograms} style={{ padding: '14px 28px', fontSize: '15px' }}>
          📑 Explore 100% Online Programs
        </a>
        <a href="#applySection" className="btn btn-maroon" onClick={onApplyNow} style={{ padding: '14px 28px', fontSize: '15px' }}>
          🎓 Upload Marksheets & Apply Now
        </a>
      </div>

      <div className="hero-stats-row">
        <div className="stat-card">
          <div className="stat-num">100%</div>
          <div className="stat-label">Online Distance Study</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">120+</div>
          <div className="stat-label">Global Faculties</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">15,000+</div>
          <div className="stat-label">Active Scholars</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">ORLANDO</div>
          <div className="stat-label">Florida, USA Headquarters</div>
        </div>
      </div>
    </section>
  );
}
