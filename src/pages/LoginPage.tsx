import React from 'react';
import {Box, CircularProgress, Container} from "@mui/material";
import AuthForm from "../components/AuthForm";
import {useAppSelector} from "../hooks/redux";
import AuthError from "../components/AuthError";

const LoginPage = () => {
    const {isLoading, error} = useAppSelector(state => state.user);

    console.log(error)

    return (
        <Container
            component="main"
            sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {error.status === 0 ? null : <AuthError />}
            <Box sx={{width: '100%'}}>
                {isLoading ?
                    <CircularProgress color="primary" sx={{display:'block', margin:'auto'}}/> :
                    <AuthForm mode='login'/>}
            </Box>
        </Container>
    );
};

export default LoginPage;