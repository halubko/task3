import React, { useEffect, useMemo, useState } from "react"
import { productsAPI } from "../services/productsService"
import { Box, CircularProgress, Grid } from "@mui/material"
import ProductCard from "../components/product/ProductCard"
import ProductPagination from "../components/product/ProductPagination"
import ProductFilter from "../components/product/ProductFilter"
import { getPages } from "../utils/pagesCounter"
import { useSearchParams } from "react-router-dom"
import { GetProductsParams } from "../models/responses/IProductsResponses"

const ProductsPage = () => {
   const [limit, setLimit] = useState<number>(10)
   const [skip, setSkip] = useState<number>(0)
   const [page, setPage] = useState<number>(1)

   useEffect(() => {
      setSkip(limit * (page - 1))
   }, [limit, page])

   const [searchParams] = useSearchParams()

   const queryParams = useMemo(() => {
      const sortBy = searchParams.get("sortBy")
      const order = searchParams.get("order")
      const searchQuery = searchParams.get("search")

      const args: GetProductsParams = {
         limit,
         skip,
      }

      if (sortBy && order) {
         args.order = order
         args.sortBy = sortBy
      }

      if (searchQuery) {
         args.q = searchQuery
      }

      return args
   }, [limit, skip, searchParams])

   const { data: searchData, isLoading: isSearchLoading } = productsAPI.useGetSearchProductsQuery(
      queryParams,
      {
         skip: !searchParams.get("search"),
      }
   )
   const { data: categoryData, isLoading: isCategoryLoading } =
      productsAPI.useGetProductsByCategoryQuery(
         { productType: searchParams.get("category"), params: queryParams },
         {
            skip: !searchParams.get("category"),
         }
      )
   const { data: baseData, isLoading: isBaseLoading } = productsAPI.useGetProductsQuery(
      queryParams,
      {
         skip: !!searchParams.get("search") || !!searchParams.get("category"),
      }
   )

   let data
   let isLoading

   if (searchParams.get("search")) {
      data = searchData
      isLoading = isSearchLoading
   } else if (searchParams.get("category")) {
      data = categoryData
      isLoading = isCategoryLoading
   } else {
      data = baseData
      isLoading = isBaseLoading
   }

   const totalPages = data ? getPages(data.total, limit) : 1

   return (
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
         <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 2 }}>
               <ProductFilter />
            </Grid>
            {isLoading ? (
               <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
            ) : (
               <Grid size={{ xs: 12, md: 10 }}>
                  <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                     {data &&
                        data.products.map((product) => (
                           <Grid key={product.id} size={12}>
                              <ProductCard key={product.id} product={product} />
                           </Grid>
                        ))}
                  </Grid>
               </Grid>
            )}
         </Grid>
         <ProductPagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
         />
      </Box>
   )
}

export default ProductsPage
