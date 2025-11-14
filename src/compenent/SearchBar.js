import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ onSearch, onFilter, onSort, products = [] }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 2000],
    rating: 0,
    brand: ''
  });
  const [sortBy, setSortBy] = useState('popularity');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Extract unique categories and brands from products
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand || 'Unknown'))];

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredSuggestions = products
        .filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          text: product.name,
          category: product.category
        }));
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);

  const handleSearch = (term = searchTerm) => {
    onSearch(term, filters, sortBy);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilter(newFilters, sortBy);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    onSort(sortValue, filters);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    handleSearch(suggestion.text);
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
      borderRadius: '15px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder={t('searchProducts')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            width: '100%',
            padding: '1rem 3rem 1rem 1rem',
            borderRadius: '25px',
            border: '2px solid #ddd',
            fontSize: '1rem',
            outline: 'none',
            background: 'white',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={() => handleSearch()}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          🔍
        </button>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                <span>{suggestion.text}</span>
                <span style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  background: '#e0e0e0',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '10px'
                }}>
                  {suggestion.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters and Sort */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            {t('category')}
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: 'white'
            }}
          >
            <option value="">{t('all')}</option>
            {categories.map(category => (
              <option key={category} value={category}>{t(category)}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            {t('price')} (€)
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              style={{
                width: '60px',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 2000])}
              style={{
                width: '60px',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            {t('rating')} (★)
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: 'white'
            }}
          >
            <option value={0}>{t('all')}</option>
            <option value={4}>4+ ★</option>
            <option value={3}>3+ ★</option>
            <option value={2}>2+ ★</option>
            <option value={1}>1+ ★</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            {t('sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: 'white'
            }}
          >
            <option value="popularity">{t('popularity')}</option>
            <option value="priceLowToHigh">{t('priceLowToHigh')}</option>
            <option value="priceHighToLow">{t('priceHighToLow')}</option>
            <option value="ratingHighToLow">{t('ratingHighToLow')}</option>
            <option value="newest">{t('newest')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
