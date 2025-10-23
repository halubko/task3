import { IUser } from "../../models/IUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type AuthState = {
   user: IUser | null
   accessToken: string | null
   refreshToken: string | null
   isAuthenticated: boolean
}

const initialState: AuthState = {
   user: null,
   accessToken: null,
   refreshToken: null,
   isAuthenticated: false,
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setUser: (
         state,
         action: PayloadAction<{ user: IUser; accessToken: string; refreshToken: string }>
      ) => {
         state.user = action.payload.user
         state.accessToken = action.payload.accessToken
         state.refreshToken = action.payload.refreshToken
         localStorage.setItem("accessToken", action.payload.accessToken)
         localStorage.setItem("refreshToken", action.payload.refreshToken)
      },
      authTokenChange: (
         state,
         action: PayloadAction<{ accessToken: string; refreshToken: string }>
      ) => {
         localStorage.setItem("accessToken", action.payload.accessToken)
         localStorage.setItem("refreshToken", action.payload.refreshToken)
         state.accessToken = action.payload.accessToken
         state.refreshToken = action.payload.refreshToken
         state.isAuthenticated = true
      },
      logoutUser: (state) => {
         state.user = null
         state.accessToken = null
         state.refreshToken = null
         localStorage.removeItem("accessToken")
         localStorage.removeItem("refreshToken")
         state.isAuthenticated = false
      },
      handleIsAuthenticated: (state: AuthState) => {
         state.isAuthenticated = !state.isAuthenticated
      },
   },
})

export const { setUser, authTokenChange, logoutUser, handleIsAuthenticated } = authSlice.actions
