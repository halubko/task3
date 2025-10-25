import React from "react"
import { Box, Button, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ProductCategoryRadio from "./ProductCategoryRadio"
import ProductSearch from "./ProductSearch"
import ProductOrder from "./ProductOrder"

const ProductFilter = () => {
   const [open, setOpen] = React.useState(false)
   return (
      <Box
         sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "white",
            padding: 2,
            borderRadius: 1,
            boxShadow: 2,
            height: "fit-content",
         }}
      >
         <ProductSearch />
         <Box
            sx={{
               display: "flex",
               justifyContent: {
                  xs: "space-between",
                  md: "auto",
               },
               gap: 2,
               flexGrow: 1,
               flexDirection: {
                  xs: "row",
                  md: "column",
               },
            }}
         >
            <ProductOrder />
            <Box sx={{ display: { xs: "none", md: "initial" } }}>
               <ProductCategoryRadio />
            </Box>
            <Box sx={{ display: { xs: "initial", md: "none" } }}>
               <Button
                  sx={{ border: "1px solid", borderColor: "primary" }}
                  onClick={() => setOpen(true)}
               >
                  Category
               </Button>
               <Modal open={open} onClose={() => setOpen(false)}>
                  <Box
                     sx={{
                        borderRadius: 2,
                        display: "flex",
                        width: "fit-content",
                        position: "absolute",
                        top: "0",
                        left: "0",
                     }}
                  >
                     <Box
                        sx={{
                           bgcolor: "white",
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "start",
                           gap: 1,
                           width: "fit-content",
                           p: 1,
                           maxHeight: "80vh",
                           overflowY: "auto",
                        }}
                     >
                        <ProductCategoryRadio />
                     </Box>
                     <Button
                        sx={{ bgcolor: "red", height: "64px", color: "white" }}
                        onClick={() => setOpen(false)}
                     >
                        <CloseIcon />
                     </Button>
                  </Box>
               </Modal>
            </Box>
         </Box>
      </Box>
   )
}

export default ProductFilter
