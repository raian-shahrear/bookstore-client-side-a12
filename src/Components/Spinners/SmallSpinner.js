import React from "react";

import { Oval } from "react-loader-spinner";

const SmallSpinner = () => {
  return (
    <div className="mr-4">
      <Oval
        height={30}
        width={30}
        color="#FFFFFF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#9ca3af"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default SmallSpinner;
