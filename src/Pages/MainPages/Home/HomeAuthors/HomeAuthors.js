import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { responsive, writers } from "./AuthorsData";

const HomeAuthors = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-accent dark:text-info text-center mb-10">
        Weekly Popular Authors
      </h2>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-md py-4 md:py-8">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay
          autoPlaySpeed={3000}
        >
          {writers?.map((writer) => (
            <div key={writer?._id}>
              <Link to="/" className="flex flex-col items-center">
                <img src={writer?.imgUrl} alt="writer" className="w-40" />
                <h3 className="text-gray-600 dark:text-gray-400 mt-2">
                  {writer?.name}
                </h3>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeAuthors;
