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

export interface GetProductsParams {
   limit: number
   skip: number
   sortBy?: string
   order?: string
   q?: string
}

interface GetProductsByCategoryParams {
   productType: string
   params: GetProductsParams
}

export const productsAPI = createApi({
   reducerPath: "productsAPI",
   baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
   endpoints: (build) => ({
      getProducts: build.query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "",
            params,
         }),
      }),
      getProductById: build.query<IProduct, number>({
         query: (id: number) => ({
            url: `/${id}`,
         }),
      }),
      getProductsCategories: build.query<CategoriesResponse[], void>({
         query: () => ({
            url: "/categories",
         }),
      }),
      getSearchProducts: build.query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "/search",
            params,
         }),
      }),
      getProductsByCategory: build.query<ProductsResponse, GetProductsByCategoryParams>({
         query: ({ productType, params }) => ({
            url: `category/${productType}`,
            params,
         }),
      }),
   }),
})
