import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import registerImg from "../../../Assets/register/register.json";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import useJWToken from "../../../Hooks/useJWToken";
import SmallSpinner from "../../../Components/Spinners/SmallSpinner";

const SignUp = () => {
  const [displayPass, setDisplayPass] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const { createUser, updateUser, googleUser, facebookUser, signOutUser } =
    useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // get JWT from backend and set token to localStorage
  const [emailForToken, setEmailForToken] = useState("");
  const [token] = useJWToken(emailForToken);
  if (token) {
    signOutUser();
    localStorage.removeItem("access-token");
    navigate("/login");
  }

  const handleSignUp = (data, event) => {
    setDataLoading(true);
    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData?.success) {
          // creating an object with form data
          const registeredUser = {
            userName: data?.name,
            userEmail: data?.email,
            imageUrl: imgData?.data?.url,
            role: data?.customer,
          };
          // console.log(registeredUser)
          createUser(data?.email, data?.password)
            .then((result) => {
              const user = result.user;
              // console.log(user);
              updateUserProfile(data?.name, imgData?.data?.url, registeredUser);
              event.target.reset();
              setFirebaseError("");
            })
            .catch((err) => {
              console.error(err);
              setFirebaseError(err.message);
              setDataLoading(false);
            });
        }
      });
  };

  // update user profile
  const updateUserProfile = (name, photo, registeredUser) => {
    updateUser(name, photo)
      .then(() => {
        console.log(`${name} & Photo is added`);
        saveRegisteredUser(registeredUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // google register
  const handleGoogleUser = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const registeredUser = {
          userName: user?.displayName,
          userEmail: user?.email,
          imageUrl: user?.photoURL,
          role: "user",
        };
        saveRegisteredUser(registeredUser);
        setFirebaseError("");
      })
      .catch((err) => {
        console.error(err);
        setFirebaseError(err.message);
      });
  };

  // facebook register
  const handleFacebookUser = () => {
    facebookUser()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const registeredUser = {
          userName: user?.displayName,
          userEmail: user?.email,
          imageUrl: user?.photoURL,
          role: "user",
        };
        saveRegisteredUser(registeredUser);
        setFirebaseError("");
      })
      .catch((err) => {
        console.error(err);
        setFirebaseError(err.message);
      });
  };

  // save registered user to database
  const saveRegisteredUser = (registeredUser) => {
    fetch(`${process.env.REACT_APP_HOST_LINK}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ registeredUser }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setEmailForToken(registeredUser?.userEmail);
          toast.success(
            "Successfully create an account! Please login by using your valid email & password"
          );
          setDataLoading(false);
        } else {
          toast.error(data.message);
          signOutUser();
          setDataLoading(false);
        }
      });
  };

  return (
    <section className="dark:bg-gray-900 dark:text-gray-100">
      <div className="px-4 py-10 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl">
        <div className="flex flex-col justify-center items-center sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="hidden md:flex items-center mt-20 lg:mt-0 h-72 w-full lg:w-1/2">
            <Lottie animationData={registerImg} loop={true} />
          </div>

          <div className="w-full max-w-md p-4 rounded-md shadow-lg sm:p-8 text-accent dark:bg-gray-800 dark:text-base-100 md:mt-40 lg:mt-0">
            <h2 className="mb-3 text-3xl font-semibold text-center">
              Register an account
            </h2>
            <p className="my-4 text-center text-sm text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="transition-all duration-300 text-primary dark:text-info hover:text-gray-500 dark:hover:text-gray-500  hover:underline"
              >
                Please Login
              </Link>
            </p>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="space-y-8 mt-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fname" className="block text-sm">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    id="fname"
                    placeholder="full name"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                  {errors.name && (
                    <span className="text-sm text-error">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="img" className="block text-sm">
                    Upload image *
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    id="img"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                  {errors.image && (
                    <span className="text-sm text-error">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm">
                    Email address *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                        message: "Please set email in right pattern",
                      },
                    })}
                    id="email"
                    placeholder="email address"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                  {errors.email && (
                    <span className="text-sm text-error">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-sm">
                      Password *
                    </label>
                  </div>
                  <input
                    type={displayPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value: /(?=.*\d)(?=.*[A-Z])(?=.*[!#@$%&? " ])/,
                        message:
                          "Password must have at least one uppercase, one special character and one numeric value",
                      },
                    })}
                    id="password"
                    placeholder="******"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                  <div
                    onClick={() => setDisplayPass(!displayPass)}
                    className="absolute top-9 right-2"
                  >
                    {displayPass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  {errors.password && (
                    <span className="text-error">
                      <small>{errors.password?.message}</small>
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="option" className="block text-sm">
                      Please, set your role *
                    </label>
                  </div>
                  <select
                    {...register("customer", { required: true })}
                    id="option"
                    placeholder="******"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    <option value="user">user</option>
                    <option value="seller">seller</option>
                  </select>
                  {errors.customer && (
                    <span className="text-sm text-error">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type="submit"
                  value="Sign Up"
                  className="w-full px-8 py-3 cursor-pointer font-semibold rounded-md bg-primary text-base-100 dark:bg-[#187bc7] dark:text-base-100 transition-all duration-300 hover:bg-[#084370] dark:hover:bg-primary"
                />
                {dataLoading && (
                  <div className="absolute bottom-1.5 left-28">
                    <SmallSpinner />
                  </div>
                )}
              </div>
            </form>
            {firebaseError && (
              <p className="text-error text-sm mt-2">{firebaseError}</p>
            )}
            <div className="flex items-center w-full my-6">
              <hr className="w-full text-gray-400" />
              <p className="px-3 text-gray-400">OR</p>
              <hr className="w-full text-gray-400" />
            </div>
            <div className="my-6 space-y-4">
              <button
                onClick={handleGoogleUser}
                aria-label="SignUp with Google"
                type="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-primary transition-all duration-300 hover:text-primary dark:hover:text-gray-300"
              >
                <FaGoogle className="text-xl" />
                <p>SignUp with Google</p>
              </button>
              <button
                onClick={handleFacebookUser}
                aria-label="SignUp with Facebook"
                type="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-primary transition-all duration-300 hover:text-primary dark:hover:text-gray-300"
              >
                <FaFacebookF className="text-xl" />
                <p>SignUp with Facebook</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
