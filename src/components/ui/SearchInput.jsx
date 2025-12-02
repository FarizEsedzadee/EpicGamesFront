import React from 'react'

export default function SearchInput() {
    return (
        <div>
            <form class="max-w-md mx-auto">
                <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                    </div>
                    <input type="text" id="search" class="block w-full p-3 ps-9 bg-[#202024] text-[#b1b1b3] text-sm rounded-base shadow-xs placeholder:text-body rounded-[50px] border-none placeholder-[#b1b1b3] placeholder:text-[13px] focus:border-none focus:bg-[#404044] focus:ring-none outline-none" placeholder="Mağazada Ara" />
                </div>
            </form>

        </div>
    )
}
