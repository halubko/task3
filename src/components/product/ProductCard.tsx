import React, { FC } from "react"
import { IProduct } from "../../models/IProduct"
import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   IconButton,
   Typography,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { useNavigate } from "react-router-dom"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useCartQuantityActions } from "../../hooks/useCartQuantityActions"

interface ProductCardProps {
   product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
   const navigate = useNavigate()
   const { quantityInCart, handleAddToCart, handleIncrement, handleDecrement } =
      useCartQuantityActions(product.id)

   return (
      <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
         <CardMedia
            component="img"
            height="auto"
            image={product.images[0]}
            alt={product.title}
            sx={{ objectFit: "cover", cursor: "pointer" }}
            loading="lazy"
            onClick={() => {
               void navigate(`/main/products/${product.id}`)
            }}
         />

         <CardContent
            onClick={() => {
               void navigate(`/main/products/${product.id}`)
            }}
            sx={{ cursor: "pointer" }}
         >
            <Typography gutterBottom variant="h6" component="div" noWrap>
               {product.title}
            </Typography>

            <Typography
               variant="body2"
               color="text.secondary"
               sx={{
                  height: 40,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
               }}
            >
               {product.description}
            </Typography>

            <Box sx={{ mt: 1.5 }}>
               <Typography variant="h5" color="primary" component="p" fontWeight="bold">
                  {product.price} $
               </Typography>
            </Box>
         </CardContent>

         <CardActions sx={{ justifyContent: "flex-end", pr: 2, pb: 2 }}>
            {quantityInCart > 0 ? (
               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton size="small" color="primary" onClick={() => handleDecrement()}>
                     <RemoveIcon />
                  </IconButton>

                  <Typography variant="body1" component="span">
                     {quantityInCart}
                  </Typography>

                  <IconButton size="small" color="primary" onClick={() => handleIncrement()}>
                     <AddIcon />
                  </IconButton>
               </Box>
            ) : (
               <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart()}
               >
                  Add to cart
               </Button>
            )}
         </CardActions>
      </Card>
   )
}

export default ProductCard
