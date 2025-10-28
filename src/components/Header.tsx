import React, { useMemo } from "react"
import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { AccountCircle, Login, ShoppingBasket } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { logoutUser } from "../store/slices/authSlice"

interface HeaderProps {
   styles: React.CSSProperties
}

const Header = ({ styles }: HeaderProps) => {
   const navigate = useNavigate()
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
   const cartItems = useAppSelector((state) => state.cart.products)
   const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
   const dispatch = useAppDispatch()
   const location = useLocation()

   const isMenuOpen = Boolean(anchorEl)

   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      if (isAuth) {
         setAnchorEl(event.currentTarget)
      } else {
         void navigate("/auth/login")
      }
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   const cartItemCounter = useMemo(() => {
      return cartItems?.length
   }, [cartItems])

   const handleAuth = () => {
      if (isAuth) {
         handleMenuClose()
         dispatch(logoutUser())
      } else {
         sessionStorage.setItem("prevUrl", location.pathname)
         void navigate("/auth/login")
      }
   }

   const menuId = "primary-search-account-menu"
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         id={menuId}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={handleAuth}>{isAuth ? "Logout" : "Login"}</MenuItem>
      </Menu>
   )

   return (
      <Box sx={styles}>
         <AppBar position="static" sx={{ borderRadius: 1 }}>
            <Toolbar>
               <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { sm: "block" }, cursor: "pointer" }}
                  onClick={() => {
                     void navigate("/main/products")
                  }}
               >
                  ESHOP
               </Typography>
               <Box sx={{ flexGrow: 1 }} />
               <Box sx={{ display: "flex" }}>
                  <IconButton
                     size="large"
                     aria-label="show 4 new mails"
                     color="inherit"
                     onClick={() => void navigate("/main/cart")}
                  >
                     <Badge badgeContent={cartItemCounter} color="error">
                        <ShoppingBasket />
                     </Badge>
                  </IconButton>
                  {isAuth ? (
                     <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                     >
                        <AccountCircle />
                     </IconButton>
                  ) : (
                     <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                     >
                        <Login />
                     </IconButton>
                  )}
               </Box>
            </Toolbar>
            {renderMenu}
         </AppBar>
      </Box>
   )
}

export default Header
