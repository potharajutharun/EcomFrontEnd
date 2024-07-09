import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { getProducts } from '../store/productSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items) || [];
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
  
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/userdetails');
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    dispatch(getProducts());
  }, [dispatch]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Img variant="top" src={userDetails.profileImage || 'default-profile-image.jpg'} alt="Profile Image" className="profile-image mb-3" />
              <Card.Text><strong>Email:</strong> {userDetails.email}</Card.Text>
              <Card.Text><strong>Name:</strong> {userDetails.name}</Card.Text>
              <Card.Text><strong>Date of Birth:</strong> {userDetails.dob}</Card.Text>
              <Card.Text><strong>Phone Number:</strong> {userDetails.phoneNumber}</Card.Text>
              <Card.Text><strong>Gender:</strong> {userDetails.gender}</Card.Text>
              <Card.Text><strong>Address:</strong> {userDetails.address}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-8">
          <h2>Product Details</h2>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map(product => (
              <Card key={product.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text>Description: {product.description}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
