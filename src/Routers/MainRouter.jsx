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
                Component:RoomsDetails
            },
            {
                path: "/my-booking",
                Component:MyBookingPage
            },
            {
                path:"/my-booking/:id",
                Component:MyBookingDetails
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