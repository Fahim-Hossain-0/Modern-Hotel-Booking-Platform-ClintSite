import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Form/Register";
import Login from "../Pages/Form/Login";
import Rooms from "../Pages/RoomsPage/Rooms";
import RoomsDetails from "../Pages/RoomsPage/RoomsDetails";
import MyBookingPage from "../Pages/MyBookingPage/MyBookingPage";
import MyBookingDetails from "../Pages/MyBookingPage/MyBookingDetails";
import PrivateRouter from "./PrivateRouter";
// import AuthLayout from "../Layout/AuthLayout";

export const router = createBrowserRouter([
       {
        path: "/",
        Component: MainLayout,
        children: [
            {   
                index:true,
                path: "/",
                Component:Home
            },
            {
                path: "/Rooms",
                Component: Rooms
            },
            {
                path: "/rooms/:id",
                // Component:RoomsDetails,
                element:<PrivateRouter><RoomsDetails></RoomsDetails></PrivateRouter>
            },
            {
                path: "/my-booking",
                // Component:MyBookingPage
                element:<PrivateRouter><MyBookingPage></MyBookingPage></PrivateRouter>
            },
            {
                path:"/my-booking/:id",
                // Component:MyBookingDetails,
                element:<PrivateRouter><MyBookingDetails></MyBookingDetails></PrivateRouter>
            }
        ]   
       },

       // AuthLayout
          {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/register",
                Component: Register

            },
            {
                path: "/auth/login",
                Component: Login
            }
        ]
    }, 

])