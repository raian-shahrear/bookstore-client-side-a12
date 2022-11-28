import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Root from "../Layouts/Root";
import Blog from "../Pages/Blog/Blog";
import AllCategories from "../Pages/MainPages/Categories/AllCategories";
import BookDetails from "../Pages/MainPages/Categories/BookDetails";
import BooksByCategory from "../Pages/MainPages/Categories/BooksByCategory";
import AddAProduct from "../Pages/MainPages/Dashboard/AddAProduct";
import Dashboard from "../Pages/MainPages/Dashboard/Dashboard";
import MyOrders from "../Pages/MainPages/Dashboard/MyOrders";
import MyProducts from "../Pages/MainPages/Dashboard/MyProducts";
import Payment from "../Pages/MainPages/Dashboard/Payment";
import ReportedProducts from "../Pages/MainPages/Dashboard/ReportedProducts";
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
        element: <PrivateRoute><AllCategories /></PrivateRoute>
      },
      {
        path: '/books/:id',
        element: <PrivateRoute><BooksByCategory /></PrivateRoute>
      },
      {
        path: '/books-details/:id',
        element: <PrivateRoute><BookDetails /></PrivateRoute>
      },
      {
        path: '/blog',
        element: <Blog />
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
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: '/dashboard/my-orders',
        element: <PrivateRoute><MyOrders /></PrivateRoute>
      },
      {
        path: '/dashboard/add-a-product',
        element: <PrivateRoute><AddAProduct /></PrivateRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <PrivateRoute><MyProducts /></PrivateRoute>
      },
      {
        path: '/dashboard/reported-products',
        element: <PrivateRoute><ReportedProducts /></PrivateRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <PrivateRoute><Payment /></PrivateRoute>,
        loader: ({params}) => fetch(`${process.env.REACT_APP_HOST_LINK}/orders-to-payment/${params.id}`)
      },
    ]
  }
]);


export default routers;
