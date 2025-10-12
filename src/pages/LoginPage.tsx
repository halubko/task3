import React from 'react';
import {Box, CircularProgress, Container} from "@mui/material";
import AuthForm from "../components/AuthForm";
import {useAppSelector} from "../hooks/redux";

const LoginPage = () => {
    const isLoading = useAppSelector(state => state.user.isLoading);
    const user = useAppSelector(state => state.user.user);

    console.log(user);

    return (
        <Container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
                {isLoading ? <CircularProgress color="primary" /> : <AuthForm mode='login'/>}
            </Box>
        </Container>
    );
};

export default LoginPage;