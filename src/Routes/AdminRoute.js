import React, { useContext } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import PrimarySpinner from '../Components/Spinners/PrimarySpinner';
import { UserContext } from '../Contexts/AuthContext';
import useAdmin from '../Hooks/useAdmin';


const AdminRoute = ({children}) => {
  const {user, loading} = useContext(UserContext);
  const [isAdmin, adminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if(loading || adminLoading){
    return (
      <PrimarySpinner />
    )
  }

  if(user && isAdmin){
    return children;
  }else{
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default AdminRoute;