import './ProductCard.css'
import { Product } from '../../../Common/ApiUtils'
import { useContext, useEffect, useState } from 'react'
import { CartContext, Type } from '../../../Context/CartContext'
import { CartProduct } from '../../Cart/Cart'

const ProductCard = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(CartContext)
  const [quantity, setQuantity] = useState(
    state.items.find((item) => item.product.id === product.id)?.product
      .quantity || 0
  )
  const addToCart = () => {
    setQuantity((quantity) => quantity + 1)
  }

  useEffect(() => {
    const addedProduct: CartProduct = {
      id: product.id,
      title: product.title,
      quantity: quantity,
      price: product.price,
      image: product.image,
    }

    dispatch({
      type: Type.ADD_ITEM,
      payload: { product: addedProduct },
    })
  }, [quantity])

  const quantityControls = (
    <div className="quantity-controls">
      <button
        className="quantity-button"
        onClick={() => setQuantity((quantity) => Math.max(quantity - 1, 0))}
      >
        -
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        className="quantity-button"
        onClick={() => setQuantity((quantity) => quantity + 1)}
      >
        +
      </button>
    </div>
  )

  return (
    <div className="product-container">
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-category"> Category : {product.category}</p>
        <p className="product-price">
          Price : <u>{product.price}</u>
        </p>
        {quantity == 0 && (
          <button className="add-to-cart-button" onClick={addToCart}>
            Add to Cart
          </button>
        )}
        {quantity > 0 && quantityControls}
      </div>
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  )
}

export default ProductCard
