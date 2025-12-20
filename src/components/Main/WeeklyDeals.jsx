import React, { useMemo, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import data from "@/data/data.json";
import WeeklyDealCard from '@/components/ui/WeeklyDealCard';

export default function WeeklyDeals({
  filter = null,
  games = null,
  limit = 3
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
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
      {/* Cards: grid on desktop, swiper on mobile */}
      {isMobile ? (
        <div className="pb-8 -mx-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1.14}
            spaceBetween={14}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="weekly-deals-swiper"
          >
            {filteredGames.map((game) => (
              <SwiperSlide key={game.gameId} className="px-4">
                <div className="transform-gpu">
                  <WeeklyDealCard game={game} onButtonClick={() => handleCardClick(game)} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <style>{`
            .weekly-deals-swiper { padding-bottom: 28px; }
            .weekly-deals-swiper .swiper-slide { transition: transform .28s cubic-bezier(.22,.9,.28,1), opacity .28s; transform: scale(.94); opacity: .9; }
            .weekly-deals-swiper .swiper-slide-active { transform: scale(1); opacity: 1; }
            .weekly-deals-swiper .swiper-slide-next, .weekly-deals-swiper .swiper-slide-prev { transform: scale(.97); opacity: .96; }
            .weekly-deals-swiper .swiper-pagination { bottom: -28px !important; }
            .weekly-deals-swiper .swiper-pagination-bullet { width: 8px; height: 8px; background: rgba(255,255,255,0.6); margin: 0 6px; opacity: 1; }
            .weekly-deals-swiper .swiper-pagination-bullet-active { background: #fff; opacity: 1; }
          `}</style>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <WeeklyDealCard
              key={game.gameId}
              game={game}
              onButtonClick={() => handleCardClick(game)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

