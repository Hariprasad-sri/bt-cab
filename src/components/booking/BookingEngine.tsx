import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TripType, Vehicle, BookingFormData, BookingConfirmation } from '../../types';
import { FLEET_DATA } from '../../data/fleetData';
import { POPULAR_ROUTES, POPULAR_LOCATIONS } from '../../data/routesData';
import { soundEngine } from '../../utils/audio';

interface BookingEngineProps {
  initialTripType?: TripType;
  initialFrom?: string;
  initialTo?: string;
  initialVehicleId?: string;
  onBookingConfirmed: (confirmation: BookingConfirmation) => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  initialTripType = 'single',
  initialFrom = 'City',
  initialTo = 'Ooty / Coonoor',
  initialVehicleId = 'sedan-prime',
  onBookingConfirmed
}) => {
  const [tripType, setTripType] = useState<TripType>(initialTripType);
  const [pickupCity, setPickupCity] = useState(initialFrom);
  const [dropCity, setDropCity] = useState(initialTo);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');

  // Default to today and tomorrow
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState(tomorrowStr);
  const [returnTime, setReturnTime] = useState('18:00');

  const [hourlyPackage, setHourlyPackage] = useState('8hr-80km');
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicleId);

  // Customer Contact
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync props if changed
  useEffect(() => {
    if (initialTripType) setTripType(initialTripType);
    if (initialFrom) setPickupCity(initialFrom);
    if (initialTo) setDropCity(initialTo);
    if (initialVehicleId) setSelectedVehicleId(initialVehicleId);
  }, [initialTripType, initialFrom, initialTo, initialVehicleId]);

  const selectedVehicle: Vehicle =
    FLEET_DATA.find((v) => v.id === selectedVehicleId) || FLEET_DATA[0];

  // Auto-estimate distance based on route match
  const matchedRoute = POPULAR_ROUTES.find(
    (r) =>
      (dropCity.toLowerCase().includes(r.to.toLowerCase()) || r.to.toLowerCase().includes(dropCity.toLowerCase())) ||
      (pickupCity.toLowerCase().includes(r.from.toLowerCase()) && dropCity.toLowerCase().includes(r.to.toLowerCase()))
  );

  const estimatedOneWayKm = matchedRoute ? matchedRoute.distanceKm : 90;

  // Number of days calculation for Round Trip
  const calcDays = () => {
    if (tripType !== 'round') return 1;
    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1); // Minimum 1 day
  };

  const tripDays = calcDays();

  // Dynamic Fare Calculation
  const calculateFare = (): { baseFare: number; driverBata: number; total: number; kmCount: number } => {
    if (tripType === 'single') {
      const rate = selectedVehicle.ratePerKmOneWay;
      const minDistance = Math.max(estimatedOneWayKm, 50);
      const base = minDistance * rate;
      const bata = selectedVehicle.driverBata;
      return {
        baseFare: base,
        driverBata: bata,
        total: Math.round(base + bata),
        kmCount: minDistance
      };
    } else if (tripType === 'round') {
      const rate = selectedVehicle.ratePerKmRound;
      const minDailyKm = selectedVehicle.minKmPerDay;
      const totalMinKm = minDailyKm * tripDays;
      const actualRoundKm = Math.max(estimatedOneWayKm * 2, totalMinKm);
      const base = actualRoundKm * rate;
      const bata = selectedVehicle.driverBata * tripDays;
      return {
        baseFare: base,
        driverBata: bata,
        total: Math.round(base + bata),
        kmCount: actualRoundKm
      };
    } else if (tripType === 'airport') {
      const isSedan = selectedVehicle.category === 'sedan';
      const base = isSedan ? 750 : 1250;
      return {
        baseFare: base,
        driverBata: 0,
        total: base,
        kmCount: 25
      };
    } else {
      // Hourly
      let base = 1600;
      let km = 40;
      if (hourlyPackage === '8hr-80km') {
        base = 2800;
        km = 80;
      } else if (hourlyPackage === '12hr-120km') {
        base = 3800;
        km = 120;
      }
      if (selectedVehicle.category === 'innova') base += 1000;
      if (selectedVehicle.category === 'tempo') base += 2200;
      return {
        baseFare: base,
        driverBata: 300,
        total: base + 300,
        kmCount: km
      };
    }
  };

  const fareDetails = calculateFare();

  const handleSwapLocations = () => {
    soundEngine.playChime(600, 0.08);
    const temp = pickupCity;
    setPickupCity(dropCity);
    setDropCity(temp);
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!pickupCity.trim()) errs.pickupCity = 'Please enter pickup location';
    if (!dropCity.trim() && tripType !== 'hourly') errs.dropCity = 'Please enter drop location';
    if (!pickupDate) errs.pickupDate = 'Pickup date is required';
    if (!pickupTime) errs.pickupTime = 'Pickup time is required';
    if (tripType === 'round' && !returnDate) errs.returnDate = 'Return date is required';
    if (!customerName.trim()) errs.customerName = 'Please enter your name';
    if (!customerPhone.trim() || customerPhone.length < 10) errs.customerPhone = 'Enter valid 10-digit mobile number';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      soundEngine.playChime(320, 0.2);
      return;
    }

    soundEngine.playChime(780, 0.25);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const confirmation: BookingConfirmation = {
      bookingId: `BT-2026-${randomId}`,
      tripType,
      pickupCity,
      dropCity: tripType === 'hourly' ? `Local City Package (${hourlyPackage})` : dropCity,
      pickupAddress: pickupAddress || 'Doorstep Pickup Point',
      dropAddress: dropAddress || 'Destination Point',
      pickupDate,
      pickupTime,
      returnDate: tripType === 'round' ? returnDate : undefined,
      returnTime: tripType === 'round' ? returnTime : undefined,
      vehicle: selectedVehicle,
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'customer@btcab.in',
      passengers,
      totalDistanceKm: fareDetails.kmCount,
      baseFare: fareDetails.baseFare,
      driverBata: fareDetails.driverBata,
      totalEstimate: fareDetails.total,
      bookingDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      status: 'CONFIRMED'
    };

    onBookingConfirmed(confirmation);
  };

  return (
    <div className="card-clean" style={{ padding: '0', overflow: 'hidden', backgroundColor: '#ffffff' }}>
      {/* 1. Trip Type Switcher Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '16px 20px',
          borderBottom: '3px solid #dc2626'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              INSTANT METRO CAB BOOKING ENGINE
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Choose Your Travel Mode
            </h2>
          </div>

          {/* Pill Selector */}
          <div className="trip-switch-pill" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <button
              type="button"
              onClick={() => {
                soundEngine.playChime(520, 0.08);
                setTripType('single');
              }}
              className={`trip-switch-btn ${tripType === 'single' ? 'active' : ''}`}
              style={{ color: tripType === 'single' ? '#ffffff' : '#cbd5e1' }}
            >
              ⚡ Single Trip
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playChime(580, 0.08);
                setTripType('round');
              }}
              className={`trip-switch-btn ${tripType === 'round' ? 'active' : ''}`}
              style={{ color: tripType === 'round' ? '#ffffff' : '#cbd5e1' }}
            >
              🔄 Round Trip
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playChime(640, 0.08);
                setTripType('airport');
              }}
              className={`trip-switch-btn ${tripType === 'airport' ? 'active' : ''}`}
              style={{ color: tripType === 'airport' ? '#ffffff' : '#cbd5e1' }}
            >
              ✈️ Airport CJB
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playChime(700, 0.08);
                setTripType('hourly');
              }}
              className={`trip-switch-btn ${tripType === 'hourly' ? 'active' : ''}`}
              style={{ color: tripType === 'hourly' ? '#ffffff' : '#cbd5e1' }}
            >
              ⏱️ Hourly
            </button>
          </div>
        </div>

        {/* Informative Sub-banner */}
        <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {tripType === 'single' && (
            <span style={{ color: '#fed7aa', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✨ <strong>One-Way Drop Taxi:</strong> Pay only for 1 side distance. Save up to 40% vs return billing!
            </span>
          )}
          {tripType === 'round' && (
            <span style={{ color: '#fed7aa', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✨ <strong>Round Trip Outstation:</strong> Driver and cab stays with you. Complete flexibility for {tripDays} Day{tripDays > 1 ? 's' : ''}!
            </span>
          )}
          {tripType === 'airport' && (
            <span style={{ color: '#fed7aa', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✨ <strong>Airport Terminal CJB:</strong> On-time guarantee with free 45 min waiting for flight delays.
            </span>
          )}
          {tripType === 'hourly' && (
            <span style={{ color: '#fed7aa', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✨ <strong>Local City Package:</strong> Multiple stops across Gandhipuram, RS Puram, and IT corridor.
            </span>
          )}
        </div>
      </div>

      {/* Main Form Form Body */}
      <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {/* Pickup Point */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
              🟢 Pickup Location <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              placeholder="e.g. Airport Terminal CJB or Gandhipuram"
              style={{ width: '100%', padding: '12px 14px', fontSize: '0.95rem' }}
            />
            {errors.pickupCity && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.pickupCity}</div>}

            {/* Quick chips for City */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {['CJB Airport', 'Gandhipuram', 'CBE Junction', 'RS Puram'].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  onClick={() => setPickupCity(chip === 'CJB Airport' ? 'Airport Terminal' : chip)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontWeight: 600
                  }}
                >
                  +{chip}
                </button>
              ))}
            </div>
          </div>

          {/* Swap Button on larger screens */}
          {tripType !== 'hourly' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleSwapLocations}
                title="Swap Pickup and Drop Locations"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  marginTop: '12px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                ⇅
              </button>
            </div>
          )}

          {/* Drop Location */}
          {tripType !== 'hourly' ? (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                🔴 Drop Destination <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                value={dropCity}
                onChange={(e) => setDropCity(e.target.value)}
                placeholder="e.g. Ooty, Isha Adiyogi, Bangalore"
                style={{ width: '100%', padding: '12px 14px', fontSize: '0.95rem' }}
              />
              {errors.dropCity && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.dropCity}</div>}

              {/* Quick destination chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {['Ooty', 'Isha Adiyogi', 'Valparai', 'Bangalore', 'Munnar'].map((chip) => (
                  <button
                    type="button"
                    key={chip}
                    onClick={() => setDropCity(chip)}
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      fontWeight: 600
                    }}
                  >
                    +{chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                ⏱️ Select Hourly Package <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                value={hourlyPackage}
                onChange={(e) => setHourlyPackage(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', fontSize: '0.95rem' }}
              >
                <option value="4hr-40km">4 Hours / 40 Kilometers (₹1,600+)</option>
                <option value="8hr-80km">8 Hours / 80 Kilometers (₹2,800+)</option>
                <option value="12hr-120km">12 Hours / 120 Kilometers (₹3,800+)</option>
              </select>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '8px' }}>
                Extra Km: ₹14/km | Extra Hour: ₹150/hr
              </div>
            </div>
          )}
        </div>

        {/* Date & Time Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              📅 PICKUP DATE <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="date"
              min={todayStr}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={{ width: '100%', padding: '10px 12px' }}
            />
            {errors.pickupDate && <div style={{ color: '#dc2626', fontSize: '0.7rem' }}>{errors.pickupDate}</div>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              ⏰ PICKUP TIME <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              style={{ width: '100%', padding: '10px 12px' }}
            />
            {errors.pickupTime && <div style={{ color: '#dc2626', fontSize: '0.7rem' }}>{errors.pickupTime}</div>}
          </div>

          {/* Return Date & Time ONLY FOR ROUND TRIP */}
          {tripType === 'round' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#059669', marginBottom: '6px' }}>
                  🔄 RETURN DATE <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="date"
                  min={pickupDate || todayStr}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderColor: '#059669' }}
                />
                {errors.returnDate && <div style={{ color: '#dc2626', fontSize: '0.7rem' }}>{errors.returnDate}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#059669', marginBottom: '6px' }}>
                  ⏰ RETURN TIME <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderColor: '#059669' }}
                />
              </div>
            </>
          )}
        </div>

        {/* 2. Vehicle Selector */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                Select Vehicle Class
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                All cabs equipped with AC, FastTag & verified chauffeurs
              </span>
            </div>
            <span className="badge-red">
              {tripType === 'single' ? 'One-Way Tariff Applied' : 'Round-Trip Tariff Applied'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {FLEET_DATA.map((v) => {
              const isSelected = selectedVehicleId === v.id;
              const perKmRate = tripType === 'single' ? v.ratePerKmOneWay : v.ratePerKmRound;

              return (
                <div
                  key={v.id}
                  onClick={() => {
                    soundEngine.playChime(550, 0.08);
                    setSelectedVehicleId(v.id);
                  }}
                  style={{
                    border: isSelected ? '2px solid #dc2626' : '1px solid var(--border)',
                    backgroundColor: isSelected ? '#fff5f5' : '#ffffff',
                    borderRadius: '16px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 8px 24px rgba(220, 38, 38, 0.15)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Vehicle Photo */}
                    <div style={{ height: '100px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px', backgroundColor: '#f1f5f9' }}>
                      <img
                        src={v.imageUrl}
                        alt={v.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                        {v.name}
                      </h4>
                      {v.badge && (
                        <span style={{ fontSize: '0.65rem', backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          {v.badge}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '8px' }}>
                      {v.model}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: '#475569', marginBottom: '8px' }}>
                      <span>👤 {v.seats} Seats</span>
                      <span>🧳 {v.luggage} Bags</span>
                      <span>❄️ AC</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Rate / Km</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                        ₹{perKmRate}/km
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Driver Bata</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                        ₹{v.driverBata}/day
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Passenger Details */}
        <div style={{ marginBottom: '28px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
            Passenger & Contact Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                FULL NAME <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter passenger name"
                style={{ width: '100%', padding: '10px 12px' }}
              />
              {errors.customerName && <div style={{ color: '#dc2626', fontSize: '0.7rem' }}>{errors.customerName}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                MOBILE NUMBER <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={{ width: '100%', padding: '10px 12px' }}
              />
              {errors.customerPhone && <div style={{ color: '#dc2626', fontSize: '0.7rem' }}>{errors.customerPhone}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                EMAIL (FOR TAXI INVOICE)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="email@example.com"
                style={{ width: '100%', padding: '10px 12px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                DOORSTEP PICKUP ADDRESS / LANDMARK
              </label>
              <input
                type="text"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Street address, house no, or hotel name"
                style={{ width: '100%', padding: '10px 12px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                SPECIAL NOTES (OPTIONAL)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Flight no, baby seat, extra luggage, etc."
                style={{ width: '100%', padding: '10px 12px' }}
              />
            </div>
          </div>
        </div>

        {/* 4. Live Fare Summary Strip & Confirm Button */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '20px 24px',
            borderRadius: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase' }}>
              TRANSPARENT TARIFF ESTIMATE
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                ₹{fareDetails.total.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                (Includes {fareDetails.kmCount} Kms + Driver Allowance)
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
              ✓ No advance payment required • Pay to driver by Cash / UPI on trip completion
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary animate-pulse-glow"
            style={{
              padding: '14px 32px',
              fontSize: '1.1rem',
              borderRadius: '16px',
              letterSpacing: '-0.01em'
            }}
          >
            <span>🚕 Confirm {tripType === 'single' ? 'Single Trip' : tripType === 'round' ? 'Round Trip' : 'Ride'} Now</span>
          </button>
        </div>
      </form>
    </div>
  );
};
