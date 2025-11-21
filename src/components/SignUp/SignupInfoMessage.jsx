import React from 'react'
import BackButton from '../ui/BackButton';
import { RiErrorWarningLine } from "react-icons/ri";

export default function SignupInfoMessage() {
    return (
        <div className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 my-5 rounded-xl shadow-lg shadow-black/40 space-y-6">
            <div className="top">
                <BackButton />
                <div className='flex items-center justify-center'><RiErrorWarningLine className="text-yellow-500 text-[5rem] mb-4" /></div>
                <h1 className="text-white text-[1.5rem] font-bold leading-tight">Oyunlarımızı oynamadıysanız zaten bir hesabınız var demektir</h1>
            </div>
            <div className="bottom flex flex-col gap-4 mt-[32px]">
                <p className='text-[1rem] tracking-[0.02em] leading-[165%] text-[#adadaf] font-inter'>İlerlemenize ve satın alımlarınıza erişmek için normalde oynadığınız konsol hesabınızla giriş yapın. </p>
                <p className='text-[1rem] tracking-[0.02em] leading-[165%] text-[#adadaf] font-inter'>PC veya mobilde oynuyorsanız, e-postanızla giriş yapın. </p>
            </div>
            <button className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Başka bir yöntemle giriş yap
            </button>
        </div>
    )
}
