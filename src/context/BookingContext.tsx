import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingDetails, CleaningService, ReviewItem, CleanerProfile } from '../types';
import { SERVICES_DATA, REVIEWS_DATA, CLEANERS_DATA } from '../data/servicesData';

interface BookingContextType {
  bookings: BookingDetails[];
  activeServiceSlug: string | null;
  setActiveServiceSlug: (slug: string | null) => void;
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'date' | 'verified' | 'helpfulCount'>) => void;
  createBooking: (booking: Omit<BookingDetails, 'id' | 'createdAt' | 'status'>) => BookingDetails;
  cancelBooking: (id: string) => void;
  rescheduleBooking: (id: string, newDate: string, newTimeSlot: string) => void;
  getServiceBySlug: (slug: string) => CleaningService | undefined;
  activeBookingId: string | null;
  setActiveBookingId: (id: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const SAMPLE_INITIAL_BOOKINGS: BookingDetails[] = [
  {
    id: 'FLOW-84920',
    serviceId: 'residential-standard',
    serviceName: 'Residential Regular Clean',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    homeType: 'apartment',
    frequency: 'bi-weekly',
    addOnIds: ['fridge-interior'],
    selectedDate: '2026-08-28',
    timeSlot: 'Morning (8:00 AM - 10:00 AM)',
    address: {
      street: '2200 Pacific Ave',
      aptSuite: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94115'
    },
    contact: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '(415) 890-2144'
    },
    specialInstructions: 'Please use extra eco lavender scent in bedroom. Key is in doorman lockbox under #4B.',
    hasPets: true,
    petDetails: 'One very friendly French Bulldog named Buster (will be in crate).',
    entryMethod: 'doorman',
    fragranceFree: false,
    pricing: {
      baseRate: 139,
      sizeAdjustment: 60,
      addOnsTotal: 39,
      frequencyDiscount: 35.7,
      frequencyDiscountPercent: 15,
      promoDiscount: 0,
      subtotal: 202.3,
      tax: 17.2,
      tip: 20,
      total: 239.5
    },
    status: 'confirmed',
    createdAt: '2026-08-24T14:30:00Z',
    cleanerAssigned: CLEANERS_DATA[0]
  }
];

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>(() => {
    try {
      const saved = localStorage.getItem('flow_cleaning_bookings');
      return saved ? JSON.parse(saved) : SAMPLE_INITIAL_BOOKINGS;
    } catch {
      return SAMPLE_INITIAL_BOOKINGS;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('flow_cleaning_reviews');
      return saved ? JSON.parse(saved) : REVIEWS_DATA;
    } catch {
      return REVIEWS_DATA;
    }
  });

  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('flow_cleaning_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('flow_cleaning_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const clearToast = () => setToastMessage(null);

  const getServiceBySlug = (slug: string) => {
    return SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
  };

  const createBooking = (bookingData: Omit<BookingDetails, 'id' | 'createdAt' | 'status'>): BookingDetails => {
    const randomId = 'FLOW-' + Math.floor(10000 + Math.random() * 90000);
    // Assign a cleaner based on service
    const assignedCleaner = CLEANERS_DATA[Math.floor(Math.random() * CLEANERS_DATA.length)];
    
    const newBooking: BookingDetails = {
      ...bookingData,
      id: randomId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      cleanerAssigned: assignedCleaner
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);
    showToast(`🎉 Booking #${newBooking.id} successfully confirmed! Cleaner assigned.`);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'rescheduled' as const } : b))
    );
    showToast(`Booking #${id} has been cancelled.`);
  };

  const rescheduleBooking = (id: string, newDate: string, newTimeSlot: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, selectedDate: newDate, timeSlot: newTimeSlot, status: 'confirmed' as const } : b
      )
    );
    showToast(`Booking #${id} rescheduled to ${newDate} (${newTimeSlot})`);
  };

  const addReview = (reviewData: Omit<ReviewItem, 'id' | 'date' | 'verified' | 'helpfulCount'>) => {
    const newRev: ReviewItem = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: 'Just now',
      verified: true,
      helpfulCount: 1
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeServiceSlug,
        setActiveServiceSlug,
        reviews,
        addReview,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        getServiceBySlug,
        activeBookingId,
        setActiveBookingId,
        toastMessage,
        showToast,
        clearToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
