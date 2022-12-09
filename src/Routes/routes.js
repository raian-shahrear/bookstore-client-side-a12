import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Root from "../Layouts/Root";
import Blog from "../Pages/Blog/Blog";
import AllCategories from "../Pages/MainPages/Categories/AllCategories";
import BookDetails from "../Pages/MainPages/Categories/BookDetails";
import BooksByCategory from "../Pages/MainPages/Categories/BooksByCategory";
import AddAProduct from "../Pages/MainPages/Dashboard/AddAProduct";
import AllSeller from "../Pages/MainPages/Dashboard/AllSeller";
import AllUser from "../Pages/MainPages/Dashboard/AllUser";
import Dashboard from "../Pages/MainPages/Dashboard/Dashboard";
import MyOrders from "../Pages/MainPages/Dashboard/MyOrders";
import MyProducts from "../Pages/MainPages/Dashboard/MyProducts";
import Payment from "../Pages/MainPages/Dashboard/Payment";
import ReportedProducts from "../Pages/MainPages/Dashboard/ReportedProducts";
import Home from "../Pages/MainPages/Home/Home";
import Login from "../Pages/MainPages/Login/Login";
import SignUp from "../Pages/MainPages/SignUp/SignUp";
import ErrorPage from "../Pages/OtherPages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
        path: '/books/:id',
        element: <BooksByCategory />
      },
      {
        path: '/books-details/:id',
        element: <BookDetails />
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
        element: <SellerRoute><AddAProduct /></SellerRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <SellerRoute><MyProducts /></SellerRoute>
      },
      {
        path: '/dashboard/reported-products',
        element: <AdminRoute><ReportedProducts /></AdminRoute>
      },
      {
        path: '/dashboard/all-buyers',
        element: <AdminRoute><AllUser /></AdminRoute>
      },
      {
        path: '/dashboard/all-sellers',
        element: <AdminRoute><AllSeller /></AdminRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <PrivateRoute><Payment /></PrivateRoute>,
        loader: ({params}) => fetch(`${process.env.REACT_APP_HOST_LINK}/orders-to-payment/${params.id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("access-token")}`,
          },
        })
      },
    ]
  }
]);


export default routers;
