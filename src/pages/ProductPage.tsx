import React, { useState } from "react"
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
   Rating,
   Typography,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useCartQuantityActions } from "../hooks/useCartQuantityActions"
import QuantityChanger from "../components/QuantityChanger"

const ProductPage = () => {
   const params = useParams()
   const navigate = useNavigate()
   const { quantityInCart, handleAddToCart } = useCartQuantityActions(Number(params.id))
   const { data, isLoading } = productsAPI.useGetProductByIdQuery(Number(params.id))
   const [currentIndex, setCurrentIndex] = useState(0)

   if (isLoading) {
      return (
         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
         </Box>
      )
   }

   const currentImageSrc = data.images[currentIndex]

   return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
         <Paper elevation={3} sx={{ p: 4 }}>
            <IconButton
               onClick={() => {
                  void navigate(-1)
               }}
               aria-label="back"
               size="small"
               sx={{ mb: 2 }}
            >
               <ArrowBackIosNewIcon />
            </IconButton>

            <Grid container spacing={4} justifyContent="center">
               <Grid sx={{ xs: 12 }} justifyContent="center">
                  <Box
                     sx={{
                        width: "100%",
                        height: 400,
                        overflow: "hidden",
                        borderRadius: 2,
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                     }}
                  >
                     <img
                        src={currentImageSrc}
                        alt={data.title}
                        style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "contain",
                           transition: "opacity 0.3s",
                        }}
                     />
                  </Box>

                  <ImageList
                     sx={{
                        width: "100%",
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                        gridAutoColumns: "minmax(80px, 1fr)",
                        overflowX: "scroll",
                        "&::-webkit-scrollbar": {
                           display: "none",
                        },
                     }}
                     gap={8}
                  >
                     {data.images.length <= 1
                        ? null
                        : data.images.map((src, index) => (
                             <ImageListItem
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                sx={{
                                   height: "100%",
                                   cursor: "pointer",
                                   opacity: index === currentIndex ? 1 : 0.6,
                                   border:
                                      index === currentIndex
                                         ? "2px solid"
                                         : "2px solid transparent",
                                   borderColor:
                                      index === currentIndex ? "primary.main" : "transparent",
                                   borderRadius: 1,
                                   transition: "opacity 0.2s, border-color 0.2s",
                                }}
                             >
                                <img
                                   src={src}
                                   alt={`Thumbnail ${index + 1}`}
                                   loading="lazy"
                                   style={{
                                      width: "100%",
                                      height: "100%",
                                      maxWidth: 200,
                                      objectFit: "cover",
                                   }}
                                />
                             </ImageListItem>
                          ))}
                  </ImageList>
               </Grid>

               <Grid sx={{ xs: 12 }}>
                  <Box display="flex" justifyContent="space-between" gap={2}>
                     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography
                           variant="h3"
                           component="h1"
                           gutterBottom
                           sx={{
                              fontSize: { xs: "1rem", sm: "2rem", md: "3rem" },
                           }}
                        >
                           {data.title}
                        </Typography>
                        <Typography
                           variant="h4"
                           color="primary"
                           component="h1"
                           fontWeight="bold"
                           sx={{
                              fontSize: { xs: "1rem", sm: "2rem", md: "3rem" },
                           }}
                        >
                           ${data.price}
                        </Typography>

                        {quantityInCart > 0 ? (
                           <QuantityChanger id={data.id} />
                        ) : (
                           <Button
                              size="medium"
                              variant="contained"
                              color="primary"
                              startIcon={<AddShoppingCartIcon />}
                              onClick={() => handleAddToCart(data.price, data.title)}
                              sx={{ maxWidth: 200 }}
                           >
                              Add to cart
                           </Button>
                        )}
                     </Box>
                     <Divider orientation="vertical" />
                     <Box display="flex" flexDirection="column" gap={2}>
                        <Box>
                           <Typography variant="h6" component="h2" gutterBottom>
                              Description:
                           </Typography>
                           <Typography variant="body1" color="text.secondary">
                              {data.description}
                           </Typography>
                        </Box>

                        <Rating
                           value={data.rating}
                           disabled
                           sx={{
                              "&.Mui-disabled": {
                                 opacity: 1,
                              },
                           }}
                        />
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   )
}

export default ProductPage
