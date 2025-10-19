import React, { useEffect, useMemo, useState } from "react"
import { GetProductsParams, productsAPI } from "../services/productsService"
import { Box, CircularProgress, Grid } from "@mui/material"
import ProductCard from "../components/product/ProductCard"
import ProductPagination from "../components/product/ProductPagination"
import ProductFilter from "../components/product/ProductFilter"
import { getPages } from "../utils/pages"
import { useSearchParams } from "react-router-dom"

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

   if (isLoading) {
      return <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
   }

   return (
      <Box sx={{ flexGrow: 1 }}>
         <Box sx={{ display: "flex" }}>
            <ProductFilter />
            {isLoading ? (
               <CircularProgress color="primary" sx={{ display: "block", margin: "auto" }} />
            ) : (
               <Grid container sx={{ flexGrow: 1, maxWidth: 1200 }}>
                  {data &&
                     data.products.map((product) => (
                        <Grid key={product.id}>
                           <ProductCard product={product} />
                        </Grid>
                     ))}
               </Grid>
            )}
         </Box>
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
