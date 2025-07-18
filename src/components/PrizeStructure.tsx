import { PRIZE_TIERS } from '../utils/gameLogic';

interface WinStats {
  [tier: number]: number;
}

interface PrizeStructureProps {
  winStats: WinStats;
}

const PrizeStructure = ({ winStats }: PrizeStructureProps) => {
  const formatPrize = (amount: number) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatOdds = (odds: number) => {
    return `1:${new Intl.NumberFormat('da-DK').format(odds)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Prize Structure</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2">Tier</th>
              <th className="text-center py-2 px-2">Match</th>
              <th className="text-right py-2 px-2">Prize</th>
              <th className="text-right py-2 px-2">Odds</th>
              <th className="text-right py-2 px-2">Wins</th>
            </tr>
          </thead>
          <tbody>
            {PRIZE_TIERS.map((tier) => (
              <tr 
                key={tier.tier} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  winStats[tier.tier] > 0 ? 'bg-green-50' : ''
                }`}
              >
                <td className="py-2 px-2 font-medium">{tier.tier}</td>
                <td className="text-center py-2 px-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                      {tier.mainMatches}
                    </span>
                    <span className="text-gray-500">+</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-medium">
                      {tier.euroMatches}
                    </span>
                  </span>
                </td>
                <td className="text-right py-2 px-2 font-medium text-green-600">
                  {formatPrize(tier.prize)}
                </td>
                <td className="text-right py-2 px-2 text-gray-500 text-xs">
                  {formatOdds(tier.odds)}
                </td>
                <td className="text-right py-2 px-2">
                  <span className={`font-bold ${winStats[tier.tier] > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {winStats[tier.tier] || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrizeStructure;