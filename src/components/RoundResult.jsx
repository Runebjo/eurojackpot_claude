import React from 'react';

const RoundResult = ({ round, drawnNumbers, sets, totalPrize }) => {
  const isMatch = (number, numberArray) => numberArray.includes(number);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Round {round}</h4>
        {totalPrize > 0 && (
          <span className="text-green-600 font-bold">
            Won {totalPrize.toLocaleString()} DKK!
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <p className="font-medium mb-2">Drawn Numbers:</p>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1">
            {drawnNumbers.mainNumbers.map(num => (
              <span
                key={num}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-medium"
              >
                {num}
              </span>
            ))}
          </div>
          <span className="text-gray-400">+</span>
          <div className="flex gap-1">
            {drawnNumbers.euroNumbers.map(num => (
              <span
                key={num}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white text-xs font-medium"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        {sets.map((set, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded">
            <p className="font-medium mb-2">Set {index + 1}:</p>
            <div className="flex gap-1 mb-2">
              {set.userNumbers.mainNumbers.map(num => (
                <span
                  key={num}
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium
                    ${isMatch(num, drawnNumbers.mainNumbers) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700'}`}
                >
                  {num}
                </span>
              ))}
            </div>
            <div className="flex gap-1 mb-2">
              {set.userNumbers.euroNumbers.map(num => (
                <span
                  key={num}
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium
                    ${isMatch(num, drawnNumbers.euroNumbers) 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-700'}`}
                >
                  {num}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-600">
              {set.matches.mainMatches}+{set.matches.euroMatches} matches
              {set.prize > 0 && (
                <span className="text-green-600 font-semibold ml-2">
                  {set.prize.toLocaleString()} DKK
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundResult;