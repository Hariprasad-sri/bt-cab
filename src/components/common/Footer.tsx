import React from 'react';
import { PageType } from '../../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onSelectRoute?: (from: string, to: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectRoute }) => {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '64px', paddingBottom: '36px', borderTop: '4px solid #dc2626' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#1e293b',
                  border: '2px solid #dc2626',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem'
                }}
              >
                BT
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                BT <span style={{ color: '#dc2626' }}>CAB</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#94a3b8', marginBottom: '20px' }}>
              Our most dependable premium taxi network. Specializing in One-Way Drop Cabs, Round Trip Outstation holidays, and Peelamedu Airport CJB 24x7 transfers. Zero hidden charges, 100% AC guaranteed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="tel:04222987654"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1.05rem'
                }}
              >
                <span style={{ color: '#dc2626' }}>📞</span> 0422-2987654
              </a>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#f8fafc',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ color: '#22c55e' }}>📱</span> +91 98765 43210 (24x7 Mobile)
              </a>
            </div>
          </div>

          {/* Quick Page Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px', letterSpacing: '0.02em' }}>
              EXPLORE PAGES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => onNavigate('home')} style={{ color: '#94a3b8', hover: { color: '#ffffff' } }}>
                  ➔ Home & Highlights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} style={{ color: '#dc2626', fontWeight: 700 }}>
                  ➔ Book Cab (Single & Round Trip)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} style={{ color: '#94a3b8' }}>
                  ➔ Our Taxi Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} style={{ color: '#94a3b8' }}>
                  ➔ Fleet & Vehicle Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tariffs')} style={{ color: '#94a3b8' }}>
                  ➔ Tariffs & Rate Chart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} style={{ color: '#94a3b8' }}>
                  ➔ About BT CAB
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} style={{ color: '#94a3b8' }}>
                  ➔ Contact & Help Centers
                </button>
              </li>
            </ul>
          </div>

          {/* Top Outstation Routes */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px', letterSpacing: '0.02em' }}>
              TOP OUTSTATION ROUTES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <button
                  onClick={() => onSelectRoute?.('City', 'Ooty / Coonoor')}
                  style={{ color: '#cbd5e1', textAlign: 'left' }}
                >
                  🏔️ City ↔ Ooty & Coonoor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRoute?.('City', 'Isha Yoga Adiyogi')}
                  style={{ color: '#cbd5e1', textAlign: 'left' }}
                >
                  🧘 City ↔ Isha Yoga Adiyogi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRoute?.('City', 'Valparai & Sholayar')}
                  style={{ color: '#cbd5e1', textAlign: 'left' }}
                >
                  🌿 City ↔ Valparai Tea Valleys
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRoute?.('City', 'Bengaluru / Electronic City')}
                  style={{ color: '#cbd5e1', textAlign: 'left' }}
                >
                  ⚡ City ↔ Bangalore Drop Taxi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRoute?.('City', 'Munnar (Kerala Hills)')}
                  style={{ color: '#cbd5e1', textAlign: 'left' }}
                >
                  🏞️ City ↔ Munnar Holiday
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectRoute?.('City / Gandhipuram', 'Airport Express')}
                  style={{ color: '#cbd5e1', textAlign: 'left' }}
                >
                  ✈️ Peelamedu Airport CJB Transfers
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters & Operations */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px', letterSpacing: '0.02em' }}>
              METRO HUBS
            </h4>
            <div style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>🏢 Airport Dispatch Office:</strong>
                Avinashi Road, Opposite CJB Airport Junction, Peelamedu, City - 641014
              </div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>🚏 Central Hub:</strong>
                Cross Cut Road, Gandhipuram Central, City - 641012
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span className="badge-red" style={{ fontSize: '0.7rem' }}>GPS Monitored</span>
                <span className="badge-gold" style={{ fontSize: '0.7rem' }}>Police Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid #1e293b',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#64748b'
          }}
        >
          <div>
            © {new Date().getFullYear()} BT CAB Services City. All rights reserved. Registered under Tamil Nadu State Transport Authority.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Carriage</span>
            <span>•</span>
            <span>Tariff Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
