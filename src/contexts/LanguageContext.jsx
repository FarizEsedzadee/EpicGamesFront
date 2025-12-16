import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();
const STORAGE_KEY = 'epicgames-lang';

const languages = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'az', label: 'Azərbaycan' },
];

const translations = {
  tr: {
    discover: 'Keşfet',
    browse: 'Göz At',
    news: 'Haberler',
    wishlist: 'İstek Listesi',
    gifts: 'Hediyeler',
    cart: 'Sepet',
    profile: 'Profil',
    login: 'Giriş Yap',
    download: 'Yükle',
    support: 'Destek',
    distribute: 'Dağıtım Yap',
    searchStore: 'Mağazada ara',
    language: 'Dil',
    homeDiscoverNew: 'Yeni Şeyler Keşfet',
    homeFreeGames: 'Ücretsiz Oyunlar',
    homeWeeklyDeals: 'Haftanın Fırsatları',
    homeEpicExtras: 'Epic Ekstraları',
    homeNewTop: 'Yeni Çıkan En İyi Oyunlar',
    homeHolidayHighlights: 'Yılbaşı Tatili İndiriminde Öne Çıkanlar',
    homeBestSellers: 'En Çok Satanlar',
    homeMostPlayed: 'En Çok Oynananlar',
    homeMostWishlistedUpcoming: 'En Çok İstek Listesine Eklenen Yakında Çıkacak Oyunlar',
    wishlistTitle: 'İstek Listesi',
    cartTitle: 'Sepet',
    giftsTitle: 'Hediyeler',
    profileTitle: 'Hesap bilgileri',
  },
  en: {
    discover: 'Discover',
    browse: 'Browse',
    news: 'News',
    wishlist: 'Wishlist',
    gifts: 'Gifts',
    cart: 'Cart',
    profile: 'Profile',
    login: 'Sign In',
    download: 'Download',
    support: 'Support',
    distribute: 'Distribute',
    searchStore: 'Search store',
    language: 'Language',
    homeDiscoverNew: 'Discover Something New',
    homeFreeGames: 'Free Games',
    homeWeeklyDeals: 'Weekly Deals',
    homeEpicExtras: 'Epic Extras',
    homeNewTop: 'Top New Releases',
    homeHolidayHighlights: 'Holiday Sale Highlights',
    homeBestSellers: 'Best Sellers',
    homeMostPlayed: 'Most Played',
    homeMostWishlistedUpcoming: 'Most Wishlisted Upcoming Games',
    wishlistTitle: 'Wishlist',
    cartTitle: 'Cart',
    giftsTitle: 'Gifts',
    profileTitle: 'Account details',
  },
  ru: {
    discover: 'Обзор',
    browse: 'Каталог',
    news: 'Новости',
    wishlist: 'Список желаемого',
    gifts: 'Подарки',
    cart: 'Корзина',
    profile: 'Профиль',
    login: 'Войти',
    download: 'Скачать',
    support: 'Поддержка',
    distribute: 'Дистрибуция',
    searchStore: 'Поиск в магазине',
    language: 'Язык',
    homeDiscoverNew: 'Откройте что‑то новое',
    homeFreeGames: 'Бесплатные игры',
    homeWeeklyDeals: 'Предложения недели',
    homeEpicExtras: 'Epic Экстры',
    homeNewTop: 'Лучшие новинки',
    homeHolidayHighlights: 'Лучшее из праздничной распродажи',
    homeBestSellers: 'Лидеры продаж',
    homeMostPlayed: 'Самые популярные',
    homeMostWishlistedUpcoming: 'Самые ожидаемые игры',
    wishlistTitle: 'Список желаемого',
    cartTitle: 'Корзина',
    giftsTitle: 'Подарки',
    profileTitle: 'Данные аккаунта',
  },
  az: {
    discover: 'Kəşf et',
    browse: 'Gözdən keçirt',
    news: 'Xəbərlər',
    wishlist: 'İstək siyahısı',
    gifts: 'Hədiyyələr',
    cart: 'Səbət',
    profile: 'Profil',
    login: 'Daxil ol',
    download: 'Yüklə',
    support: 'Dəstək',
    distribute: 'Paylama',
    searchStore: 'Mağazada axtar',
    language: 'Dil',
    homeDiscoverNew: 'Yeni şeylər kəşf et',
    homeFreeGames: 'Pulsuz oyunlar',
    homeWeeklyDeals: 'Həftənin fürsətləri',
    homeEpicExtras: 'Epic əlavələri',
    homeNewTop: 'Ən yaxşı yeni oyunlar',
    homeHolidayHighlights: 'Bayram endirimində öndə gedənlər',
    homeBestSellers: 'Ən çox satılanlar',
    homeMostPlayed: 'Ən çox oynananlar',
    homeMostWishlistedUpcoming: 'Ən çox istək siyahısına əlavə olunan tezliklə çıxacaq oyunlar',
    wishlistTitle: 'İstək siyahısı',
    cartTitle: 'Səbət',
    giftsTitle: 'Hədiyyələr',
    profileTitle: 'Hesab məlumatları',
  },
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || 'tr';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => translations[language]?.[key] || translations.tr[key] || key;

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      languages,
      t,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

