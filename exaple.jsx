cat > booking.tsx << 'EOF'
import React, { useState } from 'react';

interface BookingWidgetProps {
  // Optional props for future enhancements
  className?: string;
  onSearch?: (searchData: SearchData) => void;
}

interface SearchData {
  type: 'flight' | 'hotel';
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  passengers: number;
  rooms?: number;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ className = '', onSearch }) => {
  const [bookingType, setBookingType] = useState<'flight' | 'hotel'>('flight');
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  
  // Flight specific states
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [departDate, setDepartDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<string>('economy');
  
  // Hotel specific states
  const [destination, setDestination] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [rooms, setRooms] = useState<number>(1);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (bookingType === 'flight') {
      const searchData: SearchData = {
        type: 'flight',
        from,
        to,
        departDate,
        returnDate: tripType === 'round' ? returnDate : undefined,
        passengers,
        cabinClass
      };
      
      console.log('Searching flights:', searchData);
      
      if (onSearch) {
        onSearch(searchData);
      } else {
        alert(`Searching ${tripType} flights from ${from} to ${to} on ${departDate}`);
      }
    } else {
      const searchData: SearchData = {
        type: 'hotel',
        destination,
        checkIn,
        checkOut,
        guests: passengers,
        rooms
      };
      
      console.log('Searching hotels:', searchData);
      
      if (onSearch) {
        onSearch(searchData);
      } else {
        alert(`Searching hotels in ${destination} from ${checkIn} to ${checkOut}`);
      }
    }
  };

  return (
    <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Booking Type Selector */}
      <div className="flex border-b border-gray-200 bg-gray-50/50">
        <button
          type="button"
          onClick={() => setBookingType('flight')}
          className={`flex-1 py-4 text-center font-semibold transition-all duration-200 ${
            bookingType === 'flight'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          ✈️ Flights
        </button>
        <button
          type="button"
          onClick={() => setBookingType('hotel')}
          className={`flex-1 py-4 text-center font-semibold transition-all duration-200 ${
            bookingType === 'hotel'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          🏨 Hotels
        </button>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSearch}>
          {/* Flight Booking Form */}
          {bookingType === 'flight' && (
            <div className="space-y-6">
              {/* Trip Type Selector */}
              <div className="flex gap-4 border-b border-gray-200 pb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="round"
                    checked={tripType === 'round'}
                    onChange={(e) => setTripType(e.target.value as 'round' | 'oneway')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Round Trip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={tripType === 'oneway'}
                    onChange={(e) => setTripType(e.target.value as 'round' | 'oneway')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">One Way</span>
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    placeholder="City or airport"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    placeholder="City or airport"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure
                  </label>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                {tripType === 'round' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'passenger' : 'passengers'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cabin Class
                  </label>
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Booking Form */}
          {bookingType === 'hotel' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination / Hotel name
                </label>
                <input
                  type="text"
                  placeholder="City, region, or hotel name"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rooms
                  </label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'room' : 'rooms'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {bookingType === 'flight' ? '🔍 Search Flights' : '🏨 Search Hotels'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500 flex justify-between border-t border-gray-200">
        <span>✓ Best price guarantee</span>
        <span>✓ Free cancellation</span>
        <span>✓ 24/7 support</span>
      </div>
    </div>
  );
};

export default BookingWidget;
EOF
