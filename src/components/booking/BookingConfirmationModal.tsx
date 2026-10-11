import React from 'react';
import { BookingConfirmation } from '../../types';

interface BookingConfirmationModalProps {
  confirmation: BookingConfirmation | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  confirmation,
  onClose
}) => {
  if (!confirmation) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello BT CAB City! I have booked a ride.\n` +
    `Booking ID: ${confirmation.bookingId}\n` +
    `Trip Type: ${confirmation.tripType === 'single' ? 'Single Trip (One-Way)' : confirmation.tripType === 'round' ? 'Round Trip' : confirmation.tripType}\n` +
    `Route: ${confirmation.pickupCity} -> ${confirmation.dropCity}\n` +
    `Pickup: ${confirmation.pickupDate} at ${confirmation.pickupTime}\n` +
    (confirmation.returnDate ? `Return: ${confirmation.returnDate} at ${confirmation.returnTime}\n` : '') +
    `Vehicle: ${confirmation.vehicle.name} (${confirmation.vehicle.model})\n` +
    `Est. Fare: ₹${confirmation.totalEstimate.toLocaleString('en-IN')}\n` +
    `Passenger: ${confirmation.customerName} (${confirmation.customerPhone})`
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div
        className="card-clean animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-modal)',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Ribbon */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '24px 24px 20px',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#dc2626', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>
                ✓ Booking Confirmed
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                BT CAB PASSENGER VOUCHER
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Booking Reference: <strong style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>{confirmation.bookingId}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Ticket Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Trip Summary Card */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                  Trip Classification
                </span>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#dc2626' }}>
                  {confirmation.tripType === 'single'
                    ? '⚡ SINGLE TRIP (One-Way Drop Taxi)'
                    : confirmation.tripType === 'round'
                    ? '🔄 ROUND TRIP (Outstation Package)'
                    : confirmation.tripType === 'airport'
                    ? '✈️ AIRPORT TRANSFER (CJB)'
                    : '⏱️ LOCAL HOURLY RENTAL'}
                </div>
              </div>
              <span className="badge-slate">
                {confirmation.passengers} Pax
              </span>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '1.1rem' }}>🟢</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>PICKUP POINT</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{confirmation.pickupCity}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>{confirmation.pickupAddress}</div>
                  <div style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 700, marginTop: '2px' }}>
                    📅 {confirmation.pickupDate} at {confirmation.pickupTime}
                  </div>
                </div>
              </div>

              <div style={{ paddingLeft: '9px', borderLeft: '2px dotted #cbd5e1', marginLeft: '9px', height: '14px' }}></div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '1.1rem' }}>🔴</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>DROP DESTINATION</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{confirmation.dropCity}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>{confirmation.dropAddress}</div>
                  {confirmation.returnDate && (
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                      🔄 Return Schedule: {confirmation.returnDate} at {confirmation.returnTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle & Passenger Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>ALLOCATED CAB</span>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                {confirmation.vehicle.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                {confirmation.vehicle.model}
              </div>
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>PRIMARY PASSENGER</span>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                {confirmation.customerName}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                {confirmation.customerPhone}
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div
            style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              padding: '16px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700, textTransform: 'uppercase' }}>
                Estimated Total Fare
              </span>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#b91c1c', fontFamily: 'var(--font-mono)' }}>
                ₹{confirmation.totalEstimate.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#7f1d1d' }}>
                Includes: AC Cab, Fuel & Driver Allowance
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#991b1b' }}>
              <div>Mode: <strong>Pay to Driver (Cash/UPI)</strong></div>
              <div>Tolls: <strong>Actuals at Fast-tag</strong></div>
            </div>
          </div>

          {/* Driver Dispatch Note */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '12px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', marginBottom: '20px', fontSize: '0.8rem', color: '#065f46' }}>
            <span style={{ fontSize: '1.2rem' }}>📱</span>
            <div>
              <strong>Dispatch Update:</strong> Your chauffeur's name, vehicle registration number & GPS live tracking link will be delivered 60 minutes before departure.
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px',
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontWeight: 700,
                borderRadius: '12px',
                fontSize: '0.9rem'
              }}
            >
              <span>💬 Confirm on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              style={{
                padding: '12px 18px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                borderRadius: '12px',
                fontSize: '0.88rem'
              }}
            >
              🖨️ Print Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
