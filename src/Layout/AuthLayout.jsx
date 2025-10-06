import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <>
         <header className='bg-[#003366]'>
            <Navbar></Navbar>
        </header>
        <main className='min-h-svh bg-[#EFEFEF]'>
            <section className='pt-24'>
                <Outlet></Outlet>
            </section>
        </main>
        <Footer></Footer>
        </>
    );
};

export default AuthLayout;