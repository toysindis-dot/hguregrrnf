
import React from 'react';
import { Car } from '../types';

interface CarModalProps {
  car: Car;
  onClose: () => void;
}

export const CarModal: React.FC<CarModalProps> = ({ car, onClose }) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-slate-100 transition-colors shadow-sm"
        >
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-auto overflow-hidden">
            <img 
              src={car.imageUrl} 
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {car.category}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {car.make} {car.model}
              </h2>
              <p className="text-slate-500 mt-1">{car.year} Model Year</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Market Price</p>
                <p className="text-xl font-bold text-indigo-600">{formatPrice(car.marketPrice, car.currency)}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">License Type</p>
                <p className="text-xl font-bold text-slate-800">{car.licenseRequired}</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              {car.description}
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">DIY Home Fixes</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {car.diyFixes.map((fix, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-900 pr-2">{fix.problem}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    fix.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                    fix.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {fix.difficulty}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tools Needed</p>
                  <div className="flex flex-wrap gap-1">
                    {fix.toolsNeeded.map((tool, tIdx) => (
                      <span key={tIdx} className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Steps</p>
                  {fix.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex gap-2">
                      <span className="text-xs font-bold text-indigo-400">{sIdx + 1}.</span>
                      <p className="text-xs text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
