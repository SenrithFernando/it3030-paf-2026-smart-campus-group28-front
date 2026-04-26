import React from 'react';

const Confirmation = ({ onPrev }) => {
  return (
    <div className="confirmation">
      <h2>✓ Booking Confirmed!</h2>
      <p>Your reservation is complete at step 0.5</p>
      <button onClick={onPrev}>← Back</button>
    </div>
  );
};

export default Confirmation;