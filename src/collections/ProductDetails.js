// src/components/ProductDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add } from "../store/cartSlice.js";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './Products.js';

const ProductDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { data: products } = useSelector(state => state.products);
    const product = products.find((item) => item.id === parseInt(productId));
    const { user } = useSelector(state => state.auth);

    if (!product) {
        return <div className="container mt-5"><div className="alert alert-danger">Product not found</div></div>;
    }

    const addToCart = (product) => {
        if (user) {
            dispatch(add(product));
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <h1 className="text-danger">Price: ${product.price}</h1>
                    <h5 className="text-dark">rating:{product.rating.rate} <br/> rating Count:{product.rating.count}</h5>
                    <footer className="text-center mt-auto">
                        <Button variant="primary" onClick={() => addToCart(product)}>Add To Cart</Button>
                    </footer>
                </div>
            </div>
            <div>
                <center><h1>Some similar products</h1></center>
                <Products/>
            </div>
        </div>
    );
};

export default ProductDetails;
