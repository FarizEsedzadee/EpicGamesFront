import React from 'react'
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button type="button" onClick={() => navigate(-1)} className='flex text-white items-center gap-1 my-[12px_24px] cursor-pointer group'>
            <RiArrowLeftSLine className='text-[20px]' />
            <span className='text-[14px] font-medium group-hover:translate-x-[5px] transition-all duration-300'>Geri</span>
        </button>
    )
}
