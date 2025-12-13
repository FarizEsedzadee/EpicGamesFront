import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';
import data from "@/data/data.json";
import FreeGameCard from '@/components/ui/FreeGameCard';

export default function FreeGames({ 
  title = "Ücretsiz Oyunlar",
  filter = null,
  games = null,
  limit = 2,
  showViewMore = true,
  onViewMoreClick = null
}) {
  const navigate = useNavigate();
  // Filter games based on filter function or use provided games
  const filteredGames = useMemo(() => {
    let result = games || data.results;
    
    if (filter && typeof filter === 'function') {
      result = result.filter(filter);
    } else if (filter && typeof filter === 'object') {
      result = result.filter(game => {
        if (filter.isFree !== undefined && game.isFree !== filter.isFree) return false;
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
    console.log('Free game clicked:', game.title);
  };

  return (
    <div className="w-full bg-[rgb(32,32,36)] p-[30px] rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Gift className="text-white" size={24} />
          <h2 className="text-white text-2xl font-bold">{title}</h2>
        </div>
        
        {showViewMore && (
          <button 
            onClick={() => {
              if (onViewMoreClick) {
                onViewMoreClick();
              } else {
                navigate('/browse?price=free');
              }
            }}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-sm font-medium"
          >
            Daha Fazla Görüntüle
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGames.map((game) => (
          <FreeGameCard 
            key={game.gameId} 
            game={game}
            onButtonClick={() => handleCardClick(game)}
          />
        ))}
      </div>
    </div>
  );
}

