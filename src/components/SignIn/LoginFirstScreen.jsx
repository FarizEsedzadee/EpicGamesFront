import React from 'react'
import SocialSign from '../ui/SocialSign'
import ConsoleLoginOptions from './ConsoleLoginOptions'
import EmailLoginForm from './EmailLoginForm'
import AlternativeCreateLink from './AlternativeCreateLink'
import google from "../../assets/images/google.png";
import steamImg from "../../assets/images/steam.png";
import apple from "../../assets/images/apple.png";
import facebook from "../../assets/images/facebook.png";
import lego from "../../assets/images/lego.png";
import vkontakte from "../../assets/images/vkontakte.png";

export default function LoginFirstScreen() {
  return (
    <div className='p-[48px] flex flex-col gap-[16px] items-center justify-center bg-[#18181c] rounded-[25px]'>
      <div >
        <h1 className="text-white text-[24px] font-bold pb-[16px]">Epic Games'e giriş yap</h1>
      </div>
      <ConsoleLoginOptions />
      <EmailLoginForm />
      <AlternativeCreateLink />

      <div className='flex flex-col gap-[16px] w-full border border-gray-700 rounded-[15px] text-center p-[16px]'>
        <span className='text-[#7b7b7d] font-semibold my-[10px]'>Diğer giriş yapma yolları</span>
        <SocialSign image={google} title="Google" />
        <SocialSign image={steamImg} title="Steam" />
        <SocialSign image={apple} title="Apple ile giriş yap" />
        <SocialSign image={facebook} title="Facebook" />
        <SocialSign image={lego} title="LEGO® Hesabı" />
        <SocialSign image={vkontakte} title="VKontakte" />
      </div>


      <div className='flex flex-col pt-[30px] gap-[16px] w-[464px] justify-center items-center'>
        <a href="" className='text-[#26bbff]'>Giriş yapmakta sorunmu yaşıyorsun?</a>
        <a href="" className='text-[#26bbff]'>Gizlilik politikası</a>
      </div>
    </div>
  )
}<div className='max-w-[560px] my-[30px] mx-auto p-[48px] flex flex-col gap-[16px] items-center justify-center bg-[#18181c] rounded-[25px]'>
      <div >
        <h1 className="text-white text-[24px] font-bold pb-[16px]">Epic Games'e giriş yap</h1>
      </div>
      <ConsoleLoginOptions />
      <EmailLoginForm />
      <AlternativeCreateLink />

      <div className='flex flex-col gap-[16px] w-full border border-gray-700 rounded-[15px] text-center p-[16px]'>
        <span className='text-[#7b7b7d] font-semibold my-[10px]'>Diğer giriş yapma yolları</span>
        <SocialSign image={google} title="Google" />
        <SocialSign image={steamImg} title="Steam" />
        <SocialSign image={apple} title="Apple ile giriş yap" />
        <SocialSign image={facebook} title="Facebook" />
        <SocialSign image={lego} title="LEGO® Hesabı" />
        <SocialSign image={vkontakte} title="VKontakte" />
      </div>


      <div className='flex flex-col pt-[30px] gap-[16px] w-[464px] justify-center items-center'>
        <a href="" className='text-[#26bbff]'>Giriş yapmakta sorunmu yaşıyorsun?</a>
        <a href="" className='text-[#26bbff]'>Gizlilik politikası</a>
      </div>
    </div>