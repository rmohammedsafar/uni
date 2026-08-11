import React, { useState } from 'react';

export default function Navbar({ isLightTheme, toggleTheme, onOpenAdminLogin, isAdminLoggedIn, onOpenAdminPortal, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="app-header">
        <a href="#" className="brand-container">
          <img 
            src="assets/logo.svg" 
            alt="University of East Florida Emblem" 
            className="brand-logo-img" 
            onError={(e) => { e.target.src = 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%236b111c\' stroke=\'%23d4af37\' stroke-width=\'5\'/><text x=\'50\' y=\'58\' font-size=\'35\' text-anchor=\'middle\' fill=\'%23d4af37\'>🏛️</text></svg>'; }} 
          />
          <div className="brand-title-group">
            <h1 className="brand-font">UNIVERSITY OF EAST FLORIDA</h1>
            <p>100% Online Global Campus • Orlando, USA</p>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href="#programs" className="nav-link">Programs</a></li>
          <li><a href="#campusTour" className="nav-link">Campus Tour</a></li>
          <li><a href="#researchPapersSection" className="nav-link">Research</a></li>
          <li><a href="#globalNewsSection" className="nav-link">News</a></li>
          <li><a href="#applySection" className="nav-link">Enroll Now</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            title="Toggle Light / Dark Mode"
            style={{ padding: '5px 10px', fontSize: '11.5px' }}
          >
            {isLightTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          <a 
            href="#applySection" 
            className="btn btn-gold" 
            style={{ padding: '5px 12px', fontSize: '11.5px', gap: '4px', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg> Apply
          </a>

          {isAdminLoggedIn ? (
            <button 
              className="btn btn-outline" 
              onClick={onOpenAdminPortal} 
              style={{ padding: '5px 12px', fontSize: '11.5px', gap: '4px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg> Admin Portal
            </button>
          ) : (
            <button 
              className="btn btn-outline" 
              onClick={onOpenAdminLogin} 
              style={{ padding: '5px 12px', fontSize: '11.5px', gap: '4px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg> Sign In
            </button>
          )}

          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT NAVIGATION DRAWER */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="assets/logo.svg" alt="UEF Crest" style={{ width: '32px', height: '32px' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--gold-light)', fontWeight: 'bold', letterSpacing: '0.5px' }}>UEF CAMPUS</span>
          </div>
          <button className="modal-close" onClick={toggleMobileMenu}>✕</button>
        </div>
        <ul className="mobile-nav-links">
          <li><a href="#programs" onClick={toggleMobileMenu}>📚 Degree Programs</a></li>
          <li><a href="#campusTour" onClick={toggleMobileMenu}>🏛️ Virtual Campus Tour</a></li>
          <li><a href="#researchPapersSection" onClick={toggleMobileMenu}>🔬 Research & Papers</a></li>
          <li><a href="#globalNewsSection" onClick={toggleMobileMenu}>🌍 University Bulletin</a></li>
          <li><a href="#applySection" onClick={toggleMobileMenu} style={{ color: 'var(--gold-light)', fontWeight: 700 }}>✍️ Apply & Upload Marksheets</a></li>
          <li><a href="#usaHeadquarters" onClick={toggleMobileMenu}>📍 USA Headquarters</a></li>
          <li style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '10px', marginTop: '6px' }}>
            <a href="javascript:void(0)" onClick={() => { toggleMobileMenu(); onOpenAdminLogin(); }} style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Sign In / Admin Portal
            </a>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-gold)', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          Orlando, Florida, USA<br />
          Toll-Free: +1 (800) 555-UEF1
        </div>
      </div>
    </>
  );
}
