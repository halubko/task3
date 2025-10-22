import { createApi } from "@reduxjs/toolkit/query/react"
import { ILoginResponse, IRefreshResponse } from "../models/responses/IAuthResponses"
import { IUser } from "../models/IUser"
import { ILoginPayload, IRefreshPayload } from "../models/payloads/IAuthPayloads"
import { baseQuery } from "./index"

export const authAPI = createApi({
   reducerPath: "authAPI",
   baseQuery: baseQuery,
   endpoints: (build) => ({
      loginUser: build.mutation<ILoginResponse, ILoginPayload>({
         query: (body) => ({
            url: `/auth/login`,
            method: "POST",
            body,
         }),
      }),
      refreshToken: build.mutation<IRefreshResponse, IRefreshPayload>({
         query: (body) => ({
            url: `/auth/refresh`,
            method: "POST",
            body,
         }),
      }),
      checkAuth: build.query<IUser, void>({
         query: () => ({
            url: "/auth/me",
         }),
      }),
   }),
})
