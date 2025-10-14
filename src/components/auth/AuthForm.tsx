import React from 'react';
import {Box, Button, Link as MuiLink, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {TypedMutationTrigger} from "@reduxjs/toolkit/query/react";


interface LoginFormProps {
    mode: 'login' | 'signup';
    onLogin: TypedMutationTrigger<object, object, any>;
}

const AuthForm = ({mode, onLogin}: LoginFormProps) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const linkTitle = mode === 'login'
        ? "Are you registered with us?"
        : "Maybe you are already registered?";

    const text = mode === 'login'
        ? "Log In"
        : "Sign Up";

    const linkText = mode === 'login'
        ? "Sign Up"
        : "Log In";

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 400,
            margin: 'auto',
            padding: 4,
            borderRadius: 1,
            bgcolor: 'primary.main',
            color: 'secondary.main',
        }}>
            <Typography component='h1' gutterBottom align="center" variant='h4'>{text}</Typography>
            <TextField
                variant='filled'
                label="Username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{bgcolor: 'secondary.main', color: 'white', borderRadius: '8px', borderColor: 'white',}} />
            <TextField
                variant='filled'
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{bgcolor: 'secondary.main', color: 'white', borderRadius: '8px', borderColor: 'white'}}/>
            <Button
                variant='outlined'
                onClick={() => {mode === 'login' ? onLogin({username, password}) : undefined}}
                sx={{
                color: 'white',
                borderColor:'white',
                '&:hover': {bgcolor: 'secondary.main', color:'primary.main'},
                maxWidth: 120,
                alignSelf: 'center'

            }}>
                {text}
            </Button>
            <Box sx={{ display:'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>{linkTitle}</Typography>
                <MuiLink component={RouterLink} to={mode === 'login' ? '/auth/signup' : '/auth/login'}
                         variant="h6"
                         sx={{ color:'inherit', cursor: 'pointer', textDecoration: "none"}}>
                    {linkText}
                </MuiLink>
            </Box>
        </Box>
    );
};

export default AuthForm;