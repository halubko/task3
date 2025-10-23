import React, { FC } from "react"
import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material"

interface IProductPaginationProps {
   page: number
   totalPages: number
   setPage: React.Dispatch<React.SetStateAction<number>>
   limit: number
   setLimit: React.Dispatch<React.SetStateAction<number>>
}

const ProductPagination: FC<IProductPaginationProps> = ({
   totalPages,
   page,
   setPage,
   limit,
   setLimit,
}) => {
   const limitOptions = [5, 10, 25, 100]

   return (
      <Box
         sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
         }}
      >
         <Pagination
            count={totalPages}
            page={page}
            disabled={totalPages === 1}
            onChange={(_event, page) => {
               setPage(page)
            }}
            size="large"
            color="primary"
         />
         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
            <Typography>Show:</Typography>
            <Select
               labelId="limit-select-label"
               value={limit}
               onChange={(event) => {
                  setLimit(event.target.value)
                  setPage(1)
               }}
               label="limit"
               size="small"
               variant="standard"
            >
               {limitOptions.map((option: number) => (
                  <MenuItem key={option} value={option}>
                     {option}
                  </MenuItem>
               ))}
            </Select>
         </Box>
      </Box>
   )
}

export default ProductPagination
