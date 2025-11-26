import React from 'react'
import BackButton from '../ui/BackButton';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import SocialSign from '../ui/SocialSign';
import appleImg from '../../assets/images/apple.png';
import googleImg from '../../assets/images/google.png';
import { Checkbox } from '../ui/checkbox';

export default function LoginPasswordForm() {
    return (
        <div className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 rounded-xl shadow-lg shadow-black/40 space-y-6 ">
            <div className="top">
                <BackButton />
                <h1 className="text-white text-[1.5rem] font-bold leading-tight mb-5">Şifreni gir</h1>
                <p className='text-white'><span className='font-semibold'>tamaranbiyeva@gmail.com</span>ile giriş yapıyorsun.</p>
            </div>
            <div className="bottom flex flex-col gap-4 mt-[32px]">
                <Label className="text-[#adadaf]">Şifre</Label>
                <Input type="password" required className="border- border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />
                <a href="" className='underline text-blue-400 text-[15px]'>Şifreni mi unuttun?</a>
            </div>
            <label className='flex'>
                <Checkbox id="remember-me" className="mr-2 data-[state=checked]:bg-blue-400 data-[state=checked]:text-black w-[20px] h-[20px]" />
                <p className='text-white text-[15px]'>Giriş yapmak için Epic Games'i  kullanan oyunlarda ve uygulamalarda beni hatırla </p>
            </label>

            <button className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Devam Et
            </button>


            <div className='flex flex-col gap-4'>

                <a href="#" className='text-[#26bbff] text-center '>Gizlilik politikası</a>
            </div>

        </div>
    )
}
