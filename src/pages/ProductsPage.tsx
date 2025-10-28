import React, { useEffect, useMemo, useState } from "react"
import {
   useGetProductsByCategoryQuery,
   useGetProductsQuery,
   useGetSearchProductsQuery,
} from "../services/productsService"
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
   const [params] = useSearchParams()
   const category = params.get("category")
   const searchQuery = params.get("search")
   const order = params.get("order")

   useEffect(() => {
      setSkip(limit * (page - 1))
   }, [limit, page])

   const queryParams = useMemo(() => {
      const sortBy = params.get("sortBy")

      const args: GetProductsParams = {
         limit,
         skip,
      }

      if (sortBy && order) {
         args.sortBy = sortBy
         args.order = order
      }

      if (searchQuery) {
         args.q = searchQuery
      }

      return args
   }, [limit, skip, params])

   const { data: searchData, isLoading: isSearchLoading } = useGetSearchProductsQuery(queryParams, {
      skip: !searchQuery,
   })
   const { data: categoryData, isLoading: isCategoryLoading } = useGetProductsByCategoryQuery(
      { productType: category, params: queryParams },
      {
         skip: !category,
      }
   )
   const { data: baseData, isLoading: isBaseLoading } = useGetProductsQuery(queryParams, {
      skip: !!searchQuery || !!category,
   })

   const { data, isLoading } = useMemo(() => {
      if (searchQuery) {
         return {
            data: searchData,
            isLoading: isSearchLoading,
         }
      } else if (category) {
         return {
            data: categoryData,
            isLoading: isCategoryLoading,
         }
      } else {
         return {
            data: baseData,
            isLoading: isBaseLoading,
         }
      }
   }, [searchData, baseData, categoryData, category])

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
