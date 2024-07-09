import React, { useState } from "react";
import './styles/Login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRePasswordError] = useState("");
  const [formTouched, setFormTouched] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
 
    return password.length >= 6;
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
    if (!validatePassword(e.target.value)) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    if (e.target.value !== password) {
      setRePasswordError("Passwords do not match");
    } else {
      setRePasswordError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormTouched(true);

   
    if (emailError || passwordError || repasswordError || !email || !password || !repassword) {
      return;
    }

    
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/register', {
        email,
        password,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleRegister} className="login-div p-5 login-form text-center rounded-4">
        <h1 className="text-white m-3 fw-bolder">Register</h1>
        <div>
          <input
            type="text"
            className=" my-2 div-input p-2 rounded-2 border-0"
            placeholder="Email/Phone"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {formTouched && emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            className=" my-2 div-input p-2 rounded-2 border-0"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {formTouched && passwordError && <p className="text-danger">{passwordError}</p>}
        </div>

        <div>
          <input
            type="password"
            className=" my-2 div-input p-2 rounded-2 border-0"
            placeholder="Re-enter Password"
            value={repassword}
            onChange={handleRePasswordChange}
            required
          />
          {formTouched && repasswordError && <p className="text-danger">{repasswordError}</p>}
        </div>

        <p className="my-2">Already registered?&nbsp;
          <Link to="/login" className="text-decoration-none">Login</Link>
        </p>
        <button
          type="submit"
          className="div-input p-2 rounded-2 mb-5 bg-primary border-0 text-white"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
