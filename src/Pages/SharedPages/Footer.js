import React from "react";
import {Link} from "react-router-dom";
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaYoutubeSquare, FaSnapchatSquare } from "react-icons/fa";
import { format } from "date-fns";


const Footer = () => {
  const date = new Date();
  const requireDate = format(date, 'PP').split(",")[1];

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="px-4 pt-16 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link
              to="/"
              aria-label="Go home"
              title="Book"
              className="inline-flex items-center"
            >
              <span className="text-2xl font-bold tracking-wide text-primary dark:text-info">
                BookStore
              </span>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-accent dark:text-base-100">
                We have reputation on world book market. Also we have gained customer's trust. If you hav any queries, 
              </p>
              <div className="space-y-1 text-sm mt-4">
                <p className="font-semibold tracking-wide text-primary dark:text-info">
                  Please contact us
                </p>
                <div className="flex text-gray-500 dark:text-gray-300">
                  <p className="mr-1">Phone:</p>
                  <a
                    href="tel:+1-202-555-0125"
                    aria-label="Our phone"
                    title="Our phone"
                    className="transition-all duration-300 hover:underline"
                  >
                    +1-202-555-0125
                  </a>
                </div>
                <div className="flex text-gray-500 dark:text-gray-300">
                  <p className="mr-1">Email:</p>
                  <a
                    href="mailto:info@bookstore.com"
                    aria-label="Our email"
                    title="Our email"
                    className="transition-all duration-300 hover:underline"
                  >
                    info@bookstore.com
                  </a>
                </div>
                <div className="flex text-gray-500 dark:text-gray-300">
                  <p className="mr-1">Address:</p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Our address"
                    title="Our address"
                    className="transition-all duration-300 hover:underline"
                  >
                    Mission Viejo, CA 92691, United States
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
              <p className="font-semibold tracking-wide text-primary dark:text-info">
                Category
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
                  >
                    Education & Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
                  >
                    Children's Fantasy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
                  >
                    Technology & Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
                  >
                    World History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
                  >
                    Mystery & Suspense
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
                  >
                    Health & Fitness
                  </Link>
                </li>
              </ul>
            </div>
          <div>
            <span className="font-semibold tracking-wide text-primary dark:text-info">
              Social
            </span>
            <div className="flex items-center mt-1 space-x-3 mt-2">
              <a
                href="https://twitter.com/login"
                title="twitter"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-500 dark:text-gray-300 text-2xl transition-colors duration-300 hover:text-primary dark:hover:text-info"
              >
                <FaTwitterSquare />
              </a>
              <a
                href="https://www.facebook.com/login/"
                title="facebook"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-500 dark:text-gray-300 text-2xl transition-colors duration-300 hover:text-primary dark:hover:text-info"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.instagram.com/accounts/login/"
                title="instagram"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-500 dark:text-gray-300 text-2xl transition-colors duration-300 hover:text-primary dark:hover:text-info"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="https://accounts.snapchat.com/"
                title="snapchat"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-500 dark:text-gray-300 text-2xl transition-colors duration-300 hover:text-primary dark:hover:text-info"
              >
                <FaSnapchatSquare />
              </a>
              <a
                href="https://www.youtube.com/"
                title="youtube"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-500 dark:text-gray-300 text-2xl transition-colors duration-300 hover:text-primary dark:hover:text-info"
              >
                <FaYoutubeSquare />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
              Please keep in touch through social media. We are happy to reach you within next 5 hours after getting your response.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-accent dark:text-base-100">
            &copy; Copyright {requireDate} <span className="font-bold">BookStore</span>. All rights reserved.
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <Link
                to="/"
                className="text-sm text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
              >
                F.A.Q
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm text-gray-500 dark:text-gray-300 transition-all duration-300 hover:underline"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
