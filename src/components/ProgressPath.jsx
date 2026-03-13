import React from 'react';
import { PawPrint, Leaf, Bug, Map } from 'lucide-react';

export default function ProgressPath({ currentStep }) {
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
          
          return (
            <div 
              key={step.id} 
              className={`flex justify-center items-center rounded-full transition-all duration-300 transform 
                ${isActive ? 'scale-125 bg-yellow-400 shadow-lg text-green-900 ring-4 ring-yellow-200' 
                : isPassed ? 'bg-green-700 text-yellow-200 scale-100 shadow-md' 
                : 'bg-yellow-200 text-yellow-600/50 scale-90'}`}
              style={{ width: '3rem', height: '3rem' }}
            >
              <Icon size={isActive ? 28 : 22} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
