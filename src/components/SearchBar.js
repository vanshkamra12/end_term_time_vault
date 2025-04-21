import { useEra } from '../contexts/EraContext';

function SearchBar() {
  const { searchTerm, setSearchTerm, advancedFilters, setAdvancedFilters } = useEra();

  const handleYearChange = (e, field) => {
    const value = e.target.value;
 
    if (value === '' || /^-?\d*$/.test(value)) {
      setAdvancedFilters({
        ...advancedFilters,
        [field]: value
      });
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search historical events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        aria-label="Search historical eras"
        role="searchbox"
      />
      <div className="advanced-filters" role="group" aria-label="Advanced search filters">
        <select
          value={advancedFilters.period}
          onChange={(e) => setAdvancedFilters({
            ...advancedFilters,
            period: e.target.value
          })}
          aria-label="Filter by period"
        >
          <option value="All">All Periods</option>
          <option value="Ancient">Ancient</option>
          <option value="Medieval">Medieval</option>
          <option value="Future">Future</option>
        </select>
        <input
          type="text"
          placeholder="Start Year (e.g. -3000)"
          value={advancedFilters.startYear}
          onChange={(e) => handleYearChange(e, 'startYear')}
          aria-label="Start year"
        />
        <input
          type="text"
          placeholder="End Year (e.g. 2023)"
          value={advancedFilters.endYear}
          onChange={(e) => handleYearChange(e, 'endYear')}
          aria-label="End year"
        />
      </div>
    </div>
  );
}

export default SearchBar;
