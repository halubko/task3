import { ICartProduct } from "../../models/ICart"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAddCartPayload } from "../../models/payloads/ICartPayloads"

interface CartState {
   id: number
   products: ICartProduct[]
}

const initialState: CartState = {
   id: null,
   products: [],
}

export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      refreshCart: (state, action: PayloadAction<{ products: ICartProduct[] }>) => {
         state.products = []
         action.payload.products.map((product: ICartProduct) => {
            state.products.push(product)
         })
      },
      addToCart: (state: CartState, action: PayloadAction<ICartProduct>) => {
         state.products.push(action.payload)
      },
      addCart: (state: CartState, action: PayloadAction<IAddCartPayload>) => {
         state.id = action.payload.userId
         state.products = [...state.products, ...action.payload.products]
      },
      removeFromCart: (state: CartState, action: PayloadAction<{ id: number }>) => {
         const index = state.products.findIndex((product) => product.id === action.payload.id)
         if (index !== -1) {
            state.products.splice(index, 1)
         }
      },
      deleteCart: (state: CartState) => {
         state.id = null
         state.products = []
      },
      incrementQuantity: (state: CartState, action: PayloadAction<{ id: number }>) => {
         const index = state.products.findIndex((product) => product.id === action.payload.id)
         if (index !== -1) {
            state.products[index].quantity += 1
         }
      },
      decrementQuantity: (state: CartState, action: PayloadAction<{ id: number }>) => {
         const index = state.products.findIndex((product) => product.id === action.payload.id)
         if (index !== -1) {
            state.products[index].quantity -= 1
            if (state.products[index].quantity === 0) {
               state.products.splice(index, 1)
            }
         }
      },
   },
})

export const {
   refreshCart,
   addToCart,
   addCart,
   incrementQuantity,
   decrementQuantity,
   removeFromCart,
   deleteCart,
} = cartSlice.actions
