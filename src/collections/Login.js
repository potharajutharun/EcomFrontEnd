import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import './styles/Login.css';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../store/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formTouched, setFormTouched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);

    if (!emailError && !passwordError && email && password) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate('/');
      } catch (err) {
        console.error("Error during login:", err);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="login-div p-5 login-form text-center rounded-4">
        <h1 className="text-white m-3 fw-bolder">Login</h1>
        <div>
          <input
            type="text"
            className="my-2 div-input p-2 rounded-2 border-0"
            placeholder="Email/Phone"
            value={email}
            onChange={handleEmailChange}
          />
          {formTouched && emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            className="my-2 div-input p-2 rounded-2 border-0"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {formTouched && passwordError && <p className="text-danger">{passwordError}</p>}
        </div>
        {status === 'failed' && <p className="text-danger">{error}</p>}
        <p className="my-2">Don't have an account?&nbsp;<Link to="/register" className="text-decoration-none">Register</Link></p>
        <button
          type="submit"
          className="div-input p-2 rounded-2 mb-5 bg-primary border-0 text-white"
          disabled={status === 'loading'}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
