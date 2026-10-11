import { Vehicle } from '../types';

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'sedan-prime',
    name: 'Prime Sedan',
    model: 'Swift Dzire / Toyota Etios',
    tagline: 'Best for 1-4 passengers, city & outstation drops',
    category: 'sedan',
    seats: 4,
    luggage: 2,
    ac: true,
    ratePerKmOneWay: 14,
    ratePerKmRound: 12,
    driverBata: 400,
    minKmPerDay: 250,
    imageUrl: '/images/prime-sedan.jpg',
    badge: 'Most Popular',
    popular: true,
    features: [
      'Chilled Climate Control AC',
      'Clean & Sanitized Interiors',
      'Ample Boot Space for 2 Bags',
      'Zero Toll Markups / Live Fare',
      'Experienced Verified Driver'
    ]
  },
  {
    id: 'suv-ertiga',
    name: 'Prime SUV (6-Seater)',
    model: 'Maruti Ertiga / XL6',
    tagline: 'Ideal for small families and airport group travel',
    category: 'suv',
    seats: 6,
    luggage: 3,
    ac: true,
    ratePerKmOneWay: 18,
    ratePerKmRound: 15,
    driverBata: 500,
    minKmPerDay: 250,
    imageUrl: '/images/hero-airport-cab.jpg',
    badge: 'Family Choice',
    popular: false,
    features: [
      'Dual AC Vents in All Rows',
      'Foldable Rear Row for Luggage',
      'Highway Smooth Suspension',
      'USB Fast Charging Ports',
      'Professional Uniformed Chauffeur'
    ]
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta (7-Seater)',
    model: 'Toyota Innova Crysta 2.4Z',
    tagline: 'The undisputed king of hill roads and long outstation tours',
    category: 'innova',
    seats: 7,
    luggage: 4,
    ac: true,
    ratePerKmOneWay: 22,
    ratePerKmRound: 18,
    driverBata: 600,
    minKmPerDay: 300,
    imageUrl: '/images/innova-hill-cab.jpg',
    badge: 'Hill Station King',
    popular: true,
    features: [
      'Plush Captain Bucket Seats',
      'Dedicated Roof Air Conditioning',
      'High Ground Clearance for Hills (Ooty, Valparai)',
      'Spacious Boot for 4 Large Bags',
      'Ooty & Western Ghats Hill Expert Chauffeur'
    ]
  },
  {
    id: 'tempo-urbania',
    name: 'Luxury Tempo / Urbania',
    model: 'Force Urbania / Winger 12-Seater',
    tagline: 'Ideal for marriage trips, corporate outings & pilgrimage groups',
    category: 'tempo',
    seats: 12,
    luggage: 8,
    ac: true,
    ratePerKmOneWay: 32,
    ratePerKmRound: 26,
    driverBata: 800,
    minKmPerDay: 300,
    imageUrl: '/images/tempo-traveller.jpg',
    badge: 'Group & Wedding Special',
    popular: false,
    features: [
      '12 Individual Pushback Recliner Seats',
      'High Roof Walk-through Cabin',
      'HD LED Screen & Audio Entertainment',
      'Massive Rear Luggage Compartment',
      'Dual Experienced Highway Chauffeurs available'
    ]
  },
  {
    id: 'luxury-mercedes',
    name: 'VIP Executive Chauffeur',
    model: 'Mercedes-Benz E-Class / BMW 5',
    tagline: 'Supreme luxury for VIP delegations, weddings & CEO airport pick-ups',
    category: 'luxury',
    seats: 4,
    luggage: 3,
    ac: true,
    ratePerKmOneWay: 65,
    ratePerKmRound: 55,
    driverBata: 1200,
    minKmPerDay: 250,
    imageUrl: '/images/luxury-mercedes.jpg',
    badge: 'VIP Presidential',
    popular: false,
    features: [
      'Burmester Acoustic Surround Audio',
      'Leather Reclining Massaging Seats',
      'Suit Chauffeur & Meet-and-Greet at CJB Airport',
      'Bottled Artesian Water & Wet Wipes',
      'Zero-Delay VIP Airport Gate Access'
    ]
  }
];
