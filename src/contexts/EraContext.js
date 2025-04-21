import { createContext, useState, useContext } from 'react';

const EraContext = createContext();

function extractYear(text) {
  // Match years like 2040, -3000, or ranges like 2070-2170
  const yearMatch = text.match(/(-?\d{1,4})(?:\s*-\s*\d{1,4})?(?=\s*(BCE|CE|AD)?)/);
  return yearMatch ? parseInt(yearMatch[1]) : null;
}

export function EraProvider({ children }) {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState({
    period: 'All',
    startYear: '',
    endYear: '',
    category: 'All'
  });

  const periods = ['All', 'Ancient', 'Medieval', 'Future'];

  const filterEras = (eras) => {
    if (!eras) return [];
    
    return eras.filter(era => {
      // Text search match
      const matchesSearch = era.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          era.body.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Period match
      const matchesPeriod = filter === 'All' ? true : era.period === filter;
      const matchesAdvancedPeriod = advancedFilters.period === 'All' || 
                                   era.period === advancedFilters.period;

      // Year range match
      let matchesYearRange = true;
      if (advancedFilters.startYear || advancedFilters.endYear) {
        const startYear = parseInt(advancedFilters.startYear) || -9999;
        const endYear = parseInt(advancedFilters.endYear) || 9999;
        matchesYearRange = era.year >= startYear && era.year <= endYear;
      }

      return matchesSearch && matchesPeriod && matchesAdvancedPeriod && matchesYearRange;
    });
  };

  return (
    <EraContext.Provider value={{
      filter,
      setFilter,
      periods,
      searchTerm,
      setSearchTerm,
      advancedFilters,
      setAdvancedFilters,
      filterEras
    }}>
      {children}
    </EraContext.Provider>
  );
}

export function useEra() {
  const context = useContext(EraContext);
  if (!context) {
    throw new Error('useEra must be used within an EraProvider');
  }
  return context;
}
