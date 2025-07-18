import React from 'react';

const FinancialDisplay = ({ totalSpent, totalWon, currentRound, totalRounds }) => {
  const netProfitLoss = totalWon - totalSpent;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">💰 Financial Summary</h3>
      
      {totalRounds > 0 && (
        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Round {currentRound} of {totalRounds}
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Spent:</span>
            <span className="font-bold text-xl text-red-600">{formatCurrency(totalSpent)}</span>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Won:</span>
            <span className="font-bold text-xl text-green-600">{formatCurrency(totalWon)}</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${netProfitLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-bold">Net Profit/Loss:</span>
            <span className={`font-bold text-2xl ${netProfitLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(netProfitLoss)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDisplay;