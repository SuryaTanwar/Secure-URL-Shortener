import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
function UrlShortner() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [newShortUrl,setNewShortUrl] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt');
    try {
      const host = import.meta.env.VITE_BACKEND_HOST;
      const response = await axios.post(`${host}/api/v1/shorten`, {
      userName: formData.name,
      userEmail: formData.email,
      longUrl: formData.originalurl,
    }, {
      headers: {
        // Include the JWT token in the Authorization header
        'x-access-token': `${token}`
      }
    });
      if(response.data.data.shortenId){
        setNewShortUrl(response.data.data.shortenId)
      }
    } catch (error) {
      console.error('Error making API call:', error);
      setNewShortUrl('')
    }
  };

  return (
    <div className="App">
      <h1>Paste Your URL</h1>
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
        <label>URL:</label>
        <input
          type="text"
          name="originalurl"
          value={formData.originalurl}
          onChange={handleChange}
          placeholder="Enter your url"
        />
        <br />
        <button type="submit">Shorten</button>
      </form>
      {newShortUrl && <div>
        <span>Your short URL is: </span>
        <span>{`${import.meta.env.VITE_FRONTEND_HOST}/api/v1/myurl/${newShortUrl}`}</span>
      </div>}
    </div>
  );
}

export default UrlShortner;
