import React, { useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

import data from '@/data/data.json';
import { useWishlist } from '@/contexts/WishlistContext';

import 'swiper/css';
import 'swiper/css/navigation';

export default function GameSlider({
  title = 'Oyunlar',
  filter = null,
  games = null,
  showArrow = true,
  onTitleClick = null,
  titleUrl = null
}) {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const wishlistContext = useWishlist();
  const isInWishlist = wishlistContext?.isInWishlist || (() => false);
  const toggleWishlist = wishlistContext?.toggleWishlist || (() => {});

  const handleTitleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onTitleClick) {
      onTitleClick();
    } else if (titleUrl) {
      navigate(titleUrl);
    }
  };

  const filteredGames = useMemo(() => {
    if (games) return games;
    if (!filter) return data.results;

    if (typeof filter === 'function') {
      return data.results.filter(filter);
    }

    if (typeof filter === 'object') {
      return data.results.filter((game) => {
        if (filter.isFree !== undefined && game.isFree !== filter.isFree)
          return false;
        if (
          filter.minDiscount !== undefined &&
          (!game.price?.discountRate ||
            game.price.discountRate < filter.minDiscount)
        )
          return false;
        if (filter.productType && game.productType !== filter.productType)
          return false;
        if (filter.genre && !game.genre?.includes(filter.genre)) return false;
        return true;
      });
    }

    return data.results;
  }, [filter, games]);

  const formatPrice = (value) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (!filteredGames?.length) return null;

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div
          onClick={(e) => {
            if (onTitleClick || titleUrl) handleTitleClick(e);
          }}
          className={`flex items-center gap-2 group ${
            onTitleClick || titleUrl ? 'cursor-pointer' : ''
          }`}
        >
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          {showArrow && (
            <ArrowRight
              size={20}
              className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            />
          )}
        </div>

        {/* NAV BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isBeginning
                ? 'bg-[#2a2a2a] text-gray-600'
                : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isEnd
                ? 'bg-[#2a2a2a] text-gray-600'
                : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        spaceBetween={16}
        slidesPerView={2}
        preventClicks={true}
        preventClicksPropagation={true}
        touchStartPreventDefault={false}
        threshold={10}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 }
        }}
      >
        {filteredGames.map((game) => (
          <SwiperSlide key={game.gameId}>
            <Link
              to={`/game/${game.gameId}`}
              preventScrollReset
              onClick={(e) => {
                if (swiperRef.current?.isDragging) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="group flex flex-col h-full"
            >
              {/* IMAGE */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-[#202020]">
                <img
                  src={game.media?.coverImage || game.media?.bannerImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />

                {/* WISHLIST */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(game);
                    }}
                    className={`p-1.5 rounded-full ${
                      isInWishlist(game.gameId)
                        ? 'bg-white text-black'
                        : 'bg-black/70 text-white'
                    }`}
                  >
                    {isInWishlist(game.gameId) ? (
                      <BookmarkCheck size={18} />
                    ) : (
                      <Bookmark size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="flex flex-col flex-1">
                <h6 className="text-[#888] text-[10px] uppercase font-bold mb-1">
                  {game.productType || 'Ana Oyun'}
                </h6>

                <h3 className="text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition">
                  {game.title}
                </h3>

                <div className="mt-auto">
                  {game.isFree ? (
                    <span className="text-white text-sm">Ücretsiz</span>
                  ) : game.price?.discountRate ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-xs px-1.5 rounded">
                        -{game.price.discountRate}%
                      </span>
                      <span className="text-gray-400 text-xs line-through">
                        {formatPrice(game.price.original)}
                      </span>
                      <span className="text-white text-sm">
                        {game.price.discountRate === 100
                          ? 'Ücretsiz'
                          : formatPrice(game.price.current)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-white text-sm">
                      {formatPrice(game.price?.current || 0)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
