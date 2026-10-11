/**
 * BT CAB — CORE JAVASCRIPT ENGINE
 * Standalone Vanilla JS: Booking calculator, Web Audio Synthesizer,
 * WhatsApp messaging generator, Ticket modal, FAQ accordion, Smooth routing.
 */

// 1. Fleet Vehicles Data
const FLEET_DATA = [
  {
    id: 'sedan-prime',
    name: 'Prime Sedan',
    model: 'Swift Dzire / Toyota Etios',
    seats: 4,
    luggage: 2,
    rateOneWay: 14,
    rateRound: 12,
    driverBata: 400,
    minKm: 250,
    badge: 'Most Popular',
    img: 'images/prime-sedan.jpg',
    features: ['Chilled Climate Control AC', 'Clean & Sanitized Interiors', 'Ample Boot Space for 2 Bags', 'Zero Toll Markups / Live Fare', 'Experienced Verified Driver']
  },
  {
    id: 'suv-ertiga',
    name: 'Prime SUV',
    model: 'Maruti Ertiga / XL6',
    seats: 6,
    luggage: 3,
    rateOneWay: 18,
    rateRound: 15,
    driverBata: 500,
    minKm: 250,
    badge: 'Family Choice',
    img: 'images/hero-airport-cab.jpg',
    features: ['Dual AC Vents in All Rows', 'Foldable Rear Row for Luggage', 'Highway Smooth Suspension', 'USB Fast Charging Ports', 'Professional Chauffeur']
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    model: 'Toyota Innova Crysta 2.4Z',
    seats: 7,
    luggage: 4,
    rateOneWay: 22,
    rateRound: 18,
    driverBata: 600,
    minKm: 300,
    badge: 'Hill Station King',
    img: 'images/innova-hill-cab.jpg',
    features: ['Plush Captain Bucket Seats', 'Dedicated Roof Air Conditioning', 'High Ground Clearance for Hills', 'Spacious Boot for 4 Large Bags', 'Mountain & Ghat Road Expert Driver']
  },
  {
    id: 'tempo-urbania',
    name: 'Luxury Tempo',
    model: 'Force Urbania / Winger 12-Seater',
    seats: 12,
    luggage: 8,
    rateOneWay: 32,
    rateRound: 26,
    driverBata: 800,
    minKm: 300,
    badge: 'Group & Wedding',
    img: 'images/tempo-traveller.jpg',
    features: ['12 Pushback Recliner Seats', 'High Roof Walk-through Cabin', 'HD LED Screen & Audio System', 'Massive Rear Luggage Space', 'Dual Highway Drivers for Long Tours']
  },
  {
    id: 'luxury-mercedes',
    name: 'VIP Executive',
    model: 'Mercedes-Benz E-Class / BMW 5',
    seats: 4,
    luggage: 3,
    rateOneWay: 65,
    rateRound: 55,
    driverBata: 1200,
    minKm: 250,
    badge: 'VIP Presidential',
    img: 'images/luxury-mercedes.jpg',
    features: ['Burmester Acoustic Surround Audio', 'Leather Massaging Recliners', 'Suited Chauffeur Meet-and-Greet', 'Bottled Artesian Water', 'Zero-Delay VIP Airport Gate Access']
  }
];

// 2. Route Distances (Outstation & Popular Hubs)
const ROUTE_DISTANCES = {
  'Ooty / Coonoor': 86,
  'Isha Yoga Adiyogi': 32,
  'Valparai & Sholayar': 104,
  'Bengaluru / Electronic City': 365,
  'Munnar (Kerala Hills)': 158,
  'Airport Express Transfer': 25,
  'Chennai': 505,
  'Madurai': 215,
  'Kodaikanal': 175,
  'Salem': 165,
  'Tirupur': 55,
  'Pollachi': 45,
  'Palani Temple': 105
};

// 3. Web Audio Synthesizer (Zero external mp3 files required!)
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return !this.muted;
  }

  playChime(freq = 580, duration = 0.08) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playSuccess() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch (e) {}
  }
}

const sound = new SoundSynthesizer();

