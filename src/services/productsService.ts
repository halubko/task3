import { createApi } from "@reduxjs/toolkit/query/react"
import { IProduct } from "../models/IProduct"
import {
   CategoriesResponse,
   GetProductsByCategoryParams,
   GetProductsParams,
   ProductsResponse,
} from "../models/responses/IProductsResponses"
import { baseQueryWithReauth } from "./index"

export const productsAPI = createApi({
   reducerPath: "productsAPI",
   baseQuery: baseQueryWithReauth,
   // eslint-disable-next-line @typescript-eslint/unbound-method
   endpoints: ({ query }) => ({
      getProducts: query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "/products",
            params,
         }),
      }),
      getProductById: query<IProduct, number>({
         query: (id: number) => ({
            url: `/products/${id}`,
         }),
      }),
      getProductsCategories: query<CategoriesResponse[], void>({
         query: () => ({
            url: "/products/categories",
         }),
      }),
      getSearchProducts: query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "/products/search",
            params,
         }),
      }),
      getProductsByCategory: query<ProductsResponse, GetProductsByCategoryParams>({
         query: ({ productType, params }) => ({
            url: `/products/category/${productType}`,
            params,
         }),
      }),
   }),
})

export const {
   useGetProductsQuery,
   useGetProductByIdQuery,
   useGetProductsCategoriesQuery,
   useGetSearchProductsQuery,
   useGetProductsByCategoryQuery,
} = productsAPI
