import React, { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const mockGifts = [
  {
    id: 'gift-1',
    title: 'Rocket League',
    status: 'received',
    from: 'Epic Friend',
    to: 'Siz',
    date: '2025-12-10',
    message: 'İyi oyunlar!'
  },
  {
    id: 'gift-2',
    title: 'Fortnite: Crew Paketi',
    status: 'sent',
    from: 'Siz',
    to: 'Arkadaş',
    date: '2025-12-08',
    message: 'Yeni sezon kutlu olsun.'
  }
];

const tabs = [
  { id: 'all', label: 'Tümü' },
  { id: 'unopened', label: 'Açılmamış' },
  { id: 'received', label: 'Alınan' },
  { id: 'sent', label: 'Gönderilen' }
];

export default function Gifts() {
  const [activeTab, setActiveTab] = useState('all');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return mockGifts;
    if (activeTab === 'unopened') return []; // placeholder
    return mockGifts.filter((g) => g.status === activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="w-full min-h-screen text-white bg-[#101014]">
        <Header />
        <main className="sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px] mx-auto py-3 px-5">
          <SecondHeader />

          <div className="py-10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#8c8c90]">{t('giftsTitle')}</p>
                <h1 className="text-3xl font-bold mt-1">Gift history</h1>
              </div>
            </div>

            <div className="flex gap-4 border-b border-[#1f1f24] pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-white border-b-2 border-white'
                      : 'text-[#8c8c90] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Bu sekmede içerik yok</h2>
                <p className="text-[#9f9fa1]">Hediye aldığınızda veya gönderdiğinizde burada listelenecek.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((gift) => (
                  <div key={gift.id} className="bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{gift.title}</h3>
                        <p className="text-xs uppercase tracking-wide text-[#8c8c90]">
                          {gift.status === 'received' ? 'Alınan' : 'Gönderilen'} • {gift.date}
                        </p>
                      </div>
                      <span className="text-xs bg-[#1c1c22] px-3 py-1 rounded-full text-white">
                        {gift.status === 'received' ? 'Alıcı: Siz' : `Alıcı: ${gift.to}`}
                      </span>
                    </div>
                    <p className="text-sm text-[#c6c6ca]">
                      {gift.status === 'received' ? `Gönderen: ${gift.from}` : `Gönderen: ${gift.from}`}
                    </p>
                    {gift.message && (
                      <p className="text-sm text-[#9f9fa1]">Not: {gift.message}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

