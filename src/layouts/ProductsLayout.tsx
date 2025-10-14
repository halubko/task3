import React from 'react';
import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

const ProductsLayout = () => {
    return (
        <Container maxWidth={false}>
            <Header />
            <Outlet/>
        </Container>
    );
};

export default ProductsLayout;