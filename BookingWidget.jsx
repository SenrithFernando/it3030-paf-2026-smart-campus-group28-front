// components/BookingHeader.tsx
import React from 'react';

interface BookingHeaderProps {
  title?: string;
  activeTab: 'flight' | 'hotel' | 'car';
  onTabChange: (tab: 'flight' | 'hotel' | 'car') => void;
  userName?: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({
  title = "Book Your Trip",
  activeTab,
  onTabChange,
  userName = "Guest"
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-4 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl">TravelBook</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Welcome, {userName}</span>
            <button className="text-sm hover:text-blue-200">My Bookings</button>
          </div>
        </div>

        {/* Title */}
        <div className="py-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-blue-100">Best deals guaranteed</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-2 pb-0">
          {[
            { id: 'flight', icon: '✈️', label: 'Flights' },
            { id: 'hotel', icon: '🏨', label: 'Hotels' },
            { id: 'car', icon: '🚗', label: 'Cars' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`px-6 py-3 rounded-t-lg transition ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 font-semibold'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default BookingHeader;
