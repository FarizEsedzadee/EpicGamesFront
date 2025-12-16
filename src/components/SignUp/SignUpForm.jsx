import React, { useEffect, useState } from 'react'
import BackButton from '@components/ui/BackButton';
import { Label } from '@components/ui/Label';
import { Input } from '@components/ui/Input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { Checkbox } from '@components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {

    const [countries, setCountries] = useState([]);
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        displayName: '',
        country: ''
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectCountry = (value) => {
        setForm((prev) => ({ ...prev, country: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        try {
            signup(form);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Kayıt başarısız');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 my-5 rounded-xl shadow-lg shadow-black/40 space-y-6">

            <div className="top">
                <BackButton />
                <h1 className="text-white text-[1.5rem] font-bold leading-tight">
                    Kendi hesabınızı oluşturun
                </h1>
            </div>

            <div className="bottom flex flex-col gap-4 mt-[32px]">

                <Label className="text-[#adadaf]">E-posta adresi</Label>
                <Input
                    name="email"
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />

                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <Label className="text-[#adadaf] mb-3">Ad</Label>
                        <Input
                            name="firstName"
                            required
                            type="text"
                            value={form.firstName}
                            onChange={handleChange}
                            className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />
                    </div>
                    <div>
                        <Label className="text-[#adadaf] mb-3">Soyad</Label>
                        <Input
                            name="lastName"
                            required
                            type="text"
                            value={form.lastName}
                            onChange={handleChange}
                            className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />
                    </div>
                </div>

                <Label className="text-[#adadaf]">Şifre oluştur</Label>
                <Input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />

                <Label className="text-[#adadaf]">Görünen ad ekle</Label>
                <Input
                    name="displayName"
                    type="text"
                    value={form.displayName}
                    onChange={handleChange}
                    className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full" />

                <Label className="text-[#adadaf]">Ülke</Label>
                <Select onValueChange={handleSelectCountry}>
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
                    <Checkbox id="tos" className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                    <Label htmlFor="tos" className="text-[14px] text-[#cccccc] font-[400] leading-[140%] whitespace-break-spaces">
                        Hizmet Şartları'nı okudum ve onaylıyorum
                    </Label>
                </div>

                <div className="flex items-start gap-3">
                    <Checkbox id="remember" defaultChecked className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                    <label htmlFor="remember" className="text-[14px] text-[#cccccc] font-[400] leading-[140%] whitespace-break-spaces">
                        Giriş yapmam için Epic Games'i kullanan oyunlarda ve uygulamalarda beni hatırla {" "} <span className='text-[#888888]'>(isteğe bağlı)</span>
                    </label>
                </div>

                <div className="flex items-start gap-3">
                    <Checkbox
                        id="news"
                        className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <label htmlFor="news" className="text-[14px] text-[#cccccc] font-[400] leading-[140%] whitespace-break-spaces">
                        Bana Epic Games'ten haberleri, anketleri ve teklifleri gönder{" "}
                        <span className="text-[#888888]">(İsteğe bağlı)</span>
                    </label>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

            </div>

            <button type="submit" className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Devam Et
            </button>
            <div className="flex items-center justify-center text-[#cccccc]">
                <span>Zaten bir hesabın var mı? <a className='underline text-blue-300' href="/login">Oturum aç</a></span>
            </div>
        </form>
    )
}
