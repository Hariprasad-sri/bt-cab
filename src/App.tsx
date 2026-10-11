import React, { useState } from 'react';
import { PageType, BookingConfirmation } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { BookingConfirmationModal } from './components/booking/BookingConfirmationModal';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ServicesPage } from './pages/ServicesPage';
import { FleetPage } from './pages/FleetPage';
import { TariffsPage } from './pages/TariffsPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookClick = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (data: BookingConfirmation) => {
    setConfirmation(data);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookClick={handleBookClick}
      />

      <main>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onBookingConfirmed={handleBookingConfirmed}
          />
        )}
        {currentPage === 'booking' && (
          <BookingPage onBookingConfirmed={handleBookingConfirmed} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'fleet' && (
          <FleetPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'tariffs' && (
          <TariffsPage onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookClick={handleBookClick}
      />

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        confirmation={confirmation}
        onClose={() => setConfirmation(null)}
      />
    </div>
  );
};

export default App;
