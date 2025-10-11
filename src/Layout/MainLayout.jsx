import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
      <>
      <header className='fixed top-0 left-0 right-0 z-50 bg-[#003366]'>
        <Navbar></Navbar>
      </header>
      <main className='bg-[#EFEFEF] mt-10'>
       <section className=''>
        <Outlet></Outlet>
       </section>
      </main>
      {/* <Footer>
        <p className='text-center'>All rights reserved by Modern Hotel Booking Platform 2024</p>
      </Footer> */}
      <Footer></Footer>
      </>
    );
};

export default MainLayout;