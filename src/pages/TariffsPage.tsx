import React, { useState } from 'react';
import { PageType } from '../../types';
import { POPULAR_ROUTES } from '../../data/routesData';
import { FLEET_DATA } from '../../data/fleetData';

interface TariffsPageProps {
  onNavigate: (page: PageType) => void;
}

export const TariffsPage: React.FC<TariffsPageProps> = ({ onNavigate }) => {
  const [tariffMode, setTariffMode] = useState<'single' | 'round'>('single');

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#64748b', marginBottom: '8px' }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>Tariffs & Rate Matrix</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            100% Transparent Taxi Tariffs in City
          </h1>

          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: '1.6' }}>
            No surprise surcharges, no hidden night fees. Review per-kilometer rates for Single Trip drops and Round Trip outstation tours below.
          </p>

          {/* Mode Switcher */}
          <div className="trip-switch-pill" style={{ marginTop: '24px', backgroundColor: '#e2e8f0' }}>
            <button
              onClick={() => setTariffMode('single')}
              className={`trip-switch-btn ${tariffMode === 'single' ? 'active' : ''}`}
            >
              ⚡ Single Trip (One-Way Drop Taxi)
            </button>
            <button
              onClick={() => setTariffMode('round')}
              className={`trip-switch-btn ${tariffMode === 'round' ? 'active' : ''}`}
            >
              🔄 Round Trip Outstation
            </button>
          </div>
        </div>

        {/* 1. Vehicle Per-Km Rate Card */}
        <div className="card-clean" style={{ overflow: 'hidden', marginBottom: '48px', backgroundColor: '#ffffff' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '18px 24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {tariffMode === 'single' ? '⚡ One-Way Drop Per-KM Tariff Matrix' : '🔄 Round Trip Outstation Per-KM Tariff Matrix'}
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Applicable across Tamil Nadu, Karnataka & Kerala
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 800 }}>Vehicle Model</th>
                  <th style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 800 }}>Capacity</th>
                  <th style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 800 }}>Per Km Rate</th>
                  <th style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 800 }}>Driver Bata</th>
                  <th style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 800 }}>Daily Min. Distance</th>
                  <th style={{ padding: '14px 20px', color: '#0f172a', fontWeight: 800 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {FLEET_DATA.map((v) => {
                  const rate = tariffMode === 'single' ? v.ratePerKmOneWay : v.ratePerKmRound;
                  return (
                    <tr key={v.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{v.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{v.model}</div>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#475569' }}>
                        👤 {v.seats} Pax + 🧳 {v.luggage} Bags
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                          ₹{rate}/km
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#0f172a', fontWeight: 700 }}>
                        ₹{v.driverBata} / day
                      </td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>
                        {v.minKmPerDay} km / day
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => onNavigate('booking')}
                          className="btn-primary btn-sm"
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Popular Routes Fixed Estimates */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
            Estimated Fares on Popular Routes (Sedan vs Innova)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {POPULAR_ROUTES.map((r) => {
              const sedanFare = tariffMode === 'single' ? r.singleFareSedan : r.roundFareSedan;
              const innovaFare = tariffMode === 'single' ? r.singleFareInnova : r.roundFareInnova;

              return (
                <div key={r.id} className="card-clean" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{r.title}</h3>
                    <span className="badge-slate">{r.distanceKm} Kms</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>SEDAN (4-SEATER)</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                        ₹{sedanFare.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>INNOVA (7-SEATER)</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                        ₹{innovaFare.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('booking')}
                    className="btn-secondary btn-sm"
                    style={{ width: '100%' }}
                  >
                    Book This Route ➔
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Transparent Tariff Guidelines */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
            Important Tariff Policy & Conditions
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#475569' }}>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
              <span><strong>Tolls & State Permits:</strong> Fast-tag toll gate fees and interstate commercial vehicle tax (for Kerala / Karnataka) are paid actuals by passenger.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
              <span><strong>Driver Night Allowance:</strong> ₹300 applicable only if journey continues past 10:00 PM to 05:00 AM.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
              <span><strong>Cancellation Policy:</strong> Zero (₹0) cancellation charges. You can cancel anytime before chauffeur dispatch.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
              <span><strong>Payment Methods:</strong> Cash, Google Pay, PhonePe, UPI or Bank Transfer to driver at trip completion.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
