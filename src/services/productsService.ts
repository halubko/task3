import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IProduct } from "../models/IProduct"

interface ProductsResponse {
   products: IProduct[]
   limit: number
   total: number
   skip: number
}

interface CategoriesResponse {
   name: string
   slug: string
}

interface GetProductsParams {
   limit: number
   skip: number
}

export const productsAPI = createApi({
   reducerPath: "productsAPI",
   baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
   endpoints: (build) => ({
      getProducts: build.query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "products",
            params,
         }),
      }),
      getProductById: build.query<IProduct, number>({
         query: (id: number) => ({
            url: `products/${id}`,
         }),
      }),
      getProductCategories: build.query<CategoriesResponse[], void>({
         query: () => ({
            url: "products/categories",
         }),
      }),
   }),
})
