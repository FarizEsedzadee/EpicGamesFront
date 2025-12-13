import React from 'react'
import SocialSign from '@/components/ui/SocialSign'
import playstationImg from "@/assets/images/logo/playstation.jpg";
import xboxImg from "@/assets/images/logo/x-box.png";
import nintendo from "@/assets/images/logo/nintendo.png";


export default function ConsoleLoginOptions() {
    return (
        <div className='flex flex-col gap-[16px] items-center justify-center w-full border border-gray-700 rounded-[15px] p-[16px]'>
            <p className=' text-center text-[#7b7b7d] font-semibold'>Sadece konsoldamı oynadın? İlerleme durumlarına ve satın alımlarına erişmek için giriş yap.</p>
            <SocialSign image={playstationImg} title="PlayStation™Network" />
            <SocialSign image={xboxImg} title="Xbox" />
            <SocialSign image={nintendo} title="Nintendo Hesabı" />
        </div>
    )
}
