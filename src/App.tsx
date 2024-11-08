import './App.css'
import Header from './Components/Header/Header'
import ProductContainer from './Components/Product-Container/ProductContainer'
import SearchContextProvider from './Context/FilterContext'
import CartContextProvider from './Context/CartContext'

import { Route, Routes } from 'react-router-dom'
import Cart from './Components/Cart/Cart'
import { useEffect, useState } from 'react'
import { Product, retrieveProducts } from './Common/ApiUtils'

function App() {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>()
  const component =
    (fetchedProducts?.length ?? 0) > 0 ? (
      <ProductContainer fetchedProducts={fetchedProducts!} />
    ) : (
      <div>Loading...</div>
    )

  useEffect(() => {
    // Fetch products from API
    const getProducts = async () => {
      try {
        const productsFromServer = await retrieveProducts()
        setFetchedProducts(productsFromServer as Product[])
      } catch (error) {
        console.error('Error retrieving products:', error)
      }
    }
    getProducts()
  }, [])
  return (
    <div className="App">
      <SearchContextProvider>
        <CartContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={component} />
            <Route path="/products" element={component} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartContextProvider>
      </SearchContextProvider>
    </div>
  )
}

export default App
