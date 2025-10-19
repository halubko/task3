import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useSearchParams } from "react-router-dom"

const ProductOrder = () => {
   const [orderParams, setOrderParams] = useSearchParams()

   const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value

      setOrderParams((prevOrderParams) => {
         const newSearchParams = new URLSearchParams(prevOrderParams)

         if (newQuery) {
            newSearchParams.set("sortBy", "price")
            newSearchParams.set("order", newQuery)
         } else {
            newSearchParams.delete("order")
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
            value={orderParams.get("order")}
            label="Sort price"
            onChange={handleSort}
         >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
            <MenuItem value="asc">Asc</MenuItem>
         </Select>
      </FormControl>
   )
}

export default ProductOrder
