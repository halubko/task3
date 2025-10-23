import { createApi } from "@reduxjs/toolkit/query/react"
import {
   ICartResponse,
   IDefaultCartUserResponse,
   IGetCartByUserIdResponse,
} from "../models/responses/ICartResponses"
import { IAddCartPayload, IUpdateCartPayload } from "../models/payloads/ICartPayloads"
import { baseQueryWithReauth } from "./index"

export const cartAPI = createApi({
   reducerPath: "cartAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      getCartById: build.query<ICartResponse, number>({
         query: (id: number) => ({
            url: `/carts/${id}`,
         }),
      }),
      getCartByUserId: build.query<IGetCartByUserIdResponse, number>({
         query: (id: number) => ({
            url: `/carts/user/${id}`,
         }),
         transformResponse: (response: IDefaultCartUserResponse): IGetCartByUserIdResponse => {
            return response.carts?.[0] ?? null
         },
      }),
      addCart: build.mutation<ICartResponse, IAddCartPayload>({
         query: (body) => ({
            url: "/carts/add",
            method: "POST",
            body,
         }),
      }),
      updateCart: build.mutation<ICartResponse, IUpdateCartPayload>({
         query: ({ cartId, products, merge }) => ({
            url: `/carts/${cartId}`,
            method: "PUT",
            body: { merge, products },
         }),
      }),
   }),
})
