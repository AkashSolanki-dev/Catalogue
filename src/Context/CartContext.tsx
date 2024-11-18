import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartProduct } from '../Components/Cart/Cart'

interface CartItem {
  product: CartProduct
}

interface CartState {
  items: CartItem[]
  totalItems: number
}

export enum Type {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  CLEAR_CART = 'CLEAR_CART',
}

interface CartAction {
  type: Type
  payload?: CartItem
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
}

export const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
}>({
  state: initialState,
  dispatch: () => null,
})

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      let updatedItems
      if (action.payload?.product && action.payload.product.quantity > 0) {
        const existingItem = state.items.find(
          (item) => item.product.id === action.payload!.product.id
        )

        if (existingItem) {
          updatedItems = state.items.map((item) =>
            item.product.id === action.payload!.product.id
              ? {
                  ...item,
                  product: {
                    ...action.payload!.product,
                  },
                }
              : item
          )
        } else {
          updatedItems = [...state.items, action.payload]
        }
        const totalItems = updatedItems.reduce(
          (acc, item) => acc + item.product.quantity,
          0
        )
        return {
          ...state,
          items: updatedItems,
          totalItems,
        }
      }
      updatedItems = state.items.filter(
        (item) => item.product.id !== action.payload!.product.id
      )
      const totalItems = updatedItems.reduce(
        (acc, item) => acc + item.product.quantity,
        0
      )
      return {
        ...state,
        items: updatedItems,
        totalItems,
      }
    case 'REMOVE_ITEM':
      if (action.payload) {
        const existingItem = state.items.find(
          (item) => item.product.id === action.payload!.product.id
        )
        if (existingItem) {
          const updatedItems = state.items.filter(
            (item) => item.product.id !== action.payload!.product.id
          )
          return {
            ...state,
            items: updatedItems,
            totalItems: state.totalItems - existingItem.product.quantity,
          }
        }
      }
      return state
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
