import React, { useEffect } from "react"
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material"
import TotalCard from "../components/cart/TotalCard"
import CartItemCard from "../components/cart/CartItemCard"
import { cartAPI } from "../services/cartService"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useNavigate } from "react-router-dom"
import { refreshCart } from "../store/slices/cartSlice"
import { calculateTotalPrice } from "../utils/calculateTotalPrice"

const CartPage = () => {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const userId = useAppSelector((state) => state.auth.user?.id)
   const products = useAppSelector((state) => state.cart.products)
   const [updateCart, { isLoading }] = cartAPI.useUpdateCartMutation()
   const [deleteCart] = cartAPI.useDeleteCartMutation()

   useEffect(() => {
      const saveAndRefreshCart = async () => {
         try {
            const result = await updateCart({
               cartId: userId,
               products: products,
               //Here merge works like get cart by userId, because
               //getCartByUserId don't works at dummyjson
               merge: true,
            }).unwrap()
            dispatch(refreshCart({ products: result.products }))
         } catch (error) {
            alert(error)
         }
      }

      if (userId) {
         void saveAndRefreshCart()
      }
   }, [userId])

   useEffect(() => {
      if (userId) {
         void updateCart({ cartId: userId, products: products })
      }
   }, [products, userId])

   const totalPrice = calculateTotalPrice(products)

   return (
      <Box
         sx={{
            p: { xs: 2, md: 4 },
            boxSizing: "border-box",
         }}
      >
         <Stack spacing={4}>
            <Box display="flex" alignItems="center" mb={2}>
               <IconButton
                  onClick={() => {
                     void navigate(-1)
                  }}
                  aria-label="back"
                  size="large"
                  sx={{ mr: 2 }}
               >
                  <ArrowBackIosNewIcon />
               </IconButton>
               <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                  My Shopping Cart
               </Typography>
            </Box>
            {products.length === 0 ? (
               <Box textAlign="center" py={10}>
                  <Typography variant="h5" color="text.secondary">
                     Your cart is currently empty.
                  </Typography>
               </Box>
            ) : (
               <Grid container spacing={{ xs: 3, md: 6 }} justifyContent="center">
                  <Grid sx={{ xs: 12, md: 8 }}>
                     <Stack spacing={3}>
                        {products.map((product) => (
                           <CartItemCard key={product.id} item={product} />
                        ))}
                     </Stack>
                  </Grid>

                  <Grid
                     sx={{
                        xs: 12,
                        md: 8,
                        justifyContent: "center",
                        display: "flex",
                        height: "fit-content",
                     }}
                  >
                     <TotalCard
                        totalPrice={totalPrice}
                        isLoading={isLoading}
                        onDelete={() => deleteCart(userId)}
                     />
                  </Grid>
               </Grid>
            )}
         </Stack>
      </Box>
   )
}

export default CartPage
