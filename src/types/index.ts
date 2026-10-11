export type TripType = 'single' | 'round' | 'airport' | 'hourly';

export type VehicleCategory = 'sedan' | 'suv' | 'innova' | 'hycross' | 'tempo' | 'luxury';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  tagline: string;
  category: VehicleCategory;
  seats: number;
  luggage: number;
  ac: boolean;
  ratePerKmOneWay: number;
  ratePerKmRound: number;
  driverBata: number;
  minKmPerDay: number;
  imageUrl: string;
  badge?: string;
  features: string[];
  popular?: boolean;
}

export interface BookingFormData {
  tripType: TripType;
  pickupCity: string;
  dropCity: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  hourlyPackage?: string;
  vehicleId: string;
  name: string;
  phone: string;
  email: string;
  passengers: number;
  luggage: number;
  notes?: string;
  paymentMode: 'cash' | 'online' | 'upi';
}

export interface BookingConfirmation {
  bookingId: string;
  tripType: TripType;
  pickupCity: string;
  dropCity: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  vehicle: Vehicle;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  passengers: number;
  totalDistanceKm: number;
  baseFare: number;
  driverBata: number;
  totalEstimate: number;
  bookingDate: string;
  status: 'CONFIRMED' | 'DISPATCHED';
}

export interface RouteItem {
  id: string;
  from: string;
  to: string;
  title: string;
  distanceKm: number;
  estimatedTime: string;
  singleFareSedan: number;
  singleFareInnova: number;
  roundFareSedan: number;
  roundFareInnova: number;
  badge?: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  route: string;
  rating: number;
  review: string;
  date: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'tariffs' | 'safety' | 'outstation';
}

export type PageType = 'home' | 'booking' | 'services' | 'fleet' | 'tariffs' | 'about' | 'contact';
