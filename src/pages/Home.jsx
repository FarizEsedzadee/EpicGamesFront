import Header from '@/components/Header/Header'
import SecondHeader from '@/components/Header/SecondHeader'
import React from 'react'


export default function Home() {

    return (
        <div className="w-full min-h-screen text-white">
            <Header />
            <main>
                <SecondHeader />
            </main >
        </div >
    )
}
