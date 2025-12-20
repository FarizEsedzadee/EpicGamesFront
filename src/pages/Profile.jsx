import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { currentUser, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    firstName: '',
    lastName: '',
    country: 'Türkiye',
    city: '',
    address: '',
    zip: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        country: currentUser.country || 'Türkiye',
        city: currentUser.city || '',
        address: currentUser.address || '',
        zip: currentUser.zip || ''
      }));
    }
  }, [currentUser, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    alert('Profil bilgileri kaydedildi.');
  };

  return (
    <>
      <div className="w-full min-h-screen text-white bg-[#101014]">
        <Header />
        <main className="sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px] mx-auto py-3 px-5">
          <SecondHeader />

          <div className="py-10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#8c8c90]">Profil</p>
                <h1 className="text-3xl font-bold mt-1">Hesap bilgileri</h1>
              </div>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-5 space-y-4">
                <h2 className="text-lg font-semibold">Hesap</h2>
                <div className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Görünen ad</label>
                    <input
                      name="displayName"
                      value={form.displayName}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">E-posta</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-5 space-y-4">
                <h2 className="text-lg font-semibold">Kişisel bilgiler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Ad</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Soyad</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Ülke</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Şehir</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Adres</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#9f9fa1]">Posta Kodu</label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      className="bg-[#1c1c22] border border-[#2a2a30] rounded px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <div className="lg:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0074e4] hover:bg-[#0084f4] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

