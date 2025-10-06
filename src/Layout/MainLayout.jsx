import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
      <>
      <header className='bg-[#003366]'>
        <Navbar></Navbar>
      </header>
      <main className='bg-[#EFEFEF] '>
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