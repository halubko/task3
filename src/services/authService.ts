import { createApi } from "@reduxjs/toolkit/query/react"
import { ILoginResponse } from "../models/responses/IAuthResponses"
import { ILoginPayload } from "../models/payloads/IAuthPayloads"
import { baseQueryWithReauth } from "./index"

export const authAPI = createApi({
   reducerPath: "authAPI",
   baseQuery: baseQueryWithReauth,
   // eslint-disable-next-line @typescript-eslint/unbound-method
   endpoints: ({ query, mutation }) => ({
      loginUser: mutation<ILoginResponse, ILoginPayload>({
         query: (body) => ({
            url: `/auth/login`,
            method: "POST",
            body,
         }),
      }),
      checkAuth: query<ILoginResponse, void>({
         query: () => ({
            url: "/auth/me",
         }),
      }),
   }),
})

export const { useLoginUserMutation, useCheckAuthQuery } = authAPI
