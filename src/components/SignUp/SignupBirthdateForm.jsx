import React from 'react'
import BackButton from '../ui/BackButton'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from "@/components/ui/input"
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
]

export default function SignupBirthdateForm() {
    return (
        <div className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 my-5 rounded-xl shadow-lg shadow-black/40 space-y-6">
            <div className="top">
                <BackButton />
                <h1 className="text-white text-[1.5rem] font-bold leading-tight">Doğum tarihini gir</h1>
            </div>
            <div className="bottom flex flex-col gap-4 mt-[32px]">
                <p className='text-[1rem] tracking-[0.02em] leading-[165%] text-[#adadaf] font-inter'>Bu bilgiyi, yaşın fark etmeksizin güvenli ve eğlenceli bir deneyim yaşayabilmen için soruyoruz. </p>
            </div>
            <div>
                <Label className="text-[#adadaf]">Doğum tarihi</Label>
                <div className="grid grid-cols-3 mt-5 gap-4">
                    <Select>
                        <SelectTrigger className="border border-[#29292c] text-white p-[24px_20px] rounded-lg w-full">
                            <SelectValue placeholder="Gün" />
                        </SelectTrigger>

                        <SelectContent position="popper" sideOffset={4} className="bg-[#353536] text-white border-none max-h-60 overflow-y-auto z-50">
                            {days.map(day => (
                                <SelectItem key={day} value={String(day)} className="bg-[#353536] hover:bg-[#515152] cursor-pointer transition-all py-3">
                                    {day}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="border border-[#29292c] text-white p-[24px_20px] rounded-lg w-full">
                            <SelectValue placeholder="Ay" />
                        </SelectTrigger>

                        <SelectContent position="popper" sideOffset={4} className="bg-[#353536] text-white border-none max-h-60 overflow-y-auto z-50">
                            {months.map(month => (
                                <SelectItem key={month} value={month} className="bg-[#353536] hover:bg-[#515152] cursor-pointer transition-all py-3">
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input type="number" placeholder="Yıl" className="border border-[#29292c] text-white p-[24px_20px] rounded-lg w-full" />
                </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Devam et
            </button>
        </div>
    )
}
