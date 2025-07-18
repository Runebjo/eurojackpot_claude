import React from 'react';

const Statistics = ({ roundHistory, totalSpent, totalWon }) => {
  const totalRounds = roundHistory.length;
  const wins = roundHistory.filter(r => r.prize > 0);
  const winRate = totalRounds > 0 ? (wins.length / totalRounds * 100).toFixed(1) : 0;
  const averageWin = wins.length > 0 ? Math.round(wins.reduce((sum, r) => sum + r.prize, 0) / wins.length) : 0;
  const highestWin = wins.length > 0 ? Math.max(...wins.map(r => r.prize)) : 0;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Statistics</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Rounds:</span>
          <span className="font-medium">{totalRounds}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Winning Rounds:</span>
          <span className="font-medium">{wins.length}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Win Rate:</span>
          <span className="font-medium">{winRate}%</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Average Win:</span>
          <span className="font-medium">{formatCurrency(averageWin)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Highest Win:</span>
          <span className="font-medium text-green-600">{formatCurrency(highestWin)}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;