// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './pages/SIgnIn/signIn';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import UrlShortner from './pages/UrlShortner/UrlShortner';
import EmailVerfication from './pages/EmailVerification/EmailVerification';
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/signup">Sign Up</Link>
          <span>  </span>
          <Link to="/signin">Sign In</Link>
        </nav>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/urlshorten" element={<UrlShortner/>} />
          <Route path="/api/v1/myurl/:shortenId" element={<EmailVerfication />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
