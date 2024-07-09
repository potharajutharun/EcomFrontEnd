// src/components/Products.js
import React, { useEffect } from "react";

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/products.css';
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../store/productSlice.js";
import { VscHeart } from "react-icons/vsc";
import { added } from "../store/wishlistSlice.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { data: products, status, error } = useSelector(state => state.products);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

   

    const addToWishList = (product) => {
        if (user) {
            dispatch(added(product));
            alert("added to wishlist");
        } else {
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
                            <Link to={`/product/${product.id}`} className="text-decoration-none">
                                <div className="text-center m-2">
                                    <Card.Img variant="top" src={product.image} alt={product.title} className="product-image" />
                                    <div className="rating">
                                        <span className="wishlist">
                                            <button onClick={() => addToWishList(product)}><VscHeart /></button>
                                        </span>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="flex-grow-1">{product.title}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                </Card.Body>
                            </Link>
                            
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
