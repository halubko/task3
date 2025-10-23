import { ICartProduct } from "../ICart"

export interface ICartResponse {
   id: number
   products: ICartProduct[]
   total: number
   totalQuantity: number
   totalProducts: number
}

export interface IGetCartByUserIdResponse extends ICartResponse {
   userId: number
}

export interface IDefaultCartUserResponse {
   carts: IGetCartByUserIdResponse[]
   total: number
   skip: number
   limit: number
}
