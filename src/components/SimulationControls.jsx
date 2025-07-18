import React from 'react';

const SPEED_OPTIONS = [
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 5, label: '5x' },
  { value: 10, label: '10x' },
  { value: 50, label: '50x' },
  { value: 100, label: '100x' },
  { value: 0, label: 'Instant' },
];

const SimulationControls = ({ 
  rounds, 
  setRounds, 
  speed, 
  setSpeed, 
  isRunning, 
  onStart, 
  onPause, 
  onStop 
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🎮 Simulation Controls</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Number of Rounds</label>
          <input
            type="number"
            min="1"
            value={rounds}
            onChange={(e) => setRounds(Math.max(1, parseInt(e.target.value) || 1))}
            disabled={isRunning}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Speed</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isRunning}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          >
            {SPEED_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-3 pt-2">
          {!isRunning ? (
            <button
              onClick={onStart}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              ▶️ Start Simulation
            </button>
          ) : (
            <>
              <button
                onClick={onPause}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg"
              >
                ⏸️ Pause
              </button>
              <button
                onClick={onStop}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
              >
                ⏹️ Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;