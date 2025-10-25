import { Button, Menu, MenuItem } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import React, { useEffect } from "react"
import SortIcon from "@mui/icons-material/Sort"

const ProductOrder = () => {
   const [orderParams, setOrderParams] = useSearchParams()
   const [value, setValue] = React.useState("")
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)

   useEffect(() => {
      setValue(orderParams.get("order") || "")
   }, [])

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleSort = (newQuery: string) => {
      setValue(newQuery)
      handleClose()

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

   const getSortLabel = () => {
      switch (value) {
         case "asc":
            return "Price: Low to High"
         case "desc":
            return "Price: High to Low"
         default:
            return "Sort"
      }
   }

   return (
      <>
         <Button
            id="sort-button"
            aria-controls={open ? "sort-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
            size="small"
            startIcon={<SortIcon />}
            sx={{
               border: "1px solid",
               borderColor: "primary.main",
               minWidth: 40,
               padding: value ? "4px 8px" : "4px",
            }}
         >
            {value ? getSortLabel() : "Order"}
         </Button>
         <Menu id="sort-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleSort("")} selected={value === ""}>
               None
            </MenuItem>
            <MenuItem onClick={() => handleSort("desc")} selected={value === "desc"}>
               Price: High to Low
            </MenuItem>
            <MenuItem onClick={() => handleSort("asc")} selected={value === "asc"}>
               Price: Low to High
            </MenuItem>
         </Menu>
      </>
   )
}

export default ProductOrder
