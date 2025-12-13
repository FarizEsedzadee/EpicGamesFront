import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Check } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

export default function WeeklyDealCard({ game, onButtonClick }) {
  const wishlistContext = useWishlist();
  const isInWishlist = wishlistContext?.isInWishlist || (() => false);
  const toggleWishlist = wishlistContext?.toggleWishlist || (() => {});
  const inWishlist = isInWishlist(game.gameId);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game);
  };

  const formatPrice = (value, currency = '₺') => {
    if (value === null || value === undefined) return '';
    try {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numValue);
    } catch (e) {
      return `${currency}${value}`;
    }
  };

  return (
    <Link to={`/game/${game.gameId}`} className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-[#101014]">
      {/* Top Section - Image Only */}
      <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
        <img 
          src={game.media?.bannerImage || game.media?.coverImage} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
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

      {/* Bottom Section - Content */}
      <div className="bg-[#101014] p-6 flex flex-col gap-4">
        {/* Game Title */}
        <h3 className="text-white text-2xl md:text-3xl font-bold line-clamp-2 leading-tight">
          {game.title}
        </h3>

        {/* Description */}
        {game.description && (
          <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3">
            {game.description}
          </p>
        )}

        {/* Price Section - Optional */}
        {game.price && (
          <div className="flex items-center gap-3 flex-wrap">
            {game.isFree ? (
              <span className="text-white text-lg font-semibold">Ücretsiz</span>
            ) : game.price?.discountRate && game.price.discountRate > 0 && game.price.original > 0 ? (
              <>
                <span className="bg-[#0074e4] text-white text-sm px-3 py-1.5 rounded font-bold">
                  -{game.price.discountRate}%
                </span>
                <span className="text-gray-400 text-base line-through">
                  {formatPrice(game.price.original, game.price.currency)}
                </span>
                <span className="text-white text-lg font-semibold">
                  {game.price.discountRate === 100 
                    ? 'Ücretsiz' 
                    : formatPrice(game.price.current, game.price.currency)}
                </span>
              </>
            ) : (
              <span className="text-white text-lg font-semibold">
                {formatPrice(game.price?.current || game.price?.original || 0, game.price?.currency || '₺')}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick && onButtonClick();
          }}
          className="mt-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors w-fit"
        >
          Hemen Keşfet
        </button>
      </div>
    </Link>
  );
}

