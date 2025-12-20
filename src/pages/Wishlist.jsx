import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#2a2a2a] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-white font-medium text-[14px] hover:text-gray-300 transition-colors"
      >
        <span>{title}</span>
        {isOpen ?
          <ChevronUp size={16} className="text-gray-400" strokeWidth={2} /> :
          <ChevronDown size={16} className="text-gray-400" strokeWidth={2} />
        }
      </button>
      {isOpen && (
        <div className="pb-5 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ label, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-2 transition-colors ${isActive ? 'text-[#0074e4]' : 'text-[#ababab] hover:text-white'
      }`}
  >
    <span className="text-[13px]">{label}</span>
  </button>
);

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('discount');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    events: [],
    genre: [],
    features: [],
    platforms: []
  });

  // Guests should be able to view and manage wishlist locally — do not force redirect here.
  // Adding to cart requires authentication and is checked when the user clicks the button.

  const { addToCart } = useCart();

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

  const sortOptions = [
    { value: 'discount', label: 'İndirimde' },
    { value: 'alphabetic', label: 'Alfabetik' },
    { value: 'price-low', label: 'Fiyat (Düşükten Yükseğe)' },
    { value: 'price-high', label: 'Fiyat (Yüsekten Düşüğe)' }
  ];

  const handleFilterChange = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const sortedWishlist = useMemo(() => {
    const list = [...wishlist];
    switch (sortBy) {
      case 'alphabetic':
        return list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'price-low':
        return list.sort((a, b) => (a.price?.current || 0) - (b.price?.current || 0));
      case 'price-high':
        return list.sort((a, b) => (b.price?.current || 0) - (a.price?.current || 0));
      case 'discount':
      default:
        return list.sort((a, b) => (b.price?.discountRate || 0) - (a.price?.discountRate || 0));
    }
  }, [wishlist, sortBy]);

  return (
    <>
      <div className="w-full min-h-screen text-white bg-[#101014]">
        <Header />
        <main className="sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px] mx-auto py-3">
          <SecondHeader />

          <div className="px-5 py-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{t('wishlistTitle')}</h1>
              {wishlist.length > 0 && (
                <p className="text-[#88888a] text-sm">
                  İstek listesindeki oyunları indirme giriş zaman ya da satın alım veya ön satın alım için hazır olduğu zaman bildirim al.
                </p>
              )}
            </div>

            {/* Wishlist Items */}
            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#88888a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">İstek listesi boş</h2>
                  <p className="text-[#88888a] mb-6">
                    Beğendiğin oyunları istek listene ekleyerek kolayca takip edebilirsin
                  </p>
                  <Link
                    to="/browse"
                    className="inline-block bg-[#0074e4] hover:bg-[#0084f4] text-white font-semibold px-8 py-3 rounded transition-colors"
                  >
                    Oyunları Keşfet
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex gap-8">
                {/* Left Content - Wishlist Items */}
                <div className="flex-1">
                  {/* Sort Bar */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm text-[#88888a]">Sırala:</span>
                    <div className="relative inline-block">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-[#202020] text-white pl-4 pr-8 py-2 rounded text-sm border border-[#3a3a3a] hover:border-[#0074e4] transition-colors text-left relative flex items-center gap-2"
                      >
                        <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
                        <ChevronDown size={14} className="text-gray-400" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-[#202020] border border-[#3a3a3a] rounded shadow-lg z-50 overflow-hidden min-w-full">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => { setSortBy(option.value); setIsDropdownOpen(false); }}
                              className={`w-full text-left px-4 py-2 text-sm whitespace-nowrap hover:bg-[#2a2a2a] transition-colors ${sortBy === option.value ? 'bg-[#0074e4] text-white' : 'text-white'
                                }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Wishlist Items */}
                  <div className="space-y-4">
                    {sortedWishlist.map((game) => {
                      if (!game || typeof game !== 'object' || !game.gameId) return null;

                      return (
                        <div key={game.gameId} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#1e1e1e] transition-colors">
                          <div className="flex gap-4 p-4">
                            {/* Game Image */}
                            <Link to={`/game/${game.gameId}`} className="flex-shrink-0">
                              <div className="w-[100px] h-[130px] rounded overflow-hidden bg-[#202020]">
                                <img src={game.media?.coverImage} alt={String(game.title || '')} className="w-full h-full object-cover" />
                              </div>
                            </Link>

                            {/* Game Info */}
                            <div className="flex-1 flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <span className="inline-block bg-[#0074e4] text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-2">
                                    {typeof game.productType === 'string' ? game.productType : 'Ana Oyun'}
                                  </span>
                                  <Link to={`/game/${game.gameId}`}>
                                    <h3 className="text-white text-lg font-semibold hover:underline">{String(game.title || 'Untitled')}</h3>
                                  </Link>
                                </div>
                                {/* Price */}
                                <div className="text-right ml-4">
                                  {game.isFree ? (
                                    <span className="text-lg font-bold">Ücretsiz</span>
                                  ) : game.price?.discountRate && game.price.discountRate > 0 ? (
                                    <div className="flex items-center gap-2">
                                      <span className="bg-[#0074e4] text-white text-xs px-1.5 py-0.5 rounded font-bold">-{game.price.discountRate}%</span>
                                      <span className="text-[#88888a] text-sm line-through">{formatPrice(game.price.original)}</span>
                                      <span className="text-lg font-bold">{formatPrice(game.price.current)}</span>
                                    </div>
                                  ) : (
                                    <span className="text-lg font-bold">{formatPrice(game.price?.current || 0)}</span>
                                  )}
                                </div>
                              </div>

                              {/* Info Note */}
                              <div className="flex items-start gap-2 mb-4">
                                <span className="text-[#0074e4] text-sm">ℹ️</span>
                                <p className="text-[#0074e4] text-xs">Epic Ödülleri'nde yükseltilmiş oranla harcamalarında %20 geri kazan; teklif 8 Oca tarihinde sona erer.</p>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-3 mt-auto">
                                <button onClick={() => removeFromWishlist(game.gameId)} className="text-[#88888a] hover:text-white text-sm transition-colors">Kaldır</button>
                                <button className="p-2 hover:bg-[#2a2a2a] rounded transition-colors"><Gift size={18} className="text-[#88888a]" /></button>
                                <button
                                  onClick={() => {
                                    if (!isAuthenticated) {
                                      navigate('/login');
                                      return;
                                    }
                                    addToCart(game, 1);
                                  }}
                                  className="ml-auto px-5 py-2 bg-[#0074e4] hover:bg-[#0084f4] text-white rounded text-sm font-semibold transition-colors"
                                  title={!isAuthenticated ? 'Sepete eklemek için giriş yapmanız gerekir' : 'Sepete ekle'}
                                >
                                  Sepete Ekle
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Sidebar - Filters */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-24">
                    <h3 className="text-white font-semibold text-base pb-4 border-b border-[#2a2a2a]">Filtreler</h3>

                    <FilterSection title="Etkinlikler">
                      <FilterItem label="YILBAŞI TATİLİ İNDİRİMİ" isActive={activeFilters.events?.includes('new-year-sale')} onClick={() => handleFilterChange('events', 'new-year-sale')} />
                    </FilterSection>

                    <FilterSection title="Tür">
                      <FilterItem label="Aksiyon" isActive={activeFilters.genre?.includes('action')} onClick={() => handleFilterChange('genre', 'action')} />
                      <FilterItem label="Gizlilik" isActive={activeFilters.genre?.includes('stealth')} onClick={() => handleFilterChange('genre', 'stealth')} />
                      <FilterItem label="Kart Oyunu" isActive={activeFilters.genre?.includes('card')} onClick={() => handleFilterChange('genre', 'card')} />
                      <FilterItem label="Nişancı" isActive={activeFilters.genre?.includes('shooter')} onClick={() => handleFilterChange('genre', 'shooter')} />
                      <FilterItem label="Rogue-lite" isActive={activeFilters.genre?.includes('rogue-lite')} onClick={() => handleFilterChange('genre', 'rogue-lite')} />
                      <FilterItem label="Simülasyon" isActive={activeFilters.genre?.includes('simulation')} onClick={() => handleFilterChange('genre', 'simulation')} />
                      <FilterItem label="Strateji" isActive={activeFilters.genre?.includes('strategy')} onClick={() => handleFilterChange('genre', 'strategy')} />
                      <FilterItem label="Sıra Temelli" isActive={activeFilters.genre?.includes('turn-based')} onClick={() => handleFilterChange('genre', 'turn-based')} />
                      <FilterItem label="Sıra Temelli Strateji" isActive={activeFilters.genre?.includes('turn-based-strategy')} onClick={() => handleFilterChange('genre', 'turn-based-strategy')} />
                    </FilterSection>

                    <FilterSection title="Özellikler" defaultOpen={false}>
                      <FilterItem label="Tek Oyunculu" isActive={activeFilters.features?.includes('single-player')} onClick={() => handleFilterChange('features', 'single-player')} />
                      <FilterItem label="Kumanda Desteği" isActive={activeFilters.features?.includes('controller')} onClick={() => handleFilterChange('features', 'controller')} />
                      <FilterItem label="Online Multiplayer" isActive={activeFilters.features?.includes('online-multiplayer')} onClick={() => handleFilterChange('features', 'online-multiplayer')} />
                      <FilterItem label="Rekabetçi" isActive={activeFilters.features?.includes('competitive')} onClick={() => handleFilterChange('features', 'competitive')} />
                      <FilterItem label="Çapraz Platform" isActive={activeFilters.features?.includes('cross-platform')} onClick={() => handleFilterChange('features', 'cross-platform')} />
                    </FilterSection>

                    <FilterSection title="Platform" defaultOpen={false}>
                      <FilterItem label="Windows" isActive={activeFilters.platforms?.includes('windows')} onClick={() => handleFilterChange('platforms', 'windows')} />
                      <FilterItem label="Mac OS" isActive={activeFilters.platforms?.includes('macos')} onClick={() => handleFilterChange('platforms', 'macos')} />
                    </FilterSection>
                  </div>
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
