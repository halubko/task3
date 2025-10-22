import React, { FC } from "react"
import { Box, Button, Typography } from "@mui/material"

interface TotalCardProps {
   totalPrice: number
   onOrder: () => void
}

const TotalCard: FC<TotalCardProps> = ({ totalPrice, onOrder }) => {
   return (
      <Box
         sx={{
            minWidth: 250,
            maxWidth: 350,
            border: "1px solid",
            borderRadius: "8px",
            borderColor: "primary.main",
            padding: "16px",
            ml: { md: 3, xs: 0 },
            mt: { xs: 3, md: 0 },
            boxShadow: 3,
            alignSelf: "flex-start",
         }}
      >
         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" component="p">
               Total to be paid:
            </Typography>
            <Typography variant="h5" component="p" color="primary" fontWeight="bold">
               ${totalPrice}
            </Typography>
         </Box>

         <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => void onOrder()}
            sx={{
               paddingY: 1.5,
               fontSize: "1rem",
            }}
         >
            Place an order
         </Button>
      </Box>
   )
}

export default TotalCard
