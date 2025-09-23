import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
      <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
       <section>
        <Outlet></Outlet>
       </section>
      </main>
      {/* <Footer>
        <p className='text-center'>All rights reserved by Modern Hotel Booking Platform 2024</p>
      </Footer> */}
      </>
    );
};

export default MainLayout;