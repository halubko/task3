import React from 'react';
import Header from "./components/Header";
import { Outlet } from 'react-router-dom';
import {Container} from "@mui/material";

export function App() {
    return (
        <Container maxWidth={false}>
            <Header />
            <Outlet/>
        </Container>
    );
}