import React from 'react';

export default function CampusTour() {
  return (
    <section className="section-wrapper" id="campusTour">
      <div className="section-header">
        <span className="section-tag">100% Digital Environment</span>
        <h2 className="section-title">VIRTUAL CAMPUS TOUR</h2>
        <p className="section-desc">
          Experience our state-of-the-art virtual university infrastructure. Explore the Digital Research Library, Virtual Lecture Halls, Student Portal, and USA Administration Offices in interactive 3D perspective.
        </p>
      </div>

      <div className="tour-interactive-container">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
          <button className="btn btn-gold" style={{ padding: '8px 16px', fontSize: '13px' }}>🏛️ Digital Research Library</button>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>💻 LMS Virtual Auditorium</button>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>📊 Student Advisory Portal</button>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>📍 USA Headquarters Offices</button>
        </div>

        <div className="tour-room-display">
          <div className="tour-grid-2">
            <div className="tour-info-col">
              <h3 style={{ fontSize: '24px', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                📚 Digital Research Library & E-Archives
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                Access over 500,000 academic e-books, peer-reviewed journals, doctoral dissertations, and digitized historical research databases 24 hours a day, 7 days a week.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '12px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Licensed E-Books</span>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>500,000+</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Research Databases</span>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>120+</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Access Protocol</span>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>24/7 Unlimited SSO</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Librarian Support</span>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>Live Chat Active</div>
                </div>
              </div>

              <a href="#researchPapersSection" className="btn btn-gold" style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '13px' }}>
                🔬 Explore Academic Research Papers
              </a>
            </div>

            <div className="tour-image-col">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80" 
                alt="Digital Research Library Auditorium" 
                style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px', border: '1px solid var(--border-gold)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
