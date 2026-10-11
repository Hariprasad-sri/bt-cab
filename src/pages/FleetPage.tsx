import React, { useState } from 'react';
import { PageType, VehicleCategory } from '../../types';
import { FLEET_DATA } from '../../data/fleetData';

interface FleetPageProps {
  onNavigate: (page: PageType) => void;
  onSelectVehicleToBook?: (vehicleId: string) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ onNavigate, onSelectVehicleToBook }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredFleet = filterCategory === 'all'
    ? FLEET_DATA
    : FLEET_DATA.filter((v) => v.category === filterCategory);

  const handleBook = (vehicleId: string) => {
    onSelectVehicleToBook?.(vehicleId);
    onNavigate('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#64748b', marginBottom: '8px' }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>Fleet Catalog</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Our Premium Fleet & Vehicle Specifications
          </h1>

          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: '1.6' }}>
            Choose from our fleet of clean, air-conditioned sedans, SUVs, luxury MPVs, and group vans. Every car is regularly inspected and tracked via 24/7 GPS.
          </p>

          {/* Filter Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {[
              { id: 'all', label: 'All Fleet Models' },
              { id: 'sedan', label: 'Sedans (4 Pax)' },
              { id: 'suv', label: 'SUVs (6 Pax)' },
              { id: 'innova', label: 'Innova Crysta (7 Pax)' },
              { id: 'tempo', label: 'Tempo / Urbania (12 Pax)' },
              { id: 'luxury', label: 'VIP Executive' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterCategory(f.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: filterCategory === f.id ? '#dc2626' : '#ffffff',
                  color: filterCategory === f.id ? '#ffffff' : '#475569',
                  border: filterCategory === f.id ? '1px solid #dc2626' : '1px solid #cbd5e1',
                  transition: 'all 0.15s ease'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {filteredFleet.map((v) => (
            <div key={v.id} className="card-clean" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={v.imageUrl} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {v.badge && (
                    <span
                      className="badge-red"
                      style={{ position: 'absolute', top: '14px', left: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      {v.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a' }}>
                      {v.name}
                    </h3>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, marginBottom: '12px' }}>
                    {v.model}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', marginBottom: '16px' }}>
                    {v.tagline}
                  </p>

                  {/* Specs Pill Strip */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>SEATING</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>👤 {v.seats} Pax</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>LUGGAGE</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>🧳 {v.luggage} Bags</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>CLIMATE</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>❄️ AC Cab</div>
                    </div>
                  </div>

                  {/* Pricing Matrix */}
                  <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca', borderRadius: '14px', padding: '14px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #fee2e2', paddingBottom: '6px' }}>
                      <span style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 700 }}>⚡ SINGLE TRIP (ONE-WAY):</span>
                      <strong style={{ fontSize: '1.05rem', color: '#b91c1c', fontFamily: 'var(--font-mono)' }}>₹{v.ratePerKmOneWay} / km</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #fee2e2', paddingBottom: '6px' }}>
                      <span style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 700 }}>🔄 ROUND TRIP OUTSTATION:</span>
                      <strong style={{ fontSize: '1.05rem', color: '#b91c1c', fontFamily: 'var(--font-mono)' }}>₹{v.ratePerKmRound} / km</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#7f1d1d' }}>
                      <span>Driver Bata: <strong>₹{v.driverBata}/day</strong></span>
                      <span>Min Km: <strong>{v.minKmPerDay} km/day</strong></span>
                    </div>
                  </div>

                  {/* Vehicle Features */}
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Vehicle Equipment & Standards:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#475569' }}>
                      {v.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 24px 24px 24px' }}>
                <button
                  onClick={() => handleBook(v.id)}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Book {v.name} Now ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
