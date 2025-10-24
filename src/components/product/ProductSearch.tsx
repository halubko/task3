import React, { useEffect } from "react"
import { alpha, Box, InputBase } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useSearchParams } from "react-router-dom"

const ProductSearch = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const [value, setValue] = React.useState<string>("")

   useEffect(() => {
      setValue(searchParams.get("search") || "")
   }, [searchParams.get("search")])

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value
      setValue(newQuery)

      setSearchParams((prevSearchParams) => {
         const newSearchParams = new URLSearchParams(prevSearchParams)

         if (newQuery) {
            newSearchParams.set("search", newQuery)
            newSearchParams.delete("category")
         } else {
            newSearchParams.delete("search")
         }

         return newSearchParams
      })
   }

   return (
      <Box sx={{ backgroundColor: "primary" }}>
         <Box
            sx={(theme) => ({
               position: "relative",
               borderRadius: 1,
               backgroundColor: alpha(theme.palette.primary.main, 0.9),
               marginLeft: 0,
               width: "100%",
               [theme.breakpoints.up("sm")]: {
                  width: "auto",
               },
            })}
         >
            <Box
               sx={(theme) => ({
                  padding: theme.spacing(0, 2),
                  height: "100%",
                  position: "absolute",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
               })}
            >
               <SearchIcon />
            </Box>

            <InputBase
               placeholder="Search…"
               value={value}
               inputProps={{ "aria-label": "search" }}
               onChange={handleSearchChange}
               sx={(theme) => ({
                  color: "white",
                  width: "100%",
                  "& .MuiInputBase-input": {
                     padding: theme.spacing(1, 1, 1, 0),
                     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                     transition: theme.transitions.create("width"),
                  },
               })}
            />
         </Box>
      </Box>
   )
}

export default ProductSearch
