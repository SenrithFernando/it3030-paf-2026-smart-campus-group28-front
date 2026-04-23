// components/DatePicker.tsx
import React from 'react';

interface DatePickerProps {
  departDate: string;
  returnDate: string;
  onDepartChange: (date: string) => void;
  onReturnChange: (date: string) => void;
  tripType: 'oneway' | 'round';
}

const DatePicker: React.FC<DatePickerProps> = ({
  departDate,
  returnDate,
  onDepartChange,
  onReturnChange,
  tripType
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Departure Date</label>
        <input
          type="date"
          value={departDate}
          onChange={(e) => onDepartChange(e.target.value)}
          min={today}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      {tripType === 'round' && (
        <div>
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => onReturnChange(e.target.value)}
            min={departDate || today}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
