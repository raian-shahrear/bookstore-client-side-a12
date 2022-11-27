import React from "react";

import { Oval } from "react-loader-spinner";

const DefaultSpinner = () => {
  return (
    <div className="">
      <Oval
        height={80}
        width={80}
        color="#0B61A3"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#001F43"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default DefaultSpinner;
