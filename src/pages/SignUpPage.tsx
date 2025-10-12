import React from 'react';
import {Box, Container} from "@mui/material";
import AuthForm from "../components/AuthForm";

const SignUpPage = () => {
    return (
        <Container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <AuthForm mode='signup'/>
            </Box>
        </Container>
    );
};

export default SignUpPage;