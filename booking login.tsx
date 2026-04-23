import React, { useState } from 'react';
import BookingHeader from './BookingHeader';
import BookingWidget from './BookingWidget';

const BookingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flight' | 'hotel' | 'car'>('flight');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <BookingHeader 
        title="Start Your Adventure"
        subtitle="Compare prices from 500+ airlines and hotels"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showUserInfo={true}
        userName="John Doe"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Booking Form */}
          <BookingWidget />
          
          {/* Featured Deals Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🔥 Featured Deals
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-3xl mb-2">🗽</div>
                <h4 className="font-bold">New York</h4>
                <p className="text-gray-600">From $299</p>
                <button className="mt-2 text-blue-600 text-sm">View Deal →</button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-3xl mb-2">🇯🇵</div>
                <h4 className="font-bold">Tokyo</h4>
                <p className="text-gray-600">From $599</p>
                <button className="mt-2 text-blue-600 text-sm">View Deal →</button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-3xl mb-2">🇫🇷</div>
                <h4 className="font-bold">Paris</h4>
                <p className="text-gray-600">From $449</p>
                <button className="mt-2 text-blue-600 text-sm">View Deal →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
