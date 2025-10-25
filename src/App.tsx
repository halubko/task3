import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { authAPI } from "./services/authService"
import { useAppDispatch } from "./hooks/redux"
import { setUser } from "./store/slices/authSlice"
import { IUser } from "./models/IUser"
import { cartAPI } from "./services/cartService"
import { addCart } from "./store/slices/cartSlice"
import { CircularProgress } from "@mui/material"

export function App() {
   const { data: userData, isLoading } = authAPI.useCheckAuthQuery()

   //Not working at DummyJSON at all, but logic is the next:
   //When initializing the application, we check auth and automatically load the cart by userId
   const { data: cartData } = cartAPI.useGetCartByUserIdQuery(userData?.id, { skip: !userData?.id })
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (userData) {
         dispatch(
            setUser({
               user: { id: userData.id, username: userData.username } as IUser,
               accessToken: localStorage.getItem("accessToken"),
               refreshToken: localStorage.getItem("refreshToken"),
            })
         )
      }
   }, [userData, dispatch])

   useEffect(() => {
      if (cartData) {
         dispatch(addCart({ userId: cartData.id, products: cartData.products }))
      }
   }, [cartData])

   if (isLoading) {
      return <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
   }

   return <Outlet />
}
