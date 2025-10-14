import React from 'react';
import {Alert, AlertTitle, Box} from "@mui/material";
import {useAppSelector} from "../hooks/redux";

const AuthError = ({error}: any) => {

    const customMessage = (): string | null =>{
        switch (error.status){
            case 400: return 'Incorrect login or password';
            default: return null;
        }
    }

    const finalMessage = customMessage()
        ? customMessage()
        : (error.status ? `${error.status}: ${error.message}` : error.message);

    return (
        <Box sx={{ my: 2 }}>
            <Alert severity="error">
                <AlertTitle>Authentication error</AlertTitle>
                {finalMessage}
            </Alert>
        </Box>
    );
};

export default AuthError;