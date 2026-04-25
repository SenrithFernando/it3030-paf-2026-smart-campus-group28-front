import React, { useState } from 'react';

const BookingForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="date" type="date" onChange={handleChange} required />
      <input name="guests" type="number" min="1" onChange={handleChange} />
      <button type="submit">Next →</button>
    </form>
  );
};

export default BookingForm;