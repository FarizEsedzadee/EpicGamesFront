import React from 'react'



export default function Card({image, title, price}) {
    return (
        <div className="w-[186px] h-[359px] mx-auto ">
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Battlefield_2042_cover_art.jpg/250px-Battlefield_2042_cover_art.jpg" className="rounded-[5px] transition duration-300 hover:brightness-110"
                    alt="battlefield-image" />
            </div>
            <div className="flex flex-col gap-[8px]">
                <span className="text-[#ffffffa6] text-[12px] pt-[8px]">Edition</span>
                <span className="text-[16px] text-white font-bold">{title}</span>
                <div className="flex items-center gap-[10px]">
                    <span className="bg-[#26bbff] rounded-[20px] font-semibold text-[12px] px-[8px]">-15%</span>
                    <span className="text-[#ffffffa6]"><del>$99.99</del></span>
                    <span className="text-white">${price}</span>
                </div>
            </div>
        </div>
    )
}
