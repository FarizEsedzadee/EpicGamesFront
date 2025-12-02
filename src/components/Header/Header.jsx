import React from 'react'
import EpicLogo from "@/assets/images/epic-logo.png"
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '../ui/sheet'
import { Menu, X } from 'lucide-react'
import { CiGlobe } from "react-icons/ci";
import { Button } from '@/components/ui/button'
import BackButton from '@/components/ui/BackButton';
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import StoreImg from "@/assets/images/store.svg"
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
const variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
};



export default function Header() {
    const [showDistribution, setShowDistribution] = useState(false);
    return (
        <>
            <header id='header' className="flex w-full items-center justify-between py-5 bg-[#121216] px-5 ">
                <div className="left flex items-center gap-8">
                    <div className="relative group wrapper">
                        <div className="logo flex items-center cursor-pointer">
                            <img src={EpicLogo} alt="Logo" width={35} height={35} />
                            <IoIosArrowDown className='text-[13px] text-gray-400' />
                            <div></div>
                            <ul className='hidden group-hover:flex absolute top-[120%] w-[550px] h-[300px] bg-[rgba(48,48,52,0.7)]
                                   backdrop-blur-[50px] rounded-[16px] border border-[rgba(255,255,255,0.1)]
                                   shadow-[0px_32px_16px_rgba(0,0,0,0.1), 0px_16px_8px_rgba(0,0,0,0.1), 0px_8px_4px_rgba(0,0,0,0.1), 0px_4px_2px_rgba(0,0,0,0.1), 0px_2px_1px_rgba(0,0,0,0.1)]
                                   justify-between items-start h-auto w-[38.75rem] list-none'
                            >
                                <li className='flex-1'>
                                    <ul className='flex flex-col justify-between items-start h-full border-r border-[rgba(255,255,255,0.1)]'>
                                        <li className='flex-1 p-[32px] w-full border-b border-[rgba(255,255,255,0.1)]'>
                                            <h2 className='text-[20px] pb-[10px] font-[700] leading-[120%]'>Oyna</h2>
                                            <ul>
                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                                    <img src={FortniteLogo} alt="Fortnite" className='w-[20px] h-[20px]' />
                                                    Fortnite
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                                    <img src={RocketLeagueLogo} alt="Rocket League" className='w-[20px] h-[20px]' />
                                                    Rocket League
                                                </li>

                                                <li className='p-[4px_0px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                                    <img src={FallGuysLogo} alt="Fall Guys" className='w-[20px] h-[20px]' />
                                                    Fall Guys
                                                </li>
                                            </ul>
                                        </li>

                                        <li className='flex-1 p-[32px]'>
                                            <h2 className='text-[20px] pb-[15px] font-[700] leading-[120%]'>Keşfet</h2>
                                            <ul>
                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                                    <img src={StoreImg} alt="Epic Games Store" className='w-[20px] h-[20px]' />
                                                    <a href="#">Epic Games Store</a>
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                                    <img src={FabLogo} alt="Fab" className='w-[20px] h-[20px]' />
                                                    <a href="#">Fab</a>
                                                </li>

                                                <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                                    <img src={ArtStationLogo} alt="ArtStation" className='w-[20px] h-[20px]' />
                                                    <a href="#">ArtStation</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                <li className='flex-1 p-[32px]'>
                                    <h2 className='text-[20px] pb-[6px] font-[700] leading-[120%]'>Oluştur</h2>
                                    <ul>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={UnrealEngineLogo} alt="Unreal Engine" className='w-[20px] h-[20px]' />
                                            <a href="#">Unreal Engine</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={FortniteLogo} alt="Fortnite'ta Oluştur" className='w-[20px] h-[20px]' />
                                            <a href="#">Fortnite'ta Oluştur</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={MetaHumanLogo} alt="MetaHuman" className='w-[20px] h-[20px]' />
                                            <a href="#">MetaHuman</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={TwinmotionLogo} alt="Twinmotion" className='w-[20px] h-[20px]' />
                                            <a href="#">Twinmotion</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={RealityScanLogo} alt="RealityScan" className='w-[20px] h-[20px]' />
                                            <a href="#">RealitiyScan</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={EpicGamesLogo} alt="Epic Online Services" className='w-[20px] h-[20px]' />
                                            <a href="#">Epic Online Services</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={EpicGamesLogo} alt="Store'da Yayınla" className='w-[20px] h-[20px]' />
                                            <a href="#">Epic Games Store'da Yayınla</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={ServicesLogo} alt="Kids Web Services" className='w-[20px] h-[20px]' />
                                            <a href="#">Kids Web Services</a>
                                        </li>

                                        <li className='py-[4px] h-[2.5rem] gap-[0.75rem] w-[calc(100%+0.5rem)] flex items-center'>
                                            <img src={EpicGamesLogo} alt="Geliştirici Topluluğu" className='w-[20px] h-[20px]' />
                                            <a href="#">Geliştirici Topluluğu</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <a href="#" className="uppercase">
                        <img src={StoreImg} alt="Store" />
                    </a>

                    <ul className='hidden md:flex items-center gap-8 text-[16px] ml-2'>
                        <li><a href="#">Destek</a></li>
                        <li className="relative group">
                            <button className="flex items-center gap-1">
                                Dağıtım Yap <IoIosArrowDown />
                            </button>

                            <div className="absolute left-0 mt-2 hidden group-hover:block bg-[#292a32] w-[280px] p-3 rounded-md shadow-2xl text-[16px] border border-[#3f3f43] z-10">
                                <ul className="flex flex-col gap-2 text-sm">
                                    <li className="hover:bg-[#1e1e21] p-[10px_12px] rounded">Epic Games Store'da Dağıtım Yap</li>
                                    <li className="hover:bg-[#1e1e21] p-[10px_12px] rounded">Geliştirici Forumları</li>
                                    <li className="hover:bg-[#1e1e21] p-[10px_12px] rounded">Dokümantasyon</li>
                                    <li className="hover:bg-[#1e1e21] p-[10px_12px] rounded">Öğrenme</li>
                                </ul>
                            </div>
                        </li>

                    </ul>

                </div>

                <div className="right flex items-center gap-3">
                    <CiGlobe className='text-[24px] hidden md:flex' />
                    <a href='/login' className="bg-[#353539] text-[14px] text-white p-[6px_8px] rounded-[8px] hidden md:flex">
                        Giriş Yap
                    </a>
                    <a href='https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi' className="bg-[#26bbff] text-[14px] text-black p-[6px_8px] rounded-[8px]">
                        Yükle
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
                                <Button className="bg-[#343437] p-[0_10px] text-[14px]"><a href="/login">Giriş Yap</a></Button>
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
                                        <a className='w-full' href="/support">Destek</a>
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
