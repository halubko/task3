import { createApi } from "@reduxjs/toolkit/query/react"
import { ILoginResponse } from "../models/responses/IAuthResponses"
import { ILoginPayload } from "../models/payloads/IAuthPayloads"
import { baseQueryWithReauth } from "./index"

export const authAPI = createApi({
   reducerPath: "authAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      loginUser: build.mutation<ILoginResponse, ILoginPayload>({
         query: (body) => ({
            url: `/auth/login`,
            method: "POST",
            body,
         }),
      }),
      checkAuth: build.query<ILoginResponse, void>({
         query: () => ({
            url: "/auth/me",
         }),
      }),
   }),
})
