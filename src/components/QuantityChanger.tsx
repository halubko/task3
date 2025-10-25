import React from "react"
import { Box, IconButton, Typography } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useCartQuantityActions } from "../hooks/useCartQuantityActions"

interface QuantityChangerProps {
   id: number
}

const QuantityChanger = ({ id }: QuantityChangerProps) => {
   const { quantityInCart, handleIncrement, handleDecrement } = useCartQuantityActions(id)

   return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
         <IconButton size="small" color="primary" onClick={handleDecrement}>
            <RemoveIcon />
         </IconButton>

         <Typography variant="body1" component="span">
            {quantityInCart}
         </Typography>

         <IconButton size="small" color="primary" onClick={handleIncrement}>
            <AddIcon />
         </IconButton>
      </Box>
   )
}

export default QuantityChanger
