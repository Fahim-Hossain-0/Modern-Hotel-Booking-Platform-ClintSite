import React from 'react';
import Banner from '../../Components/Banner';
// import Map from '../../Components/MapViwe';
import MapView from '../../Components/MapViwe';

const Home = () => {
    return (
        <>
       
        {/* Banner */}
        <section className='mt-6'>
        <Banner></Banner>
        </section>
        <section className='py-24'>
          <div>
            <h1 className='text-7xl text-center py-5 mb-8'>Map </h1>
          </div>
          <MapView></MapView>
        </section>
        </>
    );
};

export default Home;