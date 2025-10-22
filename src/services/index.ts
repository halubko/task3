import {
   BaseQueryFn,
   FetchArgs,
   fetchBaseQuery,
   FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { RootState } from "../store/store"
import { authTokenChange, logoutUser } from "../store/slices/authSlice"

export const baseQuery = fetchBaseQuery({
   baseUrl: "https://dummyjson.com",
   prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
         headers.set("authorization", `Bearer ${accessToken}`)
      }
      return headers
   },
})

export const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, store, extraOptions) => {
   let result = await baseQuery(args, store, extraOptions)

   const currentAccessToken = (store.getState() as RootState).auth.accessToken

   if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery(
         {
            url: "/auth/refresh",
            method: "POST",
            body: JSON.stringify({ token: currentAccessToken }),
         },
         store,
         extraOptions
      )

      if (refreshResult.data) {
         const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken

         store.dispatch(
            authTokenChange({
               accessToken: newAccessToken,
               refreshToken: currentAccessToken,
            })
         )

         result = await baseQuery(args, store, extraOptions)
      } else {
         store.dispatch(logoutUser())
      }
   }
   return result
}
