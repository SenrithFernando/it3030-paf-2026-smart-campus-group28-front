import React, { useState } from 'react';

const PaymentSection = ({ onNext, onPrev }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <div className="payment-section">
      <h3>Payment Details</h3>
      <select onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="">Select Method</option>
        <option value="card">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      <div className="button-group">
        <button onClick={onPrev}>← Back</button>
        <button onClick={onNext} disabled={!paymentMethod}>Next →</button>
      </div>
    </div>
  );
};

export default PaymentSection;