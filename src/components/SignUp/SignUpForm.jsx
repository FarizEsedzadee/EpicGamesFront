import React, { useEffect, useState } from 'react'
import BackButton from '../ui/BackButton';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

import SocialSign from '../ui/SocialSign';
import appleImg from '../../assets/images/apple.png';
import googleImg from '../../assets/images/google.png';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { Checkbox } from '../ui/checkbox';

export default function SignUpForm() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all?fields=name")
            .then(res => {
                const list = res.data
                    .map(country => country.name.common)
                    .sort((a, b) => a.localeCompare(b));
                setCountries(list);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 my-5 rounded-xl shadow-lg shadow-black/40 space-y-6">

            <div className="top">
                <BackButton />
                <h1 className="text-white text-[1.5rem] font-bold leading-tight">
                    Kendi hesabınızı oluşturun
                </h1>
            </div>

            <div className="bottom flex flex-col gap-4 mt-[32px]">

                <Label className="text-[#adadaf]">E-posta adresi</Label>
                <Input type="email" placeholder="E-posta adresinizi girin"
                    className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />

                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <Label className="text-[#adadaf] mb-3">Ad</Label>
                        <Input required type="text"
                            className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />
                    </div>
                    <div>
                        <Label className="text-[#adadaf] mb-3">Soyad</Label>
                        <Input required type="text"
                            className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />
                    </div>
                </div>

                <Label className="text-[#adadaf]">Şifre oluştur</Label>
                <Input type="password"
                    className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />

                <Label className="text-[#adadaf]">Görünen ad ekle</Label>
                <Input type="text"
                    className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />

                <Label className="text-[#adadaf]">Ülke</Label>
                <Select>
                    <SelectTrigger className="w-full border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg ">
                        <SelectValue placeholder="Ülke seç" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#242428] text-white border-none max-h-60 overflow-y-auto z-50">
                        {countries.map((name) => (
                            <SelectItem key={name} value={name}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-start gap-3">
                    <Checkbox id="tos" className="mt-1" />
                    <Label htmlFor="tos" className="text-[14px] text-[#cccccc]">
                        I have read and agree to the{" "}
                        <a href="#" className="text-[#26bbff] underline">
                            Terms of Service
                        </a>{" "}
                        and the{" "}
                        <a href="#" className="text-[#26bbff] underline">
                            Epic Games Store End User License Agreement
                        </a>
                    </Label>
                </div>

                {/* Remember Me */}
                <div className="flex items-start gap-3">
                    <Checkbox id="remember" defaultChecked className="mt-1" />
                    <Label htmlFor="remember" className="text-[14px] text-[#cccccc]">
                        Remember me in games and apps that use Epic Games to sign in{" "}
                        <span className="text-[#888888]">(optional)</span>
                    </Label>
                </div>

                {/* Send News */}
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="news"
                        className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />                    <Label htmlFor="news" className="text-[14px] text-[#cccccc]">
                        Send news, surveys, and offers from Epic Games{" "}
                        <span className="text-[#888888]">(Optional)</span>
                    </Label>
                </div>

            </div>

            <button className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Devam Et
            </button>
        </div>
    )
}
