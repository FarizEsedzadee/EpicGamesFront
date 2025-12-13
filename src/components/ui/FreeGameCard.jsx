import React from 'react';
import { Link } from 'react-router-dom';

export default function FreeGameCard({ game, onButtonClick }) {
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

