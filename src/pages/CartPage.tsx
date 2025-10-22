import React from "react"
import { Box, CircularProgress, Grid, IconButton, Paper, Typography } from "@mui/material"
import TotalCard from "../components/cart/TotalCard"
import CartItemCard from "../components/cart/CartItemCard"
import { cartAPI } from "../services/cartService"
import { useAppSelector } from "../hooks/redux"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
   const cartId = useAppSelector((state) => state.cart.id)
   console.log("ID: " + cartId)
   const { data: cartItems, isLoading } = cartAPI.useGetCartByIdQuery(cartId)
   const navigate = useNavigate()

   return (
      <Box sx={{ minHeight: "100vh", p: 3, boxSizing: "border-box" }}>
         <Paper
            elevation={3}
            sx={{ flexGrow: 1, width: "100%", height: "100%", p: 6, boxSizing: "border-box" }}
         >
            <IconButton
               onClick={() => {
                  void navigate(-1)
               }}
               aria-label="back"
               size="small"
            >
               <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
               variant="h3"
               component="h1"
               gutterBottom
               sx={{ mb: 4, textAlign: "center", color: "primary" }}
            >
               My cart
            </Typography>

            {isLoading ? (
               <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
            ) : cartItems.products.length === 0 ? (
               <Typography variant="h6" color="text.secondary">
                  Cart is empty
               </Typography>
            ) : (
               <Grid
                  container
                  spacing={4}
                  direction={{ xs: "column", md: "row" }}
                  justifyContent={"center"}
               >
                  <Grid sx={{ xs: 12, md: 8 }}>
                     <Box display="flex" flexDirection="column" gap={4}>
                        {cartItems.products.map((product) => (
                           <CartItemCard key={product.id} item={product} />
                        ))}
                     </Box>
                  </Grid>

                  <Grid sx={{ xs: 12, md: 4 }}>
                     <TotalCard
                        totalPrice={cartItems.total}
                        onOrder={() => void console.log("Complite")}
                     />
                  </Grid>
               </Grid>
            )}
         </Paper>
      </Box>
   )
}

export default CartPage
