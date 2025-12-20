import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

const formatPrice = (value, currency = '₺') => {
  if (value === null || value === undefined) return '';
  try {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue);
  } catch (e) {
    return `${currency}${value}`;
  }
};

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { state: { from: location.pathname } });
  }, [isAuthenticated, navigate, location]);

  const handleCheckout = () => {
    clearCart();
    alert('Satın alma tamamlandı! Oyunlar kütüphanenize eklendi (satın alma sistemi aktif olmadığından simulasyon alert ilə yetindik).');
    navigate('/');
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
                <p className="text-sm uppercase tracking-[0.2em] text-[#8c8c90]">{t('cartTitle')}</p>
                <h1 className="text-3xl font-bold mt-1">Games and apps</h1>
              </div>
            </div>

            {(!items || items.length === 0) ? (
              <div className="bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Sepetiniz boş</h2>
                <p className="text-[#9f9fa1] mb-4">Hemen oyun ekleyip alışverişe başlayın.</p>
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center bg-[#0074e4] hover:bg-[#0084f4] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Mağazaya dön
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => {
                    const priceValue =
                      item.price?.discountRate && item.price?.current !== undefined
                        ? item.price.current
                        : item.price?.current ?? item.price?.original ?? 0;

                    return (
                      <div
                        key={item.gameId}
                        className="flex gap-4 bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-4"
                      >
                        <Link to={`/game/${item.gameId}`} className="flex-shrink-0">
                          <div className="w-28 h-36 overflow-hidden rounded-lg bg-[#1c1c22]">
                            <img
                              src={item.media?.coverImage || item.media?.bannerImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
                              <p className="text-[11px] uppercase tracking-wide text-[#8c8c90]">
                                {item.productType || 'Ana Oyun'}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.gameId)}
                              className="text-[#9f9fa1] hover:text-white text-sm"
                            >
                              Kaldır
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3">
                              <label className="text-sm text-[#9f9fa1]">Adet</label>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity || 1}
                                onChange={(e) => updateQuantity(item.gameId, parseInt(e.target.value || '1', 10))}
                                className="w-16 bg-[#1c1c22] border border-[#2a2a30] rounded px-2 py-1 text-white text-sm focus:outline-none"
                              />
                            </div>
                            <div className="text-right">
                              {item.isFree ? (
                                <span className="text-white font-semibold">Ücretsiz</span>
                              ) : (
                                <span className="text-white font-semibold">
                                  {formatPrice(priceValue)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#0f0f13] border border-[#1f1f24] rounded-xl p-5 h-fit space-y-4">
                  <h3 className="text-lg font-semibold">Ödeme Özeti</h3>
                  <div className="flex items-center justify-between text-sm text-[#c6c6ca]">
                    <span>Ara toplam</span>
                    <span className="text-white font-semibold">{formatPrice(totals.subtotal)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#0074e4] hover:bg-[#0084f4] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Satın Al
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-[#9f9fa1] hover:text-white"
                  >
                    Sepeti temizle
                  </button>
                  <p className="text-xs text-[#6f6f73]">
                    Bu demo, satın alma akışını simüle eder. Ödeme sonrası sepetiniz sıfırlanır.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

