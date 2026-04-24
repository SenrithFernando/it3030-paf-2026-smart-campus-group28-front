import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import BookingForm from './BookingForm';
import PaymentSection from './PaymentSection';
import Confirmation from './Confirmation';

const BookingStepper = () => {
  const [currentStep, setCurrentStep] = useState(0.0);
  const steps = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5];

  const handleNext = () => {
    if (currentStep < 0.5) {
      setCurrentStep(prev => +(prev + 0.1).toFixed(1));
    }
  };

  const handlePrev = () => {
    if (currentStep > 0.0) {
      setCurrentStep(prev => +(prev - 0.1).toFixed(1));
    }
  };

  return (
    <div className="booking-container">
      <StepIndicator currentStep={currentStep} steps={steps} />
      {currentStep === 0.0 && <BookingForm onNext={handleNext} />}
      {currentStep === 0.1 && <PaymentSection onNext={handleNext} onPrev={handlePrev} />}
      {currentStep === 0.2 && <Confirmation onPrev={handlePrev} />}
    </div>
  );
};

export default BookingStepper;