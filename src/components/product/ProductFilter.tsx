import React from "react"
import { Box } from "@mui/material"
import ProductCategoryRadio from "./ProductCategoryRadio"
import ProductSearch from "./ProductSearch"
import ProductOrder from "./ProductOrder"

const ProductFilter = () => {
   return (
      <Box
         sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
            maxWidth: 300,
            bgcolor: "white",
            padding: 2,
            borderRadius: 1,
            boxShadow: 2,
            height: "fit-content",
         }}
      >
         <ProductSearch />
         <ProductOrder />
         <ProductCategoryRadio />
      </Box>
   )
}

export default ProductFilter
