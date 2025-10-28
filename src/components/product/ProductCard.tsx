import React, { FC } from "react"
import { IProduct } from "../../models/IProduct"
import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Grid,
   Rating,
   Typography,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { useNavigate } from "react-router-dom"
import { useCartQuantityActions } from "../../hooks/useCartQuantityActions"
import QuantityChanger from "../QuantityChanger"

interface ProductCardProps {
   product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
   const navigate = useNavigate()
   const { quantityInCart, handleAddToCart } = useCartQuantityActions(product.id)

   const handleNavigation = () => {
      void navigate(`/main/products/${product.id}`)
   }

   return (
      <Card
         sx={{
            width: "100%",
            boxShadow: 3,
            display: "flex",
            flexDirection: {
               xs: "column",
               md: "row",
            },
            justifyContent: { xs: "center", md: "space-between" },
         }}
      >
         <Box
            display="flex"
            alignItems={{ xs: "center", md: "flex-start" }}
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            flexGrow={1}
         >
            <CardMedia
               component="img"
               image={product.images[0]}
               alt={product.title}
               fetchPriority="high"
               sx={{
                  minWidth: { xs: "100px", md: "200px" },
                  maxWidth: { xs: "300px", md: "300px" },
                  objectFit: "cover",
                  cursor: "pointer",
                  aspectRatio: "1 / 1",
                  height: "auto",
               }}
               onClick={() => {
                  handleNavigation()
               }}
            />

            <CardContent
               sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  height: "100%",
               }}
            >
               <Grid
                  container
                  justifyContent="space-between"
                  flexGrow={1}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                     handleNavigation()
                  }}
               >
                  <Grid size={{ md: 8 }} display="flex" flexDirection="column" gap={1}>
                     <Typography gutterBottom variant="h6" component="h1">
                        {product.title}
                     </Typography>

                     <Typography variant="body2" color="text.secondary" component="h2">
                        {product.description}
                     </Typography>

                     <Rating
                        value={product.rating}
                        disabled
                        sx={{
                           "&.Mui-disabled": {
                              opacity: 1,
                           },
                        }}
                     />
                  </Grid>
                  <Grid size={{ md: 4 }} justifyContent="flex-end">
                     <Typography
                        variant="h5"
                        color="primary"
                        component="p"
                        fontWeight="bold"
                        noWrap
                        textAlign="end"
                     >
                        {product.price} $
                     </Typography>
                  </Grid>
               </Grid>
               <CardActions
                  sx={{
                     justifyContent: "flex-end",
                     alignItems: "center",
                     minHeight: "37px",
                     p: 0,
                  }}
               >
                  {quantityInCart > 0 ? (
                     <QuantityChanger id={product.id} />
                  ) : (
                     <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddToCart(product.price, product.title)}
                        sx={{ width: { xs: "100%", sm: "100%", md: "initial" } }}
                     >
                        Add
                     </Button>
                  )}
               </CardActions>
            </CardContent>
         </Box>
      </Card>
   )
}

export default ProductCard
