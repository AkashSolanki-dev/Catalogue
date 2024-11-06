import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import ProductContainer from './Components/Product-Container/ProductContainer'
import SearchContextProvider from './Context/FilterContext'
import CartContextProvider from './Context/CartContext'

import { Route, Routes } from 'react-router-dom'
import Cart from './Components/Cart/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SearchContextProvider>
        <CartContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<ProductContainer />} />
            <Route path="/products" element={<ProductContainer />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartContextProvider>
      </SearchContextProvider>
    </div>
  )
}

export default App
