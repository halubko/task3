import React from "react"
import { Box } from "@mui/material"
import ProductCategoryRadio from "./ProductCategoryRadio"
import ProductSearch from "./ProductSearch"
import ProductSortBy from "./ProductSortBy"

const ProductFilter = () => {
   return (
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
         <ProductSearch />
         <ProductSortBy />
         <ProductCategoryRadio />
      </Box>
   )
}

export default ProductFilter
