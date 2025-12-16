import React, { useMemo } from 'react';
import data from "@/data/data.json";
import WeeklyDealCard from '@/components/ui/WeeklyDealCard';

export default function WeeklyDeals({
  filter = null,
  games = null,
  limit = 3
}) {
  // Filter games based on filter function or use provided games
  const filteredGames = useMemo(() => {
    let result = games || data.results;

    if (filter && typeof filter === 'function') {
      result = result.filter(filter);
    } else if (filter && typeof filter === 'object') {
      result = result.filter(game => {
        if (filter.isFree !== undefined && game.isFree !== filter.isFree) return false;
        if (filter.minDiscount !== undefined && (!game.price?.discountRate || game.price.discountRate < filter.minDiscount)) return false;
        if (filter.productType && game.productType !== filter.productType) return false;
        return true;
      });
    }

    return result.slice(0, limit);
  }, [filter, games, limit]);

  // Don't render if no games
  if (!filteredGames || filteredGames.length === 0) {
    return null;
  }

  const handleCardClick = (game) => {
    // Handle card click action
    console.log('Card clicked:', game.title);
  };

  return (
    <div className="w-full">
      {/* Header */}
      {/*     <div className="mb-6">
        <h2 className="text-white text-2xl font-bold">Haftanın Fırsatları</h2>
      </div> */}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <WeeklyDealCard
            key={game.gameId}
            game={game}
            onButtonClick={() => handleCardClick(game)}
          />
        ))}
      </div>
    </div>
  );
}

