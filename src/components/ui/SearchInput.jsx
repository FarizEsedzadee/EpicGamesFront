import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only">
                    {t('searchStore')}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                    </div>
                    <input 
                        type="text" 
                        id="search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="block w-full p-3 ps-9 bg-[#202024] text-[#b1b1b3] text-sm rounded-base shadow-xs placeholder:text-body rounded-[50px] border-none placeholder-[#b1b1b3] placeholder:text-[13px] focus:border-none focus:bg-[#404044] focus:ring-none outline-none" 
                        placeholder={t('searchStore')} 
                    />
                </div>
            </form>
        </div>
    )
}
