import React, { useEffect } from "react"
import { Box, CircularProgress, Container } from "@mui/material"
import AuthForm from "../components/auth/AuthForm"
import AuthError from "../components/auth/AuthError"
import { authAPI } from "../services/authService"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/redux"
import { setUser } from "../store/slices/authSlice"

const AuthPage = () => {
   const [loginUser, { data, error, isLoading, isSuccess }] = authAPI.useLoginUserMutation()
   const navigate = useNavigate()
   const location = useLocation()
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (isSuccess) {
         dispatch(
            setUser({
               user: { id: data.id, username: data.username },
               accessToken: data.accessToken,
               refreshToken: data.refreshToken,
            })
         )
         void navigate(-1)
      }
   }, [isSuccess])

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
         {error === undefined ? null : <AuthError error={error} />}
         <Box sx={{ width: "100%" }}>
            {isLoading ? (
               <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
            ) : location.pathname === "/auth/login" ? (
               <AuthForm mode="login" onLogin={loginUser} />
            ) : (
               <AuthForm mode="signup" onLogin={loginUser} userId={data?.id} />
            )}
         </Box>
      </Container>
   )
}

export default AuthPage
