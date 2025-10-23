import React, { useEffect } from "react"
import { Alert, alpha, Box, Button, Link as MuiLink, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { authAPI } from "../../services/authService"
import { cartAPI } from "../../services/cartService"
import { useAppSelector } from "../../hooks/redux"

interface LoginFormProps {
   mode: "login" | "signup"
   onLogin?: ReturnType<typeof authAPI.useLoginUserMutation>[0]
   userId?: number
}

const AuthForm = ({ mode, onLogin, userId }: LoginFormProps) => {
   const [email, setEmail] = React.useState("")
   const [password, setPassword] = React.useState("")
   const [emailDirty, setEmailDirty] = React.useState(false)
   const [passwordDirty, setPasswordDirty] = React.useState(false)
   const [emailError, setEmailError] = React.useState("Email is required")
   const [passwordError, setPasswordErrors] = React.useState("Password is required")
   const [formValid, setFormValid] = React.useState(false)
   const [addCart] = cartAPI.useAddCartMutation()
   const products = useAppSelector((state) => state.cart.products)

   useEffect(() => {
      if (emailError || passwordError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError])

   const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
      if (!re.test(String(e.target.value).toLowerCase())) {
         setEmailError("Please, enter a valid email address")
         if (!e.target.value.length) {
            setEmailError("Email is required")
         }
      } else {
         setEmailError("")
      }
   }

   const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      const re = /(?=.*[a-z])/g
      const RE = /(?=.*[A-Z])/g
      const reSymbol = /(?=.*[^a-zA-Z0-9\s])/g
      if (e.target.value.length < 8) {
         setPasswordErrors("Password must be at least 8 characters")
         if (!e.target.value.length) {
            setPasswordErrors("Password is required")
         }
      } else if (!RE.test(e.target.value)) {
         setPasswordErrors("Password must have minimum 1 uppercase characters")
      } else if (!re.test(e.target.value)) {
         setPasswordErrors("Password must have at least 1 lowercase characters")
      } else if (!reSymbol.test(e.target.value)) {
         setPasswordErrors("Password must have at least 1 symbol")
      } else {
         setPasswordErrors("")
      }
   }

   const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      switch (e.target.name) {
         case "email":
            setEmailDirty(true)
            break
         case "password":
            setPasswordDirty(true)
            break
      }
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && formValid) {
         if (mode === "login") {
            void onLogin({ username: "emilys", password: "emilyspass" })
         } else {
            void onLogin({ username: "emilys", password: "emilyspass" })
            void addCart({ userId: userId, products: products })
         }
      }
   }

   const handleOnClick = () => {
      if (mode === "login") {
         void onLogin({ username: "emilys", password: "emilyspass" })
      } else {
         void onLogin({ username: "emilys", password: "emilyspass" })
         void addCart({ userId: userId, products: products })
      }
   }

   const linkTitle =
      mode === "login" ? "Are you registered with us?" : "Maybe you are already registered?"

   const text = mode === "login" ? "Log In" : "Sign Up"

   const linkText = mode === "login" ? "Sign Up" : "Log In"

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            margin: "auto",
            padding: 4,
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "secondary.main",
         }}
         onKeyDown={(e) => handleKeyDown(e)}
      >
         <Typography component="h1" gutterBottom align="center" variant="h4">
            {text}
         </Typography>
         {emailDirty && emailError && <Alert severity={"error"}>{emailError}</Alert>}
         <TextField
            variant="filled"
            label="Email"
            name="email"
            onBlur={(e) => blurHandler(e)}
            type="email"
            value={email}
            onChange={emailHandler}
            sx={{
               bgcolor: "secondary.main",
               color: "white",
               borderRadius: "8px",
               borderColor: "white",
            }}
         />
         {passwordDirty && passwordError && <Alert severity={"error"}>{passwordError}</Alert>}
         <TextField
            variant="filled"
            label="Password"
            type="password"
            name="password"
            onBlur={(e) => blurHandler(e)}
            value={password}
            onChange={passwordHandler}
            sx={{
               bgcolor: "secondary.main",
               color: "white",
               borderRadius: "8px",
               borderColor: "white",
            }}
         />
         <Button
            tabIndex={0}
            variant="outlined"
            onClick={handleOnClick}
            sx={{
               color: "white",
               borderColor: "white",
               "&:hover": { bgcolor: "secondary.main", color: "primary.main" },
               maxWidth: 120,
               alignSelf: "center",
               "&:disabled": {
                  cursor: "not-allowed",
                  color: alpha("#fff", 0.7),
                  borderColor: alpha("#fff", 0.7),
               },
            }}
            disabled={!formValid}
         >
            {text}
         </Button>
         <Box
            sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between" }}
         >
            <Typography>{linkTitle}</Typography>
            <MuiLink
               component={RouterLink}
               to={mode === "login" ? "/auth/signup" : "/auth/login"}
               variant="h6"
               sx={{ color: "inherit", cursor: "pointer", textDecoration: "none" }}
            >
               {linkText}
            </MuiLink>
         </Box>
      </Box>
   )
}

export default AuthForm
