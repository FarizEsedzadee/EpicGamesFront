import React from 'react';
import BrowseGameCard from '@/components/ui/BrowseGameCard';

export default function GameGrid({ games, loading = false }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white">Yükleniyor...</div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white">Oyun bulunamadı.</div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Game Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <BrowseGameCard key={game.gameId} game={game} />
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-[#88888a] text-xs mt-6">
        * İndirimden önceki son 30 günde Epic Games Store'da sunulan en düşük fiyat
      </p>
    </div>
  );
}

