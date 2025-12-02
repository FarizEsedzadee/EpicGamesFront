import React from 'react'
import { useState } from "react";
import SearchInput from '@/components/ui/SearchInput';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export default function SecondHeader() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between py-3 px-5">
                <SearchInput />

                <div className="flex flex-6 justify-center">
                    <button className='flex items-center gap-1' onClick={() => setShowMenu(prev => !prev)}>
                        <span>Keşfet</span> {showMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                </div>

                <div className='flex flex-1'></div>
            </div>

            {
                showMenu && <div className='bg-[#101014] w-[90%] text-[14px] mx-auto p-5 shadow-xl mt-2'>
                    <ul className='flex flex-col gap-3'>
                        <li className='border-b border-[#3f3f43] p-3 hover:text-[1e1e21] transition'><a href="#">Keşfet</a></li>
                        <li className='border-b border-[#3f3f43] p-3 hover:text-[1e1e21] transition'><a href="#">Göz At</a></li>
                        <li className='p-3 hover:text-[1e1e21] transition'><a href="#">Haberler</a></li>
                    </ul>
                </div>
            }
        </>
    )
}
