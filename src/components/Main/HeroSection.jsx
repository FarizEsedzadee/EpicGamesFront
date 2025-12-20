import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { FiGift, FiBookmark } from 'react-icons/fi';
import { GameService } from '@/services/Services';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function HeroSection() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();
    const AUTOPLAY_DELAY = 4000;

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const res = await GameService.getAllGames();
                if (mounted) {
                    const sorted = (res || [])
                        .sort((a, b) => (a.popularityRank || 999) - (b.popularityRank || 999))
                        .slice(0, 6);
                    setGames(sorted);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => (mounted = false);
    }, []);

    /* Progress bar */
    useEffect(() => {
        if (!mainSwiper || loading) return;

        setProgress(0);
        const start = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const value = (elapsed / AUTOPLAY_DELAY) * 100;
            setProgress(value >= 100 ? 100 : value);
            if (value >= 100) clearInterval(interval);
        }, 16);

        return () => clearInterval(interval);
    }, [activeIndex, mainSwiper, loading]);

    const formatPrice = (value, currency = 'USD') => {
        if (value == null) return '';
        try {
            let currencyCode = 'USD';
            if (typeof currency === 'string') {
                const t = currency.trim();
                if (/^[A-Za-z]{3}$/.test(t)) currencyCode = t.toUpperCase();
                else if (t.includes('$')) currencyCode = 'USD';
                else if (t.includes('₺') || /^TRY$/i.test(t)) currencyCode = 'TRY';
                else if (t.includes('€') || /^EUR$/i.test(t)) currencyCode = 'EUR';
                else if (t.includes('£') || /^GBP$/i.test(t)) currencyCode = 'GBP';
            }
            return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currencyCode }).format(value);
        } catch (e) {
            return `${value} ${currency || ''}`.trim();
        }
    };

    const handleThumbClick = (game, index, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (index !== activeIndex) {
            mainSwiper?.slideTo(index);
            mainSwiper?.autoplay?.start();
            thumbsSwiper?.slideTo(index, 0);
            return;
        }

        if (game.gameId) navigate(`/game/${game.gameId}`);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full h-[380px] md:h-[500px] 2xl:h-[600px] flex gap-4">

                {/* MAIN SLIDER */}
                <div className="flex-1 relative overflow-hidden rounded-2xl bg-[#202020]">
                    <Swiper
                        onSwiper={setMainSwiper}
                        onSlideChange={(s) => {
                            setActiveIndex(s.activeIndex);
                            setProgress(0);
                            thumbsSwiper?.slideTo(s.activeIndex);
                        }}
                        effect="fade"
                        modules={[Autoplay, EffectFade]}
                        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
                        className="h-full"
                    >
                        {loading ? (
                            <SwiperSlide className="flex items-center justify-center text-white">
                                Yükleniyor...
                            </SwiperSlide>
                        ) : (
                            games.map((game) => (
                                <SwiperSlide key={game.gameId}>
                                    {/* IMAGE */}
                                    <img
                                        src={game.media.bannerImage}
                                        alt={game.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* OVERLAYS */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:hidden z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

                                    {/* CONTENT */}
                                    <div className="
                    absolute z-20
                    bottom-5 md:bottom-10
                    left-4 md:left-14
                    max-w-[90%] md:max-w-[480px]
                    text-white
                  ">

                                        {/* LOGO */}
                                        {game.media.titleImage && (
                                            <img
                                                src={game.media.titleImage}
                                                className="w-[140px] md:w-[240px] mb-2 md:mb-4"
                                            />
                                        )}

                                        {/* PROMO */}
                                        <div className="
                      text-[10px] md:text-[12px]
                      uppercase tracking-[0.12em]
                      font-semibold
                      text-gray-300
                      mb-2
                    ">
                                            {game.promoText}
                                        </div>

                                        {/* DESCRIPTION */}
                                        <p className="
                      text-[13px] md:text-[15px]
                      text-gray-300
                      leading-[1.45]
                      mb-3 md:mb-5
                      line-clamp-2 md:line-clamp-none
                    ">
                                            {game.description}
                                        </p>

                                        {/* PRICE */}
                                        <div className="flex items-center gap-2 text-[12px] md:text-[14px] mb-3 md:mb-5">
                                            {game.price?.discountRate > 0 && (
                                                <>
                                                    <span className="bg-blue-500 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                                                        -{game.price.discountRate}%
                                                    </span>
                                                    <span className="line-through text-gray-400">
                                                        {formatPrice(game.price.original, game.price.currency)}
                                                    </span>
                                                </>
                                            )}
                                            <span className="font-medium">
                                                {game.isFree
                                                    ? 'Ücretsiz'
                                                    : formatPrice(game.price?.current, game.price?.currency)}
                                            </span>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <Link
                                                to={`/game/${game.gameId}`}
                                                className="
                          bg-white text-black
                          px-5 md:px-8
                          py-2.5 md:py-3.5
                          rounded-lg
                          text-[13px] md:text-[15px]
                          font-semibold
                          hover:bg-gray-200
                        "
                                            >
                                                {game.isFree ? 'Ücretsiz' : 'Hemen Satın Al'}
                                            </Link>

                                            {[FiGift, FiBookmark].map((Icon, i) => (
                                                <button
                                                    key={i}
                                                    className="
                            w-[40px] h-[40px] md:w-[48px] md:h-[48px]
                            flex items-center justify-center
                            bg-[#2f2f2f]/80
                            hover:bg-[#2f2f2f]
                            rounded-lg
                            border border-white/10
                          "
                                                >
                                                    <Icon size={18} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>

                {/* THUMBNAILS (DESKTOP) */}
                <div className="hidden md:block w-[280px]">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        slidesPerView={5}
                        spaceBetween={10}
                        allowTouchMove={false}
                        className="h-full"
                    >
                        {games.map((game, index) => {
                            const active = index === activeIndex;
                            return (
                                <SwiperSlide key={game.gameId}>
                                    <div
                                        onClick={(e) => handleThumbClick(game, index, e)}
                                        className={`
                      flex items-center gap-3 p-3 rounded-xl cursor-pointer
                      ${active ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a]'}
                    `}
                                    >
                                        <img
                                            src={game.media.bannerImage}
                                            className="w-12 h-16 rounded object-cover"
                                        />
                                        <span className={`${active ? 'text-white' : 'text-gray-400'}`}>
                                            {game.title}
                                        </span>

                                        {active && (
                                            <div className="absolute bottom-0 left-0 h-[2px] bg-white" style={{ width: `${progress}%` }} />
                                        )}
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

            </div>
        </div>
    );
}
