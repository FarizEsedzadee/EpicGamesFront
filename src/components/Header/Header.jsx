import React from 'react'
import EpicLogo from "@/assets/images/logo/epic-logo.png"
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '../ui/sheet'
import { Menu, X } from 'lucide-react'
import { CiGlobe } from "react-icons/ci";
import { Button } from '@/components/ui/button'
import BackButton from '@/components/ui/BackButton';
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import StoreImg from "@/assets/images/logo/store.svg"
import FortniteLogo from "@/assets/images/logo/FortniteLogo.svg";
import RocketLeagueLogo from "@/assets/images/logo/RocketLeagueLogo.svg";
import FallGuysLogo from "@/assets/images/logo/FallGuysLogo.svg";
import FabLogo from "@/assets/images/logo/FabLogo.svg";
import ArtStationLogo from "@/assets/images/logo/ArtStationLogo.svg";
import UnrealEngineLogo from "@/assets/images/logo/UnrealEngineLogo.svg";
import MetaHumanLogo from "@/assets/images/logo/MetaHumanLogo.svg";
import TwinmotionLogo from "@/assets/images/logo/TwinmotionLogo.svg";
import RealityScanLogo from "@/assets/images/logo/RealityScanLogo.svg";
import EpicGamesLogo from "@/assets/images/logo/EpicGamesLogo.svg";
import ServicesLogo from "@/assets/images/logo/ServicesLogo.svg";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
const variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
};



