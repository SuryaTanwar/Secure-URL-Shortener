import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function EmailVerfication() {
  const navigate = useNavigate();
  const { shortenId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const host = import.meta.env.VITE_BACKEND_HOST;
      const response = await axios.post(`${host}/api/v1/myurl/${shortenId}`, {
        userEmail: formData.email,
      });

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        console.error('Email sending failed:', response.data); 
      }
    } catch (error) {
      console.error('Error making API call:', error);
      setIsSuccess(false); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Verify Your Email</h1>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending Email...' : 'Submit'}
        </button>
        {isSuccess && (
          <div>
            <span>The URL has been successfully sent via email!<br></br>Please check your spam folder if you haven't received it yet.</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default EmailVerfication;
