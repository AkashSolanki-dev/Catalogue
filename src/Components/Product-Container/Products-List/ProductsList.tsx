import React, { useState, useEffect } from 'react'
import { ErrorResponse, Product } from '../../../Common/ApiUtils'
import ProductCard from '../Product-Card/ProductCard'

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={'product-list'}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
