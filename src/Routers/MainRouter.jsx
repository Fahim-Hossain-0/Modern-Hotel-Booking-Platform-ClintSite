import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";

export const router = createBrowserRouter([
       {
        path: "/",
        Component: MainLayout,
        children: [
            {   
                path: "/",
                Component:Home
            }
        ]   
       },

       // AuthLayout
       // {
       //        path: "/auth",
       //        Component: AuthLayout,
       //        children: [
       //            {

       // } 
])