import React, { useState } from "react"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useSearchParams } from "react-router-dom"

const ProductSortBy = () => {
   const [sortParams, setSortParams] = useSearchParams()
   const [sortType, setSortType] = useState("")

   const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSortType(e.target.value)
      const newQuery = e.target.value

      setSortParams((prevSortParams) => {
         const newSearchParams = new URLSearchParams(prevSortParams)

         if (newQuery) {
            newSearchParams.set("sortBy", newQuery)
         } else {
            newSearchParams.delete("sortBy")
         }

         return newSearchParams
      })
   }

   return (
      <FormControl size="small">
         <InputLabel id="demo-select-small-label">Sort price</InputLabel>
         <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortType}
            label="Sort price"
            onChange={handleSort}
         >
            <MenuItem value="">
               <em>None</em>
            </MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
            <MenuItem value="asc">Asc</MenuItem>
         </Select>
      </FormControl>
   )
}

export default ProductSortBy
