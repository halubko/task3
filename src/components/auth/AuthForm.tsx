import React, { useEffect } from "react"
import {
   Alert,
   alpha,
   Box,
   Button,
   IconButton,
   Link as MuiLink,
   TextField,
   Typography,
} from "@mui/material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../../services/authService"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

interface AuthFormProps {
   mode: "login" | "signup"
   onLogin?: ReturnType<typeof useLoginUserMutation>[0]
}

const AuthForm = ({ mode, onLogin }: AuthFormProps) => {
   const navigate = useNavigate()
   const [email, setEmail] = React.useState("")
   const [password, setPassword] = React.useState("")
   const [passwordConfirm, setPasswordConfirm] = React.useState("")
   const [emailDirty, setEmailDirty] = React.useState(false)
   const [passwordDirty, setPasswordDirty] = React.useState(false)
   const [passwordConfirmDirty, setPasswordConfirmDirty] = React.useState(false)
   const [emailError, setEmailError] = React.useState("Email is required")
   const [passwordError, setPasswordErrors] = React.useState("Password is required")
   const [formValid, setFormValid] = React.useState(false)

   useEffect(() => {
      if (emailError || passwordError || passwordConfirmDirty) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError, passwordConfirmDirty])

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

   const passwordConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirm = e.target.value
      setPasswordConfirm(passwordConfirm)

      if (passwordConfirm !== password) {
         setPasswordConfirmDirty(true)
      } else {
         setPasswordConfirmDirty(false)
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
         void onLogin({ username: "emilys", password: "emilyspass" })
      }
   }

   const handleOnClick = () => {
      void onLogin({ username: "emilys", password: "emilyspass" })
   }

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
         <Box display="flex" justifyContent="center" alignItems="center" position="relative" m={2}>
            <IconButton
               onClick={() => {
                  void navigate(sessionStorage.getItem("prevUrl"))
               }}
               aria-label="back"
               size="small"
               sx={{
                  color: "white",
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
               }}
            >
               <ArrowBackIosNewIcon />
            </IconButton>
            <Typography component="h1" gutterBottom align="center" variant="h4" m={0}>
               {text}
            </Typography>
         </Box>
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
         {mode === "signup" && (
            <>
               {passwordConfirmDirty && (
                  <Alert severity={"error"}>{"Passwords do not match"}</Alert>
               )}
               <TextField
                  variant="filled"
                  label="Password confirm"
                  type="password"
                  name="passwordConfirm"
                  onBlur={(e) => blurHandler(e)}
                  value={passwordConfirm}
                  onChange={passwordConfirmHandler}
                  sx={{
                     bgcolor: "secondary.main",
                     color: "white",
                     borderRadius: "8px",
                     borderColor: "white",
                  }}
               />
            </>
         )}
         <Box display="flex" justifyContent="center" alignItems="center" position="relative">
            <Button
               tabIndex={0}
               variant="outlined"
               onClick={handleOnClick}
               sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": { bgcolor: "secondary.main", color: "primary.main" },
                  maxWidth: 120,
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
            <MuiLink
               component={RouterLink}
               to={mode === "login" ? "/auth/signup" : "/auth/login"}
               variant="button"
               border="1px solid"
               borderRadius={1}
               py="5px"
               px="10px"
               bgcolor="secondary.main"
               position="absolute"
               right={0}
               sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  "&:hover": {
                     bgcolor: "primary.main",
                     color: "secondary.main",
                     borderColor: "secondary.main",
                     transition: "all 100ms ease-in",
                  },
                  maxWidth: 120,
                  alignSelf: "center",
                  textDecoration: "none",
                  transition: "all 100ms ease-in",
               }}
            >
               {linkText}
            </MuiLink>
         </Box>
      </Box>
   )
}

export default AuthForm
