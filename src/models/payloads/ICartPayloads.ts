import { ICartProduct } from "../ICart"

export interface IAddCartPayload {
   cartId: number
   products: ICartProduct[]
}

export interface IUpdateCartPayload extends IAddCartPayload {
   merge?: boolean
}
