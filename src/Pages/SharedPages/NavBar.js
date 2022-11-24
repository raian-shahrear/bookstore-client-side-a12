import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NavBar;