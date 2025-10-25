import React, { useMemo } from "react"
import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { ShoppingBasket, AccountCircle, Logout, MoreHoriz, Login } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { logoutUser } from "../store/slices/authSlice"

const Header = () => {
   const navigate = useNavigate()
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
   const cartItems = useAppSelector((state) => state.cart.products)
   const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
   const dispatch = useAppDispatch()

   const isMenuOpen = Boolean(anchorEl)
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
      handleMobileMenuClose()
   }

   const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget)
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

   const mobileMenuId = "primary-search-account-menu-mobile"
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem onClick={() => void navigate("/main/cart")}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
               <Badge badgeContent={4} color="error">
                  <ShoppingBasket />
               </Badge>
            </IconButton>
            <p>Cart</p>
         </MenuItem>
         <MenuItem onClick={handleAuth}>
            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               {isAuth ? <Logout /> : <Login />}
            </IconButton>
            {isAuth ? "Logout" : "Login"}
         </MenuItem>
      </Menu>
   )

   return (
      <Box sx={{ flexGrow: 1 }}>
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
               <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
               </Box>
               <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="show more"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="inherit"
                  >
                     <MoreHoriz />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
      </Box>
   )
}

export default Header
