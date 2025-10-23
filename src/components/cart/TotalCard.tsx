import React, { FC } from "react"
import { Box, Button, Card, CircularProgress, Divider, Typography } from "@mui/material"

interface TotalCardProps {
   totalPrice: number
   isLoading: boolean
   onOrder: () => void
}

const TotalCard: FC<TotalCardProps> = ({ totalPrice, onOrder, isLoading }) => {
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
            onClick={onOrder}
            sx={{
               paddingY: 1.5,
               fontSize: "1.1rem",
               borderRadius: "8px",
               textTransform: "none",
            }}
         >
            Proceed to Checkout
         </Button>
      </Card>
   )
}

export default TotalCard
