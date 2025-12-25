
import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      onClick={() => onClick(car)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {car.category}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-slate-500">{car.year}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">
              {formatPrice(car.marketPrice, car.currency)}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">License Required:</span>
          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
            {car.licenseRequired}
          </span>
        </div>
      </div>
    </div>
  );
};
