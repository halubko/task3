import React, {ChangeEvent, useState} from 'react';
import {productsAPI} from "../services/productsService";
import {Box, Grid, Pagination, TablePagination} from "@mui/material";
import ProductCard from "../components/product/ProductCard";
import ProductPagination from "../components/product/ProductPagination";
import ProductFilter from '../components/product/ProductFilter';

const ProductsPage = () => {
    const [limit, setLimit] = useState<number>(10);
    const [skip, setSkip] = useState<number>(0);
    const {data} = productsAPI.useGetProductsQuery({limit, skip})
    const [page, setPage] = useState<number>(1);
    const totalPages = data ? Math.ceil(data.total/limit) : 1


    return (
            <Box sx={{flexGrow: 1}}>
                <ProductFilter/>
                    <Grid container spacing={1}>
                        {data && data.products.map(product =>
                            <ProductCard key={product.id} product={product}/>
                        )}
                    </Grid>
                <ProductPagination totalPages={totalPages} page={page} setPage={setPage} limit={limit} setLimit={setLimit} setSkip={setSkip}/>
            </Box>
    );
};

export default ProductsPage;