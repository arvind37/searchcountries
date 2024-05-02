import React, { useState, useEffect } from 'react';

function Search() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(term));
    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <h1>Country Flags</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="country-grid">
        {filteredCountries.map(country => (
          <div className="countryCard" key={country.cca3}>
            <img src={country.flags.png} alt={country.name.common}  width="50"
              height="auto"/>
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
