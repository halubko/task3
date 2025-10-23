import { ICartProduct } from "../ICart"

export interface IAddCartPayload {
   userId: number
   products: ICartProduct[]
}

export interface IUpdateCartPayload {
   cartId: number
   products: ICartProduct[]
   merge?: boolean
}
