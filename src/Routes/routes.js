import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Blog from "../Pages/Blog/Blog";
import AllCategories from "../Pages/MainPages/Categories/AllCategories/AllCategories";
import Dashboard from "../Pages/MainPages/Dashboard/Dashboard";
import Home from "../Pages/MainPages/Home/Home";
import Login from "../Pages/MainPages/Login/Login";
import SignUp from "../Pages/MainPages/SignUp/SignUp";
import ErrorPage from "../Pages/OtherPages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/all-categories',
        element: <AllCategories />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
    ]
  }
]);


export default routers;
