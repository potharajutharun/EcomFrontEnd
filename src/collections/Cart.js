import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { remove } from '../store/cartSlice.js';
import { addOrder } from '../store/profileSlice.js';
import { updateUser } from '../store/userDetailsSlice.js';

const Cart = () => {
  const dispatch = useDispatch(); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    profileImage: '',
    paymentMethod: '',
    phoneNumber: '',
    gender: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const removeFromCart = (productId) => {
    dispatch(remove(productId)); 
  };

  const handleBuyClick = () => {
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      id: Date.now(), 
      date: new Date().toLocaleDateString(),
      total: products.reduce((sum, product) => sum + product.price, 0),
      status: 'Pending',
      ...formData
    };
    await dispatch(updateUser(formData));
    dispatch(addOrder(orderDetails));
    console.log('Purchase details:', formData);
    handleClose();
  };

  const products = useSelector(state => state.cart);

  const productCards = products.map(product => (
    <div className="col-sm-4 mt-5 mb-4 " key={product.id}>
      <Card style={{ width: '90%' }}>
        <div className="text-center m-2">
          <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '100px', width: '100px' }} />
        </div>
        <Card.Body>
          <Card.Title className='fw-bold fs-4'>{product.title}</Card.Title>
          <Card.Text className='fw-bold fs-4'>{product.category}</Card.Text>
          <Card.Text className='fw-bold fs-4'>${product.price}</Card.Text>
          <Card.Text className='fw-light fs-5 text-truncate'>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between'>
          <Button className='w-20' onClick={handleBuyClick}>Buy</Button>
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile Image URL</Form.Label>
              <Form.Control type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirm Purchase
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Cart;
