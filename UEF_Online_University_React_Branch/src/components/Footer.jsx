import React from 'react';

export default function Footer() {
  return (
    <>
      {/* Accreditation Disclaimer Banner */}
      <section className="section-wrapper" id="accreditation" style={{ paddingTop: 0 }}>
        <div style={{ background: 'rgba(107, 17, 28, 0.3)', border: '1px solid var(--border-gold)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', color: 'var(--gold-light)', marginBottom: '10px', fontFamily: 'var(--font-serif)' }}>
            🏅 Global Accreditation & Quality Assurance
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 16px' }}>
            The University of East Florida operates in compliance with Distance Education Accrediting Commission (DEAC) standards and Southern Association of Colleges and Schools Commission on Colleges (SACSCOC) regional quality models. All degrees offered are non-practical, theoretical, and asynchronous digital programs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="usa-flag-badge">✓ DEAC Distance Education Standards</span>
            <span className="usa-flag-badge">✓ Florida Department of Education Candidate</span>
            <span className="usa-flag-badge">✓ 100% Apostille & Legalization Ready</span>
          </div>
        </div>
      </section>

      {/* Global Headquarters & Address Section */}
      <section className="section-wrapper" id="usaHeadquarters">
        <div className="section-header">
          <h2 className="section-title">GLOBAL HEADQUARTERS</h2>
          <p className="section-desc">
            University administrative offices, Registrar operations, digital server infrastructure, and international admissions center.
          </p>
        </div>

        <div className="contact-grid">
          <div className="address-box" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: '16px', padding: '32px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
              📍 USA Headquarters Address
            </h3>
            <p style={{ fontSize: '14px', color: '#fff', lineHeight: '1.6', marginBottom: '20px' }}>
              <strong>University of East Florida</strong><br />
              1200 University Blvd, Suite 500<br />
              Orlando, FL 32816, United States of America
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <div>📞 <strong>Toll-Free USA:</strong> +1 (800) 555-UEF1</div>
              <div>✉️ <strong>Registrar Office:</strong> <a href="mailto:r.mohammedsafar@gmail.com" style={{ color: 'var(--gold-primary)' }}>r.mohammedsafar@gmail.com</a></div>
              <div>🕒 <strong>Office Hours:</strong> Mon - Fri: 8:00 AM - 6:00 PM EST</div>
            </div>
          </div>

          <div className="address-box" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: '16px', padding: '32px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
              🌐 Distance Education Framework
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              All programs are conducted 100% online through our virtual learning environment. No physical laboratory attendance, campus residency, or US visa sponsorship is required or issued.
            </p>
            <div style={{ background: 'rgba(212,175,55,0.1)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-gold)' }}>
              <span style={{ fontSize: '12px', color: 'var(--gold-light)', fontWeight: 'bold' }}>
                🎓 Verification Portal: All degree transcripts and graduation certificates include cryptographically verifiable QR verification codes.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Bar */}
      <footer style={{ background: '#080405', borderTop: '1px solid var(--border-gold)', padding: '40px 24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="assets/logo.svg" alt="UEF Emblem" style={{ width: '36px', height: '36px' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold-light)', fontWeight: 'bold' }}>UNIVERSITY OF EAST FLORIDA</span>
          </div>
          <p style={{ maxWidth: '700px', margin: 0, lineHeight: '1.5' }}>
            © {new Date().getFullYear()} University of East Florida. All Rights Reserved. 100% Online Global Higher Distance Education Institution, Orlando, FL 32816, USA.
          </p>
        </div>
      </footer>
    </>
  );
}
