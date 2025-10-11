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
import Contact from "../Pages/Contact/Contact";
import Error from "../Pages/Error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: Home },
            { path: "/rooms", Component: Rooms },
            { 
                path: "/rooms/:id", 
                element: <PrivateRouter><RoomsDetails /></PrivateRouter> 
            },
            { 
                path: "/my-booking", 
                element: <PrivateRouter><MyBookingPage /></PrivateRouter> 
            },
            { 
                path: "/my-booking/:id", 
                element: <PrivateRouter><MyBookingDetails /></PrivateRouter> 
            },
            { path: "/contact", Component: Contact }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            { path: "/auth/register", Component: Register },
            { path: "/auth/login", Component: Login }
        ]
    },
    { path: "*", Component: Error }
]);
