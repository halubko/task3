import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IUser} from "../models/IUser";

interface ILoginPayload {
    username: string;
    password: string;
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
    endpoints:(build) => ({
        loginUser: build.mutation<IUser, ILoginPayload>({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body,
            }),
        }),
        refreshToken: build.mutation({
            query: (body)=> ({
                url: `auth/refresh`,
                method: 'POST',
                body
            })
        })

    })
})