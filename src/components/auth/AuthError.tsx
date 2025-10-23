import React, { FC } from "react"
import { Alert, AlertTitle, Box } from "@mui/material"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { SerializedError } from "@reduxjs/toolkit"

interface AuthErrorProps {
   error: FetchBaseQueryError | SerializedError
}

const isFetchError = (error: AuthErrorProps["error"]): error is FetchBaseQueryError => {
   return "status" in error
}

const AuthError: FC<AuthErrorProps> = ({ error }) => {
   let finalMessage: string

   if (isFetchError(error)) {
      const customMessage = (status: FetchBaseQueryError["status"]): string | null => {
         switch (status) {
            case 400:
               return "Incorrect login or password (Status 400)"
            default:
               return
         }
      }

      const messageFromStatus = customMessage(error.status)

      if (messageFromStatus) {
         finalMessage = messageFromStatus
      } else if (typeof error.status === "number") {
         finalMessage = `Error ${error.status}: An unknown server error occurred.`

         if (
            error.data &&
            typeof error.data === "object" &&
            "message" in error.data &&
            typeof error.data.message === "string"
         ) {
            finalMessage += ` Details: ${error.data.message}`
         } else if (typeof error.data === "string") {
            finalMessage += ` Details: ${error.data}`
         }
      } else {
         finalMessage = `API Error: ${error.status}`
         if ("error" in error && typeof error.error === "string") {
            finalMessage = `${finalMessage} - ${error.error}`
         }
      }
   } else {
      finalMessage = error.message || "An unexpected application error occurred (no status)."

      if (error.code) {
         finalMessage = `${finalMessage}`
      }
   }

   return (
      <Box sx={{ my: 2 }}>
         <Alert severity="error">
            <AlertTitle>Authentication error</AlertTitle>
            {finalMessage}
         </Alert>
      </Box>
   )
}

export default AuthError
