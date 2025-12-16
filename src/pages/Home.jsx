import React from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import SecondHeader from '@/components/Header/SecondHeader'
import HeroSection from '@/components/Main/HeroSection';
import WeeklyDeals from '@/components/Main/WeeklyDeals';
import FreeGames from '@/components/Main/FreeGames';
import VerticalGameList from '@/components/Main/VerticalGameList';
import GameSlider from '@/components/Main/GameSlider';
import data from "@/data/data.json";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
    const { t } = useLanguage();

    return (
        <>
            <div className="w-full min-h-screen text-white bg-[#101014]">
                <Header />
                <main className='sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px] mx-auto py-3'>
                    <SecondHeader />

                    <div className="py-10 px-5 space-y-16">
                        {/* 1. Hero Section */}
                        <HeroSection />

                        <GameSlider
                            title={t('homeDiscoverNew')}
                            filter={(game) => game.price?.discountRate > 0}
                            titleUrl="/browse?price=discounted"
                        />

                        <FreeGames
                            title={t('homeFreeGames')}
                            filter={(game) => game.isFree === true}
                            limit={2}
                        />

                        <WeeklyDeals
                            filter={(game) => game.price?.discountRate > 0}
                            limit={3}
                        />

                        <GameSlider
                            title={t('homeEpicExtras')}
                            filter={(game) => game.productType === "Eklenti"}
                            titleUrl="/browse?types=add-on"
                        />

                        <GameSlider
                            title={t('homeNewTop')}
                            filter={(game) => game.price?.discountRate > 0}
                            titleUrl="/browse?price=discounted"
                        />

                        <GameSlider
                            title={t('homeHolidayHighlights')}
                            filter={(game) => game.price?.discountRate > 0}
                            titleUrl="/browse?events=new-year-sale"
                        />

                        {/* 8. Dikey Oyun Listeleri - 3 Sütun */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <VerticalGameList
                                title={t('homeBestSellers')}
                                filter={(game) => game.price?.discountRate > 0}
                                limit={5}
                                showTrial={true}
                                titleUrl="/browse?price=discounted"
                            />
                            <VerticalGameList
                                title={t('homeMostPlayed')}
                                filter={(game) => game.isFree === true}
                                limit={5}
                                titleUrl="/browse?price=free"
                            />
                            <VerticalGameList
                                title={t('homeMostWishlistedUpcoming')}
                                filter={(game) => game.price?.discountRate > 0}
                                limit={5}
                                titleUrl="/browse?price=discounted"
                            />
                        </div>
                    </div>
                </main>
            </div >
            <Footer />
        </>
    )
}
