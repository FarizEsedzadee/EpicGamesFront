import React, { useState } from 'react'
import BackButton from '@/components/ui/BackButton';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";
import AlternativeCreateLink from './AlternativeCreateLink';

export default function LoginPasswordForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "Giriş yapılamadı");
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-[560px] border border-[#29292c] bg-[#18181c] p-8 rounded-xl shadow-lg shadow-black/40 space-y-6 "
        >
            <div className="top">
                <BackButton />
                <h1 className="text-white text-[1.5rem] font-bold leading-tight mb-5">Giriş Yap</h1>
                <p className='text-white'>E-postan ve şifrenle giriş yap.</p>
            </div>
            <div className="bottom flex flex-col gap-4 mt-[32px]">
                <div className='flex flex-col gap-2'>
                    <Label className="text-[#adadaf]">E-posta</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className="text-[#adadaf]">Şifre</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-[#39393c] bg-[#242428] text-white p-[24px_20px] rounded-lg w-full"
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
            <label className='flex'>
                <Checkbox id="remember-me" className="mr-2 data-[state=checked]:bg-blue-400 data-[state=checked]:text-black w-[20px] h-[20px]" />
                <p className='text-white text-[15px]'>Giriş yaparken beni hatırla</p>
            </label>

            <button type="submit" className="w-full py-3 rounded-lg bg-[#26bbff] text-black font-medium hover:bg-[#3d3d42] transition cursor-pointer mt-[20px]">
                Devam Et
            </button>

            <div className='flex flex-col gap-4'>
                <a href="#" className='text-[#26bbff] text-center '>Gizlilik politikası</a>
            </div>

            <AlternativeCreateLink />
        </form>
    )
}
