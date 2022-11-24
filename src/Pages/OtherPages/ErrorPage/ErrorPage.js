import React from "react";
import Lottie from "lottie-react";
import Error from "../../../Assets/animation/404-error-animation.json";
import {useRouteError} from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center dark:bg-accent">
      <div className="text-secondary dark:text-primary">
        <h2 className="text-8xl font-bold">{error.status}</h2>
        <h3 className="text-3xl font-bold mt-8">{error.message || error.statusText}</h3>
      </div>
      <div className="lg:w-[600px] mx-auto">
        <Lottie animationData={Error} loop={true} />
      </div>
      <div className="">
        <Link to="/"><button className="btn border-none text-white  text-lg bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-accent hover:bg-[#104a77]">Go Back to Home</button></Link>
      </div>
    </div>
  );
};

export default ErrorPage;
