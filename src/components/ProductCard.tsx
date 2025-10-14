import React, {FC} from 'react';
import {IProduct} from "../models/IProduct";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ProductCardProps {
    product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="auto"
                image={product.images[0]}
                alt={product.title}
                sx={{ objectFit: 'cover' }}
            />

            <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                    {product.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                    height: 40,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {product.description}
                </Typography>

                <Box sx={{ mt: 1.5 }}>
                    <Typography variant="h5" color="primary" component="p" fontWeight="bold">
                        {product.price}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => console.log(`Добавить в корзину`)}
                >
                    В корзину
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;