import React from 'react';

const NumberGrid = ({ range, count, selectedNumbers, onNumberClick, title, color = 'blue' }) => {
  const numbers = [];
  for (let i = range.min; i <= range.max; i++) {
    numbers.push(i);
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-700">{title}</h3>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 max-w-2xl">
        {numbers.map(num => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            disabled={selectedNumbers.length >= count && !selectedNumbers.includes(num)}
            className={`
              w-12 h-12 rounded-lg font-semibold text-sm
              transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md
              ${selectedNumbers.includes(num) 
                ? color === 'blue' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-700 shadow-blue-200' 
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-2 border-yellow-600 shadow-yellow-200'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'}
              ${selectedNumbers.length >= count && !selectedNumbers.includes(num) 
                ? 'opacity-40 cursor-not-allowed hover:scale-100' 
                : 'cursor-pointer'}
            `}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className={`h-2 bg-gray-200 rounded-full flex-1 max-w-xs overflow-hidden`}>
          <div 
            className={`h-full transition-all duration-300 ${
              color === 'blue' ? 'bg-blue-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${(selectedNumbers.length / count) * 100}%` }}
          />
        </div>
        <p className="text-sm font-medium text-gray-600">
          {selectedNumbers.length}/{count}
        </p>
      </div>
    </div>
  );
};

export default NumberGrid;