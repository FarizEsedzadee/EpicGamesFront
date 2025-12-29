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
<<<<<<< HEAD
        let startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = (elapsed / AUTOPLAY_DELAY) * 100;

            if (newProgress >= 100) {
                setProgress(100);
                clearInterval(interval);
            } else {
                setProgress(newProgress);
            }
        }, 16); // ~60fps
=======
        const start = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const value = (elapsed / AUTOPLAY_DELAY) * 100;
            setProgress(value >= 100 ? 100 : value);
            if (value >= 100) clearInterval(interval);
        }, 16);
>>>>>>> 8a6f95e32847980bae385da073e6f4026190d343

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

<<<<<<< HEAD
        // If clicking a different slide, switch to that slide
=======
>>>>>>> 8a6f95e32847980bae385da073e6f4026190d343
        if (index !== activeIndex) {
            mainSwiper?.slideTo(index);
            mainSwiper?.autoplay?.start();
            thumbsSwiper?.slideTo(index, 0);
            return;
        }

<<<<<<< HEAD
        // If clicking the already active slide, navigate to game detail
        if (index === activeIndex && game.gameId) {
            navigate(`/game/${game.gameId}`);
        }
=======
        if (game.gameId) navigate(`/game/${game.gameId}`);
>>>>>>> 8a6f95e32847980bae385da073e6f4026190d343
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

<<<<<<< HEAD
                                    {/* Mətn Hissəsi */}
                                    <div className="absolute bottom-4 md:bottom-10 left-4 md:left-15 max-w-full md:max-w-[480px] z-20 text-white flex flex-col items-start">

                                        {/* COVER IMAGE / LOGO */}
                                        <h2 className="uppercase tracking-tight mb-2 md:mb-4 drop-shadow-md">
                                            {game.media.titleImage && (
                                                <img src={game.media.titleImage} className="w-30 md:w-60" />
                                            )}
                                        </h2>

                                        {/* PROMO TITLE */}
                                        <h3 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.15em] mb-2 md:mb-3 drop-shadow-md leading-[1.4]">
                                            {game.promoText || ''}
                                        </h3>

                                        {/* DESCRIPTION */}
                                        <p className="text-sm md:text-[15px] text-gray-200 font-normal leading-[1.55] mb-3 md:mb-5 drop-shadow-md">
                                            {game.description ? `Released: ${game.description}` : ''}
                                        </p>

                                        {/* PRICE SECTION */}
                                        <div className="mb-3 md:mb-5 flex items-center gap-2 md:gap-3 text-gray-100 text-xs md:text-[14px]">

                                            {(() => {
                                                const price = game.price || {};
                                                const original = Number(price.original ?? 0);
                                                const current = Number(price.current ?? original);
                                                const discount = Number(price.discountRate ?? 0);

                                                // DISCOUNTED
                                                if (discount > 0 && original > current) {
                                                    return (
                                                        <>
                                                            <span className="bg-blue-500 text-white text-[9px] md:text-[11px] px-1 md:px-2 py-0.5 md:py-1 rounded-full font-bold">
                                                                -{discount}%
                                                            </span>

                                                            <div className="text-gray-300 line-through text-[11px] md:text-[13px]">
                                                                {formatPrice(original, price.currency)}
                                                            </div>

                                                            <div className="text-[11px] md:text-[13px] font-medium text-white">
                                                                {(current === 0 || discount === 100) ? "Ücretsiz" : formatPrice(current, price.currency)}
                                                            </div>
                                                        </>
                                                    );
                                                }

                                                // NORMAL PRICE
                                                return (
                                                    <div className="text-[11px] md:text-[13px] font-medium">
                                                        {
                                                            (game.isFree) ? <div className="text-sm md:text-[18px] font-medium py-1 md:py-3"></div>
                                                                : formatPrice(current || original, price.currency)
                                                        }
                                                    </div>
                                                );
                                            })()}
=======
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
>>>>>>> 8a6f95e32847980bae385da073e6f4026190d343
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="flex items-center gap-2 md:gap-3">
<<<<<<< HEAD

                                            {/* BUY / CLAIM BUTTON */}
                                            {game.gameId && (
                                                <Link
                                                    to={`/game/${game.gameId}`}
                                                    className="bg-white text-black hover:bg-gray-200 transition-colors duration-200 
                               px-4 md:px-8 py-2 md:py-3.5 rounded-lg text-sm md:text-[15px] font-semibold tracking-wide inline-block text-center"
                                                >
                                                    {game.isFree ? 'Ücretsiz' : 'Hemen Satın Al'}
                                                </Link>
                                            )}
                                            {!game.gameId && (
                                                <button className="bg-white text-black hover:bg-gray-200 transition-colors duration-200 
                               px-4 md:px-8 py-2 md:py-3.5 rounded-lg text-sm md:text-[15px] font-semibold tracking-wide">
                                                    {game.isFree ? 'Ücretsiz' : 'Hemen Satın Al'}
                                                </button>
                                            )}

                                            {/* GIFT BUTTON */}
                                            <button className="w-10 md:w-[48px] h-10 md:h-[48px] flex items-center justify-center 
                           bg-[#2f2f2f]/90 hover:bg-[#2f2f2f] transition-colors duration-200 
                           rounded-lg border border-white/10 backdrop-blur-sm">
                                                <FiGift size={16} className="md:w-5 md:h-5 text-white opacity-80" />
                                            </button>

                                            {/* WISHLIST BUTTON */}
                                            <button className="w-10 md:w-[48px] h-10 md:h-[48px] flex items-center justify-center 
                           bg-[#2f2f2f]/90 hover:bg-[#2f2f2f] transition-colors duration-200 
                           rounded-lg border border-white/10 backdrop-blur-sm">
                                                <FiBookmark size={16} className="md:w-5 md:h-5 text-white opacity-80" />
                                            </button>
=======
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
>>>>>>> 8a6f95e32847980bae385da073e6f4026190d343
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
<<<<<<< HEAD
                        {loading ? (
                            <SwiperSlide>
                                <div className="flex items-center justify-center h-full text-gray-400">Yükleniyor...</div>
                            </SwiperSlide>
                        ) : (
                            games.map((game, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <SwiperSlide key={game.gameId || game.id} className="!h-auto cursor-pointer rounded-xl overflow-hidden">
                                        <div
                                            onClick={(e) => handleThumbClick(game, index, e)}
                                            className={`group flex items-center gap-4 p-3 h-full w-full rounded-xl transition-all duration-300
                                hover:bg-[#2a2a2a] 
                                relative
                                border border-transparent
                                ${isActive ? 'bg-[#2a2a2a]' : ''}
                                ${isActive ? 'before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[60%] before:bg-white before:rounded-full' : ''}
                                `}>
                                            {/* Loading Bar - Only for active slide */}
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden z-10">
                                                    <div
                                                        className="h-full bg-white transition-all duration-75 ease-linear"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            )}

                                            {/* Kiçik Şəkil */}
                                            <div className="w-12 h-16 flex-shrink-0 overflow-hidden rounded bg-gray-800">
                                                <img
                                                    src={game.media.bannerImage || ''}
                                                    alt={game.title}
                                                    className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
                                                />
                                            </div>

                                            {/* Oyun Adı */}
                                            <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                {game.title}
                                            </span>

                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        )}
=======
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
>>>>>>> 8a6f95e32847980bae385da073e6f4026190d343
                    </Swiper>
                </div>

            </div>
        </div>
    );
}
