import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import headerImg from "../../../Assets/animation/reading-book.json";
import { UserContext } from "../../../Contexts/AuthContext";

const HomeHeader = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="px-4 md:px-24 lg:px-0 py-10 lg:py-0 mx-auto md:max-w-full lg:max-w-screen-2xl">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
            <div className="w-full text-center lg:text-start mb-12 lg:pl-16 lg:mb-0 lg:w-7/12">
              <h2 className="mb-6 text-3xl sm:text-5xl sm:leading-none lg:text-6xl font-bold tracking-tight text-primary dark:text-info">
                Reading Is For <br className="hidden md:block" />
                All Ages
              </h2>
              <p className="mb-4 font-medium text-base text-accent md:text-lg dark:text-base-100">
                Learning can't be stopped! Read book wherever you are. Just take
                a few steps and you will get world famous book with almost free
                (need to pay some).
              </p>
              {user?.uid && (
                <Link
                  to="/all-categories"
                  className="lg:mt-6 inline-flex md:text-lg items-center font-bold tracking-wider transition-all duration-300 text-primary hover:text-accent hover:translate-y-1 hover:lg:translate-x-1 hover:lg:translate-y-0 dark:text-info dark:hover:text-primary"
                >
                  Explore Our Bookstore
                  <FaArrowRight className="ml-2" />
                </Link>
              )}
            </div>
            <div className="w-full lg::px-8 sm:w-8/12 lg:w-6/12">
              <div className="relative">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute bottom-20 left-0 hidden -mb-8 text-gray-600 w-32 ml-8 lg:block"
                >
                  <defs>
                    <pattern
                      id="766323e1-e594-4ffd-a688-e7275079d540"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                    width="52"
                    height="24"
                  />
                </svg>
                <div className="relative bg-transparent p-7 sm:p-10">
                  <Lottie animationData={headerImg} loop={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
