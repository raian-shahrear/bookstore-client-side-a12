import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      hello from login or <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default Login;