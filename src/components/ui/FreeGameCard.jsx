import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

export default function FreeGameCard({ game, onButtonClick }) {
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
    <Link to={`/game/${game.gameId}`} className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden">
      {/* Top Section - Image Only */}
      <div className='rounded-[8px] overflow-hidden'>
        <div className="relative w-full overflow-hidden">
          <img
            src={game.media?.bannerImage || game.media?.coverImage}
            alt={game.title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleWishlistClick}
              className={`p-1.5 rounded-full transition-colors ${
                inWishlist 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black/70 text-white hover:bg-black'
              }`}
              title={inWishlist ? 'İstek listesinden kaldır' : 'İstek listesine ekle'}
            >
              {inWishlist ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        </div>

        {/* Bottom Section - Blue CTA Button */}
        <div className="bg-[#0074e4] hover:bg-[#0084f4] transition-colors py-1 px-6 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick && onButtonClick();
            }}
            className="text-black text-sm font-semibold uppercase tracking-wide w-full"
          >
            ŞİMDİ ÜCRETSİZ
          </button>
        </div>
      </div>

      {/* Game Info Below Card */}
      <div className="px-2 pt-4 pb-2 flex flex-col gap-1">
        <h3 className="text-white text-xl font-bold">
          {game.title}
        </h3>
        {game.promoText && (
          <p className="text-white/70 text-sm">
            {game.promoText}
          </p>
        )}
      </div>
    </Link>
  );
}

