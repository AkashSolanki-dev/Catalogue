import React, { useState, useEffect, useContext } from 'react'
import { Product, retrieveProducts, ErrorResponse } from '../../Common/ApiUtils'
import ProductList from './Products-List/ProductsList'
import { FilterContext } from '../../Context/FilterContext'

const ProductContainer: React.FC<{ fetchedProducts: Product[] }> = ({
  fetchedProducts,
}) => {
  const [products, setProducts] = useState<Product[] | ErrorResponse[]>([])
  const { searchTerm, category } = useContext(FilterContext)

  useEffect(() => {
    // Filter products based on search term and category
    if (fetchedProducts) {
      const filteredProducts = fetchedProducts.filter((product) => {
        const titleMatches =
          searchTerm === '' ||
          (product.title &&
            product.title.toLowerCase().includes(searchTerm.toLowerCase()))

        const categoryMatches =
          category === 'None' || product.category === category.toLowerCase()

        return titleMatches && categoryMatches
      })
      console.log(filteredProducts)
      setProducts(filteredProducts as Product[])
    } else {
      setProducts([])
    }
  }, [searchTerm, category])

  return (
    <div>
      <ProductList products={products as Product[]} />
    </div>
  )
}

export default ProductContainer
