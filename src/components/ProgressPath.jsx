import React from 'react';
import { PawPrint, Leaf, Bug, Map } from 'lucide-react';

export default function ProgressPath({ currentStep, jumpToStep, maxStepReached }) {
  const steps = [
    { id: 1, icon: PawPrint },
    { id: 2, icon: Leaf },
    { id: 3, icon: Bug },
    { id: 4, icon: Map },
  ];

  return (
    <div className="w-full py-4 px-2">
      <div className="flex items-center justify-between relative max-w-sm mx-auto">
        {/* Background 'Path' Line */}
        <div className="absolute top-1/2 left-0 w-full border-t-4 border-dashed border-yellow-500/40 -z-10" />
        
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isPassed = currentStep > step.id;
          const isClickable = step.id <= maxStepReached;
          
          return (
            <button 
              key={step.id} 
              onClick={() => isClickable && jumpToStep(step.id)}
              disabled={!isClickable}
              className={`flex justify-center items-center rounded-full transition-all duration-300 transform 
                ${isActive ? 'scale-125 bg-yellow-400 shadow-lg text-green-900 ring-4 ring-yellow-200 cursor-default' 
                : isPassed ? 'bg-green-700 text-yellow-200 scale-100 shadow-md cursor-pointer hover:bg-green-600 hover:scale-110' 
                : isClickable ? 'bg-yellow-100 text-green-700 scale-100 shadow-sm cursor-pointer hover:bg-yellow-200 hover:scale-110'
                : 'bg-yellow-200 text-yellow-600/50 scale-90 cursor-not-allowed'}`}
              style={{ width: '3rem', height: '3rem' }}
              title={isClickable ? `Vai allo step ${step.id}` : ''}
            >
              <Icon size={isActive ? 28 : 22} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
