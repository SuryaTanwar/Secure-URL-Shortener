import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
function SignUp() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await axios.post(`${host}/api/v1/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      if(response.data.success){
        navigate("/signin")
      }
    } catch (error) {
      console.error('Error making API call:', error);
      toast.error("Sign up failed")
    }
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <br />
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;
