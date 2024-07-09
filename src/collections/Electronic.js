import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenProducts } from '../store/electronicSlice';
import { add } from "../store/cartSlice.js";
import { added } from "../store/wishlistSlice.js";
import './styles/MenProducts.css'; 
import { VscHeart } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MenProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products, status, error } = useSelector((state) => state.menProducts.products);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenProducts());
    }
  }, [status, dispatch]);

  const addToCart = (product) => {
    if(user){
      dispatch(add(product));
    } else {
      navigate('/login');
    }
  };

  const addToWishList = (product) => {
    if(user){
      dispatch(added(product));
    } else {
      navigate('/login');
    }
  };

  let content;

  if (status === 'loading') {
    content = <div className="text-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <Link to={`/MenProducts/${product.id}`} className='text-decoration-none'>
              <div className="card shadow">
                <img src={product.image} className="card-img-top product-img-small mx-auto" alt={product.title} />
                <button onClick={() => addToWishList(product)} className="btn outline-none"><VscHeart /> <span>addToWishList</span></button>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-truncate">{product.description}</p>
                  <p className="card-text"><strong>${product.price}</strong></p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">Rating: 4.5</span>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <section className="container mt-4">
      {content}
    </section>
  );
};

export default MenProducts;
