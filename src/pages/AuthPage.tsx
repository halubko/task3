import React, { useEffect } from "react"
import { Box, CircularProgress, Container } from "@mui/material"
import AuthForm from "../components/auth/AuthForm"
import AuthError from "../components/auth/AuthError"
import { useLoginUserMutation } from "../services/authService"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setUser } from "../store/slices/authSlice"
import { useAddCartMutation } from "../services/cartService"

const AuthPage = () => {
   const [loginUser, { data, error, isLoading }] = useLoginUserMutation()
   const [addCart] = useAddCartMutation()
   const location = useLocation()
   const dispatch = useAppDispatch()
   const products = useAppSelector((state) => state.cart.products)

   useEffect(() => {
      if (data) {
         dispatch(
            setUser({
               user: { id: data.id, username: data.username },
               accessToken: data.accessToken,
               refreshToken: data.refreshToken,
            })
         )
         if (location.pathname === "/auth/signup") {
            void addCart({ userId: data.id, products: products })
         }
      }
   }, [data])

   return (
      <Container
         component="main"
         sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
         }}
      >
         {error && <AuthError error={error} />}
         <Box sx={{ width: "100%" }}>
            {isLoading ? (
               <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
            ) : location.pathname === "/auth/login" ? (
               <AuthForm mode="login" onLogin={loginUser} />
            ) : (
               <AuthForm mode="signup" onLogin={loginUser} />
            )}
         </Box>
      </Container>
   )
}

export default AuthPage
