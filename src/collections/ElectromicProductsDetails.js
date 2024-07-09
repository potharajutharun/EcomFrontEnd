import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add } from "../store/cartSlice.js";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Electronic  from "./Electronic.js";

const ElectromicProductsDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { data: products, status } = useSelector(state => state.menProducts.products);
    const { user } = useSelector(state => state.auth);

    if (status === 'loading') {
        return <div className="container mt-5">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="container mt-5">Failed to load products.</div>;
    }

    const product = products ? products.find((item) => item.id === parseInt(productId)) : null;

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
                    <h4 className='fw-lighter'>{product.description}</h4>
                    <h1 className="text-danger fw-bold">Price: ${product.price}</h1>
                    <h4 className="text-black fw-light">discount: {product.discount}</h4>
                    <h4 className="text-black fw-light">category: {product.category}</h4>
                    <h4 className="text-black  fw-light">colour: {product.color}</h4>
                    <h4 className="text-black fw-light">brand: {product.brand}</h4>
                    <h4 className="text-black fw-light">model: {product.model}</h4>
                    <footer className="text-center mt-auto">
                        <Button variant="primary" onClick={() => addToCart(product)}>Add To Cart</Button>
                    </footer>
                </div>
            </div>
            <div>
                <center> <h2>Some similar products</h2></center>
                <Electronic/>
            </div>
        </div>
    );
};

export default ElectromicProductsDetails;
