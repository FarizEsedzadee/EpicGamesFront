import React from 'react';
import { Link } from 'react-router-dom';

export default function VerticalGameItem({ game, showTrial = false }) {
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
    <Link to={`/game/${game.gameId}`} preventScrollReset className="group cursor-pointer flex gap-4 p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors">
      {/* Game Cover Image */}
      <div className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden bg-[#202020]">
        <img
          src={game.media?.coverImage || game.media?.bannerImage}
          alt={game.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Game Info */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Product Type */}
        <h6 className="text-[#88888a] text-[10px] uppercase font-bold mb-1">
          {game.productType || 'Ana Oyun'}
        </h6>

        {/* Title */}
        <h3 className="text-white text-sm font-medium mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {game.title}
        </h3>

        {/* Trial Badge */}
        {showTrial && (
          <span className="text-[#88888a] text-[10px] mb-2">Deneme Mevcut</span>
        )}

        {/* Price Section */}
        <div className="mt-auto flex items-center gap-2 flex-wrap">
          {game.isFree ? (
            <span className="text-white text-sm font-medium">Ücretsiz</span>
          ) : game.price?.discountRate && game.price.discountRate > 0 && game.price.original > 0 ? (
            <>
              <span className="bg-[#0074e4] text-white text-[11px] px-1.5 py-0.5 rounded-sm font-bold">
                -{game.price.discountRate}%
              </span>
              <span className="text-[#88888a] text-[12px] line-through">
                {formatPrice(game.price.original, game.price.currency)}
              </span>
              <span className="text-white text-sm font-medium">
                {game.price.discountRate === 100
                  ? 'Ücretsiz'
                  : formatPrice(game.price.current, game.price.currency)}
              </span>
            </>
          ) : (
            <span className="text-white text-sm font-medium">
              {formatPrice(game.price?.current || game.price?.original || 0, game.price?.currency || '₺')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