export default function Header() {
    const { currentUser, isAuthenticated, logout } = useAuth();
    const { language, setLanguage, languages, t } = useLanguage();
    const navigate = useNavigate();
    const [showDistribution, setShowDistribution] = useState(false);
    const displayName = currentUser?.displayName || currentUser?.email || 'Profil';
    const avatarChar = displayName?.charAt(0)?.toUpperCase() || 'P';
    return (
        <>
            <header id='header' className="flex w-full items-center justify-between py-5 bg-[#121216] px-5 relative z-[60]">
                <div className="left flex items-center gap-8">
                    <div className="relative group wrapper z-[60]">
                        <div className="logo flex items-center cursor-pointer relative z-[60]">
                            <img src={EpicLogo} alt="Logo" width={35} height={35} />
                            <IoIosArrowDown className='text-[13px] text-gray-400' />
                            <div></div>
                            {/* Invisible bridge to prevent dropdown from closing */}
                            <div className="absolute top-full left-0 w-full h-4 bg-transparent pointer-events-auto"></div>
                            <ul
                                className='hidden group-hover:flex absolute top-[calc(100%+1rem)] left-0
  bg-[rgba(48,48,52,0.7)] backdrop-blur-[50px]
  rounded-[16px] border border-[rgba(255,255,255,0.1)]
  shadow-[0px_32px_16px_rgba(0,0,0,0.1),0px_16px_8px_rgba(0,0,0,0.1),0px_8px_4px_rgba(0,0,0,0.1),0px_4px_2px_rgba(0,0,0,0.1),0px_2px_1px_rgba(0,0,0,0.1)]
  justify-between list-none z-[60] pointer-events-auto w-[38.75rem]'
                            >
                                {/* SOL BLOK */}
                                <li className='flex-1'>
                                    <ul className='flex flex-col h-full border-r border-[rgba(255,255,255,0.1)]'>
                                        {/* OYNA */}
                                        <li className='p-[32px] border-b border-[rgba(255,255,255,0.1)]'>
                                            <h2 className='text-[20px] pb-[10px] font-[700]'>Oyna</h2>
                                            <ul>
                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                                    <img src={FortniteLogo} className='w-[20px] h-[20px]' />
                                                    <a href="https://www.epicgames.com/fortnite" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                        Fortnite
                                                    </a>
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                                    <img src={RocketLeagueLogo} className='w-[20px] h-[20px]' />
                                                    <a href="https://www.rocketleague.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                        Rocket League
                                                    </a>
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                                    <img src={FallGuysLogo} className='w-[20px] h-[20px]' />
                                                    <a href="https://www.fallguys.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                        Fall Guys
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>

                                        {/* KEŞFET */}
                                        <li className='p-[32px]'>
                                            <h2 className='text-[20px] pb-[15px] font-[700]'>Keşfet</h2>
                                            <ul>
                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                                    <img src={StoreImg} className='w-[20px] h-[20px]' />
                                                    <a href="https://store.epicgames.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                        Epic Games Store
                                                    </a>
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                                    <img src={FabLogo} className='w-[20px] h-[20px]' />
                                                    <a href="https://www.fab.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                        Fab
                                                    </a>
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                                    <img src={ArtStationLogo} className='w-[20px] h-[20px]' />
                                                    <a href="https://www.artstation.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                        ArtStation
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                {/* SAĞ BLOK – OLUŞTUR */}
                                <li className='flex-1 p-[32px]'>
                                    <h2 className='text-[20px] pb-[6px] font-[700]'>Oluştur</h2>
                                    <ul>
                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={UnrealEngineLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://www.unrealengine.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Unreal Engine
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={FortniteLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://www.epicgames.com/fortnite/en-US/create" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Fortnite'ta Oluştur
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={MetaHumanLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://www.metahuman.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                MetaHuman
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={TwinmotionLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://www.twinmotion.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Twinmotion
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={RealityScanLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://www.epicgames.com/site/en-US/realityscan" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                RealityScan
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={EpicGamesLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://dev.epicgames.com/services" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Epic Online Services
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={EpicGamesLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://store.epicgames.com/publish" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Epic Games Store'da Yayınla
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={ServicesLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://www.kidswebservices.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Kids Web Services
                                            </a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] flex items-center'>
                                            <img src={EpicGamesLogo} className='w-[20px] h-[20px]' />
                                            <a href="https://dev.epicgames.com/community" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                Geliştirici Topluluğu
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>


                        </div>
                    </div>

                    <a href="/" className="uppercase hover:text-white transition-colors">
                        <img src={StoreImg} alt="Store" />
                    </a>

                    <ul className='hidden md:flex items-center gap-8 text-[16px] ml-2'>
                        <li><a href="#" className="hover:text-white transition-colors">Destek</a></li>
                        <li className="relative group z-[60]">
                            <button className="flex items-center gap-1 relative z-[60]">
                                Dağıtım Yap <IoIosArrowDown />
                            </button>
                            {/* Invisible bridge to prevent dropdown from closing */}
                            <div className="absolute top-full left-0 w-full h-4 bg-transparent pointer-events-auto"></div>
                            <div className="absolute left-0 top-[calc(100%+1rem)] hidden group-hover:block bg-[#292a32] w-[280px] p-3 rounded-md shadow-2xl text-[16px] border border-[#3f3f43] z-[60] pointer-events-auto">
                                <ul className="flex flex-col gap-2 text-sm">
                                    <li>
                                        <a
                                            href="https://store.epicgames.com/tr/distribution"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full p-[10px_12px] rounded hover:bg-[#1e1e21] hover:text-white focus:bg-[#1e1e21] focus:text-white transition-colors"
                                        >
                                            Epic Games Store'da Dağıtım Yap
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://forums.unrealengine.com/categories?tag=epic-games-store"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full p-[10px_12px] rounded hover:bg-[#1e1e21] hover:text-white focus:bg-[#1e1e21] focus:text-white transition-colors"
                                        >
                                            Geliştirici Forumları
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://dev.epicgames.com/docs/epic-games-store"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full p-[10px_12px] rounded hover:bg-[#1e1e21] hover:text-white focus:bg-[#1e1e21] focus:text-white transition-colors"
                                        >
                                            Dokümantasyon
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://dev.epicgames.com/community/epic-games-store/learning"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full p-[10px_12px] rounded hover:bg-[#1e1e21] hover:text-white focus:bg-[#1e1e21] focus:text-white transition-colors"
                                        >
                                            Öğrenme
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                    </ul>

                </div>

                <div className="right flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden md:flex items-center gap-1 focus:outline-none px-2 py-1 rounded-md hover:bg-[#1f1f25]">
                            <CiGlobe className='text-[22px]' />
                            <span className="text-white text-sm font-medium">{language.toUpperCase()}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            sideOffset={6}
                            className="z-[90] w-44 bg-[#111015] text-white border border-[#2a2a30] rounded-xl shadow-2xl px-0 py-2"
                        >
                            {languages.map((lng) => (
                                <DropdownMenuItem
                                    key={lng.code}
                                    onSelect={() => setLanguage(lng.code)}
                                    className="px-4 py-2 text-[14px] hover:bg-[#1b1b22] focus:bg-[#1b1b22] hover:text-white focus:text-white"
                                >
                                    <span className="flex items-center justify-between w-full">
                                        {lng.label}
                                        {lng.code === language && <span className="text-[#26bbff] text-xs">✓</span>}
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="hidden md:flex items-center gap-2 focus:outline-none relative z-[80]">
                                <div className="w-9 h-9 rounded-full bg-[#353539] text-white flex items-center justify-center font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                                    {avatarChar}
                                </div>
                                <span className="text-white text-sm font-semibold">{displayName}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                sideOffset={10}
                                className="z-[90] w-60 bg-[#111015] text-white border border-[#2a2a30] rounded-xl shadow-2xl px-0 py-2"
                            >
                                <DropdownMenuItem
                                    asChild
                                    className="px-4 py-3 text-[14px] hover:bg-[#1b1b22] hover:text-white focus:bg-[#1b1b22]"
                                >
                                    <Link to="/profile">Profil</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    asChild
                                    className="px-4 py-3 text-[14px] hover:bg-[#1b1b22] hover:text-white focus:bg-[#1b1b22]"
                                >
                                    <Link to="/wishlist">İstek Listesi</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    asChild
                                    className="px-4 py-3 text-[14px] hover:bg-[#1b1b22] hover:text-white focus:bg-[#1b1b22]"
                                >
                                    <Link to="/gifts">Hediyeler</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    asChild
                                    className="px-4 py-3 text-[14px] hover:bg-[#1b1b22] hover:text-white focus:bg-[#1b1b22]"
                                >
                                    <Link to="/cart">Sepet</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#2a2a30]" />
                                <DropdownMenuItem
                                    onSelect={() => {
                                        logout();
                                        navigate('/');
                                    }}
                                    className="px-4 py-3 text-[14px] text-red-400 hover:bg-[#1b1b22] focus:bg-[#1b1b22]"
                                >
                                    Çıkış Yap
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <a href='/login' className="bg-[#353539] text-[14px] text-white p-[6px_8px] rounded-[8px] hidden md:flex">
                            {t('login')}
                        </a>
                    )}
                    <a href='https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi' className="bg-[#26bbff] text-[14px] text-black p-[6px_8px] rounded-[8px]">
                        {t('download')}
                    </a>

                    <Sheet>
                        <SheetTrigger>
                            <Menu className="w-6 h-6 md:hidden" />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="bg-[#101014] w-full border-none text-white p-3 h-screen [&>button]:hidden"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-white text-[1.1rem] font-semibold">
                                    <img src={StoreImg} alt="Store" />
                                </span>

                                <div className="flex items-center gap-3">
                                    <Button className="bg-[#26bbff] text-black px-4 py-1 hover:bg-[#6ECDFA]">
                                        Yükle
                                    </Button>

                                    <SheetClose asChild>
                                        <button>
                                            <X className="w-6 h-6" />
                                        </button>
                                    </SheetClose>
                                </div>
                            </div>

                            <div className='flex items-center justify-end gap-3 mt-4'>
                                <CiGlobe className='text-[24px]' />
                                {isAuthenticated ? (
                                    <Link to="/profile" className="flex items-center gap-3 bg-[#353539] p-[6px_8px] rounded-[8px] text-white">
                                        <div className="w-9 h-9 rounded-full bg-[#353539] text-white flex items-center justify-center font-semibold">{avatarChar}</div>
                                        <span className="text-sm font-semibold truncate max-w-[100px]">{displayName}</span>
                                    </Link>
                                ) : (
                                    <Button className="bg-[#343437] p-[0_10px] text-[14px]"><a href="/login" className="block hover:text-white transition-colors">Giriş Yap</a></Button>
                                )}
                            </div>


                            <AnimatePresence mode="wait">
                                {/* Menu Panel */}
                                {!showDistribution &&
                                    <motion.div
                                        key="menu"
                                        variants={variants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="flex flex-col items-start gap-4 mt-4 px-3">
                                        <h2 className='text-[32px] tracking-[-0.07rem] font-extrabold'>Menü</h2>
                                        <a className='w-full block hover:text-white transition-colors' href="/support">Destek</a>
                                        <button className='flex items-center justify-between w-full' onClick={() => setShowDistribution(true)}>Dağıtım Yap <IoIosArrowForward /></button>
                                    </motion.div>
                                }

                                {/* Dağıtım Panel */}
                                {showDistribution &&
                                    <motion.div
                                        key="distribution"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="flex flex-col gap-6">
                                        <BackButton onClick={() => setShowDistribution(false)} className="px-3" />

                                        <h2 className="text-[32px] tracking-[-0.07rem] font-extrabold px-3">
                                            Dağıtım Yap
                                        </h2>

                                        <ul className="flex flex-col gap-2">
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://store.epicgames.com/tr"
                                                    className="block w-full px-4 py-3 rounded-lg
                                                hover:bg-[#2a2a2f] transition-colors"
                                                >
                                                    Epic Games Store'da Dağıtım Yap
                                                </a>
                                            </li>

                                            <li>
                                                <a target="_blank"
                                                    href="https://forums.unrealengine.com/categories?tag=epic-games-store"
                                                    className="block w-full px-4 py-3 rounded-lg hover:bg-[#2a2a2f] transition-colors"
                                                >
                                                    Geliştirici Forumları
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://dev.epicgames.com/docs/epic-games-store"
                                                    className="block w-full px-4 py-3 rounded-lg
                                                hover:bg-[#2a2a2f] transition-colors"
                                                >
                                                    Dokümantasyon
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://dev.epicgames.com/community/epic-games-store/learning"
                                                    className="block w-full px-4 py-3 rounded-lg
                                                hover:bg-[#2a2a2f] transition-colors"
                                                >
                                                    Öğrenme
                                                </a>
                                            </li>
                                        </ul>
                                    </motion.div>}
                            </AnimatePresence>
                        </SheetContent>
                    </Sheet>
                </div>
            </header >
        </>
    )
}
