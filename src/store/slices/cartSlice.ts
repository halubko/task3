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
      registerCart: (state, action: PayloadAction<{ id: number }>) => {
         state.id = action.payload.id
      },
      addToCart: (state: CartState, action: PayloadAction<ICartProduct>) => {
         state.products.push(action.payload)
      },
      addCart: (state: CartState, action: PayloadAction<IAddCartPayload>) => {
         state.id = action.payload.cartId
         state.products = action.payload.products
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

export const { registerCart, addToCart, addCart, incrementQuantity, decrementQuantity } =
   cartSlice.actions
