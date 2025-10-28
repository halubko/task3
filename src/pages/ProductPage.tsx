import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../services/productsService"
import {
   Box,
   Button,
   CircularProgress,
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
   const productId = Number(params.id)

   const { quantityInCart, handleAddToCart } = useCartQuantityActions(productId)
   const { data: product, isLoading } = useGetProductByIdQuery(productId)
   const [currentIndex, setCurrentIndex] = useState(0)

   if (isLoading) {
      return (
         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
         </Box>
      )
   }

   const currentImageSrc =
      product.images[currentIndex] || (product.images.length > 0 ? product.images[0] : "")

   return (
      <Box sx={{ my: 4 }}>
         <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
            <IconButton
               onClick={() => void navigate(-1)}
               aria-label="back"
               size="small"
               sx={{ mb: 2 }}
            >
               <ArrowBackIosNewIcon />
            </IconButton>

            <Box>
               <Grid container>
                  <Grid size={{ xs: 12, md: 6 }}>
                     <Box
                        sx={{
                           width: "100%",
                           height: { xs: 300, sm: 400 },
                           overflow: "hidden",
                           borderRadius: 2,
                           mb: 2,
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     >
                        {currentImageSrc ? (
                           <img
                              src={currentImageSrc}
                              alt={product.title}
                              style={{
                                 width: "100%",
                                 height: "100%",
                                 objectFit: "contain",
                                 transition: "opacity 0.3s",
                              }}
                           />
                        ) : (
                           <Typography variant="body2" color="text.secondary">
                              No images
                           </Typography>
                        )}
                     </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                     <Box display="flex" flexDirection="column" gap={1}>
                        <Typography
                           variant="h3"
                           component="h1"
                           sx={{
                              fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
                              mb: 1,
                           }}
                        >
                           {product.title}
                        </Typography>

                        <Typography
                           variant="h4"
                           color="primary"
                           component="h2"
                           fontWeight="bold"
                           sx={{
                              fontSize: { xs: "1.5rem", sm: "2rem" },
                           }}
                        >
                           ${product.price}
                        </Typography>

                        <Divider />

                        <Box>
                           <Typography variant="h6" component="h2" gutterBottom>
                              Description:
                           </Typography>
                           <Typography variant="body1" color="text.secondary" component="h2">
                              {product.description}
                           </Typography>
                        </Box>

                        <Divider />

                        <Box>
                           <Typography variant="subtitle1" component="div" gutterBottom>
                              Rating:
                           </Typography>
                           <Rating
                              value={product.rating}
                              precision={0.1}
                              readOnly
                              sx={{
                                 "&.Mui-disabled": {
                                    opacity: 1,
                                 },
                              }}
                           />
                        </Box>

                        <Divider />

                        <Box sx={{ pt: 1 }}>
                           {quantityInCart > 0 ? (
                              <QuantityChanger id={product.id} />
                           ) : (
                              <Button
                                 size="large"
                                 variant="contained"
                                 color="primary"
                                 startIcon={<AddShoppingCartIcon />}
                                 onClick={() => handleAddToCart(product.price, product.title)}
                                 sx={{ width: { xs: "100%", sm: 250 } }}
                              >
                                 Add to cart
                              </Button>
                           )}
                        </Box>
                     </Box>
                  </Grid>
               </Grid>
               <ImageList
                  sx={{
                     width: "100%",
                     display: "flex",
                     flexWrap: "nowrap",
                     overflowX: "scroll",
                     "&::-webkit-scrollbar": {
                        display: "none",
                     },
                  }}
                  gap={8}
               >
                  {product.images.map((src, index) => (
                     <ImageListItem
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                           height: "100%",
                           width: "fit-content",
                           cursor: "pointer",
                           opacity: index === currentIndex ? 1 : 0.7,
                           border: index === currentIndex ? "2px solid" : "2px solid transparent",
                           borderColor: "primary.main",
                           borderRadius: 1,
                           transition: "opacity 0.2s, border-color 0.2s",
                           padding: 0.5,
                        }}
                     >
                        <img
                           src={src}
                           alt={`Thumbnail ${index + 1}`}
                           loading="lazy"
                           style={{
                              minWidth: "100px",
                              maxWidth: "300px",
                              objectFit: "cover",
                              borderRadius: "4px",
                           }}
                        />
                     </ImageListItem>
                  ))}
               </ImageList>
            </Box>
         </Paper>
      </Box>
   )
}

export default ProductPage
