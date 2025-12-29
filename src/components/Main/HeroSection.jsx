import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Autoplay, EffectFade } from 'swiper/modules';
import { FiGift, FiBookmark } from 'react-icons/fi';
import { GameService } from '@/services/Services';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';


export default function HeroSection() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const clickTimeouts = useRef({});
    const AUTOPLAY_DELAY = 4000;

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await GameService.getAllGames();
                if (mounted) {
                    // Sort by rating descending and take only top 3
                    const sortedGames = (res || [])
                        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                        .slice(0, 3);
                    setGames(sortedGames);
                }
            } catch (err) {
                console.error('HeroSection fetch error:', err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    // Progress bar animation
    useEffect(() => {
        if (!mainSwiper || loading) return;

        setProgress(0);
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

        return () => clearInterval(interval);
    }, [activeIndex, mainSwiper, loading]);

    const handleThumbClick = (game, index, e) => {
        e.preventDefault();
        e.stopPropagation();

        // If clicking a different slide, switch to that slide
        if (index !== activeIndex) {
            if (mainSwiper && !mainSwiper.destroyed) {
                mainSwiper.slideTo(index);
                // Reset autoplay
                if (mainSwiper.autoplay) {
                    mainSwiper.autoplay.stop();
                    mainSwiper.autoplay.start();
                }
            }
            // Update thumb swiper to show active state visually
            if (thumbsSwiper && !thumbsSwiper.destroyed) {
                thumbsSwiper.slideTo(index, 0); // 0 = no animation
            }
            return;
        }

        // If clicking the already active slide, navigate to game detail
        if (index === activeIndex && game.gameId) {
            navigate(`/game/${game.gameId}`);
        }
    };

    const formatPrice = (value, currency = 'USD') => {
        if (value === null || value === undefined) return '';
        try {
            return new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(value);
        } catch (e) {
            return `${value} ${currency}`;
        }
    };
    return (
        <div className="flex items-center justify-center font-normal">
            <div className="w-full h-[400px] md:h-[500px] 2xl:h-[600px] flex flex-col md:flex-row gap-4">

                <div className="flex-1 h-full w-full overflow-hidden rounded-2xl relative bg-[#202020]">
                    <Swiper
                        onSwiper={setMainSwiper}
                        onSlideChange={(swiper) => {
                            setActiveIndex(swiper.activeIndex);
                            setProgress(0); // Reset progress on slide change
                            // Update thumb swiper to show active state
                            if (thumbsSwiper && !thumbsSwiper.destroyed) {
                                thumbsSwiper.slideTo(swiper.activeIndex);
                            }
                        }}
                        spaceBetween={0}
                        modules={[Autoplay, EffectFade]}
                        effect={'fade'}
                        fadeEffect={{ crossFade: true }}
                        autoplay={{
                            delay: AUTOPLAY_DELAY,
                            disableOnInteraction: false,
                        }}
                        className="h-full w-full rounded-2xl"
                    >
                        {loading ? (
                            <SwiperSlide>
                                <div className="flex items-center justify-center w-full h-full text-white">Yükleniyor...</div>
                            </SwiperSlide>
                        ) : (
                            games.map((game) => (
                                <SwiperSlide key={game.gameId || game.id} className="relative h-full w-full">
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={game.media.bannerImage || ''}
                                            alt={game.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90 z-10" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/60 via-transparent to-transparent z-10" />
                                    </div>

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
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="flex items-center gap-2 md:gap-3">

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
                                        </div>
                                    </div>

                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>

                <div className="hidden md:block w-[280px] h-full overflow-hidden">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        spaceBetween={10}
                        slidesPerView={5}
                        allowTouchMove={false}
                        allowSlideNext={false}
                        allowSlidePrev={false}
                        className="h-full thumb-swiper"
                    >
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
                    </Swiper>
                </div>

            </div>
        </div>
    );
}
