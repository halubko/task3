import { IProduct } from "../IProduct"

export interface ProductsResponse {
   products: IProduct[]
   limit: number
   total: number
   skip: number
}

export interface CategoriesResponse {
   name: string
   slug: string
}

export interface GetProductsParams {
   limit: number
   skip: number
   sortBy?: string
   order?: string
   q?: string
}

export interface GetProductsByCategoryParams {
   productType: string
   params: GetProductsParams
}
