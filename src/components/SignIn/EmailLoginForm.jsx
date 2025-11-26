import React from 'react'

export default function EmailLoginForm() {
    return (
        <div className='flex flex-col gap-[20px] justify-between w-full border border-gray-700 rounded-[15px] p-[16px]'>
            <p className="text-center text-[#7b7b7d] font-semibold">PC ve ya mobilde mi oynadın?</p>
            <label>
                <span className='text-[#7b7b7d] font-semibold'>E-posta ile giriş yap</span>
                <input type="text" className="w-full p-[10px_20px] text-white bg-[#202024] rounded-[10px] mt-[5px] border-[#7b7b7d] border-[1px]  " />
            </label>
            <button className="w-full bg-[#26bbff] hover:bg-[#8adbff] p-[10px] rounded-[10px] font-semibold cursor-pointer">Devam Et</button>
        </div>
    )
}
