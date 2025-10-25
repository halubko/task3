import { ICartProduct } from "../models/ICart"

export const calculateTotalPrice = (products: ICartProduct[]) => {
   return products.reduce((total, product) => {
      const price = product.price || 0
      const quantity = product.quantity || 0
      return total + price * quantity
   }, 0)
}
