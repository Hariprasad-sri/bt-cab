import React from 'react';
import { PageType } from '../../types';
import { soundEngine } from '../../utils/audio';

interface MobileBottomBarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onBookClick: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPage,
  onNavigate,
  onBookClick
}) => {
  const handleNav = (page: PageType) => {
    soundEngine.playChime(560, 0.08);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mobile-bottom-nav">
      {/* Home */}
      <button
        onClick={() => handleNav('home')}
        className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`}
        aria-label="Home"
      >
        <span style={{ fontSize: '1.25rem' }}>🏠</span>
        <span>Home</span>
      </button>

      {/* Fleet */}
      <button
        onClick={() => handleNav('fleet')}
        className={`mobile-nav-item ${currentPage === 'fleet' ? 'active' : ''}`}
        aria-label="Our Fleet"
      >
        <span style={{ fontSize: '1.25rem' }}>🚙</span>
        <span>Fleet</span>
      </button>

      {/* Book Now Center Highlight */}
      <button
        onClick={() => {
          soundEngine.playChime(660, 0.12);
          onBookClick();
        }}
        className={`mobile-nav-item book-action ${currentPage === 'booking' ? 'active' : ''}`}
        aria-label="Book Cab"
      >
        <span style={{ fontSize: '1.3rem' }}>🚕</span>
        <span style={{ fontWeight: 800 }}>Book Cab</span>
      </button>

      {/* Tariffs */}
      <button
        onClick={() => handleNav('tariffs')}
        className={`mobile-nav-item ${currentPage === 'tariffs' ? 'active' : ''}`}
        aria-label="Tariffs"
      >
        <span style={{ fontSize: '1.25rem' }}>💰</span>
        <span>Tariffs</span>
      </button>

      {/* Quick Call */}
      <a
        href="tel:04222987654"
        className="mobile-nav-item"
        style={{ color: '#0f172a' }}
        aria-label="Call Cab Chauffeur"
      >
        <span style={{ fontSize: '1.25rem' }}>📞</span>
        <span>Call</span>
      </a>
    </div>
  );
};
