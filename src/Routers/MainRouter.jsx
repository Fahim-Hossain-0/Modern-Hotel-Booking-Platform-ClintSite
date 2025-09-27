import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Form/Register";
import Login from "../Pages/Form/Login";
import Rooms from "../Pages/RoomsPage/Rooms";
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
                path: "/RoomsPage",
                Component: Rooms
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