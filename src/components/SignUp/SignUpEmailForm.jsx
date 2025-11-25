import React from 'react'
import BackButton from '../ui/BackButton';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import SocialSign from '../ui/SocialSign';
import appleImg from '../../assets/images/apple.png';
import googleImg from '../../assets/images/google.png';

export default function SignUpEmailForm() {
    return (
        <div className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 my-5 rounded-xl shadow-lg shadow-black/40 space-y-6">
            <div className="top">
                <BackButton />
                <h1 className="text-white text-[1.5rem] font-bold leading-tight">E-posta adresin nedir?</h1>
            </div>
            <div className="bottom flex flex-col gap-4 mt-[32px]">
                <Label className="text-[#adadaf]">E-posta adresi</Label>
                <Input type="email" placeholder="E-posta adresinizi girin" className="border- border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />
            </div>
            <button className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Devam Et
            </button>
            <div className="flex items-center gap-4 w-full my-2">
                <div className="flex-1 h-px bg-[#3a3a3c]"></div>
                <span className="text-[#b3b3b3] text-sm">veya</span>
                <div className="flex-1 h-px bg-[#3a3a3c]"></div>
            </div>

            <div className='flex flex-col gap-4 my-5'>
                <SocialSign image={appleImg} title="Apple ile devam et" />
                <SocialSign image={googleImg} title="Google ile devam et" />
                <a href="#" className='text-[#26bbff] text-center mt-3'>Gizlilik politikası</a>
            </div>

        </div>
    )
}
