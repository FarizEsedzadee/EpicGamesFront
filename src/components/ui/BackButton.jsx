import React from 'react'
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';

export default function BackButton({ onClick }) {
    const navigate = useNavigate();

    const location = useLocation();

    const handleClick = (e) => {
        if (typeof onClick === 'function') return onClick(e);

        // If we're on login or signup pages and have a from state, go to home instead of back to protected page
        if ((location.pathname === '/login' || location.pathname.startsWith('/signup')) && location?.state?.from) {
            navigate('/');
            return;
        }

        // Default behavior: go back if possible, otherwise go to home
        if (window.history && window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <button onClick={handleClick} className='flex text-white items-center gap-1 my-[12px_24px] cursor-pointer group'>
            <RiArrowLeftSLine className='text-[20px]' />
            <span className='text-[14px] font-medium group-hover:translate-x-[5px] transition-all duration-300'>Geri</span>
        </button>
    )
}
