import React from 'react'
import playstationImg from "../assets/images/playstation.jpg";
import xboxImg from "../assets/images/x-box.png";
import steamImg from "../assets/images/steam.png";
import SocialSign from '../components/ui/SocialSign';

export default function SignIn() {
  return (
    <div className='mx-auto p-[48px] flex flex-col gap-[16px] items-center justify-center w-[561px] h-[1395px] bg-[#18181c] rounded-[25px]'>
      <div >
        <h1 className="text-white text-[24px] font-bold pb-[16px]">Epic Games'e giriş yap</h1>
      </div>
      <div className='flex flex-col gap-[16px] items-center justify-center w-full border border-gray-700 rounded-[15px] p-[16px]'>
        <p className=' text-center text-[#7b7b7d] font-semibold'>Sadece konsoldamı oynadın? İlerleme durumlarına ve satın alımlarına erişmek için giriş yap.</p>
        <SocialSign image={playstationImg} title="PlayStation™Network" />
        <SocialSign image={xboxImg} title="Xbox" />
      </div>
      <div className='flex flex-col gap-[20px] justify-between w-full border border-gray-700 rounded-[15px] p-[16px]'>
        <p className="text-center text-[#7b7b7d] font-semibold">PC ve ya mobilde mi oynadın?</p>
        <label>
           <span className='text-[#7b7b7d] font-semibold'>E-posta ile giriş yap</span>
          <input type="text" className="w-full p-[10px_20px] bg-[#202024] rounded-[10px] mt-[5px] border-[#7b7b7d] border-[1px]  " />
        </label>
        <button className="w-full bg-[#26bbff] p-[10px] rounded-[10px] font-semibold cursor-pointer">Devam Et</button>
      </div>
      <div className='flex w-full py-[16px] border border-gray-700 rounded-[15px] justify-center items-center'>
        <span className="text-white">Burada yenimisin? <a href="" className='text-blue-400 underline'>Hesap oluştur</a></span>
      </div>
      <div className='flex flex-col gap-[16px] w-full border border-gray-700 rounded-[15px] text-center p-[16px]'>
        <span className='text-[#7b7b7d] font-semibold my-[10px]'>Diğer giriş yapma yolları</span>
        <SocialSign image={playstationImg} title="PlayStation™Network" />
      </div>
      <div className='flex flex-col pt-[30px] gap-[16px] w-[464px] justify-center items-center'>
        <a href="" className='text-[#26bbff]'>Giriş yapmakta sorunmu yaşıyorsun?</a>
        <a href="" className='text-[#26bbff]'>Gizlilik politikası</a>
      </div>
    </div>
  )
}
