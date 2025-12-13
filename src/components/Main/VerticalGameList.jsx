import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import data from "@/data/data.json";
import VerticalGameItem from '@/components/ui/VerticalGameItem';

export default function VerticalGameList({ 
  title,
  filter = null,
  games = null,
  limit = 5,
  showArrow = true,
  showTrial = false,
  onTitleClick = null,
  titleUrl = null
}) {
  const navigate = useNavigate();
  
  const handleTitleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTitleClick) {
      onTitleClick();
    } else if (titleUrl) {
      console.log('Navigating to:', titleUrl);
      navigate(titleUrl);
    } else {
      console.log('No titleUrl or onTitleClick provided');
    }
  };
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

  return (
    <div className="w-full">
      {/* Header */}
      <div 
        className={`flex items-center justify-between mb-4 ${onTitleClick || titleUrl || showArrow ? 'cursor-pointer' : ''}`}
        onClick={(e) => {
          if (onTitleClick || titleUrl) {
            handleTitleClick(e);
          }
        }}
      >
        <div className="flex items-center gap-2 group">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          {showArrow && (
            <ArrowRight 
              size={18} 
              className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" 
            />
          )}
        </div>
      </div>

      {/* Vertical List */}
      <div className="flex flex-col gap-1">
        {filteredGames.map((game) => (
          <VerticalGameItem 
            key={game.gameId} 
            game={game}
            showTrial={showTrial}
          />
        ))}
      </div>
    </div>
  );
}

