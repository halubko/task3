import React, { FC } from "react"
import { IProduct } from "../../models/IProduct"
import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
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
            justifyContent: "center",
            "& .MuiCardMedia-root": {
               minWidth: { xs: "100px", md: "200px" },
               maxWidth: { xs: "300px", md: "300px" },
               objectFit: "cover",
               cursor: "pointer",
            },
         }}
      >
         <Box
            display="flex"
            alignItems={{ xs: "center", sm: "flex-start" }}
            flexDirection={{ xs: "column", sm: "row" }}
         >
            <CardMedia
               component="img"
               image={product.images[0]}
               alt={product.title}
               loading="lazy"
               onClick={() => {
                  void navigate(`/main/products/${product.id}`)
               }}
            />

            <CardContent
               onClick={() => {
                  void navigate(`/main/products/${product.id}`)
               }}
               sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  flexGrow: 1,
               }}
            >
               <Typography gutterBottom variant="h6" component="div">
                  {product.title}
               </Typography>

               <Typography variant="body2" color="text.secondary">
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
            </CardContent>
         </Box>

         <CardContent
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: {
                  xs: "stretch",
                  md: "center",
               },
            }}
         >
            <Box sx={{ mt: 1.5 }}>
               <Typography variant="h5" color="primary" component="p" fontWeight="bold" noWrap>
                  {product.price} $
               </Typography>
            </Box>
            <CardActions sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
               {quantityInCart > 0 ? (
                  <QuantityChanger id={product.id} />
               ) : (
                  <Button
                     size="small"
                     variant="contained"
                     color="primary"
                     startIcon={<AddShoppingCartIcon />}
                     onClick={() => handleAddToCart(product.price, product.title)}
                     fullWidth
                  >
                     Add
                  </Button>
               )}
            </CardActions>
         </CardContent>
      </Card>
   )
}

export default ProductCard
