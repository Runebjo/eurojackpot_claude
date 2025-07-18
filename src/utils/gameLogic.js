export const MAIN_NUMBERS_RANGE = { min: 1, max: 50 };
export const EURO_NUMBERS_RANGE = { min: 1, max: 12 };
export const MAIN_NUMBERS_COUNT = 5;
export const EURO_NUMBERS_COUNT = 2;
export const ROUND_COST = 50;

export const PRIZE_TIERS = [
  { tier: 1, mainMatches: 5, euroMatches: 2, odds: 140000000, prize: 300000000 },
  { tier: 2, mainMatches: 5, euroMatches: 1, odds: 6991908, prize: 7500000 },
  { tier: 3, mainMatches: 5, euroMatches: 0, odds: 3107515, prize: 2000000 },
  { tier: 4, mainMatches: 4, euroMatches: 2, odds: 621503, prize: 125000 },
  { tier: 5, mainMatches: 4, euroMatches: 1, odds: 31075, prize: 3500 },
  { tier: 6, mainMatches: 3, euroMatches: 2, odds: 14125, prize: 1000 },
  { tier: 7, mainMatches: 4, euroMatches: 0, odds: 13811, prize: 550 },
  { tier: 8, mainMatches: 2, euroMatches: 2, odds: 985, prize: 300 },
  { tier: 9, mainMatches: 3, euroMatches: 1, odds: 706, prize: 200 },
  { tier: 10, mainMatches: 3, euroMatches: 0, odds: 314, prize: 125 },
  { tier: 11, mainMatches: 1, euroMatches: 2, odds: 188, prize: 85 },
  { tier: 12, mainMatches: 2, euroMatches: 1, odds: 49, prize: 60 },
];

export const generateRandomNumbers = (count, min, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

export const quickPick = () => {
  return {
    mainNumbers: generateRandomNumbers(MAIN_NUMBERS_COUNT, MAIN_NUMBERS_RANGE.min, MAIN_NUMBERS_RANGE.max),
    euroNumbers: generateRandomNumbers(EURO_NUMBERS_COUNT, EURO_NUMBERS_RANGE.min, EURO_NUMBERS_RANGE.max),
  };
};

export const drawNumbers = () => {
  return quickPick();
};

export const calculateMatches = (userNumbers, drawnNumbers) => {
  const mainMatches = userNumbers.mainNumbers.filter(num => 
    drawnNumbers.mainNumbers.includes(num)
  ).length;
  
  const euroMatches = userNumbers.euroNumbers.filter(num => 
    drawnNumbers.euroNumbers.includes(num)
  ).length;
  
  return { mainMatches, euroMatches };
};

export const calculatePrize = (matches) => {
  const { mainMatches, euroMatches } = matches;
  
  const winningTier = PRIZE_TIERS.find(tier => 
    tier.mainMatches === mainMatches && tier.euroMatches === euroMatches
  );
  
  return winningTier ? winningTier.prize : 0;
};

export const validateNumberSelection = (numbers, count, range) => {
  if (!Array.isArray(numbers)) return false;
  if (numbers.length !== count) return false;
  if (new Set(numbers).size !== count) return false;
  
  return numbers.every(num => 
    Number.isInteger(num) && num >= range.min && num <= range.max
  );
};