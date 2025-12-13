import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#2a2a2a] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-white font-medium text-[15px] hover:text-gray-300 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? 
          <ChevronUp size={18} className="text-gray-400" strokeWidth={2} /> : 
          <ChevronDown size={18} className="text-gray-400" strokeWidth={2} />
        }
      </button>
      {isOpen && (
        <div className="pb-6 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ label, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-2.5 px-0 transition-colors ${
        isActive
          ? 'text-white font-medium'
          : 'text-[#ababab] hover:text-white'
      }`}
    >
      <span className="text-[14px] leading-relaxed">{label}</span>
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
    <div className="w-full md:w-72 flex-shrink-0">
      <div className="sticky top-20">
        {/* Header */}
        <div className="pb-5 border-b border-[#2a2a2a]">
          <h2 className="text-white font-semibold text-lg">Filtreler</h2>
        </div>

        {/* Etkinlikler */}
        <FilterSection title="Etkinlikler">
          <FilterItem
            label="YILBAŞI TATİLİ İNDİRİMİ"
            isActive={activeFilters.events?.includes('new-year-sale')}
            onClick={() => onFilterChange('events', 'new-year-sale')}
          />
        </FilterSection>

        {/* Tür */}
        <FilterSection title="Tür">
          <FilterItem
            label="Aksiyon"
            isActive={activeFilters.genre?.includes('action')}
            onClick={() => onFilterChange('genre', 'action')}
          />
          <FilterItem
            label="Gizlilik"
            isActive={activeFilters.genre?.includes('stealth')}
            onClick={() => onFilterChange('genre', 'stealth')}
          />
          <FilterItem
            label="Kart Oyunu"
            isActive={activeFilters.genre?.includes('card')}
            onClick={() => onFilterChange('genre', 'card')}
          />
          <FilterItem
            label="Nişancı"
            isActive={activeFilters.genre?.includes('shooter')}
            onClick={() => onFilterChange('genre', 'shooter')}
          />
          <FilterItem
            label="Rogue-lite"
            isActive={activeFilters.genre?.includes('rogue-lite')}
            onClick={() => onFilterChange('genre', 'rogue-lite')}
          />
          <FilterItem
            label="Simülasyon"
            isActive={activeFilters.genre?.includes('simulation')}
            onClick={() => onFilterChange('genre', 'simulation')}
          />
          <FilterItem
            label="Strateji"
            isActive={activeFilters.genre?.includes('strategy')}
            onClick={() => onFilterChange('genre', 'strategy')}
          />
          <FilterItem
            label="Sıra Temelli"
            isActive={activeFilters.genre?.includes('turn-based')}
            onClick={() => onFilterChange('genre', 'turn-based')}
          />
          <FilterItem
            label="Sıra Temelli Strateji"
            isActive={activeFilters.genre?.includes('turn-based-strategy')}
            onClick={() => onFilterChange('genre', 'turn-based-strategy')}
          />
        </FilterSection>

        {/* Özellikler */}
        <FilterSection title="Özellikler" defaultOpen={false}>
          <FilterItem
            label="Tek Oyunculu"
            isActive={activeFilters.features?.includes('single-player')}
            onClick={() => onFilterChange('features', 'single-player')}
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
            label="Çapraz Platform"
            isActive={activeFilters.features?.includes('cross-platform')}
            onClick={() => onFilterChange('features', 'cross-platform')}
          />
        </FilterSection>

        {/* Platform */}
        <FilterSection title="Platform" defaultOpen={false}>
          <FilterItem
            label="Windows"
            isActive={activeFilters.platforms?.includes('windows')}
            onClick={() => onFilterChange('platforms', 'windows')}
          />
          <FilterItem
            label="Mac OS"
            isActive={activeFilters.platforms?.includes('macos')}
            onClick={() => onFilterChange('platforms', 'macos')}
          />
        </FilterSection>
      </div>
    </div>
  );
}

