import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Check } from "lucide-react";
import { useWishlist } from '@/contexts/WishlistContext';

export default function GameCard({ game }) {
  const wishlistContext = useWishlist();
  const isInWishlist = wishlistContext?.isInWishlist || (() => false);
  const toggleWishlist = wishlistContext?.toggleWishlist || (() => {});
  const inWishlist = isInWishlist(game.gameId);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game);
  };

  return (
    <Link to={`/game/${game.gameId}`} className="group cursor-pointer flex flex-col h-full">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-[#202020]">
        <img src={game.media?.coverImage} alt={game.title} className="h-full object-cover transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute top-2 right-2 transition-opacity">
          <button 
            onClick={handleWishlistClick}
            className={`p-1.5 rounded-full transition-colors ${
              inWishlist 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black/70 text-white hover:bg-black'
            }`}
            title={inWishlist ? 'İstek listesinden kaldır' : 'İstek listesine ekle'}
          >
            {inWishlist ? <Check size={18} /> : <PlusCircle size={18} />}
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <h6 className="text-[#88888a] text-[10px] uppercase font-bold mb-1">{game.productType}</h6>
        <h3 className="text-white text-sm font-medium mb-2 line-clamp-1 group-hover:underline">{game.title}</h3>
        <div className="mt-auto flex items-center gap-2 flex-wrap">
          {game.isFree ? (
            <span className="text-white text-sm font-medium">Ücretsiz</span>
          ) : game.price.discountRate && game.price.original > 0 ? (
            <>
              <span className="bg-[#0074e4] text-white text-[11px] px-1.5 py-0.5 rounded-sm font-bold">
                -{game.price.discountRate}%
              </span>
              <span className="text-[#88888a] text-[14px] line-through">{game.price.currency}{game.price.original}</span>
              <span className="text-white text-sm font-medium">
                {game.price.discountRate === 100 ? 'Ücretsiz' : `${game.price.currency}${game.price.current}`}
              </span>
            </>
          ) : (
            <span className="text-white text-sm font-medium">{game.price.current}</span>
          )}
        </div>
      </div>
    </Link>
  );
};