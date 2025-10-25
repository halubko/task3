import React from "react"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"

const MainLayout = () => {
   return (
      <Container maxWidth={false} sx={{ padding: "10px 24px" }}>
         <header style={{ position: "sticky", top: 0, zIndex: 999 }}>
            <Header />
         </header>
         <Outlet />
      </Container>
   )
}

export default MainLayout
