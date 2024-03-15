// src/pages/SignUp/SignUp.js
import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const host = import.meta.env.VITE_BACKEND_HOST;
      const response = await axios.post(`${host}/api/v1/signin`, {
        email: formData.email,
        password: formData.password,
      });
 
      if(response.data.success){
        Cookies.set('jwt', response.data.data);
        navigate("/urlshorten")
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
       
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <br />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default SignIn;
