import React from 'react';
import { PageType } from '../../types';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      title: 'Single Trip (One-Way Drop Taxi)',
      tag: 'Save Up to 40%',
      image: '/images/prime-sedan.jpg',
      description: 'The smart way to travel outstation without bearing the cost of an empty return cab. Ideal for commuters traveling to Bangalore, Chennai, Salem, Madurai, Tirupur, or Erode.',
      inclusions: [
        'Pay strictly for one-way distance',
        'Doorstep pickup and destination doorstep drop',
        'Choice of Swift Dzire, Etios, Ertiga or Innova Crysta',
        'Includes fuel, driver allowance, zero return toll billing'
      ]
    },
    {
      title: 'Round Trip Outstation Packages',
      tag: 'Sightseeing & Holidays',
      image: '/images/innova-hill-cab.jpg',
      description: 'Book a dedicated cab and experienced chauffeur for 2, 3, or more days. Perfect for family getaways to Nilgiris, Kerala, or temple circuits across Tamil Nadu.',
      inclusions: [
        'Cab stays with you for the entire holiday duration',
        'Multiple sightseeing stops without extra hourly charges',
        'Transparent 250km/day or 300km/day calculation',
        'Experienced highway drivers with clean safety records'
      ]
    },
    {
      title: 'Airport Express Cabs',
      tag: 'On-Time Guaranteed',
      image: '/images/hero-airport-cab.jpg',
      description: 'Direct transfers to and from Peelamedu Airport Terminal. Real-time flight tracking ensures your chauffeur is waiting even if your flight is delayed.',
      inclusions: [
        '15-minute advance arrival guarantee',
        'Free 45-minute wait time for delayed flights',
        'Chauffeur luggage meet-and-greet assistance',
        'Zero surge pricing during peak morning & late-night hours'
      ]
    },
    {
      title: 'Hill Station Specialists (Ooty & Valparai)',
      tag: '36 Hairpin Certified',
      image: '/images/innova-hill-cab.jpg',
      description: 'Tackle the 36 hairpin bends of the Nilgiris and 40 hairpin curves of Valparai with peace of mind. Our drivers have minimum 7+ years mountain driving experience.',
      inclusions: [
        'High-torque Innova Crysta & Ertiga hill-ready vehicles',
        'Drivers expert in fog, mist and monsoons',
        'Tea estate, Doddabetta, Pykara & Sholayar dam stops',
        'Assistance with hill entry permits and epass'
      ]
    },
    {
      title: 'Spiritual Tours (Isha Yoga Adiyogi & Temples)',
      tag: 'Devotional Special',
      image: '/images/isha-adiyogi.jpg',
      description: 'Special fixed-rate cabs to Isha Yoga Center (112ft Adiyogi & Dhyanalinga) from Airport Terminal or Railway Station, with return waiting included.',
      inclusions: [
        'Direct gate drop and convenient return pickup',
        'Waiting allowance for evening Divya Bhairavi Aarti & Laser show',
        'Covers Marudhamalai, Eachanari Vinayagar & Perur Pateeswarar',
        'Fixed package pricing with zero unexpected extras'
      ]
    },
    {
      title: 'Group Vans & VIP Chauffeur Fleet',
      tag: 'Weddings & Executive',
      image: '/images/tempo-traveller.jpg',
      description: '12-Seater Force Urbania / Tempo Travellers for large family wedding gatherings and Mercedes-Benz VIP sedans for visiting corporate executives.',
      inclusions: [
        'Pushback recliner seats with HD entertainment screens',
        'High roof cabins with individual AC louvers',
        'Uniformed executive chauffeurs',
        'Special corporate invoicing with GST credit'
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#64748b', marginBottom: '8px' }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>Our Taxi Services</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Comprehensive Taxi Services in City
          </h1>

          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: '1.6' }}>
            From single-trip budget drops to luxury family outstation expeditions, BT CAB offers tailored mobility solutions backed by a modern vehicle fleet.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {services.map((s, idx) => (
            <div key={idx} className="card-clean" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '180px', position: 'relative' }}>
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span
                    className="badge-red"
                    style={{ position: 'absolute', top: '14px', left: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                  >
                    {s.tag}
                  </span>
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', marginBottom: '16px' }}>
                    {s.description}
                  </p>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Key Inclusions:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#475569' }}>
                      {s.inclusions.map((inc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#22c55e', fontWeight: 800 }}>✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 24px 24px 24px' }}>
                <button
                  onClick={() => onNavigate('booking')}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Book This Service ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
