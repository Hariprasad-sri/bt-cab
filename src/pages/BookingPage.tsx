import React from 'react';
import { BookingConfirmation } from '../../types';
import { BookingEngine } from '../booking/BookingEngine';

interface BookingPageProps {
  onBookingConfirmed: (confirmation: BookingConfirmation) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onBookingConfirmed }) => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '85vh', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header Breadcrumb & Title */}
        <div style={{ maxWidth: '1000px', margin: '0 auto 32px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#64748b', marginBottom: '8px' }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>Online Cab Booking Engine</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Book <span style={{ color: '#dc2626' }}>Single Trip</span> & <span style={{ color: '#f59e0b' }}>Round Trip</span> Taxi
          </h1>

          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '720px', lineHeight: '1.5' }}>
            Select your travel route, vehicle preference, and schedule. Pay only for one-way drops or enjoy transparent per-km billing for round-trip family getaways.
          </p>

          {/* Value Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
            <span className="badge-red">✓ 100% AC Cabs</span>
            <span className="badge-slate">✓ Zero Advance Payment</span>
            <span className="badge-gold">✓ Free Cancellation</span>
            <span className="badge-slate">✓ Instant Digital Voucher</span>
          </div>
        </div>

        {/* Core Booking Engine Component */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', boxShadow: 'var(--shadow-lg)', borderRadius: '24px' }}>
          <BookingEngine
            onBookingConfirmed={onBookingConfirmed}
          />
        </div>

        {/* How It Works 3-Step Guide */}
        <div style={{ maxWidth: '1000px', margin: '60px auto 0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '28px' }}>
            How Your BT CAB Booking Works
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', fontSize: '1.2rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>Select Route & Cab</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                Choose Single Trip, Round Trip or Airport drop. Pick from Sedan, Innova or 12-Seater with live fare estimation.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', fontSize: '1.2rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>Get Instant Voucher</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                Instant booking reference code generated online, followed by instant WhatsApp & SMS driver notification.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', fontSize: '1.2rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>Travel & Pay on Arrival</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                Chauffeur arrives at your doorstep 15 minutes before time. Enjoy the smooth ride and pay via Cash or UPI on arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
