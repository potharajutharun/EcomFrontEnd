import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import './styles/Navigation.css';
import { VscHeart } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

function Navigation() {
    const cartItems = useSelector(state => state.cart);
    const { user } = useSelector((state) => state.auth);

    return (
        <Navbar bg="white" expand="lg" className='shadow-sm fs-6'>
            <Container className='nav_container'>
                <Navbar.Brand as={Link} to="/" className='text-light'>
                    <img height="40" src="https://th.bing.com/th?id=OIP.te86PFl36qpw7_6NH44ecwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Brand Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto fw-normal">
                        <Nav.Link as={Link} to="/MenProducts" className='text-dark fw-bolder small-font-List'>Electronics</Nav.Link>
                        <Nav.Link as={Link} to="/Women" className='text-dark fw-bolder small-font-List'>WOMEN</Nav.Link>
                        <Nav.Link as={Link} to="/Men" className='text-dark fw-bolder small-font-List'>Men</Nav.Link>
                        <Nav.Link as={Link} to="/HomeAndLiving" className='text-dark fw-bolder small-font-List'>HOME & LIVING</Nav.Link>
                        <Nav.Link as={Link} to="/Studio" className='text-dark fw-bolder small-font-List'>STUDIO <sup className='small-font text-danger'>New</sup></Nav.Link>
                        <Form className="d-flex search-container">
                            <span className='ms-3 mt-1'><CiSearch /></span>
                            <Form.Control
                                type="search"
                                placeholder="Search Products and More.."
                                className="me-2 search-box no-focus"
                                aria-label="Search"
                            />
                        </Form>
                    </Nav>
                    <Nav className='ml-auto justify-content-end'>
                        {!user&&<Nav.Link as={Link} to="/login">
                            <Button type="submit" className='mt-2 me-1'>Login</Button>
                        </Nav.Link>}
                        {user&&<Nav.Link as={Link} to="/login">
                            <Button hidden type="submit" className='mt-2 me-1 '>Login</Button>
                        </Nav.Link>}
                        <Nav.Link as={Link} to="/backendData">
                            backendData
                        </Nav.Link>
                        <Nav.Link as={Link} to="/profile" className='text-dark text-dark-one'>
                            <FaRegUser className='fs-5 mx-lg-1 small-font-profile' />
                            <div><h6 className='fw-bolder small-font'>Profile</h6></div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/wishlist" className='text-dark text-dark-one'>
                            <VscHeart className='fs-5 mx-lg-1' />
                            <div><h6 className='fw-bolder small-font'>WishList</h6></div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className='text-dark text-dark-one'>
                            <BsHandbag className='fs-5 mx-lg-0.5' />
                            {cartItems.length > 0 ? <span className='itemsCount fw-bolder text-danger'>{cartItems.length}</span> : " "}
                            <div><h6 className='fw-bolder small-font'>Bag</h6></div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
