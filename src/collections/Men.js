// src/components/Products.js

import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdStar } from "react-icons/io";
import './styles/products.css';
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice.js";
import { getProducts } from "../store/MenSlice.js";
import { VscHeart } from "react-icons/vsc";
import { added } from "../store/wishlistSlice.js";
import { useNavigate } from "react-router-dom";


const Products = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { data: products, status, error } = useSelector(state => state.products);
    const {user}=useSelector(state=>state.auth);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const addToCart = (product) => {
        if(user){
            dispatch(add(product));
        }else {
            navigate('/login');
        }
       
    };

    const addToWishList = (product) => {
        if(user){
            dispatch(added(product));
        }else {
            navigate('/login');
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div className="col-md-3 mb-4 mt-5" key={product.id}>
                        <Card className="h-100 d-flex flex-column">
                            <div className="text-center m-2">
                                <Card.Img variant="top" src={product.images} alt={product.title} className="product-image" />
                                <div className="rating">
                                    <span className="wishlist">
                                        <button onClick={() => addToWishList(product)}><VscHeart /></button>
                                    </span>
                                    {/* {product.rating.rate}<IoMdStar className="text-success fs-5" /> | {product.rating.count}         */}
                                </div>
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="flex-grow-1">{product.title}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <footer className="text-center mt-auto">
                                    <Button variant="primary" onClick={() => addToCart(product)}>Add To Cart</Button>
                                </footer>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;