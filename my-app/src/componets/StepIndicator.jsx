import React from 'react';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={index} className={`step ${currentStep >= step ? 'active' : ''}`}>
          <div className="step-circle">{step}</div>
          {index < steps.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;