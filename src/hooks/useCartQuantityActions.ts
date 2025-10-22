import { useAppDispatch, useAppSelector } from "./redux"
import { addToCart, decrementQuantity, incrementQuantity } from "../store/slices/cartSlice"

export const useCartQuantityActions = (id: number) => {
   const dispatch = useAppDispatch()

   const quantityInCart = useAppSelector(
      (state) => state.cart.products.find((item) => item.id === id)?.quantity || 0
   )

   const handleAddToCart = () => {
      dispatch(addToCart({ id, quantity: 1 }))
   }

   const handleIncrement = () => {
      dispatch(incrementQuantity({ id }))
   }

   const handleDecrement = () => {
      dispatch(decrementQuantity({ id }))
   }
   return {
      quantityInCart,
      handleAddToCart,
      handleIncrement,
      handleDecrement,
   }
}
