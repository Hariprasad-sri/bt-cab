import React, { useState } from 'react';
import { PageType, BookingConfirmation, RouteItem } from '../../types';
import { BookingEngine } from '../booking/BookingEngine';
import { POPULAR_ROUTES } from '../../data/routesData';
import { FLEET_DATA } from '../../data/fleetData';
import { TESTIMONIALS_DATA, FAQS_DATA } from '../../data/faqsData';
import { soundEngine } from '../../utils/audio';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onBookingConfirmed: (confirmation: BookingConfirmation) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBookingConfirmed }) => {
  const [routeTripType, setRouteTripType] = useState<'single' | 'round'>('single');
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');

  const handleSelectRouteToBook = (route: RouteItem) => {
    soundEngine.playChime(620, 0.1);
    onNavigate('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. Hero Section with Real Photo & Quick Booking Engine */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          paddingTop: '40px',
          paddingBottom: '60px',
          overflow: 'hidden'
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, rgba(15,23,42,0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 36px auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', padding: '6px 16px', borderRadius: '24px', marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
              <span style={{ color: '#fee2e2', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                OUR #1 RATED TAXI SERVICE • 24/7 ACTIVE DISPATCH
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: '1.15',
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                color: '#ffffff'
              }}
            >
              Reliable <span style={{ color: '#dc2626' }}>Single Trip</span> & <span style={{ color: '#f59e0b' }}>Round Trip</span> Cabs
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#cbd5e1', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
              Transparent per-km outstation drops across Tamil Nadu, Kerala & Karnataka. Zero hidden charges, 15-minute airport pickup, and sanitized AC cars.
            </p>
          </div>

          {/* Interactive Booking Engine Embedded in Hero */}
          <div style={{ maxWidth: '1000px', margin: '0 auto', boxShadow: 'var(--shadow-xl)', borderRadius: '24px' }}>
            <BookingEngine
              onBookingConfirmed={onBookingConfirmed}
            />
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                15,000+
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Safe Trips Completed</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                4.9 ★
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Customer Satisfaction Rating</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                15 Mins
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Airport CJB Pickup Arrival</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                ₹0 Hidden
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>100% Transparent Tariffs</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Showcase */}
      <section style={{ padding: '70px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span className="badge-red" style={{ marginBottom: '10px' }}>Our Services</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '8px' }}>
              Engineered for Every Travel Need
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '8px' }}>
              Whether you need a quick one-way drop to save costs or a leisurely multi-day family holiday cab, BT CAB delivers uncompromised comfort.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Service 1 */}
            <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '140px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src="/images/prime-sedan.jpg" alt="Single Trip Drop Taxi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="badge-red" style={{ marginBottom: '8px' }}>Save 40%</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Single Trip (One-Way Drop Taxi)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                  Travelling to Bangalore, Chennai, Salem, or Madurai? Pay only for the one-way distance. No empty return charges.
                </p>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="btn-secondary btn-sm"
                style={{ marginTop: '16px', width: '100%' }}
              >
                Book One-Way Drop ➔
              </button>
            </div>

            {/* Service 2 */}
            <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '140px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src="/images/innova-hill-cab.jpg" alt="Round Trip Outstation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="badge-gold" style={{ marginBottom: '8px' }}>Flexible Holidays</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Round Trip Outstation
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                  Complete multi-day holiday and sightseeing packages. The dedicated chauffeur stays with you for your entire itinerary.
                </p>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="btn-secondary btn-sm"
                style={{ marginTop: '16px', width: '100%' }}
              >
                Book Round Trip ➔
              </button>
            </div>

            {/* Service 3 */}
            <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '140px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src="/images/hero-airport-cab.jpg" alt="Airport Transfers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="badge-slate" style={{ marginBottom: '8px' }}>Flight Tracking</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Airport Express Cabs
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                  Punctual doorstep pickup and Peelamedu terminal drops with 15-minute advance arrival and luggage assistance.
                </p>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="btn-secondary btn-sm"
                style={{ marginTop: '16px', width: '100%' }}
              >
                Book Airport Cab ➔
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Outstation Routes Catalog (Single Trip vs Round Trip Toggle) */}
      <section style={{ padding: '70px 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '40px' }}>
            <div>
              <span className="badge-red">Transparent Outstation Tariffs</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '8px' }}>
                Popular Routes From City
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
                Toggle below to compare instant tariffs between Single Trip drops and Round Trip packages.
              </p>
            </div>

            {/* Tariff Switcher */}
            <div className="trip-switch-pill" style={{ backgroundColor: '#f1f5f9' }}>
              <button
                onClick={() => {
                  soundEngine.playChime(500, 0.08);
                  setRouteTripType('single');
                }}
                className={`trip-switch-btn ${routeTripType === 'single' ? 'active' : ''}`}
              >
                ⚡ Single Trip (One-Way)
              </button>
              <button
                onClick={() => {
                  soundEngine.playChime(580, 0.08);
                  setRouteTripType('round');
                }}
                className={`trip-switch-btn ${routeTripType === 'round' ? 'active' : ''}`}
              >
                🔄 Round Trip (Return)
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {POPULAR_ROUTES.map((route) => {
              const sedanFare = routeTripType === 'single' ? route.singleFareSedan : route.roundFareSedan;
              const innovaFare = routeTripType === 'single' ? route.singleFareInnova : route.roundFareInnova;

              return (
                <div
                  key={route.id}
                  className="card-clean"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ position: 'relative', height: '160px' }}>
                    <img
                      src={route.imageUrl}
                      alt={route.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '16px'
                      }}
                    >
                      <div>
                        {route.badge && (
                          <span className="badge-red" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
                            {route.badge}
                          </span>
                        )}
                        <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.15rem' }}>
                          {route.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>📍 {route.distanceKm} Kms</span>
                        <span>⏱️ Approx {route.estimatedTime}</span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', marginBottom: '16px' }}>
                        {route.description}
                      </p>
                    </div>

                    <div>
                      {/* Price Matrix */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>SEDAN (4 PAX)</span>
                          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                            ₹{sedanFare.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>INNOVA (7 PAX)</span>
                          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                            ₹{innovaFare.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectRouteToBook(route)}
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}
                      >
                        Book {route.to} Ride ➔
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Fleet Preview Section */}
      <section style={{ padding: '70px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span className="badge-red">Our Modern Fleet</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '8px' }}>
              Handpicked Chauffeur Cabs
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '8px' }}>
              From nimble city sedans to spacious 7-seater Innova Crystas and 12-seater Urbania vans.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {FLEET_DATA.slice(0, 3).map((v) => (
              <div key={v.id} className="card-clean" style={{ overflow: 'hidden' }}>
                <div style={{ height: '170px' }}>
                  <img src={v.imageUrl} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{v.name}</h3>
                    <span className="badge-red" style={{ fontSize: '0.68rem' }}>₹{v.ratePerKmOneWay}/km</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>{v.model}</div>

                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.78rem', color: '#475569', marginBottom: '16px' }}>
                    <span>👤 {v.seats} Seats</span>
                    <span>🧳 {v.luggage} Bags</span>
                    <span>❄️ AC</span>
                  </div>

                  <button
                    onClick={() => onNavigate('booking')}
                    className="btn-secondary btn-sm"
                    style={{ width: '100%' }}
                  >
                    Select This Vehicle ➔
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('fleet')}
              className="btn-dark"
            >
              View Complete Fleet Catalog (Including 12-Seater & Mercedes) ➔
            </button>
          </div>
        </div>
      </section>

      {/* 6. Why Choose BT CAB Pillars */}
      <section style={{ padding: '70px 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span className="badge-red">The Sovereign Standard</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '8px' }}>
              Why Travellers Trust BT CAB
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Verified Chauffeurs
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                Every driver is background-checked, polite, and thoroughly tested on Western Ghats mountain routes.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Zero Hidden Charges
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                What you see is what you pay. Transparent per-km calculation with zero unexpected surcharge or surge pricing.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🛰️</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                GPS Live Tracking & SOS
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                24/7 central control room monitoring every trip with instant SOS safety dispatch for families and solo travelers.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✨</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Clean Sanitized Cabs
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                Every cab undergoes thorough interior vacuuming, fragrance renewal, and AC servicing before your pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real Testimonials */}
      <section style={{ padding: '70px 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span className="badge-red">Customer Experiences</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '8px' }}>
              Loved by City Commuters
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS_DATA.map((t) => (
              <div key={t.id} className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', fontSize: '1.1rem', marginBottom: '12px' }}>
                    {'★'.repeat(t.rating)}
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '18px' }}>
                    "{t.review}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{t.name}</h4>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.route}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section style={{ padding: '70px 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge-red">Got Questions?</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '8px' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQS_DATA.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => {
                      soundEngine.playChime(500, 0.06);
                      setActiveFaqId(isOpen ? null : faq.id);
                    }}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: isOpen ? '#dc2626' : '#0f172a',
                      backgroundColor: isOpen ? '#fff5f5' : '#ffffff'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{ fontSize: '1.2rem', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 20px 18px 20px', fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', backgroundColor: '#fff5f5' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Strip */}
      <section style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color: '#ffffff', padding: '54px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Ready to Travel with BT CAB?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#fee2e2', maxWidth: '600px', margin: '0 auto 28px auto' }}>
            Book your Single Trip or Round Trip in 60 seconds with instant booking confirmation.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={() => onNavigate('booking')}
              className="btn-dark btn-lg"
              style={{ backgroundColor: '#0f172a' }}
            >
              🚕 Book Ride Now
            </button>
            <a
              href="tel:04222987654"
              className="btn-secondary btn-lg"
              style={{ backgroundColor: '#ffffff', color: '#dc2626', borderColor: '#ffffff' }}
            >
              📞 Call 0422-2987654
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
