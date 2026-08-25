import React, { useState } from 'react';
import {
  UserCheck,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  RotateCcw,
  XCircle,
  FileText,
  BadgeCheck,
  Star,
  Sparkles,
  ArrowRight,
  Dog,
  CheckCircle2
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BookingDetails } from '../types';

interface CustomerPortalPageProps {
  setActiveTab: (tab: string) => void;
  onStartBooking: () => void;
}

export const CustomerPortalPage: React.FC<CustomerPortalPageProps> = ({
  setActiveTab,
  onStartBooking
}) => {
  const { bookings, cancelBooking, rescheduleBooking, showToast } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(
    bookings.length > 0 ? bookings[0] : null
  );

  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('Morning (8:00 AM - 10:00 AM)');
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleOpenReschedule = (b: BookingDetails) => {
    setSelectedBooking(b);
    setRescheduleDate(b.selectedDate);
    setRescheduleTime(b.timeSlot);
    setIsRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !rescheduleDate) return;
    rescheduleBooking(selectedBooking.id, rescheduleDate, rescheduleTime);
    setIsRescheduleModalOpen(false);
  };

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Client Self-Service Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Lato',sans-serif]">
            My Cleaning Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time status tracking, assigned cleaner profiles, and instant schedule modifications.
          </p>
        </div>

        <button
          onClick={onStartBooking}
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-200 transition-colors flex items-center shrink-0"
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span>Book Another Clean</span>
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Lato',sans-serif]">No Active Bookings Found</h3>
          <p className="text-xs text-slate-500">
            You don't have any appointments scheduled yet. Book in 60 seconds to secure your clean.
          </p>
          <button
            onClick={onStartBooking}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-200"
          >
            Schedule Your Clean Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bookings List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Scheduled Appointments ({bookings.length})
            </h2>

            {bookings.map((booking) => {
              const isSelected = selectedBooking?.id === booking.id;
              return (\n                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono text-blue-600">{booking.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        booking.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : booking.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      ● {booking.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{booking.serviceName}</h3>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {booking.selectedDate} • {booking.timeSlot.split('(')[0]}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{booking.address.street}</span>
                    <strong className="text-slate-900 font-bold">${booking.pricing.total}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Active Booking Card */}
          {selectedBooking && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Booking Detail
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-['Lato',sans-serif]">{selectedBooking.serviceName}</h3>
                  <p className="text-xs text-slate-500">
                    ID: <span className="font-mono font-bold text-blue-600">{selectedBooking.id}</span> • Created {new Date(selectedBooking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">${selectedBooking.pricing.total}</div>
                  <span className="text-[11px] text-blue-600 font-bold capitalize">{selectedBooking.frequency}</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />
                  <div>
                    <div className="text-xs font-bold text-blue-400">STATUS: CONFIRMED & DISPATCH READY</div>
                    <div className="text-[11px] text-slate-300">
                      Team arrives on {selectedBooking.selectedDate} between {selectedBooking.timeSlot.split('(')[1]?.replace(')', '') || '8:00 AM - 10:00 AM'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cleaner Card */}
              {selectedBooking.cleanerAssigned && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center space-x-4">
                  <img
                    src={selectedBooking.cleanerAssigned.avatarUrl}
                    alt={selectedBooking.cleanerAssigned.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-900 flex items-center">
                        {selectedBooking.cleanerAssigned.name}
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-600 ml-1" />
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                        Assigned Lead
                      </span>
                    </div>
                    <div className="text-[11px] text-blue-600 font-semibold">{selectedBooking.cleanerAssigned.specialty}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      ⭐ {selectedBooking.cleanerAssigned.rating} ({selectedBooking.cleanerAssigned.totalCleans}+ Cleans) • {selectedBooking.cleanerAssigned.backgroundCheckDate}
                    </div>
                  </div>
                </div>
              )}

              {/* Home & Access Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Home Specifications</div>
                  <div className="font-bold text-slate-800 mt-1">
                    {selectedBooking.bedrooms === 0 ? 'Studio' : `${selectedBooking.bedrooms} Bed`}, {selectedBooking.bathrooms} Bath • {selectedBooking.squareFeet} sq ft
                  </div>
                  <div className="text-slate-500 capitalize">{selectedBooking.homeType}</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Address & Entry</div>
                  <div className="font-bold text-slate-800 mt-1">
                    {selectedBooking.address.street} {selectedBooking.address.aptSuite}
                  </div>
                  <div className="text-slate-500 capitalize">Entry: {selectedBooking.entryMethod.replace('-', ' ')}</div>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedBooking.specialInstructions && (
                <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">Special Notes:</span>
                  <p className="text-slate-700 italic">"{selectedBooking.specialInstructions}"</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                <button
                  onClick={() => handleOpenReschedule(selectedBooking)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-full transition-colors flex items-center"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Reschedule Date
                </button>

                <button
                  onClick={() => setShowReceiptModal(true)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-full transition-colors flex items-center"
                >
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  View Itemized Receipt
                </button>

                <button
                  onClick={() => handleCancel(selectedBooking.id)}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-full transition-colors flex items-center ml-auto"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1.5" />
                  Cancel Clean
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">Reschedule Booking #{selectedBooking.id}</h3>
            <p className="text-xs text-slate-500">
              Select your new preferred appointment date and arrival slot (Free of charge).
            </p>

            <form onSubmit={handleConfirmReschedule} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs p-2.5 rounded-xl font-bold focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Arrival Window</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs p-2.5 rounded-xl font-bold focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Morning (8:00 AM - 10:00 AM)">Morning (8:00 AM - 10:00 AM)</option>
                  <option value="Midday (11:00 AM - 1:00 PM)">Midday (11:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (2:00 PM - 4:00 PM)">Afternoon (2:00 PM - 4:00 PM)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsRescheduleModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-200"
                >
                  Confirm New Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Itemized Receipt Modal */}
      {showReceiptModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 font-['Lato',sans-serif]">FLOW CLEANING</div>
                  <div className="text-[10px] text-slate-400">Official Itemized Invoice</div>
                </div>
              </div>
              <button onClick={() => setShowReceiptModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Service ({selectedBooking.serviceName}):</span>
                <span className="font-bold text-slate-900">${selectedBooking.pricing.baseRate}</span>
              </div>
              {selectedBooking.pricing.sizeAdjustment > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Home Size & Room Configuration:</span>
                  <span className="font-bold text-slate-900">+${selectedBooking.pricing.sizeAdjustment}</span>
                </div>
              )}
              {selectedBooking.pricing.addOnsTotal > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Add-On Detailing Services:</span>
                  <span className="font-bold text-slate-900">+${selectedBooking.pricing.addOnsTotal}</span>
                </div>
              )}
              {selectedBooking.pricing.frequencyDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Recurrence Discount ({selectedBooking.pricing.frequencyDiscountPercent}%):</span>
                  <span>-${selectedBooking.pricing.frequencyDiscount}</span>
                </div>
              )}
              {selectedBooking.pricing.promoDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Promo Code Applied:</span>
                  <span>-${selectedBooking.pricing.promoDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Tax (8.5%):</span>
                <span>${selectedBooking.pricing.tax}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Cleaner Gratuity:</span>
                <span>${selectedBooking.pricing.tip}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900 font-['Lato',sans-serif]\">\n                <span>Total Billed:</span>\n                <span>${selectedBooking.pricing.total}</span>\n              </div>\n            </div>\n\n            <button\n              onClick={() => setShowReceiptModal(false)}\n              className=\"w-full py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-full hover:bg-slate-800\"\n            >\n              Close Invoice\n            </button>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};\n