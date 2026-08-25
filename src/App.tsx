import React, { useState, useEffect } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BookingWizardPage } from './pages/BookingWizardPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { PricingCalculatorPage } from './pages/PricingCalculatorPage';
import { LocationsPage } from './pages/LocationsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { ContactPage } from './pages/ContactPage';

import { FrequencyType } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>('residential-standard');

  // Booking wizard prefill state
  const [wizardParams, setWizardParams] = useState<{
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    frequency: FrequencyType;
  }>({
    serviceId: 'residential-standard',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    frequency: 'bi-weekly'
  });

  const { toastMessage } = useBooking();

  // Scroll to top on activeTab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleStartBookingWithService = (serviceId: string) => {
    setWizardParams((prev) => ({
      ...prev,
      serviceId
    }));
    setActiveTab('booking');
  };

  const handleStartBookingFromQuote = (params: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    frequency: FrequencyType;
  }) => {
    setWizardParams(params);
    setActiveTab('booking');
  };

  const handleSelectServiceSlug = (slug: string) => {
    setSelectedServiceSlug(slug);
    setActiveTab('service-detail');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (\n        <div className=\"fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-bold animate-in slide-in-from-bottom-5 duration-200\">
          <div className=\"w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse\" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectServiceSlug={handleSelectServiceSlug}
      />

      {/* Main Page Routing Switch */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectServiceSlug={handleSelectServiceSlug}
            onStartBookingWithParams={handleStartBookingFromQuote}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            setActiveTab={setActiveTab}
            onSelectServiceSlug={handleSelectServiceSlug}
            onStartBookingWithService={handleStartBookingWithService}
          />
        )}

        {activeTab === 'service-detail' && (
          <ServiceDetailPage
            serviceSlug={selectedServiceSlug}
            setActiveTab={setActiveTab}
            onStartBookingWithService={handleStartBookingWithService}
          />
        )}

        {activeTab === 'booking' && (
          <BookingWizardPage
            initialServiceId={wizardParams.serviceId}
            initialBedrooms={wizardParams.bedrooms}
            initialBathrooms={wizardParams.bathrooms}
            initialSqft={wizardParams.squareFeet}
            initialFrequency={wizardParams.frequency}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'checklist' && (
          <ChecklistPage
            setActiveTab={setActiveTab}
            onStartBookingWithService={handleStartBookingWithService}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingCalculatorPage
            setActiveTab={setActiveTab}
            onStartBookingWithParams={handleStartBookingFromQuote}
          />
        )}

        {activeTab === 'locations' && (
          <LocationsPage
            setActiveTab={setActiveTab}
            onStartBooking={() => setActiveTab('booking')}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsPage
            setActiveTab={setActiveTab}
            onStartBooking={() => setActiveTab('booking')}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={setActiveTab}
            onStartBooking={() => setActiveTab('booking')}
          />
        )}

        {activeTab === 'portal' && (
          <CustomerPortalPage
            setActiveTab={setActiveTab}
            onStartBooking={() => setActiveTab('booking')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            setActiveTab={setActiveTab}
            onStartBooking={() => setActiveTab('booking')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectServiceSlug={handleSelectServiceSlug}
      />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
