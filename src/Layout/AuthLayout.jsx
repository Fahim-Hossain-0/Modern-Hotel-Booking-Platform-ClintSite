import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const AuthLayout = () => {
    return (
        <>
         <header className=''>
            <Navbar></Navbar>
        </header>
        <main>
            <section className=''>
                <Outlet></Outlet>
            </section>
        </main>
        {/* <Footer></Footer> */}
        </>
    );
};

export default AuthLayout;