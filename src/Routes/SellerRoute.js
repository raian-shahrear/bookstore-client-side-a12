import React, { useContext } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import PrimarySpinner from '../Components/Spinners/PrimarySpinner';
import { UserContext } from '../Contexts/AuthContext';
import useSeller from '../Hooks/useSeller';

const SellerRoute = ({children}) => {
  const {user, loading} = useContext(UserContext);
  const [isSeller, sellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if(loading || sellerLoading){
    return (
      <PrimarySpinner />
    )
  }

  if(user && isSeller){
    return children;
  }else{
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default SellerRoute;