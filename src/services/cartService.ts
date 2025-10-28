import { createApi } from "@reduxjs/toolkit/query/react"
import {
   ICartResponse,
   IDefaultCartUserResponse,
   IDeleteCartResponse,
   IGetCartByUserIdResponse,
} from "../models/responses/ICartResponses"
import { IAddCartPayload, IUpdateCartPayload } from "../models/payloads/ICartPayloads"
import { baseQueryWithReauth } from "./index"

export const cartAPI = createApi({
   reducerPath: "cartAPI",
   baseQuery: baseQueryWithReauth,
   // eslint-disable-next-line @typescript-eslint/unbound-method
   endpoints: ({ query, mutation }) => ({
      getCartByUserId: query<IGetCartByUserIdResponse, number>({
         query: (id: number) => ({
            url: `/carts/user/${id}`,
         }),
         transformResponse: (response: IDefaultCartUserResponse): IGetCartByUserIdResponse => {
            return response.carts[0] ?? null //it works, but this api don't work at dummyjson
         },
      }),
      addCart: mutation<ICartResponse, IAddCartPayload>({
         query: (body) => ({
            url: "/carts/add",
            method: "POST",
            body,
         }),
      }),
      updateCart: mutation<ICartResponse, IUpdateCartPayload>({
         query: ({ cartId, products, merge }) => ({
            url: `/carts/${cartId}`,
            method: "PUT",
            body: { merge, products },
         }),
      }),
      deleteCart: mutation<IDeleteCartResponse, number>({
         query: (cartId: number) => ({
            url: `/carts/${cartId}`,
            method: "DELETE",
         }),
      }),
   }),
})

export const {
   useAddCartMutation,
   useDeleteCartMutation,
   useUpdateCartMutation,
   useGetCartByUserIdQuery,
} = cartAPI
