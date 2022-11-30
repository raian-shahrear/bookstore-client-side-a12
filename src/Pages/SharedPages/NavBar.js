import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoLight from "../../logo-light.png";
import logoDark from "../../logo-dark.png";
import { UserContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { RiMenuUnfoldFill } from "react-icons/ri";

const NavBar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(null);
  const [darkIcon, setDarkIcon] = useState(true);
  const localStorageDarkIcon = localStorage.getItem("dark-icon");
  useEffect(() => {
    if (
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      localStorageDarkIcon === false
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [localStorageDarkIcon]);

  useEffect(() => {
    if (theme === "dark" || !localStorageDarkIcon || !darkIcon) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, localStorageDarkIcon, darkIcon]);

  // const handleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // }

  // sign out user
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.warning("Sign Out successfully");
      localStorage.removeItem("access-token");
      navigate("/");
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = (
    <React.Fragment>
      <li>
        <NavLink
          onClick={() => setIsMenuOpen(false)}
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "font-bold tracking-wide text-primary dark:text-info"
              : "font-bold tracking-wide text-gray-700 dark:text-base-100 transition-colors duration-300 hover:text-primary dark:hover:text-info"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setIsMenuOpen(false)}
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "font-bold tracking-wide text-primary dark:text-info"
              : "font-bold tracking-wide text-gray-700 dark:text-base-100 transition-colors duration-300 hover:text-primary dark:hover:text-info"
          }
        >
          Blog
        </NavLink>
      </li>
      {user?.uid && (
        <>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-bold tracking-wide text-primary dark:text-info"
                  : "font-bold tracking-wide text-gray-700 dark:text-base-100 transition-colors duration-300 hover:text-primary dark:hover:text-info"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <hr className="my-6 lg:my-0 lg:hidden" />
      {user?.uid ? (
        <>
          <li>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleSignOut();
              }}
              className="px-5 py-2 btn font-bold tracking-wide text-secondary dark:text-warning bg-transparent border-2 border-secondary transition-all duration-300 hover:text-base-100 hover:bg-secondary hover:border-transparent dark:hover:text-base-100"
            >
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "px-8 py-2 btn font-bold tracking-wide text-base-100 bg-primary border-2 border-transparent hover:text-base-100 hover:bg-primary hover:border-transparent"
                  : "px-8 py-2 btn font-bold tracking-wide text-primary dark:text-info bg-transparent border-2 border-primary dark:border-info transition-all duration-300 hover:text-base-100 hover:bg-primary hover:border-transparent dark:hover:bg-primary dark:hover:border-transparent dark:hover:text-base-100"
              }
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </React.Fragment>
  );

  return (
    <div className="dark:bg-gray-900">
      <div className="px-4 md:px-24 lg:px-8 py-5 mx-auto md:max-w-full lg:max-w-screen-2xl">
        <div className="relative flex items-center justify-between">
          <Link to="/" title="Bookstore" className="inline-flex items-center">
            <img
              src={theme === "light" && darkIcon ? logoLight : logoDark}
              alt="logo"
              className="w-48 h-16"
            />
          </Link>
          <ul className="items-center hidden space-x-5 lg:flex">
            <li className="lg:mt-2">
              <label className="swap swap-rotate">
                <input type="checkbox" />
                {!darkIcon ? (
                  <svg
                    onClick={() => {
                      setDarkIcon(!darkIcon);
                      localStorage.setItem("dark-icon", !darkIcon);
                      theme === "light" && setTheme("dark");
                    }}
                    className="fill-info w-8 h-8 mr-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      setDarkIcon(!darkIcon);
                      localStorage.setItem("dark-icon", !darkIcon);
                      theme === "dark" && setTheme("light");
                    }}
                    className="fill-primary w-8 h-8 mr-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </label>
            </li>
            {menuItems}
            {user?.uid && (
              <Link to="/">
                <div
                  className="tooltip text-base-100 tooltip-bottom"
                  data-tip={user?.displayName}
                >
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-gray-900 ring-offset-2">
                      <img src={user?.photoURL} alt="profile-img" />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </ul>
          <div className="lg:hidden z-10">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 ml-48 sm:ml-60 md:ml-80 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-gray-200 dark:hover:bg-accent"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                className="w-5 text-gray-600 dark:text-base-100"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white dark:bg-gray-900 border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        to="/"
                        title="Bookstore"
                        className="inline-flex items-center"
                      >
                        <img
                          src={
                            theme === "light" && darkIcon ? logoLight : logoDark
                          }
                          alt="logo"
                          className="w-48 h-16"
                        />
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline dark:hover:bg-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-5 text-gray-600 dark:text-base-100"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <ul className="flex justify-end">
                    <li className="">
                      <label className="swap swap-rotate">
                        <input type="checkbox" />
                        {!darkIcon ? (
                          <svg
                            onClick={() => {
                              setDarkIcon(!darkIcon);
                              localStorage.setItem("dark-icon", !darkIcon);
                              theme === "light" && setTheme("dark");
                            }}
                            className="fill-info w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                          </svg>
                        ) : (
                          <svg
                            onClick={() => {
                              setDarkIcon(!darkIcon);
                              localStorage.setItem("dark-icon", !darkIcon);
                              theme === "dark" && setTheme("light");
                            }}
                            className="fill-primary w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                          </svg>
                        )}
                      </label>
                    </li>
                  </ul>
                  <nav>
                    <ul className="flex flex-col gap-4">
                      {user?.uid && (
                        <Link
                          to="/"
                          className="flex items-center gap-4 font-bold tracking-wide text-gray-700 dark:text-base-100 transition-colors duration-300 hover:text-primary dark:hover:text-info"
                        >
                          <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-gray-900 ring-offset-2">
                              <img src={user?.photoURL} alt="profile-img" />
                            </div>
                          </div>
                          <p>{user?.displayName}</p>
                        </Link>
                      )}
                      {menuItems}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
          <label
            htmlFor="dashboard-drawer"
            title="dashboard-menu"
            className="drawer-button text-2xl lg:hidden p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-gray-200 dark:hover:bg-accent cursor-pointer text-gray-600 dark:text-base-100"
          >
            <RiMenuUnfoldFill />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
