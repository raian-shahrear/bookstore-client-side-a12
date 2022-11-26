import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import loginImg from "../../../Assets/register/login-to-study.json";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, resetPassword, googleUser, facebookUser } =
    useContext(UserContext);
  const [displayPass, setDisplayPass] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  // get JWT from backend and set token to localStorage
  // const [emailForToken, setEmailForToken] = useState("");
  // const [token] = useJWToken(emailForToken);
  // if (token) {
  //   navigate(from, { replace: true });
  // }

  const handleLogin = (data, event) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully login!");
        // setEmailForToken(email);
        event.target.reset();
        setFirebaseError('')
      })
      .catch((err) => {
        console.error(err);
        setFirebaseError(err.message);
      });
  };

  // reset password
  const handleResetPassword = () => {
    const email = watch("email");
    if (email) {
      resetPassword(email)
        .then(() => {
          alert("Please check the email to reset password");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // google login
  const handleGoogleUser = () => {
    googleUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully login through Google!");
        // setEmailForToken(user.email);
        setFirebaseError("");
      })
      .catch((err) => {
        console.error(err);
        setFirebaseError(err.message);
      });
  };

  // facebook login
  const handleFacebookUser = () => {
    facebookUser()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully login through Facebook!");
        // setEmailForToken(user.email);
        setFirebaseError("");
      })
      .catch((err) => {
        console.error(err);
        setFirebaseError(err.message);
      });
  };

  return (
    <section className="dark:bg-gray-900 dark:text-gray-100">
      <div className="px-4 py-10 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl">
        <div className="flex flex-col justify-center items-center sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="hidden md:flex items-center mt-20 lg:mt-0 h-72 w-full lg:w-1/2">
            <Lottie animationData={loginImg} loop={true} />
          </div>

          <div className="w-full max-w-md p-4 rounded-md shadow-lg sm:p-8 text-accent dark:bg-gray-800 dark:text-base-100 md:mt-40 lg:mt-0">
            <h2 className="mb-3 text-3xl font-semibold text-center">
              Login to your account
            </h2>
            <p className="my-4 text-center text-sm text-gray-500 dark:text-gray-300">
              New to BookStore?{" "}
              <Link
                to="/signup"
                className="transition-all duration-300 hover:underline"
              >
                Create a new account
              </Link>
            </p>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-8 mt-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "This field is required",
                    })}
                    id="email"
                    placeholder="valid email address"
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
                      Password
                    </label>
                  </div>
                  <input
                    type={displayPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
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
                  <div className="flex items-center justify-between">
                    <p>
                      {errors.password && (
                        <span className="text-error">
                          <small>{errors.password?.message}</small>
                        </span>
                      )}
                    </p>
                    <p
                      onClick={handleResetPassword}
                      className="text-sm text-end cursor-pointer hover:underline"
                    >
                      Forgot Password?
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Login"
                className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-base-100 cursor-pointer dark:bg-[#187bc7] dark:text-base-100 transition-all duration-300 hover:bg-[#084370] dark:hover:bg-primary"
              />
            </form>
            {
              firebaseError && <p className="text-error text-sm mt-2">{firebaseError}</p>
            }
            <div className="flex items-center w-full my-6">
              <hr className="w-full text-gray-400" />
              <p className="px-3 text-gray-400">OR</p>
              <hr className="w-full text-gray-400" />
            </div>
            <div className="my-6 space-y-4">
              <button
                onClick={handleGoogleUser}
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-primary transition-all duration-300 hover:text-primary dark:hover:text-gray-300"
              >
                <FaGoogle className="text-xl" />
                <p>Login with Google</p>
              </button>
              <button
                onClick={handleFacebookUser}
                aria-label="Login with Facebook"
                type="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-primary transition-all duration-300 hover:text-primary dark:hover:text-gray-300"
              >
                <FaFacebookF className="text-xl" />
                <p>Login with Facebook</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
