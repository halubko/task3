import React from "react"
import { Box, IconButton, Stack, Typography } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
   const navigate = useNavigate()

   return (
      <Box
         sx={{
            p: { xs: 2, md: 4 },
            boxSizing: "border-box",
         }}
      >
         <Stack spacing={4}>
            <Box
               display="flex"
               alignItems="center"
               justifyContent="center"
               mb={2}
               position="relative"
            >
               <IconButton
                  onClick={() => {
                     void navigate(-1)
                  }}
                  aria-label="back"
                  size="large"
                  sx={{ justifySelf: "flex-start", position: "absolute", top: 0, left: 0 }}
               >
                  <ArrowBackIosNewIcon />
               </IconButton>
               <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                  Page not found
               </Typography>
            </Box>
         </Stack>
      </Box>
   )
}

export default NotFoundPage
