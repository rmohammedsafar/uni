import React, { useState, useEffect } from 'react';

export default function TopBanner() {
  const [clocks, setClocks] = useState({
    est: '',
    gmt: '',
    jst: '',
    ist: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setClocks({
        est: now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        gmt: now.toLocaleTimeString("en-US", { timeZone: "Europe/London", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        jst: now.toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ist: now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="usa-top-banner">
        <div className="banner-left">
          <span className="usa-flag-badge">📍 Global Headquarters</span>
          <span>DEAC & SACSCOC Candidate Member</span>
          <span>•</span>
          <span>100% Online Remote Study (No Physical Labs Required)</span>
        </div>
        <div className="banner-right">
          <span>USA (Orlando/EST): <strong>{clocks.est || '01:00:00 AM'}</strong></span>
          <span>UK (GMT): <strong>{clocks.gmt || '06:00:00 AM'}</strong></span>
          <span>📞 Toll-Free: +1 (800) 555-UEF1</span>
        </div>
      </div>

      <div className="time-marquee-ticker">
        <div className="time-marquee-track">
          <div className="time-marquee-item">
            <span className="time-widget-badge">📍 Orlando (EST)</span>
            <span className="time-widget">{clocks.est || '01:00:00 AM'}</span>
          </div>
          <div className="time-marquee-item">
            <span className="time-widget-badge">🌐 London (GMT)</span>
            <span className="time-widget">{clocks.gmt || '06:00:00 AM'}</span>
          </div>
          <div className="time-marquee-item">
            <span className="time-widget-badge">🌐 Tokyo (JST)</span>
            <span className="time-widget">{clocks.jst || '03:00:00 PM'}</span>
          </div>
          <div className="time-marquee-item">
            <span className="time-widget-badge">🌐 New Delhi (IST)</span>
            <span className="time-widget">{clocks.ist || '11:30:00 AM'}</span>
          </div>
          <div className="time-marquee-item">
            <span className="time-widget-badge">⚡ LIVE WORLD CLOCKS</span>
          </div>
        </div>
      </div>
    </>
  );
}
