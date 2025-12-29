import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import data from '@/data/data.json';
import { Star, Share2, Flag, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GameDetail() {
  const { gameId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const wishlistContext = useWishlist();
  const isInWishlist = wishlistContext?.isInWishlist || (() => false);
  const toggleWishlist = wishlistContext?.toggleWishlist || (() => { });
  const cartContext = useCart();
  const isInCart = cartContext?.isInCart || (() => false);
  const addToCart = cartContext?.addToCart || (() => { });
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const game = useMemo(() => {
    if (!gameId) return null;
    // Convert gameId from string to number for comparison
    const id = parseInt(gameId, 10);
    if (isNaN(id)) return null;
    return data.results.find(g => g.gameId === id);
  }, [gameId]);

  const inWishlist = game ? isInWishlist(game.gameId) : false;
  const inCart = game ? isInCart(game.gameId) : false;

  if (!game) {
    return (
      <div className="w-full min-h-screen text-white bg-[#101014]">
        <Header />
        <SecondHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Oyun bulunamadı</h2>
            <Link to="/browse" className="text-blue-400 hover:text-blue-300">
              Göz At sayfasına dön
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'addons', label: 'Eklentiler' },
    { id: 'achievements', label: 'Başarılar' },
  ];

  return (
    <>
      <div className="w-full min-h-screen text-white bg-[#101014]">
        <Header />
        <main className="sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px] mx-auto py-3">
          <SecondHeader />

          <div className="px-5 py-10">
            {/* Game Title and Rating */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{game.title}®</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < 4 ? 'fill-yellow-400 text-yellow-400' : i < 4.4 ? 'fill-yellow-400/50 text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold ml-2">4.4</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-[#1a1a1a] px-3 py-1 rounded text-sm">Kısa Süreliğine Oynamak İçin Harika</span>
                  <span className="bg-[#1a1a1a] px-3 py-1 rounded text-sm">Oyuncuları Rekabetçi</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-6 border-b border-[#2a2a2a] mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition-colors ${activeTab === tab.id
                      ? 'text-white border-b-2 border-white'
                      : 'text-[#9f9fa1] hover:text-white'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1">
                {/* Game Images */}
                <div className="mb-8">
                  <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4 bg-[#202020]">
                    <img
                      src={game.media?.bannerImage || game.media?.coverImage}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {game.media?.screenshots && game.media.screenshots.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {game.media.screenshots.slice(0, 4).map((screenshot, idx) => (
                        <div key={idx} className="relative aspect-video rounded overflow-hidden bg-[#202020]">
                          <img src={screenshot} alt={`${game.title} screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Game Description */}
                {activeTab === 'overview' && (
                  <>
                    <div className="mb-8">
                      <p className="text-white/90 text-base leading-relaxed mb-4">
                        {game.description || `${game.title}, anlaşılması kolay kontrollere ve akıcı, fizik tabanlı rekabete sahip, arcade tarzı futbolun ve araç çılgınlığının yüksek güçlü bir karışımıdır.`}
                      </p>
                    </div>

                    {/* Genres */}
                    {game.genre && game.genre.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3">Türler</h3>
                        <div className="flex flex-wrap gap-2">
                          {game.genre.map((genre, idx) => (
                            <span key={idx} className="bg-[#1a1a1a] px-3 py-1 rounded text-sm">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {game.features && game.features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3">Özellikler</h3>
                        <div className="flex flex-wrap gap-2">
                          {game.features.map((feature, idx) => (
                            <span key={idx} className="bg-[#1a1a1a] px-3 py-1 rounded text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Epic Player Ratings */}
                    <div className="mb-8">
                      <h3 className="text-white text-xl font-bold mb-2">Epic Oyuncu Derecelendirmeleri</h3>
                      <p className="text-[#88888a] text-sm mb-4">Epic Games ekosisteminden alındı.</p>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={24}
                                className={i < 4 ? 'fill-yellow-400 text-yellow-400' : i < 4.4 ? 'fill-yellow-400/50 text-yellow-400' : 'text-gray-600'}
                              />
                            ))}
                          </div>
                          <span className="text-2xl font-bold ml-2">4.4</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { icon: '⏱️', text: 'Bu oyun Kısa Süreliğine Oynamak İçin Harika' },
                          { icon: '🏆', text: 'Bu oyunun Oyuncuları Rekabetçi' },
                          { icon: '😍', text: 'Bu oyun Son Derece Eğlenceli' },
                          { icon: '📢', text: 'Bu oyun Şiddetle Tavsiye Edilir' },
                          { icon: '⚔️', text: 'Bu oyunun Savaşları Zor' },
                          { icon: '📝', text: 'Bu oyunun Hikâye Anlatımı Harika' },
                        ].map((item, idx) => (
                          <div key={idx} className="bg-[#1a1a1a] p-4 rounded-lg">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <p className="text-white text-sm">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scores and Reviews */}
                    <div className="mb-8">
                      <h3 className="text-white text-xl font-bold mb-4">{game.title} Puanları ve İncelemeleri</h3>
                      <div className="flex gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-1">%94</div>
                          <div className="text-[#88888a] text-sm">Eleştirmenlerin Önerisi</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-1">87</div>
                          <div className="text-[#88888a] text-sm">En İyi Eleştirmen Ortalaması</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-1">Kudretli</div>
                          <div className="text-[#88888a] text-sm">OpenCritic Değerlendirmesi</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { source: 'IGN', author: 'Brandin Tyrrel', score: '9.3/10', quote: 'Rocket League\'s colorfully absurd cars-playing-sports concept works so well because the energy of its arcadey gameplay meshes with its deep team-based strategy and variety of modes.' },
                          { source: 'PC Gamer', author: 'Matt Elliott', score: '87/100', quote: 'Rocket League is fast, fun and relentlessly enjoyable. The best football game without feet.' },
                          { source: 'GamesRadar+', author: 'Ludwig Kietzmann', score: '★★★★★', quote: 'Rocket League transcends its chaotic mishmash of sports, racing and fighting to create an elegant and endlessly competitive game for the ages.' },
                        ].map((review, idx) => (
                          <div key={idx} className="bg-[#1a1a1a] p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="text-white font-semibold">{review.source}</div>
                                <div className="text-[#88888a] text-sm">{review.author} tarafından</div>
                              </div>
                              <div className="text-white font-bold">{review.score}</div>
                            </div>
                            <p className="text-white/90 text-sm italic">"{review.quote}"</p>
                            <button className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                              Tam Değerlendirmeyi Oku
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-[#88888a] text-xs mt-4">Değerlendirmeler OpenCritic'ten alındı</p>
                    </div>

                    {/* System Requirements */}
                    {game.systemRequirements && Object.keys(game.systemRequirements).length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-white text-xl font-bold mb-4">{game.title}® Sistem Gereksinimleri</h3>
                        <div className="bg-[#1a1a1a] p-6 rounded-lg">
                          <div className="flex gap-2 mb-4">
                            <button className="bg-[#0074e4] text-white px-4 py-2 rounded text-sm font-medium">
                              Windows
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-semibold mb-3">Minimum</h4>
                              <div className="space-y-2 text-sm">
                                {game.systemRequirements.minimum && Object.entries(game.systemRequirements.minimum).map(([key, value]) => {
                                  const labelMap = {
                                    'os': 'İşletim Sistemi',
                                    'cpu': 'İşlemci',
                                    'ram': 'Bellek',
                                    'gpu': 'Ekran Kartı',
                                    'storage': 'Depolama',
                                    'directx': 'DirectX'
                                  };
                                  return (
                                    <div key={key}>
                                      <span className="text-[#88888a]">{labelMap[key] || key}: </span>
                                      <span className="text-white">{value}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-3">Önerilen</h4>
                              <div className="space-y-2 text-sm">
                                {game.systemRequirements.recommended && Object.entries(game.systemRequirements.recommended).map(([key, value]) => {
                                  const labelMap = {
                                    'os': 'İşletim Sistemi',
                                    'cpu': 'İşlemci',
                                    'ram': 'Bellek',
                                    'gpu': 'Ekran Kartı',
                                    'storage': 'Depolama',
                                    'directx': 'DirectX'
                                  };
                                  return (
                                    <div key={key}>
                                      <span className="text-[#88888a]">{labelMap[key] || key}: </span>
                                      <span className="text-white">{value}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'addons' && (
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">{game.title} DLC ve Eklentiler</h3>
                    <p className="text-[#88888a] text-sm">Eklentiler yakında eklenecek...</p>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">Mevcut Başarılar</h3>
                    <p className="text-[#88888a] text-sm">Başarılar yakında eklenecek...</p>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="sticky top-4 bg-[#1a1a1a] rounded-lg p-6">
                  {/* Game Type */}
                  <div className="mb-4">
                    <span className="text-[#88888a] text-sm uppercase font-bold">{game.productType || 'Ana Oyun'}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {game.isFree ? (
                      <div className="mb-2">
                        <span className="text-2xl font-bold">Ücretsiz</span>
                      </div>
                    ) : game.price?.discountRate && game.price.discountRate > 0 ? (
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#0074e4] text-white text-xs px-2 py-1 rounded font-bold">
                            -{game.price.discountRate}%
                          </span>
                          <span className="text-[#88888a] text-sm line-through">
                            {formatPrice(game.price.original, game.price.currency)}
                          </span>
                        </div>
                        <span className="text-2xl font-bold">
                          {game.price.discountRate === 100
                            ? 'Ücretsiz'
                            : formatPrice(game.price.current, game.price.currency)}
                        </span>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <span className="text-2xl font-bold">
                          {formatPrice(game.price?.current || game.price?.original || 0, game.price?.currency || '₺')}
                        </span>
                      </div>
                    )}
                    {!game.isFree && (
                      <p className="text-[#88888a] text-xs">Uygulama içi satın alımlar içerir</p>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      if (inCart) {
                        window.location.href = '/cart';
                      } else {
                        if (!isAuthenticated) {
                          navigate('/login', { state: { from: location.pathname } });
                          return;
                        }
                        addToCart(game, 1);
                      }
                    }}
                    className="w-full bg-[#0074e4] hover:bg-[#0084f4] text-white font-bold py-3 px-4 rounded mb-4 transition-colors"
                  >
                    {game.isFree ? 'Kütüphanede' : inCart ? 'Sepette - Görüntüle' : 'Sepete Ekle'}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(game)}
                    className={`w-full font-bold py-3 px-4 rounded mb-4 transition-colors flex items-center justify-center gap-2 ${inWishlist
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white'
                      }`}
                  >
                    <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
                    {inWishlist ? 'İstek Listesinde' : 'İstek Listesine Ekle'}
                  </button>

                  {/* Game Info */}
                  <div className="space-y-4 border-t border-[#2a2a2a] pt-4">
                    {game.developer && (
                      <div>
                        <p className="text-[#88888a] text-xs mb-1">Geliştirici</p>
                        <p className="text-white text-sm">{game.developer}</p>
                      </div>
                    )}
                    {game.publisher && (
                      <div>
                        <p className="text-[#88888a] text-xs mb-1">Yayıncı</p>
                        <p className="text-white text-sm">{game.publisher}</p>
                      </div>
                    )}
                    {game.releaseDate && (
                      <div>
                        <p className="text-[#88888a] text-xs mb-1">Çıkış Tarihi</p>
                        <p className="text-white text-sm">{game.releaseDate}</p>
                      </div>
                    )}
                    {game.platforms && game.platforms.length > 0 && (
                      <div>
                        <p className="text-[#88888a] text-xs mb-1">Platform</p>
                        <div className="flex gap-2">
                          {game.platforms.map((platform, idx) => (
                            <span key={idx} className="text-white text-sm">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 border-t border-[#2a2a2a] pt-4">
                    <button className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded text-sm transition-colors flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Paylaş
                    </button>
                    <button className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded text-sm transition-colors flex items-center justify-center gap-2">
                      <Flag size={16} />
                      Bildir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

