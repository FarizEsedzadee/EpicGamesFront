import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import FilterSidebar from '@/components/Browse/FilterSidebar';
import GameGrid from '@/components/Browse/GameGrid';
import Pagination from '@/components/Browse/Pagination';
import GenreSlider from '@/components/Browse/GenreSlider';
import data from '@/data/data.json';

const GAMES_PER_PAGE = 40;

export default function Browse() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  
  // Initialize filters from URL params
  const initialPrice = searchParams.get('price') ? [searchParams.get('price')] : [];
  const initialEvents = searchParams.get('events') ? [searchParams.get('events')] : [];
  
  const [filters, setFilters] = useState({
    keywords: searchParams.get('q') || '',
    events: initialEvents,
    price: initialPrice,
    genre: [],
    features: [],
    types: [],
    platforms: [],
    subscriptions: [],
  });

  // Update filters when URL params change
  useEffect(() => {
    const queryParam = searchParams.get('q') || '';
    const priceParam = searchParams.get('price');
    const eventsParam = searchParams.get('events');
    
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (prev.keywords !== queryParam) {
        newFilters.keywords = queryParam;
      }
      
      if (priceParam) {
        newFilters.price = [priceParam];
      } else if (!priceParam && prev.price.length > 0 && !searchParams.has('price')) {
        // Only clear if URL param was removed
        newFilters.price = [];
      }
      
      if (eventsParam) {
        newFilters.events = [eventsParam];
      } else if (!eventsParam && prev.events.length > 0 && !searchParams.has('events')) {
        // Only clear if URL param was removed
        newFilters.events = [];
      }
      
      return newFilters;
    });
  }, [searchParams]);

  // Filter games based on active filters
  const filteredGames = useMemo(() => {
    let result = [...data.results];

    // Keywords filter
    if (filters.keywords) {
      const keyword = filters.keywords.toLowerCase();
      result = result.filter(game =>
        game.title.toLowerCase().includes(keyword) ||
        game.description?.toLowerCase().includes(keyword) ||
        game.genre?.some(g => g.toLowerCase().includes(keyword))
      );
    }

    // Events filter (multiple selection - OR logic)
    if (filters.events.length > 0) {
      result = result.filter(game => {
        return filters.events.some(event => {
          if (event === 'weekly-deals') {
            return game.price?.discountRate > 0;
          }
          if (event === 'special-release') {
            return game.promoText?.toLowerCase().includes('özel');
          }
          if (event === 'new-year-sale') {
            return game.price?.discountRate > 0;
          }
          if (event === 'ea-classic') {
            return game.publisher?.toLowerCase().includes('electronic arts') || game.publisher?.toLowerCase().includes('ea');
          }
          if (event === 'total-war') {
            return game.title?.toLowerCase().includes('total war');
          }
          return false;
        });
      });
    }

    // Price filter (single selection)
    if (filters.price.length > 0) {
      const priceFilter = filters.price[0]; // Only one price filter can be active
      result = result.filter(game => {
        if (priceFilter === 'free') {
          return game.isFree === true;
        }
        if (priceFilter === 'discounted') {
          return game.price?.discountRate > 0;
        }
        if (priceFilter === 'under-60') {
          return !game.isFree && game.price?.current < 60;
        }
        if (priceFilter === 'under-120') {
          return !game.isFree && game.price?.current < 120;
        }
        if (priceFilter === 'under-180') {
          return !game.isFree && game.price?.current < 180;
        }
        if (priceFilter === 'over-79') {
          return !game.isFree && game.price?.current >= 79;
        }
        return false;
      });
    }

    // Genre filter
    if (filters.genre.length > 0) {
      const genreMap = {
        'open-world': 'Open World',
        'action': 'Action',
        'action-adventure': 'Adventure',
        'indie': 'Indie',
        'casual': 'Casual',
        'first-person': 'First-Person',
        'puzzle': 'Puzzle',
        'fighting': 'Fighting',
      };
      
      result = result.filter(game => {
        return filters.genre.some(filterGenre => {
          const mappedGenre = genreMap[filterGenre];
          return game.genre?.some(g => g.includes(mappedGenre)) ||
                 game.categories?.some(c => c.includes(mappedGenre));
        });
      });
    }

    // Types filter
    if (filters.types.length > 0) {
      result = result.filter(game => {
        if (filters.types.includes('game')) {
          return game.productType === 'Ana Oyun';
        }
        if (filters.types.includes('add-on')) {
          return game.productType === 'Eklenti';
        }
        return true;
      });
    }

    // Platforms filter
    if (filters.platforms.length > 0) {
      result = result.filter(game => {
        return filters.platforms.some(platform => {
          const platformMap = {
            'windows': 'Windows',
            'macos': 'macOS',
            'android': 'Android',
            'ios': 'iOS',
          };
          return game.platforms?.some(p => p.includes(platformMap[platform]));
        });
      });
    }

    // Sort games
    let sortedResult = [...result];
    switch (sortBy) {
      case 'newest':
        sortedResult.sort((a, b) => {
          const dateA = new Date(a.releaseDate || a.updatedAt || 0);
          const dateB = new Date(b.releaseDate || b.updatedAt || 0);
          return dateB - dateA;
        });
        break;
      case 'bestsellers':
        sortedResult.sort((a, b) => (b.popularityRank || 999) - (a.popularityRank || 999));
        break;
      case 'most-played':
        sortedResult.sort((a, b) => (b.stats?.downloads || 0) - (a.stats?.downloads || 0));
        break;
      case 'price-low':
        sortedResult.sort((a, b) => {
          const priceA = a.isFree ? 0 : (a.price?.current || a.price?.original || 999999);
          const priceB = b.isFree ? 0 : (b.price?.current || b.price?.original || 999999);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sortedResult.sort((a, b) => {
          const priceA = a.isFree ? 0 : (a.price?.current || a.price?.original || 0);
          const priceB = b.isFree ? 0 : (b.price?.current || b.price?.original || 0);
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return sortedResult;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
    return filteredGames.slice(startIndex, startIndex + GAMES_PER_PAGE);
  }, [filteredGames, currentPage]);

  const handleFilterChange = (filterType, value, singleSelect = false) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'keywords') {
        newFilters.keywords = value;
      } else if (singleSelect) {
        // For price filters - single selection (radio button behavior)
        const currentValues = newFilters[filterType] || [];
        if (currentValues.includes(value)) {
          // If clicking the same item, deselect it
          newFilters[filterType] = [];
        } else {
          // Select only this item
          newFilters[filterType] = [value];
        }
      } else {
        // For other filters - multiple selection (checkbox behavior)
        const currentValues = newFilters[filterType] || [];
        if (currentValues.includes(value)) {
          newFilters[filterType] = currentValues.filter(v => v !== value);
        } else {
          newFilters[filterType] = [...currentValues, value];
        }
      }
      
      setCurrentPage(1); // Reset to first page when filters change
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      keywords: '',
      events: [],
      price: [],
      genre: [],
      features: [],
      types: [],
      platforms: [],
      subscriptions: [],
    });
    setCurrentPage(1);
  };

  const handleGenreClick = (genreId) => {
    handleFilterChange('genre', genreId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full min-h-screen text-white bg-[#101014]">
        <Header />
        <main className="sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px] mx-auto py-3">
        <SecondHeader />
          <div className="py-10 px-5">
            {/* Popüler Türler */}
            <GenreSlider onGenreClick={handleGenreClick} />

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* Games Grid */}
              <div className="flex-1">
                {/* Empty State - Show at top if no results */}
                {filteredGames.length === 0 && (
                  <div className="mb-8 text-center py-12">
                    <h2 className="text-white text-2xl font-bold mb-2">Sonuç bulunamadı</h2>
                    <p className="text-[#88888a] text-sm">
                      Üzgünüm, aramanla eşleşen herhangi bir sonuç bulamadım.
                    </p>
                  </div>
                )}

                {/* Sort Dropdown */}
                {filteredGames.length > 0 && (
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">Göster:</span>
                      <select 
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                      >
                        <option value="newest">Yeni Çıkan</option>
                        <option value="bestsellers">En Çok Satanlar</option>
                        <option value="most-played">En Çok Oynananlar</option>
                        <option value="price-low">En Düşük Fiyat</option>
                        <option value="price-high">En Yüksek Fiyat</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Games Grid */}
                {filteredGames.length > 0 && <GameGrid games={paginatedGames} />}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>

              {/* Filter Sidebar */}              {/* Filter Sidebar */}
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                activeFilters={filters}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

