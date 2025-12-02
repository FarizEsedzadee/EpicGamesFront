import Header from '@/components/Header/Header'
import SecondHeader from '@/components/Header/SecondHeader'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@/components/ui/Card';

// Import Swiper styles
import 'swiper/css';


export default function Home() {

    return (
        <div className="w-full min-h-screen text-white">
            <Header />
            <main className='sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1240px] mx-auto py-3'>
                <SecondHeader />
            </main>
        </div >
    )
}
