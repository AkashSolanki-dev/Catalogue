import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <button type="button" className="search-button">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </button>
    </div>
  )
}

export default SearchBar
