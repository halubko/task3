import { useAppDispatch, useAppSelector } from "./redux"
import {
   addToCart,
   decrementQuantity,
   incrementQuantity,
   removeFromCart,
} from "../store/slices/cartSlice"

export const useCartQuantityActions = (id: number) => {
   const dispatch = useAppDispatch()

   const quantityInCart = useAppSelector(
      (state) => state.cart.products.find((item) => item.id === id)?.quantity || 0
   )

   const handleAddToCart = (price: number, title: string) => {
      dispatch(addToCart({ id, quantity: 1, price, title }))
   }

   const handleIncrement = () => {
      dispatch(incrementQuantity({ id }))
   }

   const handleDecrement = () => {
      dispatch(decrementQuantity({ id }))
   }

   const handleRemove = () => {
      dispatch(removeFromCart({ id }))
   }
   return {
      quantityInCart,
      handleAddToCart,
      handleIncrement,
      handleDecrement,
      handleRemove,
   }
}
