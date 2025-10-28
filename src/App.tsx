import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useCheckAuthQuery } from "./services/authService"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { setUser } from "./store/slices/authSlice"
import { IUser } from "./models/IUser"
import { useAddCartMutation, useGetCartByUserIdQuery } from "./services/cartService"
import { addCart } from "./store/slices/cartSlice"
import { CircularProgress } from "@mui/material"

export function App() {
   const { data: userData, isLoading } = useCheckAuthQuery()

   //Not working at DummyJSON at all, but logic is the next:
   //When initializing the application, we check auth and automatically load the cart by userId
   const { data: cartData } = useGetCartByUserIdQuery(userData?.id, { skip: !userData?.id })
   const [createCart] = useAddCartMutation()
   const isAuth = useAppSelector((state) => state.auth.isAuthenticated)

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
      } else if (isAuth) {
         //DummyJSON don't allow to create cart without products
         void createCart({ userId: userData.id, products: [] })
      }
   }, [cartData])

   if (isLoading) {
      return <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
   }

   return <Outlet />
}
