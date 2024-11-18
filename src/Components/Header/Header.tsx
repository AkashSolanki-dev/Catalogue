import SearchBar from '../SearchBar/SearchBar'
import './Header.css'
import { FilterContext } from '../../Context/FilterContext'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export enum Category {
  Electronics = 'Electronics',
  Jewelry = 'Jewelery',
  MensClothing = "Men's Clothing",
  WomensClothing = "Women's Clothing",
  None = 'None',
}

function Header() {
  const { searchTerm, setSearchTerm, category, setCategory } =
    useContext(FilterContext)
  const { state } = useContext(CartContext)
  const [totalItems, setTotalItems] = useState(0)
  const location = useLocation()
  const [showCategoryContainer, setshowCategoryContainer] = useState(true)

  useEffect(() => {
    setshowCategoryContainer(
      location.pathname === '/' || location.pathname === '/products'
    )
  }, [location])

  useEffect(() => {
    setTotalItems(() => state.totalItems)
  }, [state])

  const onSearch = (searchT: string) => {
    setSearchTerm(searchT)
    console.log(searchTerm)
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value as Category)
  }

  return (
    <header>
      <div className="app-name">Catalogue</div>
      {showCategoryContainer && (
        <>
          <SearchBar onSearch={onSearch} />
          <div className="category-container">
            <label htmlFor="category-select" className="category-label">
              Choose Category:
            </label>
            <select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              className="category-select"
            >
              {Object.values(Category).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <nav>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart {totalItems && `with ${totalItems}`}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
