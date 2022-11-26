import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../Pages/SharedPages/NavBar";
import { FaAngleRight } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className=" dark:bg-gray-900">
        <div className="drawer drawer-mobile px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content px-24 lg:px-0">
            <Outlet />
          </div>
          
          <div className="lg:mt-10 drawer-side lg:border-r border-gray-200 dark:border-gray-500">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <ul className="pt-10 lg:pt-0 menu w-80 bg-gray-100 dark:bg-gray-800 lg:bg-transparent dark:lg:bg-transparent text-base-content ">
              <li>
                <NavLink
                  to="/all-categories"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-5 font-bold tracking-wide text-primary dark:text-info bg-transparent"
                      : "flex items-center gap-5 font-bold tracking-wide text-gray-700 bg-transparent dark:text-base-100 transition-colors duration-300 hover:text-primary dark:hover:text-info"
                  }
                >
                  <span>All Categories</span>
                  <FaAngleRight />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
