import React, { useState } from 'react';
import type { Category } from '../types/product';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SidebarFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory: (categoryName: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  hideCategoriesOnMobile?: boolean;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  hideCategoriesOnMobile = false
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="mb-6 lg:mb-8">
        
        {/* Search Input Box */}
        <div className="flex mb-6 w-full">
            <input 
              type="text" 
              placeholder="Buscá tu producto..." 
              className="flex-1 w-full border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-inner"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
            />
            <button 
                onClick={onSearchSubmit}
                className="bg-[#2b88c4] hover:bg-blue-700 text-white px-4 py-2 rounded-r text-xs font-semibold transition-colors shadow"
            >
                BUSCAR
            </button>
        </div>

        {/* Mobile Categories Toggle Button */}
        {!hideCategoriesOnMobile && (
          <button 
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="lg:hidden w-full flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md mb-2 font-semibold text-gray-800 border border-gray-200"
          >
            <span>Categorías</span>
            {isCategoriesOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
          </button>
        )}

        {/* Desktop Categories Title */}
        <h2 className="hidden lg:block text-2xl font-semibold text-gray-800 mb-4">Categorías</h2>

        {/* Categories List */}
        <ul className={`${hideCategoriesOnMobile ? 'hidden lg:flex' : (isCategoriesOpen ? 'flex lg:flex' : 'hidden lg:flex')} flex-col border border-gray-200 rounded-md overflow-hidden bg-white`}>
          <li>
            <button
              onClick={() => {
                onSelectCategory('');
                setIsCategoriesOpen(false); // Close on mobile after selection
              }}
              className={`w-full text-left px-4 py-3 text-xs tracking-wider uppercase font-semibold flex justify-between items-center transition-colors border-b border-gray-100 last:border-0 ${
                !selectedCategory ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              TODOS LOS PRODUCTOS <span className="text-gray-300">❯</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => {
                  onSelectCategory(category.name);
                  setIsCategoriesOpen(false); // Close on mobile after selection
                }}
                className={`w-full text-left px-4 py-3 text-[0.7rem] tracking-wider uppercase font-medium flex justify-between items-center transition-colors border-b border-gray-100 last:border-0 ${
                  selectedCategory === category.name ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {category.name} <span className="text-gray-300">❯</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarFilters;
