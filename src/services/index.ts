import {
   BaseQueryFn,
   FetchArgs,
   fetchBaseQuery,
   FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { authTokenChange, logoutUser } from "../store/slices/authSlice"

const baseQuery = fetchBaseQuery({
   baseUrl: "https://dummyjson.com",
   prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
         headers.set("authorization", `Bearer ${accessToken}`)
      }
      return headers
   },
})

const baseQueryForReauth = fetchBaseQuery({
   baseUrl: "https://dummyjson.com",
})

export const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, store, extraOptions) => {
   let result = await baseQuery(args, store, extraOptions)

   const currentRefreshToken = localStorage.getItem("refreshToken")

   if (result.error && result.error.status === 401) {
      const refreshResult = await baseQueryForReauth(
         {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken: currentRefreshToken },
         },
         store,
         extraOptions
      )

      if (refreshResult.data) {
         const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken
         const newRefreshToken = (refreshResult.data as { refreshToken: string }).refreshToken

         store.dispatch(
            authTokenChange({
               accessToken: newAccessToken,
               refreshToken: newRefreshToken,
            })
         )

         result = await baseQuery(args, store, extraOptions)
      } else {
         store.dispatch(logoutUser())
      }
   }
   return result
}
