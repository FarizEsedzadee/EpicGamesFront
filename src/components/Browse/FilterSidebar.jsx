import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Check } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#2a2a2a] pb-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-white font-bold text-sm mb-3 hover:text-blue-400 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {isOpen && <div className="space-y-0.5">{children}</div>}
    </div>
  );
};

const FilterItem = ({ label, isActive = false, onClick, color = 'white' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm py-2 px-2.5 rounded transition-all relative ${
        isActive
          ? 'bg-[#1a1a1a] border border-white text-white'
          : `text-white hover:bg-[#2a2a2a] ${color === 'orange' ? 'text-orange-500' : ''}`
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm leading-relaxed">{label}</span>
        {isActive && (
          <Check size={16} className="text-white flex-shrink-0 ml-2" strokeWidth={2.5} />
        )}
      </div>
    </button>
  );
};

export default function FilterSidebar({ filters, onFilterChange, activeFilters, onReset }) {
  const activeFilterCount = Object.entries(activeFilters).reduce((count, [key, value]) => {
    if (key === 'keywords') {
      return count + (value ? 1 : 0);
    }
    return count + (Array.isArray(value) ? value.length : 0);
  }, 0);

  return (
    <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="sticky top-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm">
            Filtreler {activeFilterCount > 0 && `(${activeFilterCount})`}
          </h3>
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors lowercase"
            >
              sıfırla
            </button>
          )}
        </div>

        {/* Keywords Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Anahtar Kelimeler"
            value={filters.keywords || ''}
            onChange={(e) => onFilterChange('keywords', e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Etkinlikler */}
        <FilterSection title="Etkinlikler">
          <FilterItem
            label="Haftanın Fırsatları"
            isActive={activeFilters.events?.includes('weekly-deals')}
            onClick={() => onFilterChange('events', 'weekly-deals')}
            color="orange"
          />
          <FilterItem
            label="Klasik EA Oyunları Epic'te"
            isActive={activeFilters.events?.includes('ea-classic')}
            onClick={() => onFilterChange('events', 'ea-classic')}
          />
          <FilterItem
            label="Özel Yayınlama"
            isActive={activeFilters.events?.includes('special-release')}
            onClick={() => onFilterChange('events', 'special-release')}
          />
          <FilterItem
            label="Total War Yıldönümü İndirimi"
            isActive={activeFilters.events?.includes('total-war')}
            onClick={() => onFilterChange('events', 'total-war')}
          />
          <FilterItem
            label="YILBAŞI TATİLİ İNDİRİMİ"
            isActive={activeFilters.events?.includes('new-year-sale')}
            onClick={() => onFilterChange('events', 'new-year-sale')}
          />
        </FilterSection>

        {/* Fiyat - Single Selection */}
        <FilterSection title="Fiyat">
          <FilterItem
            label="Ücretsiz"
            isActive={activeFilters.price?.includes('free')}
            onClick={() => onFilterChange('price', 'free', true)}
          />
          <FilterItem
            label="₺60,00 altı"
            isActive={activeFilters.price?.includes('under-60')}
            onClick={() => onFilterChange('price', 'under-60', true)}
          />
          <FilterItem
            label="₺120,00 altı"
            isActive={activeFilters.price?.includes('under-120')}
            onClick={() => onFilterChange('price', 'under-120', true)}
          />
          <FilterItem
            label="₺180,00 altı"
            isActive={activeFilters.price?.includes('under-180')}
            onClick={() => onFilterChange('price', 'under-180', true)}
          />
          <FilterItem
            label="₺79,00 ve üzeri"
            isActive={activeFilters.price?.includes('over-79')}
            onClick={() => onFilterChange('price', 'over-79', true)}
          />
          <FilterItem
            label="İndirimli"
            isActive={activeFilters.price?.includes('discounted')}
            onClick={() => onFilterChange('price', 'discounted', true)}
            color="orange"
          />
        </FilterSection>

        {/* Tür */}
        <FilterSection title="Tür">
          <FilterItem
            label="Açık Dünya"
            isActive={activeFilters.genre?.includes('open-world')}
            onClick={() => onFilterChange('genre', 'open-world')}
          />
          <FilterItem
            label="Aksiyon"
            isActive={activeFilters.genre?.includes('action')}
            onClick={() => onFilterChange('genre', 'action')}
          />
          <FilterItem
            label="Aksiyon-Macera"
            isActive={activeFilters.genre?.includes('action-adventure')}
            onClick={() => onFilterChange('genre', 'action-adventure')}
          />
          <FilterItem
            label="Bağımsız"
            isActive={activeFilters.genre?.includes('indie')}
            onClick={() => onFilterChange('genre', 'indie')}
          />
          <FilterItem
            label="Basit Eğlence"
            isActive={activeFilters.genre?.includes('casual')}
            onClick={() => onFilterChange('genre', 'casual')}
          />
          <FilterItem
            label="Birinci Şahıs"
            isActive={activeFilters.genre?.includes('first-person')}
            onClick={() => onFilterChange('genre', 'first-person')}
          />
          <FilterItem
            label="Bulmaca"
            isActive={activeFilters.genre?.includes('puzzle')}
            onClick={() => onFilterChange('genre', 'puzzle')}
          />
          <FilterItem
            label="Dövüş"
            isActive={activeFilters.genre?.includes('fighting')}
            onClick={() => onFilterChange('genre', 'fighting')}
          />
        </FilterSection>

        {/* Özellikler */}
        <FilterSection title="Özellikler" defaultOpen={false}>
          <FilterItem
            label="Başarılar"
            isActive={activeFilters.features?.includes('achievements')}
            onClick={() => onFilterChange('features', 'achievements')}
          />
          <FilterItem
            label="Bulut Kayıtları"
            isActive={activeFilters.features?.includes('cloud-saves')}
            onClick={() => onFilterChange('features', 'cloud-saves')}
          />
          <FilterItem
            label="Çapraz Platform"
            isActive={activeFilters.features?.includes('cross-platform')}
            onClick={() => onFilterChange('features', 'cross-platform')}
          />
          <FilterItem
            label="Çok Oyunculu"
            isActive={activeFilters.features?.includes('multiplayer')}
            onClick={() => onFilterChange('features', 'multiplayer')}
          />
          <FilterItem
            label="Eşli"
            isActive={activeFilters.features?.includes('co-op')}
            onClick={() => onFilterChange('features', 'co-op')}
          />
          <FilterItem
            label="Kumanda Desteği"
            isActive={activeFilters.features?.includes('controller')}
            onClick={() => onFilterChange('features', 'controller')}
          />
          <FilterItem
            label="Online Multiplayer"
            isActive={activeFilters.features?.includes('online-multiplayer')}
            onClick={() => onFilterChange('features', 'online-multiplayer')}
          />
          <FilterItem
            label="Rekabetçi"
            isActive={activeFilters.features?.includes('competitive')}
            onClick={() => onFilterChange('features', 'competitive')}
          />
          <FilterItem
            label="Tek Oyunculu"
            isActive={activeFilters.features?.includes('single-player')}
            onClick={() => onFilterChange('features', 'single-player')}
          />
          <FilterItem
            label="Yerel Çok Oyunculu"
            isActive={activeFilters.features?.includes('local-multiplayer')}
            onClick={() => onFilterChange('features', 'local-multiplayer')}
          />
        </FilterSection>

        {/* Türler */}
        <FilterSection title="Türler" defaultOpen={false}>
          <FilterItem
            label="Abonelik"
            isActive={activeFilters.types?.includes('subscription')}
            onClick={() => onFilterChange('types', 'subscription')}
          />
          <FilterItem
            label="Deneyim"
            isActive={activeFilters.types?.includes('experience')}
            onClick={() => onFilterChange('types', 'experience')}
          />
          <FilterItem
            label="Editör"
            isActive={activeFilters.types?.includes('editor')}
            onClick={() => onFilterChange('types', 'editor')}
          />
          <FilterItem
            label="Oyun"
            isActive={activeFilters.types?.includes('game')}
            onClick={() => onFilterChange('types', 'game')}
          />
          <FilterItem
            label="Oyun Demosu"
            isActive={activeFilters.types?.includes('demo')}
            onClick={() => onFilterChange('types', 'demo')}
          />
          <FilterItem
            label="Oyun Eklentisi"
            isActive={activeFilters.types?.includes('add-on')}
            onClick={() => onFilterChange('types', 'add-on')}
          />
          <FilterItem
            label="Oyun Paketi"
            isActive={activeFilters.types?.includes('bundle')}
            onClick={() => onFilterChange('types', 'bundle')}
          />
          <FilterItem
            label="Oyun Sürümü"
            isActive={activeFilters.types?.includes('version')}
            onClick={() => onFilterChange('types', 'version')}
          />
          <FilterItem
            label="Uygulamalar"
            isActive={activeFilters.types?.includes('application')}
            onClick={() => onFilterChange('types', 'application')}
          />
        </FilterSection>

        {/* Platform */}
        <FilterSection title="Platform" defaultOpen={false}>
          <FilterItem
            label="Android"
            isActive={activeFilters.platforms?.includes('android')}
            onClick={() => onFilterChange('platforms', 'android')}
          />
          <FilterItem
            label="iOS"
            isActive={activeFilters.platforms?.includes('ios')}
            onClick={() => onFilterChange('platforms', 'ios')}
          />
          <FilterItem
            label="Mac OS"
            isActive={activeFilters.platforms?.includes('macos')}
            onClick={() => onFilterChange('platforms', 'macos')}
          />
          <FilterItem
            label="Windows"
            isActive={activeFilters.platforms?.includes('windows')}
            onClick={() => onFilterChange('platforms', 'windows')}
          />
        </FilterSection>

        {/* Abonelikler */}
        <FilterSection title="Abonelikler" defaultOpen={false}>
          <FilterItem
            label="EA Play"
            isActive={activeFilters.subscriptions?.includes('ea-play')}
            onClick={() => onFilterChange('subscriptions', 'ea-play')}
          />
          <FilterItem
            label="Fortnite Crew"
            isActive={activeFilters.subscriptions?.includes('fortnite-crew')}
            onClick={() => onFilterChange('subscriptions', 'fortnite-crew')}
          />
        </FilterSection>
      </div>
    </div>
  );
}

