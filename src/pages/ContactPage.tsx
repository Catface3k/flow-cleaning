import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface ContactPageProps {
  setActiveTab: (tab: string) => void;
  onStartBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setActiveTab, onStartBooking }) => {
  const { showToast } = useBooking();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    setIsSent(true);
    showToast('Your message has been sent to our dispatch support desk.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <Headphones className="w-3.5 h-3.5 text-blue-600" />
          <span>Concierge Client Support</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          We're Here Whenever You Need Us
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Questions regarding an upcoming clean, commercial property scoping, or custom service requests? Our local dispatch team answers within 15 minutes during operating hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Lato',sans-serif]">Send Our Team a Message</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill out the form below and a dispatch coordinator will contact you promptly.
            </p>
          </div>

          {isSent ? (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
              <h3 className="text-base font-bold text-blue-950">Message Dispatched Successfully</h3>
              <p className="text-xs text-blue-800">
                Thank you, <strong>{name}</strong>. A Flow Cleaning team member has received your inquiry and will reach out to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-md shadow-blue-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-50 border border-slate-300 text-xs p-3 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-50 border border-slate-300 text-xs p-3 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(415) 555-0199"
                    className="w-full bg-slate-50 border border-slate-300 text-xs p-3 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-xs p-3 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="General Inquiry">General Question</option>
                    <option value="Commercial Quote">Commercial & Office Cleaning</option>
                    <option value="Booking Modification">Change Existing Booking</option>
                    <option value="Careers">Cleaner Careers & Joining Team</option>
                    <option value="Quality Assurance">Quality Assurance / Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">How Can We Help? *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your home, specific cleaning requirements, or questions..."
                  className="w-full bg-slate-50 border border-slate-300 text-xs p-3 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-200 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Send Message to Dispatch</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Hours Cards on Right */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border border-slate-800">
            <h3 className="text-lg font-bold font-['Lato',sans-serif]">Direct Channels</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Call / Text Dispatch</div>
                  <a href="tel:8005553569" className="text-white font-bold text-sm hover:text-blue-400">
                    (800) 555-FLOW (3569)
                  </a>
                  <p className="text-slate-400 text-[11px]">Instant phone support 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Email Support</div>
                  <a href="mailto:support@flowcleaning.org" className="text-white font-bold text-sm hover:text-blue-400">
                    support@flowcleaning.org
                  </a>
                  <p className="text-slate-400 text-[11px]">Average reply time: 12 minutes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Operating & Dispatch Hours</div>
                  <div className="text-white font-bold text-xs mt-0.5">Monday – Sunday: 7:00 AM – 8:00 PM PST</div>
                  <p className="text-slate-400 text-[11px]">Emergency weekend turns available</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Regional Headquarters</div>
                  <div className="text-white font-bold text-xs mt-0.5">500 Howard Street, Suite 400</div>
                  <p className="text-slate-400 text-[11px]">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee mini box */}
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-blue-950">200% Clean Satisfaction Guarantee</div>
              <p className="text-[11px] text-blue-800">
                Direct hotline support for any quality questions during or post-clean.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
