import React from 'react'
import BackButton from '../ui/BackButton'
import firstPartyGamesImage from '../../assets/images/first-party-games.png'

export default function SignUpQuestions() {
    return (
        <div className="w-full max-w-[560px] border border-gray-700 bg-[#18181c] p-8 my-5 rounded-xl shadow-lg shadow-black/40 space-y-6">

            <div>
                <BackButton />
            </div>

            <h1 className="text-white text-[1.5rem] font-bold leading-tight">
                Bu oyunlardan herhangi birini konsolunuzda, mobil cihazınızda
                veya PC'nizde oynadınız mı?
            </h1>

            <img
                src={firstPartyGamesImage}
                alt="Games Photos"
                className="rounded-lg mt-4"
            />

            <div className="flex flex-col items-center justify-center w-full gap-4 mt-4">
                <button className="w-full py-3 rounded-lg bg-[#2F2F33] text-white font-medium hover:bg-[#3d3d42] transition cursor-pointer">
                    Evet
                </button>

                <button className="w-full py-3 rounded-lg bg-[#2F2F33] text-white font-medium hover:bg-[#3d3d42] transition cursor-pointer">
                    HAYIR
                </button>
            </div>

        </div>
    )
}
