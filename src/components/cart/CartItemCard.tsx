import { Box, Card, CardContent, Grid, IconButton, Typography } from "@mui/material"
import React, { FC } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { ICart } from "../../models/ICart"

interface CartItemCardProps {
   item: ICart
}

const CartItemCard: FC<CartItemCardProps> = ({ item }) => {
   return (
      <Card
         sx={{
            display: "flex",
            boxShadow: 2,
            width: "100%",
            border: "1px solid",
            borderColor: "primary",
            borderRadius: "8px",
         }}
      >
         <Grid container spacing={2} sx={{ flexGrow: 1, justifyContent: "space-between" }}>
            <Grid sx={{ xs: 12, sm: 6 }}>
               <CardContent
                  sx={{ display: "flex", flexDirection: "column", p: 1, "&:last-child": { pb: 1 } }}
               >
                  <Typography variant="subtitle1" component="div" noWrap>
                     {item.title}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mt: 0.5 }}>
                     Unit price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mt: 0.5 }}>
                     Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1" color="primary" fontWeight="bold" sx={{ mt: 0.5 }}>
                     Total: ${item.total.toFixed(2)}
                  </Typography>
               </CardContent>
            </Grid>
            <Grid sx={{ xs: 12, sm: 6 }}>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: { xs: "space-between", sm: "flex-end" },
                     height: "100%",
                     p: 1,
                  }}
               >
                  <IconButton aria-label="delete" onClick={() => console.log} color="error">
                     <DeleteIcon />
                  </IconButton>
               </Box>
            </Grid>
         </Grid>
      </Card>
   )
}

export default CartItemCard
