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
   endpoints: (build) => ({
      getProducts: build.query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "/products",
            params,
         }),
      }),
      getProductById: build.query<IProduct, number>({
         query: (id: number) => ({
            url: `/products/${id}`,
         }),
      }),
      getProductsCategories: build.query<CategoriesResponse[], void>({
         query: () => ({
            url: "/products/categories",
         }),
      }),
      getSearchProducts: build.query<ProductsResponse, GetProductsParams>({
         query: (params) => ({
            url: "/products/search",
            params,
         }),
      }),
      getProductsByCategory: build.query<ProductsResponse, GetProductsByCategoryParams>({
         query: ({ productType, params }) => ({
            url: `/products/category/${productType}`,
            params,
         }),
      }),
   }),
})
