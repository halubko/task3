import { Box, Card, Grid, IconButton, Stack, Typography } from "@mui/material"
import React, { FC } from "react"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { ICartProduct } from "../../models/ICart"
import { useCartQuantityActions } from "../../hooks/useCartQuantityActions"

interface CartItemCardProps {
   item: ICartProduct
}

const CartItemCard: FC<CartItemCardProps> = ({ item }) => {
   const { handleDecrement, handleIncrement, handleRemove } = useCartQuantityActions(item.id)
   const totalItemPrice = (item.quantity * item.price).toFixed(2)

   return (
      <Card
         variant="outlined"
         sx={{
            display: "flex",
            p: 2,
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            borderColor: "divider",
         }}
      >
         <Grid
            container
            spacing={2}
            alignItems="center"
            width={"100%"}
            justifyContent="space-between"
         >
            <Grid sx={{ xs: 7, sm: 6 }}>
               <Stack spacing={0.5}>
                  <Typography variant="body1" fontWeight="medium" noWrap>
                     {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     Price:{" "}
                     <Box component="span" fontWeight="bold" color="text.primary">
                        ${item.price}
                     </Box>
                  </Typography>

                  <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", mt: 1 }}>
                     <Typography variant="body2" color="text.secondary" mr={1}>
                        Quantity:
                     </Typography>
                     <IconButton
                        size="small"
                        onClick={() => handleIncrement()}
                        disabled={item.quantity <= 1}
                     >
                        <RemoveIcon fontSize="inherit" />
                     </IconButton>
                     <Typography sx={{ mx: 1, minWidth: 20, textAlign: "center" }}>
                        {item.quantity}
                     </Typography>
                     <IconButton size="small" onClick={() => handleIncrement()}>
                        <AddIcon fontSize="inherit" />
                     </IconButton>
                  </Box>
               </Stack>
            </Grid>

            <Grid sx={{ xs: 3, sm: 4 }}>
               <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  alignItems={{ xs: "flex-end", md: "center" }}
                  justifyContent="flex-end"
               >
                  <Stack
                     direction="row"
                     alignItems="center"
                     sx={{ display: { xs: "none", md: "flex" } }}
                  >
                     <IconButton
                        size="small"
                        onClick={() => handleDecrement()}
                        disabled={item.quantity <= 1}
                     >
                        <RemoveIcon fontSize="small" />
                     </IconButton>
                     <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                     <IconButton size="small" onClick={() => handleIncrement()}>
                        <AddIcon fontSize="small" />
                     </IconButton>
                  </Stack>
                  <Typography
                     variant="h6"
                     fontWeight="bold"
                     color="primary"
                     sx={{ minWidth: 70, textAlign: "right" }}
                  >
                     ${totalItemPrice}
                  </Typography>

                  <IconButton
                     aria-label="delete"
                     onClick={() => handleRemove()}
                     color="error"
                     size="small"
                     sx={{ ml: { xs: 0, md: 2 } }}
                  >
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Stack>
            </Grid>
         </Grid>
      </Card>
   )
}

export default CartItemCard
