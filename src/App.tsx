import { useState, useEffect, useRef } from 'react';
import NumberGrid from './components/NumberGrid';
import SimulationControls from './components/SimulationControls';
import FinancialDisplay from './components/FinancialDisplay';
import RoundResult from './components/RoundResult';
import Statistics from './components/Statistics';
import Disclaimer from './components/Disclaimer';
import Modal from './components/Modal';
import PrizeStructure from './components/PrizeStructure';
import Tabs from './components/Tabs';
import {
  MAIN_NUMBERS_RANGE,
  EURO_NUMBERS_RANGE,
  MAIN_NUMBERS_COUNT,
  EURO_NUMBERS_COUNT,
  ROUND_COST,
  PRIZE_TIERS,
  quickPick,
  drawNumbers,
  calculateMatches,
  calculatePrize,
  validateNumberSelection,
} from './utils/gameLogic';

function App() {
  // State for two sets of numbers
  const [mainNumbersSet1, setMainNumbersSet1] = useState<number[]>([]);
  const [euroNumbersSet1, setEuroNumbersSet1] = useState<number[]>([]);
  const [mainNumbersSet2, setMainNumbersSet2] = useState<number[]>([]);
  const [euroNumbersSet2, setEuroNumbersSet2] = useState<number[]>([]);
  
  const [activeTab, setActiveTab] = useState('set1');
  const [totalRounds, setTotalRounds] = useState(10000);
  const [speed, setSpeed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalWon, setTotalWon] = useState(0);
  const [roundHistory, setRoundHistory] = useState<any[]>([]);
  const [showRecentRounds, setShowRecentRounds] = useState(false);
  const [winStats, setWinStats] = useState<{[tier: number]: number}>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMainNumberClick = (num: number) => {
    if (activeTab === 'set1') {
      if (mainNumbersSet1.includes(num)) {
        setMainNumbersSet1(mainNumbersSet1.filter(n => n !== num));
      } else if (mainNumbersSet1.length < MAIN_NUMBERS_COUNT) {
        setMainNumbersSet1([...mainNumbersSet1, num].sort((a, b) => a - b));
      }
    } else {
      if (mainNumbersSet2.includes(num)) {
        setMainNumbersSet2(mainNumbersSet2.filter(n => n !== num));
      } else if (mainNumbersSet2.length < MAIN_NUMBERS_COUNT) {
        setMainNumbersSet2([...mainNumbersSet2, num].sort((a, b) => a - b));
      }
    }
  };

  const handleEuroNumberClick = (num: number) => {
    if (activeTab === 'set1') {
      if (euroNumbersSet1.includes(num)) {
        setEuroNumbersSet1(euroNumbersSet1.filter(n => n !== num));
      } else if (euroNumbersSet1.length < EURO_NUMBERS_COUNT) {
        setEuroNumbersSet1([...euroNumbersSet1, num].sort((a, b) => a - b));
      }
    } else {
      if (euroNumbersSet2.includes(num)) {
        setEuroNumbersSet2(euroNumbersSet2.filter(n => n !== num));
      } else if (euroNumbersSet2.length < EURO_NUMBERS_COUNT) {
        setEuroNumbersSet2([...euroNumbersSet2, num].sort((a, b) => a - b));
      }
    }
  };

  const handleQuickPick = () => {
    const picks1 = quickPick();
    const picks2 = quickPick();
    
    setMainNumbersSet1(picks1.mainNumbers);
    setEuroNumbersSet1(picks1.euroNumbers);
    setMainNumbersSet2(picks2.mainNumbers);
    setEuroNumbersSet2(picks2.euroNumbers);
  };

  const runSingleRound = () => {
    const drawnNumbers = drawNumbers();
    
    // Process Set 1
    const userNumbersSet1 = { mainNumbers: mainNumbersSet1, euroNumbers: euroNumbersSet1 };
    const matchesSet1 = calculateMatches(userNumbersSet1, drawnNumbers);
    const prizeSet1 = calculatePrize(matchesSet1);
    
    // Process Set 2
    const userNumbersSet2 = { mainNumbers: mainNumbersSet2, euroNumbers: euroNumbersSet2 };
    const matchesSet2 = calculateMatches(userNumbersSet2, drawnNumbers);
    const prizeSet2 = calculatePrize(matchesSet2);
    
    const totalPrize = prizeSet1 + prizeSet2;
    
    setTotalSpent(prev => prev + ROUND_COST);
    setTotalWon(prev => prev + totalPrize);
    setCurrentRound(prev => prev + 1);
    
    // Update win statistics for both sets
    [
      { matches: matchesSet1, prize: prizeSet1 },
      { matches: matchesSet2, prize: prizeSet2 }
    ].forEach(({ matches, prize }) => {
      if (prize > 0) {
        const winningTier = PRIZE_TIERS.find(tier => 
          tier.mainMatches === matches.mainMatches && 
          tier.euroMatches === matches.euroMatches
        );
        if (winningTier) {
          setWinStats(prev => ({
            ...prev,
            [winningTier.tier]: (prev[winningTier.tier] || 0) + 1
          }));
        }
      }
    });
    
    const roundResult = {
      round: currentRound + 1,
      drawnNumbers,
      sets: [
        { userNumbers: userNumbersSet1, matches: matchesSet1, prize: prizeSet1 },
        { userNumbers: userNumbersSet2, matches: matchesSet2, prize: prizeSet2 }
      ],
      totalPrize
    };
    
    setRoundHistory(prev => [roundResult, ...prev.slice(0, 9)]);
  };

  const startSimulation = () => {
    if (!validateNumberSelection(mainNumbersSet1, MAIN_NUMBERS_COUNT, MAIN_NUMBERS_RANGE) ||
        !validateNumberSelection(euroNumbersSet1, EURO_NUMBERS_COUNT, EURO_NUMBERS_RANGE) ||
        !validateNumberSelection(mainNumbersSet2, MAIN_NUMBERS_COUNT, MAIN_NUMBERS_RANGE) ||
        !validateNumberSelection(euroNumbersSet2, EURO_NUMBERS_COUNT, EURO_NUMBERS_RANGE)) {
      alert('Please select all required numbers for both sets before starting the simulation.');
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    
    // Always reset when starting a new simulation
    setCurrentRound(0);
    setTotalSpent(0);
    setTotalWon(0);
    setRoundHistory([]);
    setWinStats({});

    if (speed === 0) {
      // Instant mode
      let round = 0;
      let spent = 0;
      let won = 0;
      let history = [];
      let stats = {};
      
      while (round < totalRounds) {
        const drawnNumbers = drawNumbers();
        
        // Process Set 1
        const userNumbersSet1 = { mainNumbers: mainNumbersSet1, euroNumbers: euroNumbersSet1 };
        const matchesSet1 = calculateMatches(userNumbersSet1, drawnNumbers);
        const prizeSet1 = calculatePrize(matchesSet1);
        
        // Process Set 2
        const userNumbersSet2 = { mainNumbers: mainNumbersSet2, euroNumbers: euroNumbersSet2 };
        const matchesSet2 = calculateMatches(userNumbersSet2, drawnNumbers);
        const prizeSet2 = calculatePrize(matchesSet2);
        
        const totalPrize = prizeSet1 + prizeSet2;
        
        spent += ROUND_COST;
        won += totalPrize;
        round += 1;
        
        // Update win statistics for both sets
        [
          { matches: matchesSet1, prize: prizeSet1 },
          { matches: matchesSet2, prize: prizeSet2 }
        ].forEach(({ matches, prize }) => {
          if (prize > 0) {
            const winningTier = PRIZE_TIERS.find(tier => 
              tier.mainMatches === matches.mainMatches && 
              tier.euroMatches === matches.euroMatches
            );
            if (winningTier) {
              stats[winningTier.tier] = (stats[winningTier.tier] || 0) + 1;
            }
          }
        });
        
        const roundResult = {
          round,
          drawnNumbers,
          sets: [
            { userNumbers: userNumbersSet1, matches: matchesSet1, prize: prizeSet1 },
            { userNumbers: userNumbersSet2, matches: matchesSet2, prize: prizeSet2 }
          ],
          totalPrize
        };
        
        history = [roundResult, ...history.slice(0, 9)];
      }
      
      setTotalSpent(spent);
      setTotalWon(won);
      setCurrentRound(round);
      setRoundHistory(history);
      setWinStats(stats);
      setIsRunning(false);
    } else {
      // Timed mode
      const delay = 1000 / speed;
      intervalRef.current = setInterval(() => {
        runSingleRound();
      }, delay);
    }
  };

  const pauseSimulation = () => {
    setIsPaused(true);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentRound(0);
    setTotalSpent(0);
    setTotalWon(0);
    setRoundHistory([]);
    setWinStats({});
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isRunning && currentRound >= totalRounds) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [currentRound, totalRounds, isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            EuroJackpot Simulator
          </h1>
          <p className="text-gray-600">Experience the thrill without the bills</p>
        </div>
        
        <Disclaimer />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Select Your Numbers</h2>
                <button
                  onClick={handleQuickPick}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  🎲 Quick Pick Both Sets
                </button>
              </div>
              
              <Tabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={[
                  {
                    id: 'set1',
                    label: 'Set 1',
                    content: (
                      <>
                        <NumberGrid
                          range={MAIN_NUMBERS_RANGE}
                          count={MAIN_NUMBERS_COUNT}
                          selectedNumbers={mainNumbersSet1}
                          onNumberClick={handleMainNumberClick}
                          title="Main Numbers (Select 5)"
                          color="blue"
                        />
                        
                        <NumberGrid
                          range={EURO_NUMBERS_RANGE}
                          count={EURO_NUMBERS_COUNT}
                          selectedNumbers={euroNumbersSet1}
                          onNumberClick={handleEuroNumberClick}
                          title="Euro Numbers (Select 2)"
                          color="yellow"
                        />
                      </>
                    )
                  },
                  {
                    id: 'set2',
                    label: 'Set 2',
                    content: (
                      <>
                        <NumberGrid
                          range={MAIN_NUMBERS_RANGE}
                          count={MAIN_NUMBERS_COUNT}
                          selectedNumbers={mainNumbersSet2}
                          onNumberClick={handleMainNumberClick}
                          title="Main Numbers (Select 5)"
                          color="blue"
                        />
                        
                        <NumberGrid
                          range={EURO_NUMBERS_RANGE}
                          count={EURO_NUMBERS_COUNT}
                          selectedNumbers={euroNumbersSet2}
                          onNumberClick={handleEuroNumberClick}
                          title="Euro Numbers (Select 2)"
                          color="yellow"
                        />
                      </>
                    )
                  }
                ]}
              />
            </div>
            
            <PrizeStructure winStats={winStats} />
            
            {roundHistory.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowRecentRounds(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-4"
                >
                  View Recent Rounds ({roundHistory.length})
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <SimulationControls
              rounds={totalRounds}
              setRounds={setTotalRounds}
              speed={speed}
              setSpeed={setSpeed}
              isRunning={isRunning}
              onStart={startSimulation}
              onPause={pauseSimulation}
              onStop={stopSimulation}
            />
            
            <FinancialDisplay
              totalSpent={totalSpent}
              totalWon={totalWon}
              currentRound={currentRound}
              totalRounds={totalRounds}
            />
            
            {roundHistory.length > 0 && (
              <Statistics
                roundHistory={roundHistory}
                totalSpent={totalSpent}
                totalWon={totalWon}
              />
            )}
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={showRecentRounds}
        onClose={() => setShowRecentRounds(false)}
        title="Recent Round Results"
      >
        <div className="space-y-4">
          {roundHistory.map((result, index) => (
            <RoundResult key={index} {...result} />
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default App;