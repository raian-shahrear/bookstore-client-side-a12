import React from 'react';

const ButtonPrimary = ({children, btnType}) => {
  return (
    <div>
      <button type={btnType} className='btn border-none text-white bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-accent hover:bg-[#104a77]'>
        {children}
      </button>
    </div>
  );
};

export default ButtonPrimary;