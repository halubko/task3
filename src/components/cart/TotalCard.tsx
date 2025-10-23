import React, { FC } from "react"
import { Box, Button, Card, CircularProgress, Divider, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useNavigate } from "react-router-dom"
import { cartAPI } from "../../services/cartService"
import { deleteCart } from "../../store/slices/cartSlice"

interface TotalCardProps {
   totalPrice: number
   isLoading: boolean
   onDelete: ReturnType<typeof cartAPI.useDeleteCartMutation>[0]
}

const TotalCard: FC<TotalCardProps> = ({ totalPrice, isLoading, onDelete }) => {
   const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
   const cartId = useAppSelector((state) => state.cart.id)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const handleSubmit = () => {
      if (isAuth) {
         alert("Cart sent")
         void onDelete(cartId)
         dispatch(deleteCart())
      } else {
         void navigate("/auth/login")
      }
   }
   return (
      <Card
         variant="outlined"
         sx={{
            p: 3,
            borderRadius: "12px",
            boxShadow: 3,
            bgcolor: "background.paper",
            width: "100%",
         }}
      >
         <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
            Order Summary
         </Typography>

         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body1" color="text.secondary">
               Delivery:
            </Typography>
            <Typography variant="body1" color="success.main" fontWeight="medium">
               Free
            </Typography>
         </Box>

         <Divider sx={{ mb: 2 }} />

         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" component="p" fontWeight="bold">
               Total to be paid:
            </Typography>
            {isLoading ? (
               <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
            ) : (
               <Typography variant="h5" component="p" color="primary" fontWeight="bold">
                  ${totalPrice && totalPrice.toFixed(2)}
               </Typography>
            )}
         </Box>

         <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
               paddingY: 1.5,
               fontSize: "1.1rem",
               borderRadius: "8px",
               textTransform: "none",
            }}
         >
            {isAuth ? "Proceed to Checkout" : "Authenticate"}
         </Button>
      </Card>
   )
}

export default TotalCard
