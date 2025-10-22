import { useAppSelector } from "../hooks/redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

   console.log(isAuthenticated)

   return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />}</div>
}

export default ProtectedRoutes
