import React from 'react';
import {useLoaderData} from 'react-router-dom';


const Payment = () => {
  const order = useLoaderData();
  console.log(order)
  return (
    <div>
      
    </div>
  );
};

export default Payment;