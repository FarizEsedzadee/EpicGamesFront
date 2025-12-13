import React, { useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import data from "@/data/data.json";
import 'swiper/css';
import 'swiper/css/navigation';

export default function GameSlider({ 
  title = "Oyunlar",
  filter = null,
  games = null,
  showArrow = true,
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
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Filter games based on filter function or use provided games
  const filteredGames = useMemo(() => {
    if (games) return games;
    if (!filter) return data.results;
    
    if (typeof filter === 'function') {
      return data.results.filter(filter);
    }
    
    // Support simple filter objects
    if (typeof filter === 'object') {
      return data.results.filter(game => {
        if (filter.isFree !== undefined && game.isFree !== filter.isFree) return false;
        if (filter.minDiscount !== undefined && (!game.price?.discountRate || game.price.discountRate < filter.minDiscount)) return false;
        if (filter.productType && game.productType !== filter.productType) return false;
        if (filter.genre && !game.genre?.includes(filter.genre)) return false;
        return true;
      });
    }
    
    return data.results;
  }, [filter, games]);

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

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Don't render if no games
  if (!filteredGames || filteredGames.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div 
          className={`flex items-center gap-2 ${onTitleClick || titleUrl || showArrow ? 'cursor-pointer' : ''} group`}
          onClick={(e) => {
            if (onTitleClick || titleUrl) {
              handleTitleClick(e);
            }
          }}
        >
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          {showArrow && (
            <ArrowRight 
              size={20} 
              className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" 
            />
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isBeginning
                ? 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
                : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white cursor-pointer'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isEnd
                ? 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
                : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white cursor-pointer'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        className="!pb-4"
      >
        {filteredGames.map((game) => (
          <SwiperSlide key={game.gameId}>
            <Link to={`/game/${game.gameId}`} className="group cursor-pointer flex flex-col h-full">
              {/* Game Cover Image */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-[#202020]">
                <img 
                  src={game.media?.coverImage || game.media?.bannerImage} 
                  alt={game.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              
              {/* Game Info */}
              <div className="flex flex-col flex-1">
                {/* Category */}
                <h6 className="text-[#88888a] text-[10px] uppercase font-bold mb-1">
                  {game.productType || 'Ana Oyun'}
                </h6>
                
                {/* Title */}
                <h3 className="text-white text-sm font-medium mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {game.title}
                </h3>
                
                {/* Trial Available Badge (if applicable) */}
                {game.promoText && game.promoText.toLowerCase().includes('deneme') && (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
