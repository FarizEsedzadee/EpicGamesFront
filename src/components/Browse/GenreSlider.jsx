import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const genres = [
  { id: 'open-world', name: 'Açık Dünya', image: 'https://cdn2.unrealengine.com/fneco-2025-keyart-thumb-1920x1080-de84aedabf4d.jpg' },
  { id: 'action', name: 'Aksiyon Oyunları', image: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg' },
  { id: 'indie', name: 'Bağımsız', image: 'https://media.rawg.io/media/games/d58/d588147307defbb5fa64fa3203211303.jpg' },
  { id: 'casual', name: 'Basit Eğlence', image: 'https://media.rawg.io/media/games/b7e/b7ee8584neutrino.jpg' },
  { id: 'puzzle', name: 'Bulmaca', image: 'https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S1_2560x1440-4c231557ef0a0626fbb97e0bd137d837' },
];

export default function GenreSlider({ onGenreClick }) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold">Popüler Türler</h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isBeginning
                ? 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
                : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white cursor-pointer'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isEnd
                ? 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
                : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white cursor-pointer'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {genres.map((genre) => (
          <SwiperSlide key={genre.id}>
            <button
              onClick={() => onGenreClick && onGenreClick(genre.id)}
              className="group w-full aspect-square rounded-lg overflow-hidden bg-[#202020] relative"
            >
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium text-left">{genre.name}</p>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

