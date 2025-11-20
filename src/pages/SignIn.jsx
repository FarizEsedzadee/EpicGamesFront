import React from 'react'
import playstationImg from "../../public/playstation.jpg";
import xbox from "../../public/x-box.png";
import nintendo from "../../public/nintendo.png";

export default function SignIn() {
  return (
    <div className='mx-auto flex flex-col gap-[16px] items-center justify-center w-[561px] h-[1395px] bg-[#18181c] rounded-[25px]'>
      <div >
        <h1 className="text-white text-[24px] font-bold">Epic Games'e giriş yap</h1>
      </div>
      <div className='flex flex-col gap-[16px] items-center justify-center w-[465px] h-[285px] border border-gray-700 rounded-[15px] p-[16px]'>
        <p className=' text-center text-[#7b7b7d] font-semibold'>Sadece konsoldamı oynadın? İlerleme durumlarına ve satın alımlarına erişmek için giriş yap.</p>
        <a href="" className='flex items-center w-full bg-[#202024] p-[5px] rounded-[40px]'>
          <img src={playstationImg} alt="" className='w-[40px] h-[40px] rounded-full' />
          <p className='text-white w-full text-center'>PlayStation™Network</p>
        </a>
        <a href="" className='flex items-center w-full bg-[#202024] p-[5px] rounded-[40px]'>
          <img src={xbox} alt="" className='w-[40px] h-[40px] rounded-full'/>
          <p className='text-white w-full text-center'>Xbox ağı</p>
        </a>
        <a href="" className='flex items-center w-full bg-[#202024] p-[5px] rounded-[40px] '>
          <img src={nintendo} alt="" className='w-[40px] h-[40px] rounded-full'/>
          <p className='text-white w-full text-center'>Nintendo Hesabı</p>
        </a>
      </div>
      <div className='w-[464px] h-[220px] border border-gray-700 rounded-[15px]'>
        

      </div>
      <div className='w-[464px] h-[57px] border border-gray-700 rounded-[15px]'></div>
      <div className='w-[464px] h-[523px] border border-gray-700 rounded-[15px]'></div>
      <div className='flex flex-col pt-[30px] gap-[16px] w-[464px] justify-center items-center'>
        <a href="" className='text-[#26bbff]'>Giriş yapmakta sorunmu yaşıyorsun?</a>
        <a href="" className='text-[#26bbff]'>Gizlilik politikası</a>
      </div>
    </div>
  )
}
