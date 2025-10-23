import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { productsAPI } from "../services/productsService"
import {
   Box,
   Button,
   CircularProgress,
   Container,
   Divider,
   Grid,
   IconButton,
   ImageList,
   ImageListItem,
   Paper,
   Typography,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useCartQuantityActions } from "../hooks/useCartQuantityActions"

const ProductPage = () => {
   const params = useParams()
   const navigate = useNavigate()
   const { quantityInCart, handleAddToCart, handleIncrement, handleDecrement } =
      useCartQuantityActions(Number(params.id))

   const { data, isLoading } = productsAPI.useGetProductByIdQuery(Number(params.id))

   if (isLoading) {
      return <CircularProgress />
   }

   return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
         <Paper elevation={3} sx={{ p: 4 }}>
            <IconButton
               onClick={() => {
                  void navigate(-1)
               }}
               aria-label="back"
               size="small"
            >
               <ArrowBackIosNewIcon />
            </IconButton>
            <Grid container spacing={4}>
               <Grid sx={{ xs: 12, md: 6 }} display="flex">
                  <ImageList cols={data.images.length}>
                     {data.images.map((item) => (
                        <ImageListItem key={item}>
                           <img src={`${item}`} alt={data.title} loading="lazy" />
                        </ImageListItem>
                     ))}
                  </ImageList>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                     <Typography variant="h3" component="h1" gutterBottom>
                        {data.title}
                     </Typography>
                     <Typography variant="h4" color="primary" component="h1" fontWeight="bold">
                        ${data.price}
                     </Typography>
                     {quantityInCart > 0 ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                           <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleDecrement()}
                           >
                              <RemoveIcon />
                           </IconButton>

                           <Typography variant="body1" component="span">
                              {quantityInCart}
                           </Typography>

                           <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleIncrement()}
                           >
                              <AddIcon />
                           </IconButton>
                        </Box>
                     ) : (
                        <Button
                           size="small"
                           variant="contained"
                           color="primary"
                           startIcon={<AddShoppingCartIcon />}
                           onClick={() => handleAddToCart(data.price, data.title)}
                        >
                           Add to cart
                        </Button>
                     )}
                  </Box>
               </Grid>

               <Grid sx={{ xs: 12, md: 6 }}>
                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" component="h2" gutterBottom>
                     Description:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                     {data.description}
                  </Typography>

                  <Box sx={{ mt: 3, mb: 2 }}>
                     <Typography variant="subtitle1" fontWeight="bold">
                        Category:
                     </Typography>
                     <Typography variant="body2">{data.category}</Typography>
                  </Box>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   )
}

export default ProductPage
