import React from 'react'
import EpicLogo from "@/assets/images/epic-logo.png"
import { Sheet, SheetContent, SheetClose, SheetTrigger } from './ui/sheet'
import { Menu, X } from 'lucide-react'
import { CiGlobe } from "react-icons/ci";
import { Button } from './ui/button'
import BackButton from './ui/BackButton';
import { useState } from "react";


export default function Header() {
    const [showDistribution, setShowDistribution] = useState(false);
    return (
        <div id="header" className="flex items-center justify-between p-3">
            <div className="left flex items-center gap-3">
                <a className="logo">
                    <img src={EpicLogo} alt="Logo" width={40} height={40} />
                </a>
                <a href="#" className="uppercase">Store</a>
            </div>

            <div className="right flex items-center gap-3">
                <Button className="bg-[#26bbff] text-black px-3 py-1">
                    Yükle
                </Button>

                <Sheet>
                    <SheetTrigger>
                        <Menu className="w-6 h-6" />
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="bg-[#101014] w-full border-none text-white p-3 h-screen [&>button]:hidden"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-white text-[1.1rem] font-semibold">
                                STORE
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
                            <Button className="bg-[#343437] p-[0_10px] text-[14px]">Giriş Yap</Button>
                        </div>

                        {showDistribution == false &&
                            <div className="flex flex-col items-start gap-4 mt-4 px-3">
                                <h2 className='text-[32px] tracking-[-0.07rem] font-extrabold'>Menü</h2>
                                <a href="/support">Destek</a>
                                <button onClick={() => setShowDistribution(true)}>Dağıtım Yap</button>
                            </div>}

                        {showDistribution && <div className="flex flex-col gap-6">
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
                        </div>}

                    </SheetContent>

                </Sheet>
            </div>
        </div>
    )
}
