import { TestimonialItem, FAQItem } from '../types';

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Karthik Ramanathan',
    role: 'IT Consultant, Bangalore',
    route: 'Airport Terminal to Ooty (Round Trip)',
    rating: 5,
    review: 'Booked an Innova Crysta for a family trip to Ooty. Chauffeur Murugan was an exceptional ghat road driver. Cab was spotless and arrived 15 mins early at CJB airport!',
    date: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't-2',
    name: 'Ananya Sridharan',
    role: 'Architect, Chennai',
    route: 'Central Station to Isha Yoga Adiyogi',
    rating: 5,
    review: 'The Single Trip drop taxi option saved me almost ₹800 compared to other local cabs. The driver waited patiently for the evening Aarti without extra surge charges. Super reliable service!',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't-3',
    name: 'Dr. Praveen Kumar',
    role: 'Orthopedic Surgeon, City',
    route: 'City to Bangalore (Single Drop)',
    rating: 5,
    review: 'I frequently travel between City and Electronic City Bangalore. BT CAB offers transparent per km billing and no hidden night charges. The online booking receipt was instantaneous.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'booking',
    question: 'What is the difference between Single Trip (One-Way) and Round Trip billing?',
    answer: 'In a Single Trip (One-Way Drop Taxi), you only pay for the distance travelled from your pickup point to your destination. You DO NOT pay for the car’s return journey! In a Round Trip, the cab stays with you throughout your journey for sightseeing and returns back to City.'
  },
  {
    id: 'faq-2',
    category: 'tariffs',
    question: 'Are Toll, Parking and State Permit fees included in the fare?',
    answer: 'Our taxi fare includes vehicle rental, fuel charges, and driver bata. Fast-tag toll gate charges, hill station parking fees, and interstate permits (for Kerala or Karnataka) are actuals paid directly by the passenger at the toll booths.'
  },
  {
    id: 'faq-3',
    category: 'booking',
    question: 'How do I know my booking is confirmed?',
    answer: 'Once you click "Confirm Booking" on our website, you instantly receive a digital booking pass with your unique Booking ID. We also dispatch an instant WhatsApp and SMS confirmation with chauffeur contact and vehicle number.'
  },
  {
    id: 'faq-4',
    category: 'outstation',
    question: 'Can I book a cab for multi-day tours to Ooty, Munnar or Kodaikanal?',
    answer: 'Yes! You can choose Round Trip and select your departure date and return date. Our minimum daily outstation calculation is 250 km/day (300 km for Innova), and driver night bata is transparently calculated.'
  },
  {
    id: 'faq-5',
    category: 'safety',
    question: 'Are all BT CAB drivers background-verified and hill-route certified?',
    answer: 'Absolutely. Every chauffeur undergoes police background verification, minimum 5 years commercial driving experience, and specialized training for 36 Nilgiri hairpin bends and Western Ghats fog driving.'
  }
];
