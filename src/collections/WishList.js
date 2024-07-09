import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

import { MdDeleteForever } from "react-icons/md";
import { remove } from '../store/wishlistSlice.js';
import { add } from '../store/cartSlice.js';

const WishList = () => {
    const dispatch = useDispatch(); 

    const removeFromCart = (productId) => {
        dispatch(remove(productId)); 
    };
    const addToCart = (product) => {
        dispatch(add(product)); 
    };

    const products = useSelector(state => state.WishList);
   

    const productCards = products.map(product => (
        <div className="col-sm-4 mb-4 mt-5 border-2" key={product.id}>
            <Card style={{ width: '90%' }}>
                <div className="text-center m-2  ms-4">
                    <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '100px', width: '100px' }} />
                    {/* <div className="rating">{product.rating.rate}<IoMdStar className="text-success fs-5" /> | {product.rating.count}</div> */}
                </div>
                <Card.Body>
                    <Card.Title className='fw-bold fs-4'>{product.title}</Card.Title>
                    <Card.Text className='fw-bol fs-4'>{product.category}</Card.Text>
                    <Card.Text className='fw-bol fs-4'>${product.price}</Card.Text>
                    <Card.Text className='fw-light fs-5 text-truncate'>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                    <Button className='w-20' onClick={()=>addToCart(product)}>addToCart</Button>
                    <Button className='bg-white border-white text-danger' onClick={() => removeFromCart(product.id)}><MdDeleteForever size={24} /></Button>
                </Card.Footer>
            </Card>
        </div>
    ));

    return (
        <div className="container">
            <div className="row">
                {productCards}
            </div>
        </div>
    );
}

export default WishList;