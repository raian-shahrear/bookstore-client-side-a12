import React from 'react';
import { InfinitySpin } from "react-loader-spinner";

const PrimarySpinner = () => {
  return (
    <div className='flex justify-center items-center py-80'>
      <InfinitySpin width="200" color="#0B61A3" />
    </div>
  );
};

export default PrimarySpinner;