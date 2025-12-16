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

  return (
    <Link
      to={`/game/${game.gameId}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0f0f13] hover:bg-[#14141a] transition-colors"
    >
      {/* Image */}
      <div className="relative h-[260px] md:h-[300px] overflow-hidden">
        <img
          src={game.media?.bannerImage || game.media?.coverImage}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark gradient like Epic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Wishlist button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
            inWishlist
              ? 'bg-white text-black'
              : 'bg-black/60 text-white hover:bg-black'
          }`}
          title={inWishlist ? 'İstek listesinden kaldır' : 'İstek listesine ekle'}
        >
          {inWishlist ? <Check size={18} /> : <PlusCircle size={18} />}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-white text-xl font-semibold leading-snug line-clamp-2">
          {game.title}
        </h3>

        {game.description && (
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
            {game.description}
          </p>
        )}

        {/* Spacer to push button bottom */}
        <div className="flex-1" />

        {/* Action Button (Epic style) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick && onButtonClick();
          }}
          className="mt-2 w-fit rounded-md bg-[#2a2a2a] px-5 py-2 text-sm font-medium text-white hover:bg-[#3a3a3a] transition-colors"
        >
          Hemen Keşfet
        </button>
      </div>
    </Link>
  );
}
