import React, { useState } from 'react';
import { PageType } from '../../types';
import { soundEngine } from '../../utils/audio';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());

  const handleNav = (page: PageType) => {
    soundEngine.playChime(540, 0.08);
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSoundToggle = () => {
    const active = soundEngine.toggleMute();
    setIsMuted(!active);
  };

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Book Cab' },
    { id: 'services', label: 'Services' },
    { id: 'fleet', label: 'Our Fleet' },
    { id: 'tariffs', label: 'Tariffs & Rates' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Quick Bar - City 24x7 Support */}
      <div className="bg-[#0f172a] text-slate-300 text-xs py-2 border-b border-slate-800">
        <div className="container flex flex-wrap items-center justify-between gap-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f8fafc', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
              24/7 City Cabs & Outstation
            </span>
            <span className="hidden sm:inline" style={{ color: '#64748b' }}>|</span>
            <span style={{ color: '#cbd5e1' }}>
              Peelamedu Airport CJB & Gandhipuram
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Enable Sound Effects' : 'Mute Sounds'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: isMuted ? '#94a3b8' : '#f59e0b',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.06)'
              }}
            >
              <span>{isMuted ? '🔇 Audio Off' : '🔊 Audio On'}</span>
            </button>

            <a
              href="tel:04222987654"
              style={{ color: '#fee2e2', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              📞 0422-2987654
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi%20BT%20Cab,%20I%20want%20to%20book%20a%20taxi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.72rem'
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <div
          className="container"
          style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <div
            onClick={() => handleNav('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                border: '2px solid #dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626',
                fontWeight: 900,
                fontSize: '1.25rem',
                letterSpacing: '-0.03em',
                boxShadow: '0 4px 12px rgba(220,38,38,0.2)'
              }}
            >
              BT
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: '#0f172a'
                  }}
                >
                  BT <span style={{ color: '#dc2626' }}>CAB</span>
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}
                >
                  METRO
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
                Single & Round Trip Taxi Services
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              gap: '6px',
              alignItems: 'center'
            }}
            className="md-desktop-nav"
          >
            <style>{`
              @media (min-width: 900px) {
                .md-desktop-nav { display: flex !important; }
                .mobile-toggle-btn { display: none !important; }
              }
            `}</style>
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#dc2626' : '#334155',
                    backgroundColor: isActive ? '#fee2e2' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                soundEngine.playChime(640, 0.1);
                onBookClick();
              }}
              className="btn-primary"
              style={{
                padding: '9px 18px',
                fontSize: '0.9rem'
              }}
            >
              <span>🚕 Book Ride</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-toggle-btn"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid var(--border-strong)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                backgroundColor: '#ffffff'
              }}
              aria-label="Open Mobile Menu"
            >
              <span style={{ width: '20px', height: '2px', backgroundColor: '#0f172a' }}></span>
              <span style={{ width: '20px', height: '2px', backgroundColor: '#0f172a' }}></span>
              <span style={{ width: '14px', height: '2px', backgroundColor: '#dc2626', alignSelf: 'flex-start', marginLeft: '10px' }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-drawer-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-drawer-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#0f172a',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900
                  }}
                >
                  BT
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>BT CAB</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>City Taxi</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: currentPage === item.id ? 800 : 600,
                    color: currentPage === item.id ? '#dc2626' : '#1e293b',
                    backgroundColor: currentPage === item.id ? '#fee2e2' : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  {currentPage === item.id && <span>•</span>}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: '12px', fontSize: '0.8rem', color: '#64748b' }}>
                24/7 Booking Helpline:
              </div>
              <a
                href="tel:04222987654"
                className="btn-primary"
                style={{ width: '100%', marginBottom: '8px', textAlign: 'center' }}
              >
                📞 Call 0422-2987654
              </a>
              <a
                href="https://wa.me/919876543210?text=Hello%20BT%20Cab,%20I%20want%20to%20book%20a%20ride"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#22c55e',
                  color: '#ffffff',
                  fontWeight: 700,
                  borderRadius: '12px',
                  fontSize: '0.9rem'
                }}
              >
                💬 WhatsApp Booking
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};
