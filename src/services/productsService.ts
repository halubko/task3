import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "../models/IProduct";

interface ProductsResponse {
    products: IProduct[];
    limit: number;
    total: number;
    skip: number;
}

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
    endpoints:(build)=> ({
        getProducts: build.query<ProductsResponse, number>({
            query: (limit: number = 10) => ({
                url: 'products',
                params: {
                    _limit: limit,
                }
            })
        }),
        getProductById: build.query<IProduct, number>({
            query: (id: number) => ({
                url: `products/${id}`
            })
        })
    })
})