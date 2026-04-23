// In your App.tsx or main file
import React from 'react';
import BookingHeader from './components/BookingHeader';
import BookingWidget from './components/BookingWidget';

function App() {
  const handleTabChange = (tab: 'flight' | 'hotel' | 'car') => {
    console.log('Switched to:', tab);
    // Update your state or fetch new data
  };

  return (
    <div>
      <BookingHeader 
        title="Book Your Next Adventure"
        subtitle="Exclusive deals on flights, hotels, and car rentals"
        activeTab="flight"
        onTabChange={handleTabChange}
        showUserInfo={true}
        userName="Traveler"
      />
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <BookingWidget />
      </div>
    </div>
  );
}

export default App;
