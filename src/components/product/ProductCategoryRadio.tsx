import React from "react"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useGetProductsCategoriesQuery } from "../../services/productsService"
import { useSearchParams } from "react-router-dom"

const ProductCategoryRadio = () => {
   const { data } = useGetProductsCategoriesQuery()
   const [categoryParams, setCategoryParams] = useSearchParams()

   const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value

      setCategoryParams((prevCategoryParams) => {
         const newSearchParams = new URLSearchParams(prevCategoryParams)

         if (newQuery) {
            newSearchParams.set("category", newQuery)
            newSearchParams.delete("search")
         } else {
            newSearchParams.delete("category")
         }

         return newSearchParams
      })
   }

   return (
      <FormControl>
         <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
         <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={categoryParams.get("category") || ""}
            name="radio-buttons-group"
            onChange={handleCategory}
         >
            <FormControlLabel value="" control={<Radio />} label="All" />
            {data &&
               data.map((category) => (
                  <FormControlLabel
                     key={category.name}
                     value={category.slug}
                     control={<Radio />}
                     label={category.name}
                  />
               ))}
         </RadioGroup>
      </FormControl>
   )
}

export default ProductCategoryRadio
