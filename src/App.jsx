import React, { useState, useEffect } from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgramCatalog from './components/ProgramCatalog';
import CampusTour from './components/CampusTour';
import ResearchPapers from './components/ResearchPapers';
import UniversityBulletin from './components/UniversityBulletin';
import EnrollmentForm from './components/EnrollmentForm';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

import { INITIAL_DEGREE_PROGRAMS } from './data/initialData';
import { loadCMSConfigFromStorage, saveCMSConfigToStorage } from './services/firebase';

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [programs, setPrograms] = useState(() => {
    const saved = loadCMSConfigFromStorage();
    return saved && saved.length > 0 ? saved : INITIAL_DEGREE_PROGRAMS;
  });
  const [selectedProgramToApply, setSelectedProgramToApply] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');

  // Synchronize body class for Light Mode / Dark Mode
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (!adminEmail) {
      alert("Please enter your Registrar Admin email address.");
      return;
    }

    setIsAdminLoggedIn(true);
    setShowAdminLoginModal(false);
    alert(`🎉 Welcome back, Registrar Officer (${adminEmail})! Admin Portal loaded.`);

    setTimeout(() => {
      const adminSec = document.getElementById("adminDashboardSection");
      if (adminSec) adminSec.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    alert("Signed out of Admin Portal.");
  };

  return (
    <div className="app-main-wrapper">
      {/* Top International Live Clocks Ticker */}
      <TopBanner />

      {/* Navigation Header */}
      <Navbar 
        isLightTheme={isLightTheme} 
        toggleTheme={toggleTheme}
        onOpenAdminLogin={() => setShowAdminLoginModal(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminPortal={() => {
          const adminSec = document.getElementById("adminDashboardSection");
          if (adminSec) adminSec.scrollIntoView({ behavior: 'smooth' });
        }}
        onLogout={handleAdminLogout}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          onExplorePrograms={() => {
            const el = document.getElementById("programs");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onApplyNow={() => {
            const el = document.getElementById("applySection");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ProgramCatalog 
          programs={programs} 
          onSelectProgramToApply={(progId) => setSelectedProgramToApply(progId)}
        />

        <CampusTour />

        <ResearchPapers />

        <UniversityBulletin />

        <EnrollmentForm 
          programs={programs} 
          selectedProgramId={selectedProgramToApply}
        />

        {/* Admin Portal (Visible when logged in) */}
        {isAdminLoggedIn && (
          <AdminPortal 
            programs={programs} 
            onUpdatePrograms={(updatedProgs) => {
              setPrograms(updatedProgs);
              saveCMSConfigToStorage(updatedProgs);
            }}
            onLogout={handleAdminLogout}
          />
        )}
      </main>

      {/* Footer & Accreditation */}
      <Footer />

      {/* REGISTRAR ADMIN LOGIN MODAL */}
      {showAdminLoginModal && (
        <div className="modal-backdrop open" style={{ display: 'flex' }}>
          <div className="modal-box" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3 className="modal-title">🔑 Sign In / Admin Portal</h3>
              <button className="modal-close" onClick={() => setShowAdminLoginModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAdminLoginSubmit}>
              <div className="modal-body" style={{ padding: '24px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Sign in with your University Registrar email (<strong style={{ color: 'var(--gold-light)' }}>r.mohammedsafar@gmail.com</strong>) to manage student applications and course catalog pricing.
                </p>
                <div className="form-group">
                  <label className="form-label">Registrar Admin Email *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="r.mohammedsafar@gmail.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required 
                    style={{ padding: '10px 14px' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="••••••••" 
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    required 
                    style={{ padding: '10px 14px' }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAdminLoginModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-gold" style={{ padding: '10px 20px' }}>
                  🔑 Sign In to Admin Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
