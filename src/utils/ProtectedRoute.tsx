import React, { useEffect } from "react"
import { useAppSelector } from "../hooks/redux"
import { Outlet, useNavigate } from "react-router-dom"

const ProtectedRoute = () => {
   const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
   const navigate = useNavigate()
   const prevUrl = sessionStorage.getItem("prevUrl")

   useEffect(() => {
      if (isAuth && prevUrl) {
         void navigate(prevUrl)
         sessionStorage.removeItem("prevUrl")
      } else if (isAuth) {
         void navigate(-1)
      }
   }, [isAuth, prevUrl])

   return <Outlet />
}

export default ProtectedRoute