// 4. Booking Engine State
let currentTripType = 'single';
let currentSelectedVehicleId = 'sedan-prime';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  initDateDefaults();
  renderVehicleCards();
  calculateFare();
  setupEventListeners();
});

// Set default dates
function initDateDefaults() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const pickupDateInput = document.getElementById('pickupDate');
  const returnDateInput = document.getElementById('returnDate');

  if (pickupDateInput) pickupDateInput.value = todayStr;
  if (returnDateInput) returnDateInput.value = tomorrowStr;
}

// Render dynamic vehicle radio cards
function renderVehicleCards() {
  const container = document.getElementById('vehicleCardsContainer');
  if (!container) return;

  container.innerHTML = FLEET_DATA.map(v => {
    const isSelected = v.id === currentSelectedVehicleId;
    const rateText = currentTripType === 'single' 
      ? `₹${v.rateOneWay}/km` 
      : currentTripType === 'round' 
        ? `₹${v.rateRound}/km` 
        : currentTripType === 'airport' 
          ? `Fixed Drop` 
          : `Package`;

    return `
      <div 
        class="vehicle-select-card ${isSelected ? 'selected' : ''}" 
        onclick="selectVehicle('${v.id}')"
        data-id="${v.id}"
      >
        <span class="badge-gold vehicle-card-badge">${v.badge}</span>
        <img src="${v.img}" alt="${v.name}" class="vehicle-card-img" loading="lazy" />
        <h4 class="vehicle-card-title">${v.name}</h4>
        <p class="vehicle-card-model">${v.model}</p>
        <div class="vehicle-card-specs">
          <span>👥 ${v.seats} Seats</span>
          <span>🧳 ${v.luggage} Bags</span>
          <span>❄️ AC</span>
        </div>
        <div class="vehicle-card-rate">
          <span style="font-size:0.75rem; color:#64748b;">${currentTripType === 'single' ? 'One-Way Tariff' : 'Round Tariff'}</span>
          <span class="rate-amount">${rateText}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Select a vehicle
window.selectVehicle = function(vehicleId) {
  sound.playChime(640, 0.08);
  currentSelectedVehicleId = vehicleId;
  renderVehicleCards();
  calculateFare();
};

// Switch Trip Type (Single vs Round vs Airport vs Hourly)
window.setTripType = function(type) {
  sound.playChime(580, 0.08);
  currentTripType = type;

  // Update button active state
  document.querySelectorAll('.trip-switch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === type);
  });

  // Toggle return date visibility
  const returnGroup = document.getElementById('returnDateGroup');
  const hourlyGroup = document.getElementById('hourlyGroup');
  const dropCityGroup = document.getElementById('dropCityGroup');

  if (returnGroup) {
    returnGroup.style.display = (type === 'round') ? 'flex' : 'none';
  }

  if (hourlyGroup) {
    hourlyGroup.style.display = (type === 'hourly') ? 'flex' : 'none';
  }

  if (dropCityGroup) {
    dropCityGroup.style.display = (type === 'hourly') ? 'none' : 'flex';
  }

  // Pre-fill destination if Airport
  const dropCityInput = document.getElementById('dropCity');
  if (type === 'airport' && dropCityInput) {
    dropCityInput.value = 'Airport Express Transfer';
  } else if (dropCityInput && dropCityInput.value === 'Airport Express Transfer') {
    dropCityInput.value = 'Ooty / Coonoor';
  }

  renderVehicleCards();
  calculateFare();
};

// Select Destination preset chip
window.selectPresetChip = function(destination) {
  sound.playChime(600, 0.08);
  const dropCityInput = document.getElementById('dropCity');
  if (dropCityInput) {
    dropCityInput.value = destination;
  }

  // Highlight chip
  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.classList.toggle('active', chip.innerText.trim() === destination);
  });

  calculateFare();
};

// Calculate Fare in Real Time
function calculateFare() {
  const dropCity = document.getElementById('dropCity')?.value.trim() || 'Ooty / Coonoor';
  const vehicle = FLEET_DATA.find(v => v.id === currentSelectedVehicleId) || FLEET_DATA[0];

  let distanceKm = ROUTE_DISTANCES[dropCity] || 100;
  let estimatedTotal = 0;
  let breakdownText = '';
  let distanceDisplay = `${distanceKm} km`;

  if (currentTripType === 'single') {
    // Single Trip One-Way
    const billableKm = Math.max(distanceKm, 100);
    const baseFare = billableKm * vehicle.rateOneWay;
    const bata = vehicle.driverBata;
    estimatedTotal = baseFare + bata;
    distanceDisplay = `${distanceKm} km (One-Way)`;
    breakdownText = `${billableKm} km × ₹${vehicle.rateOneWay} + ₹${bata} Bata`;
  } else if (currentTripType === 'round') {
    // Round Trip
    const totalDistance = distanceKm * 2;
    const billableKm = Math.max(totalDistance, vehicle.minKm);
    const baseFare = billableKm * vehicle.rateRound;
    const bata = vehicle.driverBata;
    estimatedTotal = baseFare + bata;
    distanceDisplay = `${totalDistance} km (${distanceKm} km × 2)`;
    breakdownText = `${billableKm} km × ₹${vehicle.rateRound} + ₹${bata} Bata`;
  } else if (currentTripType === 'airport') {
    // Airport Flat Transfer
    if (vehicle.id === 'sedan-prime') estimatedTotal = 650;
    else if (vehicle.id === 'suv-ertiga') estimatedTotal = 850;
    else if (vehicle.id === 'innova-crysta') estimatedTotal = 1100;
    else if (vehicle.id === 'tempo-urbania') estimatedTotal = 1800;
    else estimatedTotal = 3200;

    distanceDisplay = `~25 km (Airport Terminal)`;
    breakdownText = `Fixed Airport Chauffeur Drop`;
  } else if (currentTripType === 'hourly') {
    // Hourly City Package (8 hr / 80 km standard)
    if (vehicle.id === 'sedan-prime') estimatedTotal = 1999;
    else if (vehicle.id === 'suv-ertiga') estimatedTotal = 2499;
    else if (vehicle.id === 'innova-crysta') estimatedTotal = 3199;
    else if (vehicle.id === 'tempo-urbania') estimatedTotal = 4499;
    else estimatedTotal = 7999;

    distanceDisplay = `8 Hours / 80 Km Package`;
    breakdownText = `Local City Rental with Chauffeur`;
  }

  // Update UI elements
  const elDist = document.getElementById('summaryDistance');
  const elVehicle = document.getElementById('summaryVehicle');
  const elBreakdown = document.getElementById('summaryBreakdown');
  const elTotal = document.getElementById('summaryTotal');

  if (elDist) elDist.innerText = distanceDisplay;
  if (elVehicle) elVehicle.innerText = `${vehicle.name} (${vehicle.model})`;
  if (elBreakdown) elBreakdown.innerText = breakdownText;
  if (elTotal) elTotal.innerText = `₹${estimatedTotal.toLocaleString('en-IN')}`;
}

// Quick Route "Book Route" click
window.bookRoute = function(routeTo, vehicleCategory = 'sedan-prime') {
  sound.playChime(620, 0.1);
  const dropInput = document.getElementById('dropCity');
  if (dropInput) {
    dropInput.value = routeTo;
  }
  selectVehicle(vehicleCategory);
  calculateFare();

  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Book Specific Vehicle
window.bookVehicleModel = function(vehicleId) {
  sound.playChime(620, 0.1);
  selectVehicle(vehicleId);
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Submit Booking & Show Ticket Pass Modal
window.handleBookingSubmit = function(e) {
  if (e) e.preventDefault();
  
  const customerName = document.getElementById('customerName')?.value.trim();
  const customerPhone = document.getElementById('customerPhone')?.value.trim();
  const pickupCity = document.getElementById('pickupCity')?.value.trim() || 'City Center';
  const dropCity = document.getElementById('dropCity')?.value.trim() || 'Ooty / Coonoor';
  const pickupDate = document.getElementById('pickupDate')?.value || '';
  const pickupTime = document.getElementById('pickupTime')?.value || '';
  const returnDate = document.getElementById('returnDate')?.value || '';
  const notes = document.getElementById('bookingNotes')?.value.trim() || '';

  if (!customerName || !customerPhone) {
    alert('Please provide your Full Name and Mobile Number for booking confirmation.');
    return false;
  }

  if (customerPhone.replace(/\D/g, '').length < 10) {
    alert('Please enter a valid 10-digit mobile number.');
    return false;
  }

  sound.playSuccess();

  const vehicle = FLEET_DATA.find(v => v.id === currentSelectedVehicleId) || FLEET_DATA[0];
  const bookingId = 'BT-CAB-' + Math.floor(1000 + Math.random() * 9000);
  const totalAmountText = document.getElementById('summaryTotal')?.innerText || '₹0';

  // Fill Modal Elements
  document.getElementById('modalBookingId').innerText = bookingId;
  document.getElementById('modalPassenger').innerText = `${customerName} (${customerPhone})`;
  document.getElementById('modalRoute').innerText = `${pickupCity} ➔ ${dropCity}`;
  document.getElementById('modalTripType').innerText = currentTripType === 'single' ? 'Single Trip (One-Way Drop Taxi)' : currentTripType === 'round' ? 'Round Trip Outstation' : currentTripType.toUpperCase();
  document.getElementById('modalSchedule').innerText = `${pickupDate} at ${pickupTime}` + (currentTripType === 'round' && returnDate ? ` (Return: ${returnDate})` : '');
  document.getElementById('modalVehicle').innerText = `${vehicle.name} (${vehicle.model})`;
  document.getElementById('modalFare').innerText = totalAmountText;

  // WhatsApp Message
  const waMsg = encodeURIComponent(
    `*BT CAB — BOOKING CONFIRMATION*\n` +
    `📋 *Booking ID:* ${bookingId}\n` +
    `👤 *Passenger:* ${customerName} (${customerPhone})\n` +
    `🚕 *Trip Type:* ${currentTripType.toUpperCase()}\n` +
    `📍 *Route:* ${pickupCity} to ${dropCity}\n` +
    `🗓 *Pickup:* ${pickupDate} at ${pickupTime}\n` +
    (currentTripType === 'round' && returnDate ? `🔄 *Return:* ${returnDate}\n` : '') +
    `🚘 *Vehicle:* ${vehicle.name} (${vehicle.model})\n` +
    `💰 *Estimated Fare:* ${totalAmountText}\n` +
    (notes ? `📝 *Notes:* ${notes}\n` : '') +
    `Please dispatch driver details and vehicle number.`
  );

  const waBtn = document.getElementById('modalWhatsAppBtn');
  if (waBtn) {
    waBtn.href = `https://wa.me/919842266088?text=${waMsg}`;
  }

  // Open Modal
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('open');
  }

  return false;
};

// Close Modal
window.closeModal = function() {
  sound.playChime(500, 0.05);
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('open');
  }
};

// FAQ Accordion Toggle
window.toggleFaq = function(button) {
  sound.playChime(560, 0.06);
  const item = button.closest('.faq-item');
  const wasActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

  // Toggle current
  if (!wasActive) {
    item.classList.add('active');
  }
};

// Mobile Drawer Toggle
window.toggleMobileNav = function() {
  sound.playChime(560, 0.06);
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
};

// Audio Toggle Button
window.toggleAudio = function() {
  const active = sound.toggleMute();
  const btn = document.getElementById('audioToggleBtn');
  if (btn) {
    btn.innerHTML = active ? '🔊 Audio On' : '🔇 Audio Off';
    btn.style.color = active ? '#f59e0b' : '#94a3b8';
  }
  if (active) sound.playChime(700, 0.1);
};

// Event Listeners for inputs
function setupEventListeners() {
  const dropCityInput = document.getElementById('dropCity');
  if (dropCityInput) {
    dropCityInput.addEventListener('input', calculateFare);
  }

  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Close modal on click outside
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
