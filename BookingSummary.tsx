// components/BookingSummary.tsx
import React from 'react';

interface BookingSummaryProps {
  bookingDetails: any;
  onConfirm: () => void;
  onEdit: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingDetails,
  onConfirm,
  onEdit
}) => {
  const calculateTotal = () => {
    // Calculate based on your pricing logic
    return 299.99;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
      
      <div className="space-y-4">
        {/* Flight Details */}
        {bookingDetails.type === 'flight' && (
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-2">Flight Details</h3>
            <div className="flex justify-between">
              <span>From:</span>
              <span className="font-medium">{bookingDetails.from}</span>
            </div>
            <div className="flex justify-between">
              <span>To:</span>
              <span className="font-medium">{bookingDetails.to}</span>
            </div>
            <div className="flex justify-between">
              <span>Departure:</span>
              <span>{bookingDetails.departDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Passengers:</span>
              <span>{bookingDetails.passengers}</span>
            </div>
          </div>
        )}

        {/* Hotel Details */}
        {bookingDetails.type === 'hotel' && (
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-2">Hotel Details</h3>
            <div className="flex justify-between">
              <span>Destination:</span>
              <span className="font-medium">{bookingDetails.destination}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-in:</span>
              <span>{bookingDetails.checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span>{bookingDetails.checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span>Rooms:</span>
              <span>{bookingDetails.rooms}</span>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-2">Price Details</h3>
          <div className="flex justify-between">
            <span>Base Fare:</span>
            <span>$250.00</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Fees:</span>
            <span>$49.99</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Edit Details
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
