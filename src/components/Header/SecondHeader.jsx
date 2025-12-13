import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInputMobile from '@/components/ui/SearchInputMobile';
import SearchInput from '@/components/ui/SearchInput';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useWishlist } from '@/contexts/WishlistContext';


export default function SecondHeader() {
    const [showMenu, setShowMenu] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const wishlistContext = useWishlist();
    const wishlist = wishlistContext?.wishlist || [];

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={`bg-[#101014] z-40 transition-all duration-300 ${
                isFixed ? 'fixed top-0 left-0 right-0 shadow-lg' : 'relative'
            }`}>
                <div className="md:hidden flex items-center justify-between py-3 px-5">
                <SearchInputMobile />

                <div className="flex flex-6 justify-center">
                    <button className='flex items-center gap-1' onClick={() => setShowMenu(prev => !prev)}>
                        <span>Keşfet</span> {showMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                </div>

                <div className='flex flex-1'></div>
                </div>

                <div className="hidden md:block">
                    <div className="flex items-center justify-between py-3 px-5">
                    <div className="left flex gap-3 items-center">
                        <SearchInput />

                        <div className="sm:flex lg:hidden flex-6 justify-center">
                            <button className='flex items-center gap-1' onClick={() => setShowMenu(prev => !prev)}>
                                <span>Keşfet</span> {showMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </button>
                        </div>

                        <ul className='hidden lg:flex flex gap-3'>
                            <li className='p-3 hover:text-[1e1e21] transition'><Link to="/">Keşfet</Link></li>
                            <li className='p-3 hover:text-[1e1e21] text-[#9f9fa1] transition'><Link to="/browse">Göz At</Link></li>
                            <li className='p-3 hover:text-[1e1e21] text-[#9f9fa1] transition'><a href="#">Haberler</a></li>
                        </ul>
                    </div>
                        <div className="right">
                            <ul className='flex gap-3'>
                                <li className='p-3 hover:text-[1e1e21] text-[#9f9fa1] transition'>
                                    <Link to="/wishlist" className="flex items-center gap-2">
                                        İstek Listesi
                                        {wishlist.length > 0 && (
                                            <span className="bg-[#0074e4] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className='p-3 hover:text-[1e1e21] text-[#9f9fa1] transition'><a href="#">Hediyeler</a></li>
                                <li className='p-3 hover:text-[1e1e21] text-[#9f9fa1] transition'><a href="#">Sepet</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {
                showMenu && <div className='bg-[#101014] w-[90%] text-[14px] mx-auto p-5 shadow-xl mt-2'>
                    <ul className='flex flex-col gap-3'>
                        <li className='border-b border-[#3f3f43] p-3 hover:text-[1e1e21] transition'><Link to="/">Keşfet</Link></li>
                        <li className='border-b border-[#3f3f43] p-3 hover:text-[1e1e21] transition'><Link to="/browse">Göz At</Link></li>
                        <li className='p-3 hover:text-[1e1e21] transition'><a href="#">Haberler</a></li>
                    </ul>
                </div>
            }
        </>
    )
}
