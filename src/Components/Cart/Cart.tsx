import React, { useContext } from 'react'
import { CartContext, Type } from '../../Context/CartContext'
import './Cart.css'

export interface CartProduct {
  id: number
  title: string
  quantity: number
  price: number
  image: string
}

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(CartContext)
  const products = state['items']
  const totalAmount = products.reduce(
    (acc, item) => acc + item.product.price * item.product.quantity,
    0
  )

  const handleDelete = (product: CartProduct) => {
    dispatch({ type: Type.REMOVE_ITEM, payload: { product } })
  }

  const clearCart = () => {
    dispatch({ type: Type.CLEAR_CART })
  }

  return (
    <div>
      <h2>Cart</h2>
      {products.length > 1 && (
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
      )}
      {products.map((item) => (
        <div
          key={item.product.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <img
            src={item.product.image}
            alt={item.product.title}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <div>
            <h3>{item.product.title}</h3>
            <p>Quantity: {item.product.quantity}</p>
            <p>Price: ${item.product.price}</p>
          </div>
          <button
            className="delete-button"
            onClick={() => handleDelete(item.product)}
          >
            Delete
          </button>
        </div>
      ))}
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  )
}

export default Cart
