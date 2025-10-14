import React from 'react';
import {productsAPI} from "../services/productsService";
import {Grid} from "@mui/material";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
    const {data} = productsAPI.useGetProductsQuery(5)

    return (
        <Grid container spacing={1}>
            {data && data.products.map(product =>
                <ProductCard key={product.id} product={product}/>
            )}
        </Grid>
    );
};

export default ProductsPage;